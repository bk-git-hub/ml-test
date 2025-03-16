import SpeechBubble from './SpeechBubble';

export default function ChatDisplay() {
  return (
    <div className='w-full h-[30%] bg-green-200'>
      <SpeechBubble position='right'>예시 질문</SpeechBubble>
      <SpeechBubble> 예시 답변</SpeechBubble>
    </div>
  );
}
