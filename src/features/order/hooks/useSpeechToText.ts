import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const useSpeechToText = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
  };
};

export default useSpeechToText;
