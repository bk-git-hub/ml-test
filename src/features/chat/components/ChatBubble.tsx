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
              ? 'bg-[#F4C7AB] text-[#3D2B27] rounded-br-none shadow-md'
              : 'bg-[#F4C7AB] text-[#3D2B27] rounded-br-none shadow-md'
            : 'bg-[#FFE8D6] text-[#5A3E36] rounded-bl-none shadow-md'
        }`}
      >
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}
