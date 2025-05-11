import { useState, useRef } from 'react';
import VoiceRecorder from './VoiceRecorder';

const VoiceTester = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState('');
  const recordingTimeoutRef = useRef<number | null>(null);

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
    if (!apiUrl) {
      setError('API URL을 입력해주세요');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      console.log('Converting audio to 16kHz WAV...');
      const wavBlob = await convertTo16kHzWav(audioBlob);

      const formData = new FormData();
      formData.append('voice', wavBlob, 'voice.wav');
      formData.append('kiosk_id', '33');
      formData.append('admin_id', '1');

      console.log('Sending audio to server...');
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Server response:', result);
    } catch (error) {
      console.error('Error processing audio:', error);
      setError(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const startRecording = () => {
    if (!apiUrl) {
      setError('API URL을 입력해주세요');
      return;
    }
    setIsRecording(true);
    // Stop recording after 7 seconds
    recordingTimeoutRef.current = window.setTimeout(() => {
      setIsRecording(false);
    }, 7000);
  };

  const stopRecording = () => {
    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current);
      recordingTimeoutRef.current = null;
    }
    setIsRecording(false);
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

      <VoiceRecorder
        isRecording={isRecording}
        onRecordingComplete={handleRecordingComplete}
      />
    </div>
  );
};

export default VoiceTester;
