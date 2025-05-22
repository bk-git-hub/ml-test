import { useEffect, useState } from 'react';

interface TypingTextProps {
  text: string;
  speed: number;
}

const TypingText = ({ text, speed }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  // text가 바뀌었을 때 초기화
  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [text]);

  return <span className='text-sm'>{displayedText}</span>;
};

export default TypingText;
