import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { extractSpectrogram, normalize2D } from '@/lib/utils/audioUtil';

const MODEL_URL = '/models/model.json';
const LABELS = ['말랑아', '배경 소음'];
const BUFFER_SIZE = 1024;
const INFERENCE_INTERVAL = 1500;
const MIN_FRAMES = 43;
const THRESHOLD = 0.3;

type MicPermissionStatus = 'granted' | 'denied' | 'prompt';

const WakeWordDetector = () => {
  const [detected, setDetected] = useState(false);
  const [confidence, setConfidence] = useState<number>(0);
  const [micPermission, setMicPermission] =
    useState<MicPermissionStatus>('prompt');
  const modelRef = useRef<tf.LayersModel | null>(null);
  const bufferRef = useRef<Float32Array[]>([]);
  const sampleRateRef = useRef<number>(16000);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const inferenceIntervalRef = useRef<number | null>(null);

  const checkMicPermission = async () => {
    try {
      const result = await navigator.permissions.query({
        name: 'microphone' as PermissionName,
      });
      setMicPermission(result.state as MicPermissionStatus);

      result.addEventListener('change', () => {
        setMicPermission(result.state as MicPermissionStatus);
      });
    } catch (error) {
      console.error('마이크 권한 확인 중 오류:', error);
      setMicPermission('denied');
    }
  };

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop()); // 권한만 확인하고 스트림은 닫음
      setMicPermission('granted');
    } catch (error) {
      console.error('마이크 권한 요청 중 오류:', error);
      setMicPermission('denied');
    }
  };

  useEffect(() => {
    checkMicPermission();
  }, []);

  useEffect(() => {
    const init = async () => {
      if (micPermission !== 'granted') return;

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
  }, [micPermission]);

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

      if (LABELS[maxIndex] === '말랑아' && maxConfidence > THRESHOLD) {
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

  const renderMicStatus = () => {
    switch (micPermission) {
      case 'granted':
        return (
          <div className='text-center'>
            <div
              className={`font-bold transition-all duration-300 ${
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
        );
      case 'denied':
        return (
          <div className='text-center text-red-500'>
            <div className='font-bold'>마이크 권한이 거부되었습니다</div>
            <div className='text-sm mt-1'>
              브라우저 설정에서 마이크 권한을 허용해주세요
            </div>
          </div>
        );
      case 'prompt':
        return (
          <div className='text-center'>
            <div className='font-bold text-gray-600'>
              마이크 권한이 필요합니다
            </div>
            <button
              onClick={requestMicPermission}
              className='mt-2 px-4 py-2 bg-ml-yellow text-white rounded-lg hover:bg-ml-yellow-light transition-colors'
            >
              마이크 권한 요청
            </button>
          </div>
        );
    }
  };

  return (
    <div className='bg-white shadow rounded-lg transition-all duration-300'>
      <div className='relative'>
        <div
          className={`flex items-center justify-center rounded-lg transition-all duration-300 ${
            detected ? 'bg-ml-yellow-light scale-105' : 'bg-gray-100'
          }`}
        >
          {renderMicStatus()}
        </div>
        {detected && (
          <div className='absolute inset-0 rounded-lg animate-ping bg-ml-yellow-light opacity-75'></div>
        )}
      </div>
    </div>
  );
};

export default WakeWordDetector;
