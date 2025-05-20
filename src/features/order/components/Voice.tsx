import { useEffect, useState, useRef } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useChatStore } from '@/features/chat/store/chatStore';
import { useVoiceStore } from '../store/voiceStore';
import LanguageSelector from '@/components/LanguageSelector';
import { useGpt } from '../hooks/useGpt';
import { useLanguageStore } from '@/store/languageStore';

const apiUrl = import.meta.env.VITE_GPT_API_URL;

const Voice = () => {
  const { listening, transcript, resetTranscript } = useSpeechRecognition();
  const { isCovered, setIsCovered } = useVoiceStore();
  const [detectedCount, setDetectedCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedText, setCapturedText] = useState('');
  const lastTextTimeRef = useRef<number>(0);
  const keywordIndexRef = useRef<number>(-1);
  const detectedKeywordRef = useRef<string | null>(null);

  const { language } = useLanguageStore();
  const langCode = language === 'en' ? 'en-US' : 'ko-KR';

  // 여러 키워드 배열
  const KEYWORDS = language === 'en'
    ? ['malang', 'hello', 'start']  // 영어 키워드 예시//////////////////////////////////////////추가 가능
    : ['말랑아', '빨랑아', '빨랑 와'];     // 한국어 키워드 예시

  const addMessage = useChatStore((state) => state.addMessage);
  const updateLastMessage = useChatStore((state) => state.updateLastMessage);
  const setIsCapturing = useChatStore((state) => state.setIsCapturing);
  const isCapturing = useChatStore((state) => state.isCapturing);
  const { sendTextToApi } = useGpt({ apiUrl });

  // 🧠 실시간 텍스트 감지
  useEffect(() => {
    if (transcript) {
      lastTextTimeRef.current = Date.now();

      if (isCapturing && keywordIndexRef.current !== -1 && detectedKeywordRef.current) {
        const textAfterKeyword = transcript
          .slice(keywordIndexRef.current + detectedKeywordRef.current.length)
          .trim();
        setCapturedText(textAfterKeyword);
        updateLastMessage(textAfterKeyword);
      }
    }
  }, [transcript, isCapturing, updateLastMessage]);

  // 🔁 일정 시간 텍스트 없으면 인식 종료 및 처리
  useEffect(() => {
    if (!isCapturing) return;

    const checkInterval = setInterval(() => {
      const now = Date.now();
      if (now - lastTextTimeRef.current > 2000) {
        setIsCapturing(false);
        setIsProcessing(false);

        if (capturedText) {
          sendTextToApi(capturedText).catch((err) => {
            console.error('Error processing voice input:', err);
          });
        }

        resetTranscript();
        keywordIndexRef.current = -1;
        detectedKeywordRef.current = null;
        setCapturedText('');
      }
    }, 100);

    return () => clearInterval(checkInterval);
  }, [isCapturing, capturedText, sendTextToApi]);

  // 🎯 키워드 감지 (여러 키워드 중 첫 발견된 키워드 선택)
  useEffect(() => {
    if (!transcript || isProcessing) return;

    let foundKeyword: string | null = null;
    let foundIndex = -1;

    for (const keyword of KEYWORDS) {
      const idx = transcript.indexOf(keyword);
      if (idx !== -1) {
        foundKeyword = keyword;
        foundIndex = idx;
        break; // 첫 발견 키워드만 처리
      }
    }

    if (foundKeyword && keywordIndexRef.current === -1) {
      setIsProcessing(true);
      setDetectedCount((prev) => prev + 1);
      setIsCapturing(true);
      setCapturedText('');
      lastTextTimeRef.current = Date.now();
      keywordIndexRef.current = foundIndex;
      detectedKeywordRef.current = foundKeyword;

      addMessage({
        text: '',
        isUser: true,
        timestamp: Date.now(),
      });
    }
  }, [transcript, isProcessing, KEYWORDS]);

  // ✅ 언어 변경 또는 덮개 해제 시 마이크 재시작 강제 보장 + 디버깅 로그
  useEffect(() => {
    const tryStartListening = async () => {
      console.log('🎤 Restarting listening...');
      await SpeechRecognition.stopListening();
      setTimeout(() => {
        SpeechRecognition.startListening({
          continuous: true,
          language: langCode,
        });
        setTimeout(() => {
          console.log('🎧 listening (delayed):', listening);
          console.log('🗣️ transcript (delayed):', transcript);
        }, 1000);
      }, 300);
    };

    if (!isCovered && !listening) {
      tryStartListening();
    }
  }, [language, isCovered, listening, langCode, transcript]);

  // 🔇 언마운트 시 마이크 정지
  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  // 🎧 listening 상태, transcript 실시간 로그 (디버깅용)
  useEffect(() => {
    console.log('🎧 listening 상태:', listening);
    console.log('🗣️ transcript:', transcript);
  }, [listening, transcript]);

  useEffect(() => {
    const restartListening = async () => {
      try {
        console.log('▶️ Restarting listening due to language/isCovered change...');
        await SpeechRecognition.stopListening();
        // 0.3초 기다렸다가 시작 (마이크가 완전히 멈추도록)
        await new Promise((resolve) => setTimeout(resolve, 300));
        await SpeechRecognition.startListening({
          continuous: true,
          language: langCode,
        });
        console.log('▶️ Started listening with language:', langCode);
      } catch (error) {
        console.error('Error restarting listening:', error);
      }
    };

    if (!isCovered) {
      restartListening();
    }
  }, [language, isCovered, langCode]);

  return (
    <div className='p-6 h-fit rounded-xl shadow-lg bg-white text-center'>
      {isCovered && (
        <div
          className="
            absolute top-0 left-0 w-screen h-screen p-6
            flex flex-col items-center justify-center
            cursor-pointer
            bg-white/80
            border-4 border-indigo-500
            rounded-none
            shadow-xl
            backdrop-blur-md
          "
          onClick={() => {
            setIsCovered(false);
            setTimeout(() => {
              SpeechRecognition.startListening({
                continuous: true,
                language: langCode,
              });
            }, 200);
          }}
        >
          <div className="absolute top-6 left-6 text-2xl font-bold text-indigo-600 select-none drop-shadow-md">
            Mallang Order
          </div>

          {/* ✅ 한/영 전환 버튼 */}
          <div className="absolute top-6 right-6">
            <button
              onClick={(e) => {
                e.stopPropagation(); // 💥 prevent parent div click
                useLanguageStore.setState((state) => ({
                  language: state.language === 'en' ? 'ko' : 'en',
                }));
              }}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
            >
              {language === 'en' ? '한글' : 'ENG'}
            </button>
          </div>

          <img
            src="/logoT.png"
            alt="말랑 로고"
            width={300}
            height={300}
            className="mb-10 rounded-lg shadow-lg"
          />

          <p className="text-[2.5rem] sm:text-4xl md:text-5xl font-bold text-indigo-600 text-center animate-pulse select-none leading-tight whitespace-pre-line">
            {language === 'en'
              ? 'Touch the screen\nto start your order'
              : '화면을 터치해\n주문을 시작하세요'}
          </p>
        </div>
      )}



      <div className="flex flex-col items-center">
              <p className="text-sm text-indigo-600">
                {listening
                  ? language === 'en'
                    ? <>Listening for<br />the keyword…</>
                    : <>키워드 말랑아<br />감지중…</>
                  : language === 'en'
                  ? 'Waiting…'
                  : '대기 중…'}
              </p>
            </div>

            {isCapturing && (
              <div className="bg-indigo-100 rounded-lg border border-indigo-300 p-2 mt-2 shadow-sm">
                <p className="text-sm text-indigo-900 mb-1">
                  {language === 'en' ? 'Recognizing speech…' : '음성 인식 중…'}
                </p>
              </div>
            )}

    </div>
  );
};

export default Voice;
