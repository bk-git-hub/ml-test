import { useEffect, useState, useRef } from 'react';
import useSpeechToText from '../hooks/useSpeechToText';
import { useChatStore } from '@/features/chat/store/chatStore';

const Voice = () => {
  const {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText();

  const [detectedCount, setDetectedCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedText, setCapturedText] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const lastTextTimeRef = useRef<number>(0);
  const keywordIndexRef = useRef<number>(-1);
  const KEYWORD = '가나다';
  const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    startListening();
    return () => stopListening();
  }, []);

  // 텍스트가 변경될 때마다 마지막 감지 시간 업데이트
  useEffect(() => {
    if (transcript) {
      lastTextTimeRef.current = Date.now();

      // 캡처 중일 때만 키워드 이후의 텍스트 저장
      if (isCapturing && keywordIndexRef.current !== -1) {
        const textAfterKeyword = transcript
          .slice(keywordIndexRef.current + KEYWORD.length)
          .trim();
        setCapturedText(textAfterKeyword);
      }
    }
  }, [transcript, isCapturing]);

  // 1초 동안 새로운 텍스트가 없으면 캡처 종료
  useEffect(() => {
    if (!isCapturing) return;

    const checkInterval = setInterval(() => {
      const now = Date.now();
      if (now - lastTextTimeRef.current > 1000) {
        // 캡처된 텍스트가 있으면 chat store에 추가
        if (capturedText) {
          addMessage({
            text: capturedText,
            isUser: true,
            timestamp: Date.now(),
          });
        }

        setIsCapturing(false);
        setIsProcessing(false);
        resetTranscript();
        keywordIndexRef.current = -1;
      }
    }, 100);

    return () => clearInterval(checkInterval);
  }, [isCapturing, capturedText, addMessage]);

  useEffect(() => {
    if (!transcript || isProcessing) return;

    // 전체 텍스트에서 키워드 검색
    const keywordIndex = transcript.indexOf(KEYWORD);
    if (keywordIndex !== -1 && keywordIndexRef.current === -1) {
      setIsProcessing(true);
      setDetectedCount((prev) => prev + 1);
      setIsCapturing(true);
      setCapturedText('');
      lastTextTimeRef.current = Date.now();
      keywordIndexRef.current = keywordIndex;
    }
  }, [transcript, isProcessing]);

  return (
    <div className='p-6 rounded-xl shadow-lg bg-white text-center space-y-4'>
      <h2 className='text-xl font-bold'>키워드 감지기 🎤</h2>

      <div className='flex flex-col items-center space-y-2'>
        <div
          className={`size-20 rounded-full bg-white transition-all duration-300 ${
            listening ? 'animate-pulse bg-blue-100' : 'bg-gray-100'
          }`}
        />
        <p className='text-sm text-gray-600'>
          {listening ? '듣는 중...' : '대기 중'}
        </p>
      </div>

      <p className='text-gray-700'>"가나다"라고 말해보세요</p>

      <div className='mt-4'>
        <p className='text-sm text-gray-600'>감지된 키워드</p>
        <p className='text-2xl font-bold text-blue-600'>{detectedCount}</p>
      </div>

      {isCapturing && (
        <div className='mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200'>
          <p className='text-sm text-blue-600 mb-1'>음성 인식 중...</p>
          <p className='text-sm font-mono'>{capturedText || '...'}</p>
        </div>
      )}

      <div className='mt-4 p-3 bg-gray-50 rounded-lg'>
        <p className='text-sm text-gray-600 mb-1'>현재 인식된 텍스트:</p>
        <p className='text-sm font-mono'>{transcript || '...'}</p>
      </div>
    </div>
  );
};

export default Voice;
