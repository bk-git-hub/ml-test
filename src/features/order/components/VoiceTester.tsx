import { useState } from 'react';
import VoiceRecorder from './VoiceRecorder';
import { useVoiceRecording } from '../hooks/useVoiceRecording';
import { useVoiceApi } from '../hooks/useVoiceApi';
import TextInput from './TextInput';
const VoiceTester = () => {
  const [apiUrl, setApiUrl] = useState('');
  const { isRecording, startRecording, stopRecording, convertTo16kHzWav } =
    useVoiceRecording();
  const { isProcessing, error, sendVoiceToApi } = useVoiceApi({ apiUrl });

  const handleRecordingComplete = async (audioBlob: Blob) => {
    try {
      const wavBlob = await convertTo16kHzWav(audioBlob);
      await sendVoiceToApi(wavBlob);
    } catch (err) {
      // Error is already handled in useVoiceApi
      console.error('Recording completion error:', err);
    }
  };

  return (
    <div className='p-4 bg-white rounded-lg shadow-lg shrink-0'>
      <div className='flex flex-col items-center space-y-4'>
        <div className='w-full max-w-md'>
          <label
            htmlFor='apiUrl'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            API URL
          </label>
          <input
            type='text'
            id='apiUrl'
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder='https://your-ngrok-url.com/stt'
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ml-yellow focus:border-ml-yellow'
          />
        </div>

        <div className='flex items-center space-x-2'>
          <div
            className={`w-3 h-3 rounded-full ${
              isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300'
            }`}
          />
          <span className='text-sm font-medium'>
            {isRecording ? '녹음 중...' : '대기 중'}
          </span>
        </div>

        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing || !apiUrl}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-ml-yellow hover:bg-ml-yellow-light text-white'
          } ${isProcessing || !apiUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isRecording ? '녹음 중지' : '녹음 시작'}
        </button>

        {error && (
          <div className='mt-2 p-2 bg-red-100 text-red-800 rounded text-sm'>
            {error}
          </div>
        )}

        {isProcessing && (
          <div className='mt-2 p-2 bg-blue-100 text-blue-800 rounded text-sm'>
            처리 중...
          </div>
        )}
      </div>
      <TextInput apiUrl={apiUrl} />

      <VoiceRecorder
        isRecording={isRecording}
        onRecordingComplete={handleRecordingComplete}
      />
    </div>
  );
};

export default VoiceTester;
