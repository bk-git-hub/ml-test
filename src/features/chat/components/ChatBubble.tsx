interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  isUpdating?: boolean;
}

export default function ChatBubble({
  message,
  isUser,
  isUpdating = false,
}: ChatBubbleProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isUser
            ? isUpdating
              ? 'bg-ml-yellow-light text-black rounded-br-none shadow-md'
              : 'bg-ml-yellow text-black rounded-br-none shadow-md'
            : 'bg-white text-black rounded-bl-none shadow-md'
        }`}
      >
        {message}
      </div>
    </div>
  );
}
