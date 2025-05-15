import { useState } from 'react';
import { useGpt } from '../hooks/useGpt';

interface TextInputProps {
  apiUrl: string;
}

const TextInput = ({ apiUrl }: TextInputProps) => {
  const [text, setText] = useState('');
  const { isProcessing, error, sendTextToApi } = useGpt({ apiUrl });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendTextToApi(text);
      setText('');
    } catch (err) {
      // Error is already handled in the hook
      console.error('Error in TextInput:', err);
    }
  };

  return (
    <div className='p-4 bg-white rounded-lg shadow-lg'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='text'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            메시지 입력
          </label>
          <textarea
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='메시지를 입력하세요...'
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ml-yellow focus:border-ml-yellow'
            rows={3}
            disabled={isProcessing}
          />
        </div>

        <button
          type='submit'
          disabled={isProcessing || !text.trim()}
          className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
            isProcessing || !text.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-ml-yellow hover:bg-ml-yellow-light text-white'
          }`}
        >
          {isProcessing ? '처리 중...' : '전송'}
        </button>

        {error && (
          <div className='p-2 bg-red-100 text-red-800 rounded text-sm'>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default TextInput;
