import { useState } from 'react';
import { useChatStore } from '@/features/chat/store/chatStore';

interface UseVoiceApiProps {
  apiUrl: string;
}

interface responseItem {
  menu_id?: number;
  category_id?: number;
  quantity?: number;
  state?: string;
}

interface VoiceApiResponse {
  user_message: string;
  chat_message: string;
  result: {
    status: string;
    intent: string;
    kiosk_id: number;
    admin_id: number;
    items: responseItem[];
  };
}

export const useVoiceApi = ({ apiUrl }: UseVoiceApiProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addMessage = useChatStore((state) => state.addMessage);

  const processIntent = (intent: string, items: responseItem[]) => {
    switch (intent) {
      case 'ORDER':
        // 주문 처리 로직
        console.log('주문 처리:', items);
        break;
      case 'CANCEL':
        // 주문 취소 로직
        console.log('주문 취소:', items);
        break;
      case 'MODIFY':
        // 주문 수정 로직
        console.log('주문 수정:', items);
        break;
      case 'INQUIRY':
        // 주문 조회 로직
        console.log('주문 조회:', items);
        break;
      case 'PAYMENT':
        // 결제 처리 로직
        console.log('결제 처리:', items);
        break;
      default:
        console.log('알 수 없는 intent:', intent);
    }
  };

  const sendVoiceToApi = async (wavBlob: Blob): Promise<VoiceApiResponse> => {
    if (!apiUrl) {
      throw new Error('API URL이 설정되지 않았습니다.');
    }

    setIsProcessing(true);
    setError(null);

    try {
      // First API call to /stt
      const sttFormData = new FormData();
      sttFormData.append('voice', wavBlob, 'voice.wav');
      sttFormData.append('kiosk_id', '33');
      sttFormData.append('admin_id', '1');

      const sttResponse = await fetch(`${apiUrl}/stt`, {
        method: 'POST',
        body: sttFormData,
      });

      if (!sttResponse.ok) {
        throw new Error('음성 인식 서버 응답 오류');
      }

      const sttData = await sttResponse.json();
      console.log('STT Response:', sttData);

      // Add user message to chat
      if (sttData.text) {
        addMessage({
          text: sttData.text,
          isUser: true,
          timestamp: Date.now(),
        });
      }

      // Second API call to /gpt
      const gptResponse = await fetch(`${apiUrl}/gpt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin_id: 1,
          kiosk_id: 33,
          text: sttData.text,
        }),
      });

      if (!gptResponse.ok) {
        throw new Error('GPT 서버 응답 오류');
      }

      const gptData = await gptResponse.json();
      console.log('GPT Response:', gptData);

      // Add chat message to chat
      if (gptData.chat_message) {
        addMessage({
          text: gptData.chat_message,
          isUser: false,
          timestamp: Date.now(),
        });
      }

      // Process the intent
      if (gptData.result?.intent) {
        processIntent(gptData.result.intent, gptData.result.items || []);
      }

      return gptData;
    } catch (err) {
      console.error('Error processing recording:', err);
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
    sendVoiceToApi,
  };
};
