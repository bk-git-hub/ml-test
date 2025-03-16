import React from 'react';

type SpeechBubbleProps = {
  children: React.ReactNode;
  position?: 'left' | 'right';
};

export default function SpeechBubble({
  children,
  position = 'left',
}: SpeechBubbleProps) {
  return (
    <div
      className={`flex ${
        position === 'left' ? 'justify-start' : 'justify-end'
      } p-4`}
    >
      <div
        className={`relative bg-white text-black p-3 rounded-lg max-w-xs 
        ${position === 'left' ? 'rounded-bl-none' : 'rounded-br-none'}`}
      >
        {children}
        <div
          className={`absolute w-0 h-0 border-t-[10px] border-t-transparent 
          border-b-[10px] border-b-transparent 
          ${
            position === 'left'
              ? 'border-r-[10px] border-r-white -left-2 top-1/2 transform -translate-y-1/2'
              : 'border-l-[10px] border-l-white -right-2 top-1/2 transform -translate-y-1/2'
          }`}
        ></div>
      </div>
    </div>
  );
}
