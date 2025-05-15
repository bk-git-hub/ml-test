import { useState } from 'react';
import { useChatStore } from '@/features/chat/store/chatStore';
import { useCartStore } from '@/store/cartStore';
import { useMenuStore } from '@/store/menuStore';
import { useNavigate } from 'react-router-dom';

interface UseTextApiProps {
  apiUrl: string;
}

interface ResponseItem {
  menu_id?: number;
  category_id?: number;
  quantity?: number;
  state?: string;
}

interface TextApiResponse {
  user_message: string;
  chat_message: string;
  result: {
    status: string;
    intent: string;
    kiosk_id: number;
    admin_id: number;
    items: ResponseItem[];
  };
}

//TODO: 리턴값에서 ITEMS가 배열이어야 하는지 체크

export const useGpt = ({ apiUrl }: UseTextApiProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addMessage = useChatStore((state) => state.addMessage);
  const { menus } = useMenuStore();
  const { updateQuantity, removeItem, addItem } = useCartStore();
  const navigate = useNavigate();

  const processIntent = (
    intent: string,
    item: ResponseItem,
    admin_id: number,
    kiosk_id
  ) => {
    switch (intent) {
      case 'get_category':
        console.log('카테고리 탐색:', item);
        //TODO: 카테고리 ID를 받으면 해당 카테고리 메뉴 페이지로 이동
        navigate(`/${admin_id}/${kiosk_id}/order/${item.category_id}`);
        break;
      case 'get_menu':
        console.log('메뉴 탐색:', item);
        //TODO: 카테고리 ID와 메뉴ID를 받으면 해당 카테고리 페이지로 이동후 탐색된 메뉴를 최상위에 표시
        navigate(
          `/${admin_id}/${kiosk_id}/order/${item.category_id}/${item.menu_id}`
        );
        break;
      case 'update_cart':
        console.log('장바구니 수정:', item);

        console.log(item);
        if (
          item.menu_id !== undefined &&
          item.quantity !== undefined &&
          item.state
        ) {
          const smenu = Object.values(menus)
            .flat()
            .find((m) => m.id === item.menu_id);
          console.log('Smenu:', smenu);
          if (smenu) {
            switch (item.state) {
              case 'add':
                addItem({ ...smenu }, item.quantity);
                break;
              case 'remove':
                updateQuantity(item.menu_id, item.quantity * -1);
                break;
              case 'removeall':
                removeItem(item.menu_id);
                break;
            }
          }
        }

        break;
      case 'place_order':
        console.log('주문 확정:', item);
        //TODO: 주문 확정 API 호출출
        break;
      case 'get_order_history':
        console.log('주문 내역조회:', item);
        navigate(`/${admin_id}/${kiosk_id}/order-history`);
        //TODO: 주문 내역조회 페이지로 이동동
        break;
      default:
        console.log('알 수 없는 intent:', intent);
    }
  };

  const sendTextToApi = async (text: string): Promise<TextApiResponse> => {
    if (!apiUrl) {
      throw new Error('API URL이 설정되지 않았습니다.');
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Add user message to chat
      // addMessage({
      //   text: text,
      //   isUser: true,
      //   timestamp: Date.now(),
      // });

      // Call GPT API
      const response = await fetch(`${apiUrl}/gpt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin_id: 1,
          kiosk_id: 33,
          text: text,
        }),
      });

      if (!response.ok) {
        throw new Error('GPT 서버 응답 오류');
      }

      const data = await response.json();
      console.log('GPT Response:', data);

      // Add chat message to chat
      if (data.chat_message) {
        addMessage({
          text: data.chat_message,
          isUser: false,
          timestamp: Date.now(),
        });
      }

      // Process the intent
      if (data.result?.intent) {
        processIntent(
          data.result.intent,
          data.result.items,
          data.result.admin_id,
          data.result.kiosk_id
        );
      }

      return data;
    } catch (err) {
      console.error('Error sending text:', err);
      const errorMessage =
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    error,
    sendTextToApi,
  };
};
