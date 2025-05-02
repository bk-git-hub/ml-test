// Example: src/features/chat/components/ChatHistoryPlaceholder.tsx (Create this file)
import KeywordDetector from '../../order/components/KeywordDetector';
const ChatHistoryPlaceholder = () => {
  return (
    <footer className='h-32 bg-gray-200 p-4 border-t border-gray-300 flex items-center justify-center'>
      <KeywordDetector />
    </footer>
  );
};

export default ChatHistoryPlaceholder;
