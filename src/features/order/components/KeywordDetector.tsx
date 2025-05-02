import { useEffect, useState } from 'react';
import { usePorcupine } from '@picovoice/porcupine-react';
import VoiceRecorder from './VoiceRecorder';

const PORCUPINE_MODEL_PATH = '/pp/porcupine_params_ko.pv';
const PORCUPINE_KEYWORD_PATH = '/pp/말랑아_ko_wasm_v3_0_0.ppn';
const PORCUPINE_ACCESS_KEY = import.meta.env.VITE_PORCUPINE_ACCESS_KEY;

const porcupineKeyword = {
  publicPath: `${PORCUPINE_KEYWORD_PATH}`,
  label: '말랑아',
};

const porcupineModel = {
  publicPath: `${PORCUPINE_MODEL_PATH}`,
};

const KeywordDetector = () => {
  const { keywordDetection, isListening, error, init, release, start, stop } =
    usePorcupine();
  const [showDetection, setShowDetection] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Handle keyword detection
  useEffect(() => {
    if (keywordDetection !== null) {
      setShowDetection(true);
      setIsRecording(true);

      // Stop recording after 5 seconds
      const recordingTimer = setTimeout(() => {
        setIsRecording(false);
      }, 5000);

      // Reset detection state after 1 second
      const detectionTimer = setTimeout(() => {
        setShowDetection(false);
      }, 1000);

      return () => {
        clearTimeout(recordingTimer);
        clearTimeout(detectionTimer);
      };
    }
  }, [keywordDetection]);

  // Initialize Porcupine and start listening
  useEffect(() => {
    const initializeAndStart = async () => {
      try {
        await init(
          `${PORCUPINE_ACCESS_KEY}`,
          [porcupineKeyword],
          porcupineModel
        );
        await start();
      } catch (err) {
        console.error('Error initializing Porcupine:', err);
      }
    };

    initializeAndStart();

    // Cleanup on component unmount
    return () => {
      const cleanup = async () => {
        try {
          await stop();
        } catch (err) {
          console.error('Error stopping Porcupine:', err);
        } finally {
          release();
        }
      };
      cleanup();
    };
  }, [init, release, start, stop]);

  const handleRecordingComplete = (audioBlob: Blob) => {
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
