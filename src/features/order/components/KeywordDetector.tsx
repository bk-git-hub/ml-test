import { useEffect, useState } from 'react';
import { usePorcupine } from '@picovoice/porcupine-react';
import VoiceRecorder from './VoiceRecorder'; // Make sure this path is correct

const PORCUPINE_MODEL_PATH = '/pp/porcupine_params_ko.pv';
const PORCUPINE_KEYWORD_PATH = '/pp/말랑아_ko_wasm_v3_0_0.ppn';
const PORCUPINE_ACCESS_KEY = import.meta.env.VITE_PORCUPINE_ACCESS_KEY;

const KeywordDetector = () => {
  const {
    isLoaded,
    keywordDetection,
    isListening,
    error,

    init,
    start,
    stop,
  } = usePorcupine();
  const [showDetection, setShowDetection] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const initPorcupine = async () => {
      try {
        await init(
          PORCUPINE_ACCESS_KEY,
          [
            {
              publicPath: PORCUPINE_KEYWORD_PATH,
              label: '말랑아',
            },
          ],
          { publicPath: PORCUPINE_MODEL_PATH }
        );
      } catch (error) {
        console.error('Failed to initialize Porcupine:', error);
      }
    };

    initPorcupine();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      start();
    }
    return () => {
      if (isLoaded) {
        stop();
      }
    };
  }, [isLoaded, start, stop]);

  // Initialize Porcupine

  // Handle keyword detection
  useEffect(() => {
    if (keywordDetection !== null) {
      setShowDetection(true);
      setIsRecording(true);

      const resetDetection = () => setShowDetection(false);
      const stopRecording = () => setIsRecording(false);

      const detectionTimer = setTimeout(resetDetection, 1000);
      const recordingTimer = setTimeout(stopRecording, 5000);

      return () => {
        clearTimeout(detectionTimer);
        clearTimeout(recordingTimer);
      };
    }
  }, [keywordDetection]);

  const handleRecordingComplete = (audioBlob: Blob) => {
    console.log('Recording ready for upload:', audioBlob);
    // Example: Upload to server
    // const formData = new FormData();
    // formData.append('audio', audioBlob, 'recording.wav');
    // fetch('YOUR_API_ENDPOINT', { method: 'POST', body: formData });
  };

  return (
    <>
      {/* Status UI */}
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

      {/* Voice Recorder (conditionally rendered when needed) */}
      {isRecording && (
        <VoiceRecorder
          isRecording={isRecording}
          onRecordingComplete={handleRecordingComplete}
        />
      )}
    </>
  );
};

export default KeywordDetector;
