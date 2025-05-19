import { useChatStore } from '../store/chatStore';
import ChatBubble from './ChatBubble';
import { useEffect, useRef } from 'react';

const ChatHistory = () => {
  const messages = useChatStore((state) => state.messages);
  const isCapturing = useChatStore((state) => state.isCapturing);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='flex flex-col h-full'>
      <div
        className="flex-1 p-4 overflow-y-auto bg-white rounded-lg"
        style={{
          boxShadow: '0 8px 16px rgba(0, 0, 0, 1)', // 좀 더 진한 그림자 직접 지정
          border: '1px solid rgba(0, 0, 0, 0.1)', // 연한 테두리로 대비 향상
        }}
      >
        {messages.length === 0 ? (
          <ChatBubble
            message="안녕하세요! 어떤 도움이 필요하신가요?"
            isUser={false}
          />
        ) : (
          messages.map((message, index) => (
            <ChatBubble
              key={index}
              message={message.text}
              isUser={message.isUser}
              isUpdating={
                message.isUser && index === messages.length - 1 && isCapturing
              }
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatHistory;
