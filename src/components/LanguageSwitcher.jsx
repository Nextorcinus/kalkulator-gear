import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    const lang = e.target.value;
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(lang);
      localStorage.setItem("lang", lang);
    } else {
      console.error("i18n not initialized correctly.");
    }
  };

  return (
    <div className="text-right p-4">
      <label className="block text-xs font-semibold uppercase mb-1 text-gray-600">Language</label>
      <select
        value={i18n.language}
        onChange={changeLanguage}
        className="border rounded px-2 py-1 text-sm"
      >
        <option value="en">English</option>
        <option value="id">Bahasa Indonesia</option>
        <option value="es">Español</option>
        <option value="de">Deutsch</option>
        <option value="ko">한국어</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
