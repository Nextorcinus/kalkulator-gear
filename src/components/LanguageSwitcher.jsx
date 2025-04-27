// src/components/LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div style={{ marginBottom: "1rem", textAlign: "right" }}>
      <select
        value={i18n.language}
        onChange={handleLanguageChange}
        style={{
          padding: "0.5rem 1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}
      >
        <option value="en">English 🇬🇧</option>
        <option value="id">Indonesia 🇮🇩</option>
        <option value="es">Spanish 🇪🇸</option>
        <option value="de">German 🇩🇪</option>
        <option value="ko">Korean 🇰🇷</option>
        <option value="jp">Japanese 🇯🇵</option>
        <option value="zh">Chinese 🇨🇳</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;