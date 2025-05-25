import { useEffect, useRef, useState } from 'react';

interface VoiceRecorderProps {
  isRecording: boolean;
  isListening: boolean;
  language: string;
  onRecordingComplete: (audioBlob: Blob) => void;
}

const VoiceRecorder = ({
  isRecording,
  isListening,
  language,
  onRecordingComplete,
}: VoiceRecorderProps) => {
  const [isRecordingState, setIsRecordingState] = useState(false);
  const [lastRecording, setLastRecording] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRecording && !isRecordingState) {
      startRecording();
    } else if (!isRecording && isRecordingState) {
      stopRecording();
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Set up audio analysis
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      // Start animation loop for audio level
      const updateAudioLevel = () => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(
            analyserRef.current.frequencyBinCount
          );
          analyserRef.current.getByteFrequencyData(dataArray);

          // Calculate average level
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(average / 128); // Normalize to 0-1 range

          animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };
      updateAudioLevel();

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav',
        });
        setLastRecording(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        onRecordingComplete(audioBlob);

        // Clean up audio analysis
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }

        // Clean up the stream
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecordingState(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecordingState) {
      mediaRecorderRef.current.stop();
      setIsRecordingState(false);
    }
  };

  const playRecording = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
    }
  };

  // Cleanup audio URL when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioUrl]);

  return (
    <div className=' bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg'>
      {isRecordingState ? (
        <div className='bg-indigo-100 rounded-lg border border-indigo-300 p-2 mt-2 shadow-sm'>
          <p className='text-sm text-indigo-900 mb-1'>
            {language === 'en' ? 'Recognizing speech…' : '음성 인식 중…'}
          </p>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <p className='text-sm text-indigo-600'>
            {isListening ? (
              language === 'en' ? (
                <>
                  Listening for
                  <br />
                  the keyword…
                </>
              ) : (
                <>
                  키워드 말랑아
                  <br />
                  감지중…
                </>
              )
            ) : language === 'en' ? (
              'Waiting…'
            ) : (
              '대기 중…'
            )}
          </p>
        </div>
      )}

      {/* Audio Level Visualization */}
      {isRecordingState && (
        <div className='mt-2 flex items-center space-x-2'>
          <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
            <div
              className='h-full bg-indigo-500 transition-all duration-100'
              style={{
                width: `${audioLevel * 100}%`,
                transform: `scaleX(${1 + audioLevel})`,
                transformOrigin: 'left',
              }}
            />
          </div>
        </div>
      )}

      {/* Testing UI - Only visible when there's a recording */}

      {/* Hidden audio element for playback */}
      {audioUrl && <audio ref={audioRef} src={audioUrl} className='hidden' />}
    </div>
  );
};

export default VoiceRecorder;
