// Example: src/features/chat/components/ChatHistoryPlaceholder.tsx (Create this file)
import KeywordDetector from '../../order/components/KeywordDetector';
import ChatBubble from './ChatBubble';

const ChatHistoryPlaceholder = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 p-4 overflow-y-auto'>
        <ChatBubble
          message='안녕하세요! 어떤 도움이 필요하신가요?'
          isUser={false}
        />
        <ChatBubble message='주문 내역을 확인하고 싶어요' isUser={true} />
        <ChatBubble
          message='네, 주문 내역을 확인해드리겠습니다. 주문 번호를 알려주시겠어요?'
          isUser={false}
        />
        <ChatBubble
          message='안녕하세요! 어떤 도움이 필요하신가요?'
          isUser={false}
        />
        <ChatBubble message='주문 내역을 확인하고 싶어요' isUser={true} />
        <ChatBubble
          message='네, 주문 내역을 확인해드리겠습니다. 주문 번호를 알려주시겠어요?'
          isUser={false}
        />
        <ChatBubble
          message='안녕하세요! 어떤 도움이 필요하신가요?'
          isUser={false}
        />
        <ChatBubble message='주문 내역을 확인하고 싶어요' isUser={true} />
        <ChatBubble
          message='네, 주문 내역을 확인해드리겠습니다. 주문 번호를 알려주시겠어요?'
          isUser={false}
        />
      </div>
      {/* <footer className='h-32 bg-gray-200 p-4 border-t border-gray-300 flex items-center justify-center'>
        <KeywordDetector />
      </footer> */}
    </div>
  );
};

export default ChatHistoryPlaceholder;
