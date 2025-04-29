import { useState } from "react";
import { levels } from "../levels";
import { useTranslation } from "react-i18next";



const gearParts = ["Cap", "Watch", "Coat", "Pants", "Belt", "Weapon"];

const GearForm = ({ onSubmit, onReset }) => { 
  const [selections, setSelections] = useState({});

  // Helper to get index of level in levels array
  const getLevelIndex = (level) => levels.indexOf(level);

  // Remove global highestFromIndex calculation as per user feedback
  // const highestFromIndex = Object.values(selections)
  //   .map(sel => getLevelIndex(sel.from))
  //   .filter(idx => idx >= 0)
  //   .reduce((max, idx) => (idx > max ? idx : max), -1);

  const handleChange = (part, type, value) => {
    setSelections(prev => {
      const newSelections = {
        ...prev,
        [part]: {
          ...prev[part],
          [type]: value,
          ...(type === 'from' ? { to: "" } : {})
        }
      };

      // If changing 'from', and 'to' is lower than new 'from', clear 'to'
      if (type === 'from' && newSelections[part].to) {
        const fromIdx = getLevelIndex(newSelections[part].from);
        const toIdx = getLevelIndex(newSelections[part].to);
        if (toIdx <= fromIdx) {
          newSelections[part].to = "";
        }
      }

      return newSelections;
    });
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (Object.keys(selections).length > 0) {
      onSubmit(selections);
    }
  };

  const { t } = useTranslation();
  return (
    <form onSubmit={handleCalculate} className="p-4 ">
      <h2 className="text-xl font-semibold mb-4">{t('selectedItemGear')}</h2>

      {gearParts.map((part) => {
        const fromValue = selections[part]?.from;

        // Available to levels are those after fromValue
        const availableToLevels = fromValue
          ? levels.slice(levels.indexOf(fromValue) + 1)
          : levels;

        return (
          <div key={part} style={{ marginBottom: "1rem" }}>
            <strong>{part}</strong>
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <select className="border border-gray-300 rounded px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                value={selections[part]?.from || ""}
                onChange={(e) => handleChange(part, "from", e.target.value)}
              >
                <option value="" >{t('from')}</option>
                {levels.map((level, idx) => (
                  <option key={idx} value={level}>
                    {level}
                  </option>
                ))}
              </select>

              <select className="border border-gray-300 rounded px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                value={selections[part]?.to || ""}
                onChange={(e) => handleChange(part, "to", e.target.value)}
                disabled={!fromValue} 
              >
                <option value="" >{t('to')}</option>
                {availableToLevels.map((level, idx) => (
                  <option key={idx} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      })}

      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
      {t('calculate')}
      </button>

      <button
        type="button"
        onClick={() => {
          setSelections({
            Cap: { from: "", to: "" },
            Watch: { from: "", to: "" },
            Coat: { from: "", to: "" },
            Pants: { from: "", to: "" },
            Belt: { from: "", to: "" },
            Weapon: { from: "", to: "" },
          });
          onReset(); 
        }}
        className="px-4 py-2 ml-4 bg-red-500 text-white rounded hover:bg-red-600"
      >
         {t('reset')}
      </button>
    </form>
  );
};

export default GearForm;
