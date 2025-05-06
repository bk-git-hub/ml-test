import { useEffect, useState } from 'react';
import { usePorcupine } from '@picovoice/porcupine-react';
import VoiceRecorder from './VoiceRecorder';

const PORCUPINE_MODEL_PATH = `${
  import.meta.env.BASE_URL
}pp/porcupine_params_ko.pv`;
const PORCUPINE_KEYWORD_PATH = `${
  import.meta.env.BASE_URL
}pp/mallanga_ko_wasm_v3_0_0.ppn`;
const PORCUPINE_ACCESS_KEY = import.meta.env.VITE_PORCUPINE_ACCESS_KEY;

const porcupineKeyword = {
  publicPath: PORCUPINE_KEYWORD_PATH,
  label: '말랑아',
};

const porcupineModel = {
  publicPath: PORCUPINE_MODEL_PATH,
};

const KeywordDetector = () => {
  const { keywordDetection, isListening, error, init, release, start, stop } =
    usePorcupine();
  const [showDetection, setShowDetection] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Porcupine and start listening
  useEffect(() => {
    console.log('Initializing Porcupine...');
    let isComponentMounted = true;

    const initializeAndStart = async () => {
      try {
        console.log('Starting Porcupine initialization with:', {
          accessKey: PORCUPINE_ACCESS_KEY,
          keyword: porcupineKeyword,
          model: porcupineModel,
        });

        await init(PORCUPINE_ACCESS_KEY, [porcupineKeyword], porcupineModel);

        if (!isComponentMounted) return;
        console.log('Porcupine initialized successfully');

        await start();

        // Wait for isListening to be true (max 1s)
        let retries = 0;
        while (!isListening && retries < 10) {
          await new Promise((res) => setTimeout(res, 100));
          retries++;
        }

        if (!isComponentMounted) return;
        if (isListening) {
          console.log('Porcupine is now listening');
          setIsInitialized(true);
        } else {
          console.warn('Porcupine did not start listening in time');
        }
      } catch (err) {
        console.error('Error in Porcupine initialization/start:', err);
        if (isComponentMounted) {
          setIsInitialized(false);
        }
      }
    };

    initializeAndStart();

    return () => {
      console.log('Component unmounting - cleaning up Porcupine');
      isComponentMounted = false;

      const cleanup = async () => {
        try {
          console.log('Stopping Porcupine...');
          await stop();
          console.log('Porcupine stopped');
        } catch (err) {
          console.error('Error stopping Porcupine:', err);
        } finally {
          console.log('Releasing Porcupine resources...');
          release();
          console.log('Porcupine resources released');
          if (isComponentMounted) {
            setIsInitialized(false);
          }
        }
      };
      cleanup();
    };
  }, [init, release, start, stop]);

  // Handle keyword detection
  useEffect(() => {
    if (keywordDetection !== null) {
      console.log('Keyword detected:', keywordDetection);
      setShowDetection(true);
      setIsRecording(true);

      const recordingTimer = setTimeout(() => {
        console.log('Recording timer completed - stopping recording');
        setIsRecording(false);
      }, 5000);

      const detectionTimer = setTimeout(() => {
        console.log('Detection timer completed - resetting detection state');
        setShowDetection(false);
      }, 1000);

      return () => {
        clearTimeout(recordingTimer);
        clearTimeout(detectionTimer);
      };
    }
  }, [keywordDetection, isInitialized, isListening]);

  useEffect(() => {
    console.log('isListening state changed:', isListening);
  }, [isListening]);

  const handleRecordingComplete = (audioBlob: Blob) => {
    console.log('Recording completed, audio blob size:', audioBlob.size);
    // TODO: Send the audio blob to the AI server
    console.log('Audio recording complete:', audioBlob);
    // Example POST request
    // const formData = new FormData();
    // formData.append('audio', audioBlob, 'recording.wav');
    // await fetch('/your-server-endpoint', { method: 'POST', body: formData });
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
