import { useLanguageStore } from '@/store/languageStore';

const LanguageSelector = () => {
  const { language, toggleLanguage } = useLanguageStore();

  return (
    <button
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
      onClick={toggleLanguage}
    >
      {language === 'ko' ? '한국어' : 'English'}
    </button>
  );
};

export default LanguageSelector;
