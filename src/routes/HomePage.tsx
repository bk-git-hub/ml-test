import SpeechBubble from '../components/SpeechBubble';

export default function HomePage() {
  return (
    <main className='bg-blue-100 w-screen h-screen flex flex-col p-10'>
      <h1 className='text-center text-6xl p-4'>음성으로 주문해보세요!</h1>
      <SpeechBubble>인기 메뉴 보여줘</SpeechBubble>
      <SpeechBubble position='right'>삼겹살 1인분 추가해줘</SpeechBubble>
      <a
        className='border-white bg-blue-400 text-white border-4 rounded-4xl text-8xl p-10 flex justify-center items-center grow'
        href='/order'
      >
        {' '}
        주문 시작하기
      </a>
    </main>
  );
}
