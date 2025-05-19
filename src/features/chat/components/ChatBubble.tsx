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
              ? 'bg-indigo-300 text-indigo-900 rounded-br-none shadow-md'
              : 'bg-indigo-200 text-indigo-900 rounded-br-none shadow-md'
            : 'bg-indigo-100 text-indigo-700 rounded-bl-none shadow-md'
        }`}
      >
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}
