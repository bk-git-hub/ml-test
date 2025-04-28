import { useState } from 'react';

const LanguageSelector = () => {
  const [language, setLanguage] = useState('ko');

  const toggleLanguage = (e: React.MouseEvent) => {
    // 이벤트 객체를 인자로 받음
    e.stopPropagation(); // 이벤트 전파 방지
    setLanguage(language === 'ko' ? 'en' : 'ko');
    // 실제 언어 변경 로직 (i18n 라이브러리 연동)
  };

  return (
    <button
      className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded'
      onClick={toggleLanguage}
    >
      {language === 'ko' ? '한국어' : 'English'}
    </button>
  );
};

export default LanguageSelector;
