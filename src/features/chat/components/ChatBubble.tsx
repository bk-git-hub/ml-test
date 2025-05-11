interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

export default function ChatBubble({ message, isUser }: ChatBubbleProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-ml-yellow-light text-black rounded-br-none'
            : 'bg-ml-yellow text-black rounded-bl-none'
        }`}
      >
        {message}
      </div>
    </div>
  );
}
