import { useEffect, useState } from 'react';
import { usePorcupine } from '@picovoice/porcupine-react';
import VoiceRecorder from './VoiceRecorder';

const BASE_PATH = import.meta.env.BASE_URL; // Vite가 build 모드에서 경로 세팅

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
      }, 5000);

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

  // isListening 상태 변경을 감지하는 별도의 useEffect 추가
  useEffect(() => {
    console.log('isListening state changed:', isListening);
  }, [isListening]);
  useEffect(() => {
    console.log('isLoaded state changed:', isLoaded);
  }, [isLoaded]);

  const handleRecordingComplete = (audioBlob: Blob) => {
    console.log('Recording completed, audio blob size:', audioBlob.size);
    // TODO: Send the audio blob to the AI server
    console.log('Audio recording complete:', audioBlob);
    // Here you would typically send the blob to your AI server
    // For example:
    // const formData = new FormData();
    // formData.append('audio', audioBlob, 'recording.wav');
    // await fetch('YOUR_AI_SERVER_ENDPOINT', {
    //   method: 'POST',
    //   body: formData,
    // });
  };

  return (
    <>
      <div className='bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg'>
        <div className='flex items-center space-x-2'>
          <div
            className={`w-3 h-3 rounded-full ${
              isListening ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className='text-sm font-medium'>
            {isListening ? 'Listening...' : 'Not listening'}
          </span>
        </div>
        {showDetection && (
          <div className='mt-2 p-2 bg-blue-100 text-blue-800 rounded text-sm'>
            Keyword detected!
          </div>
        )}
        {error && (
          <div className='mt-2 p-2 bg-red-100 text-red-800 rounded text-sm'>
            {error.message}
          </div>
        )}
      </div>
      <VoiceRecorder
        isRecording={isRecording}
        onRecordingComplete={handleRecordingComplete}
      />
    </>
  );
};

export default KeywordDetector;
