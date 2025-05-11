import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { extractSpectrogram, normalize2D } from '@/lib/utils/audioUtil';

const MODEL_URL = '/models/model.json';
const LABELS = ['말랑아', '배경 소음'];
const BUFFER_SIZE = 1024;
const INFERENCE_INTERVAL = 1500;
const MIN_FRAMES = 43;

const WakeWordDetector = () => {
  const [detected, setDetected] = useState(false);
  const [confidence, setConfidence] = useState<number>(0);
  const modelRef = useRef<tf.LayersModel | null>(null);
  const bufferRef = useRef<Float32Array[]>([]);
  const sampleRateRef = useRef<number>(16000);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const inferenceIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await tf.setBackend('webgl');
        await tf.ready();
        modelRef.current = await tf.loadLayersModel(MODEL_URL);
        console.log('✅ 모델 로드 완료');

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const audioContext = new AudioContext({ sampleRate: 16000 });
        audioContextRef.current = audioContext;
        sampleRateRef.current = audioContext.sampleRate;

        const source = audioContext.createMediaStreamSource(stream);
        sourceRef.current = source;

        const processor = audioContext.createScriptProcessor(BUFFER_SIZE, 1, 1);
        processorRef.current = processor;

        processor.onaudioprocess = (e) => {
          const input = e.inputBuffer.getChannelData(0);
          bufferRef.current.push(new Float32Array(input));

          // 버퍼 크기 제한
          if (bufferRef.current.length > 10) {
            bufferRef.current = bufferRef.current.slice(-10);
          }
        };

        source.connect(processor);
        processor.connect(audioContext.destination);

        inferenceIntervalRef.current = window.setInterval(
          runInference,
          INFERENCE_INTERVAL
        );
      } catch (error) {
        console.error('초기화 중 오류 발생:', error);
      }
    };

    init();

    return () => {
      // Cleanup
      if (inferenceIntervalRef.current) {
        clearInterval(inferenceIntervalRef.current);
      }
      if (processorRef.current) {
        processorRef.current.disconnect();
      }
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (modelRef.current) {
        modelRef.current.dispose();
      }
    };
  }, []);

  const runInference = async () => {
    if (!modelRef.current || bufferRef.current.length === 0) return;

    try {
      const audioData = Float32Array.from(bufferRef.current.flat());
      bufferRef.current = [];

      const spectrogram2D = extractSpectrogram(
        audioData,
        sampleRateRef.current
      );
      if (spectrogram2D.length < MIN_FRAMES) return;

      const trimmed = spectrogram2D.slice(0, MIN_FRAMES);
      const normSpec = normalize2D(trimmed);
      const inputTensor = tf
        .tensor(normSpec)
        .reshape([1, MIN_FRAMES, normSpec[0].length, 1]);

      const prediction = modelRef.current.predict(inputTensor) as tf.Tensor;
      const predictionData = await prediction.data();
      const maxIndex = prediction.argMax(-1).dataSync()[0];
      const maxConfidence = Math.max(...Array.from(predictionData));

      if (LABELS[maxIndex] === '말랑아') {
        console.log('🔊 말랑아 감지!');
        setDetected(true);
        setConfidence(maxConfidence);
        setTimeout(() => {
          setDetected(false);
          setConfidence(0);
        }, 1500);
      }

      tf.dispose([inputTensor, prediction]);
    } catch (error) {
      console.error('추론 중 오류 발생:', error);
    }
  };

  return (
    <div className=' bg-white shadow rounded-lg transition-all duration-300'>
      <div className='relative'>
        <div
          className={`flex items-center justify-center rounded-lg transition-all duration-300 ${
            detected ? 'bg-ml-yellow-light scale-105' : 'bg-gray-100'
          }`}
        >
          <div className='text-center'>
            <div
              className={` font-bold  transition-all duration-300 ${
                detected ? 'text-ml-yellow animate-bounce' : 'text-gray-600'
              }`}
            >
              {detected ? '말랑아!' : '🎧 듣는 중...'}
            </div>
            {detected && (
              <div className='text-sm text-gray-600'>
                신뢰도: {(confidence * 100).toFixed(1)}%
              </div>
            )}
          </div>
        </div>
        {detected && (
          <div className='absolute inset-0 rounded-lg animate-ping bg-ml-yellow-light opacity-75'></div>
        )}
      </div>
    </div>
  );
};

export default WakeWordDetector;
