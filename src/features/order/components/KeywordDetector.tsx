import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePorcupine } from '@picovoice/porcupine-react';
import { useChatStore } from '@/features/chat/store/chatStore';
import VoiceRecorder from './VoiceRecorder';
import { useGpt } from '../hooks/useGpt';
import { useLanguageStore } from '@/store/languageStore';
import { useVoiceStore } from '../store/voiceStore';

const BASE_PATH = import.meta.env.BASE_URL; // Vite가 build 모드에서 경로 세팅
const API_URL = `${import.meta.env.VITE_GPT_API_URL}/stt`;
const apiUrl = import.meta.env.VITE_GPT_API_URL;

const PORCUPINE_MODEL_PATH = `${BASE_PATH}pp/porcupine_params_ko.pv`;
const PORCUPINE_KEYWORD_PATH = `${BASE_PATH}pp/mallanga_ko_wasm_v3_0_0.ppn`;
const PORCUPINE_ACCESS_KEY = import.meta.env.VITE_PORCUPINE_ACCESS_KEY;

const porcupineKeyword = {
  publicPath: `${PORCUPINE_KEYWORD_PATH}`,
  label: '말랑아',
};

const porcupineModel = {
  publicPath: `${PORCUPINE_MODEL_PATH}`,
};

const KeywordDetector = () => {
  const { keywordDetection, isListening, error, init, start, isLoaded } =
    usePorcupine();
  const [showDetection, setShowDetection] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { adminId, kioskId } = useParams();
  const { addMessage } = useChatStore();
  const { sendTextToApi } = useGpt({ apiUrl });
  const { language } = useLanguageStore();
  const { isCovered, setIsCovered } = useVoiceStore();

  // Initialize Porcupine and start listening
  useEffect(() => {
    // init이 완료될 때까지 기다림
    init(`${PORCUPINE_ACCESS_KEY}`, porcupineKeyword, porcupineModel);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    start();
  }, [isLoaded]);

  // Handle keyword detection
  useEffect(() => {
    if (!isListening) {
      console.log('Not initialized yet, skipping keyword detection');
      return;
    }

    console.log(
      'Keyword detection effect - keywordDetection:',
      keywordDetection
    );

    if (keywordDetection !== null) {
      console.log('Keyword detected:', keywordDetection);
      setShowDetection(true);
      setIsRecording(true);

      // Stop recording after 5 seconds
      const recordingTimer = setTimeout(() => {
        console.log('Recording timer completed - stopping recording');
        setIsRecording(false);
      }, 6000);

      // Reset detection state after 1 second
      const detectionTimer = setTimeout(() => {
        console.log('Detection timer completed - resetting detection state');
        setShowDetection(false);
      }, 1000);

      return () => {
        console.log('Cleaning up timers');
        clearTimeout(recordingTimer);
        clearTimeout(detectionTimer);
      };
    }
  }, [keywordDetection, isListening]);

  const convertTo16kHzWav = async (audioBlob: Blob): Promise<Blob> => {
    const audioContext = new AudioContext({ sampleRate: 16000 });
    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Create offline context for resampling
      const offlineContext = new OfflineAudioContext(
        1,
        audioBuffer.duration * 16000,
        16000
      );
      const source = offlineContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineContext.destination);
      source.start();

      const renderedBuffer = await offlineContext.startRendering();

      // Convert to WAV
      const wavBlob = await new Promise<Blob>((resolve) => {
        const wav = offlineContext.createBuffer(
          1,
          renderedBuffer.length,
          16000
        );
        wav.getChannelData(0).set(renderedBuffer.getChannelData(0));

        const wavBuffer = new ArrayBuffer(44 + renderedBuffer.length * 2);
        const view = new DataView(wavBuffer);

        // WAV header
        const writeString = (offset: number, string: string) => {
          for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
          }
        };

        writeString(0, 'RIFF');
        view.setUint32(4, 36 + renderedBuffer.length * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, 16000, true);
        view.setUint32(28, 16000 * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, renderedBuffer.length * 2, true);

        // Write audio data
        const channelData = renderedBuffer.getChannelData(0);
        for (let i = 0; i < channelData.length; i++) {
          const sample = Math.max(-1, Math.min(1, channelData[i]));
          view.setInt16(44 + i * 2, sample * 0x7fff, true);
        }

        resolve(new Blob([wavBuffer], { type: 'audio/wav' }));
      });

      return wavBlob;
    } finally {
      await audioContext.close();
    }
  };

  const handleRecordingComplete = async (audioBlob: Blob) => {
    try {
      console.log('Converting audio to 16kHz WAV...');
      const wavBlob = await convertTo16kHzWav(audioBlob);

      const formData = new FormData();
      formData.append('voice', wavBlob, 'voice.wav');
      formData.append('kiosk_id', kioskId);
      formData.append('admin_id', adminId);

      console.log('Sending audio to server...');
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Server response:', result);
      addMessage({
        text: result.text,
        isUser: true,
        timestamp: Date.now(),
      });
      sendTextToApi(result.text, adminId, kioskId);
    } catch (error) {
      console.error('Error processing audio:', error);
    }
  };

  return (
    <>
      {isCovered && (
        <div
          className='
            absolute top-0 left-0 w-screen h-screen p-6
            flex flex-col items-center justify-center
            cursor-pointer
            bg-white/80
            border-4 border-indigo-500
            rounded-none
            shadow-xl
            backdrop-blur-md
          '
          onClick={() => {
            setIsCovered(false);
          }}
        >
          <div className='absolute top-6 left-6 text-2xl font-bold text-indigo-600 select-none drop-shadow-md'>
            Mallang Order
          </div>

          {/* ✅ 한/영 전환 버튼 */}
          <div className='absolute top-6 right-6'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCovered(true);
                useLanguageStore.setState((state) => ({
                  language: state.language === 'en' ? 'ko' : 'en',
                }));
              }}
              className='px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition'
            >
              {language === 'en' ? '한글' : 'ENG'}
            </button>
          </div>

          <div
            className='w-[300px] h-[300px] rounded-full bg-gradient-to-br from-indigo-200 to-indigo-400
              text-indigo-900 font-extrabold text-7xl tracking-tight flex items-center justify-center
              shadow-[0_10px_30px_rgba(99,102,241,0.4)] border border-indigo-300 relative overflow-hidden'
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #5c6ac4 0%, #3b43a9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.15))',
              }}
            >
              ML
            </span>
          </div>

          <p className='text-[2.5rem] sm:text-4xl md:text-5xl font-bold text-indigo-600 text-center animate-pulse select-none leading-tight whitespace-pre-line'>
            {language === 'en'
              ? 'Touch the screen\nto start your order'
              : '화면을 터치해\n주문을 시작하세요'}
          </p>
        </div>
      )}

      <div className='bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg'>
        <VoiceRecorder
          isListening={isListening}
          isRecording={isRecording}
          language={language}
          onRecordingComplete={handleRecordingComplete}
        />
      </div>
    </>
  );
};

export default KeywordDetector;
