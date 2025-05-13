// Example: src/features/chat/components/ChatHistoryPlaceholder.tsx (Create this file)
import { useChatStore } from '../store/chatStore';
import ChatBubble from './ChatBubble';

const ChatHistory = () => {
  const messages = useChatStore((state) => state.messages);
  const isCapturing = useChatStore((state) => state.isCapturing);

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 p-4 overflow-y-auto'>
        {messages.length === 0 ? (
          <ChatBubble
            message='안녕하세요! 어떤 도움이 필요하신가요?'
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
      </div>
    </div>
  );
};

export default ChatHistory;
