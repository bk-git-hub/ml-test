import SpeechBubble from './SpeechBubble';

export default function ChatDisplay() {
  return (
    <div className='w-full h-[30%] bg-green-200'>
      <SpeechBubble position='right'>고기 종류를 보여줘줘</SpeechBubble>
      <SpeechBubble> 고기류 메뉴를 보여드리겠습니다</SpeechBubble>
    </div>
  );
}
