import { useLanguageStore } from '@/store/languageStore';

const Header = () => {
  const { language, toggleLanguage } = useLanguageStore();

  return (
    <header className="w-full h-16 bg-[url('/background.png')] shadow-md flex items-center justify-between px-6">
      <div className="flex items-center justify-center gap-2">
        <div
          className="w-9 aspect-square bg-indigo-100 text-indigo-800 font-extrabold text-sm rounded-full flex items-center justify-center shadow-sm"
          style={{
            fontFamily: "'Pretendard', sans-serif",
            letterSpacing: '-0.5px',
          }}
        >
          ML
        </div>

        <h1
          className="text-xl font-extrabold text-indigo-900 tracking-tight whitespace-nowrap"
          style={{ fontFamily: "'Pretendard', sans-serif" }}
        >
          {language === 'en' ? 'Malang Order' : '말랑 오더'}
        </h1>
      </div>

      {/* 중간 문구 */}
      <span className="text-lg text-indigo-900 font-medium ml-4 whitespace-nowrap">
        {language === 'en'
          ? 'Hello, thank you for visiting Malang Order.'
          : '안녕하세요 말랑 오더를 찾아주셔서 감사합니다.'}
      </span>

      <div className="flex items-center gap-4">
        <div className="text-lg font-semibold text-indigo-900 flex items-center gap-2">
          <span>{language === 'en' ? 'Table Number:' : '테이블 번호:'}</span>
          <span className="bg-indigo-300 w-10 h-10 rounded-full flex items-center justify-center text-2xl text-indigo-900 font-bold shadow-sm select-none">
            5
          </span>
        </div>

        {/* 언어 토글 버튼 */}
        <button
          onClick={toggleLanguage}
          className="bg-indigo-200 hover:bg-indigo-300 text-indigo-900 font-semibold py-1 px-3 rounded transition-colors"
          aria-label="Toggle language"
        >
          {language === 'en' ? 'KO' : 'EN'}
        </button>
      </div>
    </header>
  );
};

export default Header;
