import { useEffect, useState, useRef } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useChatStore } from '@/features/chat/store/chatStore';
import { LanguageSelector } from '@/features/entry';

const Voice = () => {
  const { listening, transcript, resetTranscript } = useSpeechRecognition();
  const [isCovered, setIsCovered] = useState(true);
  const [detectedCount, setDetectedCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedText, setCapturedText] = useState('');
  const lastTextTimeRef = useRef<number>(0);
  const keywordIndexRef = useRef<number>(-1);
  const KEYWORD = '말랑아';
  const addMessage = useChatStore((state) => state.addMessage);
  const updateLastMessage = useChatStore((state) => state.updateLastMessage);
  const setIsCapturing = useChatStore((state) => state.setIsCapturing);
  const isCapturing = useChatStore((state) => state.isCapturing);

  // 사용자 인터랙션 이후 시작

  // 실시간 텍스트 처리
  useEffect(() => {
    if (transcript) {
      lastTextTimeRef.current = Date.now();

      if (isCapturing && keywordIndexRef.current !== -1) {
        const textAfterKeyword = transcript
          .slice(keywordIndexRef.current + KEYWORD.length)
          .trim();
        setCapturedText(textAfterKeyword);
        updateLastMessage(textAfterKeyword);
      }
    }
  }, [transcript, isCapturing, updateLastMessage]);

  // 일정 시간 텍스트가 없으면 캡처 종료
  useEffect(() => {
    if (!isCapturing) return;

    const checkInterval = setInterval(() => {
      const now = Date.now();
      if (now - lastTextTimeRef.current > 2000) {
        setIsCapturing(false);
        setIsProcessing(false);
        resetTranscript();
        keywordIndexRef.current = -1;
      }
    }, 100);

    return () => clearInterval(checkInterval);
  }, [isCapturing]);

  // 키워드 감지
  useEffect(() => {
    if (!transcript || isProcessing) return;

    const keywordIndex = transcript.indexOf(KEYWORD);
    if (keywordIndex !== -1 && keywordIndexRef.current === -1) {
      setIsProcessing(true);
      setDetectedCount((prev) => prev + 1);
      setIsCapturing(true);
      setCapturedText('');
      lastTextTimeRef.current = Date.now();
      keywordIndexRef.current = keywordIndex;

      addMessage({
        text: '',
        isUser: true,
        timestamp: Date.now(),
      });
    }
  }, [transcript, isProcessing, addMessage]);

  // 컴포넌트 언마운트 시 마이크 종료
  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  return (
    <div className='p-6 h-40 rounded-xl shadow-lg bg-white text-center'>
      {isCovered && (
        <button
          className='absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-screen p-4 cursor-pointer bg-[#FFFDF6]'
          onClick={() => {
            setIsCovered(false);
            return SpeechRecognition.startListening({
              continuous: true,
              language: 'ko-KR',
            });
          }}
        >
          <div className='absolute top-4 right-4'>
            <LanguageSelector />
          </div>
          <div className='text-[#5C504D] flex flex-col items-center justify-center text-center'>
            <img src='/logoT.png' width={300} height={300} />
            <p className='text-5xl mb-8 animate-pulse'>
              "화면을 터치하여 주문을 시작하세요."
            </p>
          </div>
        </button>
      )}

      <div className='flex flex-col items-center h-5'>
        <p className='text-sm text-gray-600'>
          {listening ? '듣는 중...' : '대기 중'}
        </p>
      </div>

      {isCapturing && (
        <div className=' bg-blue-50 rounded-lg border bg-ml-yellow-light border border-ml-yellow'>
          <p className='text-sm text-black mb-1'>음성 인식 중...</p>
        </div>
      )}
    </div>
  );
};

export default Voice;
