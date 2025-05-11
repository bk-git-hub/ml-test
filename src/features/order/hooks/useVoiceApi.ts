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

  const sendVoiceToApi = async (wavBlob: Blob): Promise<VoiceApiResponse> => {
    if (!apiUrl) {
      throw new Error('API URL이 설정되지 않았습니다.');
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('voice', wavBlob, 'voice.wav');
      formData.append('kiosk_id', '33');
      formData.append('admin_id', '1');

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('음성 인식 서버 응답 오류');
      }

      const data = await response.json();
      console.log(data);

      // Add messages to chat

      if (data.text) {
        addMessage({
          text: data.text,
          isUser: true,
          timestamp: Date.now(),
        });
      }

      if (data.user_message) {
        addMessage({
          text: data.user_message,
          isUser: true,
          timestamp: Date.now(),
        });
      }

      if (data.chat_message) {
        addMessage({
          text: data.chat_message,
          isUser: false,
          timestamp: Date.now(),
        });
      }

      return data;
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
