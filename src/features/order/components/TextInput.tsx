import { useState } from 'react';
import { useChatStore } from '@/features/chat/store/chatStore';
import { useCartStore } from '@/store/cartStore';
import { useMenuStore } from '@/store/menuStore';

interface TextInputProps {
  apiUrl: string;
}
interface ResponseItem {
  menu_id?: number;
  category_id?: number;
  quantity?: number;
  state?: string;
}

const TextInput = ({ apiUrl }: TextInputProps) => {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addMessage = useChatStore((state) => state.addMessage);
  const { menus } = useMenuStore();
  const { updateQuantity, removeItem, addItem } = useCartStore();

  const processIntent = (intent: string, items: ResponseItem[]) => {
    switch (intent) {
      case 'get_category':
        console.log('카테고리 탐색:', items);
        break;
      case 'get_menu':
        console.log('메뉴 탐색:', items);
        break;
      case 'update_cart':
        console.log('장바구니 수정:', items);
        items.forEach((item) => {
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
        });
        break;
      case 'place_order':
        console.log('주문 확정:', items);
        break;
      case 'get_order_history':
        console.log('주문 내역조회:', items);
        break;
      default:
        console.log('알 수 없는 intent:', intent);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Add user message to chat
      addMessage({
        text: text,
        isUser: true,
        timestamp: Date.now(),
      });

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
        processIntent(data.result.intent, data.result.items || []);
      }

      // Clear input
      setText('');
    } catch (err) {
      console.error('Error sending text:', err);
      const errorMessage =
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='p-4 bg-white rounded-lg shadow-lg'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='text'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            메시지 입력
          </label>
          <textarea
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='메시지를 입력하세요...'
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ml-yellow focus:border-ml-yellow'
            rows={3}
            disabled={isProcessing}
          />
        </div>

        <button
          type='submit'
          disabled={isProcessing || !text.trim()}
          className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
            isProcessing || !text.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-ml-yellow hover:bg-ml-yellow-light text-white'
          }`}
        >
          {isProcessing ? '처리 중...' : '전송'}
        </button>

        {error && (
          <div className='p-2 bg-red-100 text-red-800 rounded text-sm'>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default TextInput;
