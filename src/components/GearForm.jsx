import { useState } from "react";
import { levels } from "../levels";

const gearParts = ["Cap", "Watch", "Coat", "Pants", "Belt", "Weapon"];



const GearForm = ({ onSubmit, onReset }) => { 
  const [selections, setSelections] = useState({});

  const handleChange = (part, type, value) => {
    setSelections(prev => ({
      ...prev,
      [part]: {
        ...prev[part],
        [type]: value,
        ...(type === 'from' ? { to: "" } : {}) // reset 'to' kalau 'from' diganti
      }
    }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (Object.keys(selections).length > 0) {
      onSubmit(selections);
    }
  };

  return (
    <form onSubmit={handleCalculate} className="p-4 ">
      <h2 className="text-xl font-semibold mb-4">Select Gear Levels</h2>

      {gearParts.map((part) => {
        const fromValue = selections[part]?.from;
        const availableToLevels = fromValue
          ? levels.slice(levels.indexOf(fromValue) + 1) // ambil semua level setelah 'from'
          : levels; // kalau belum pilih from, tampilkan semua

        return (
          <div key={part} style={{ marginBottom: "1rem" }}>
            <strong>{part}</strong>
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <select
                value={selections[part]?.from || ""}
                onChange={(e) => handleChange(part, "from", e.target.value)}
              >
                <option value="">From</option>
                {levels.map((level, idx) => (
                  <option key={idx} value={level}>
                    {level}
                  </option>
                ))}
              </select>

              <select
                value={selections[part]?.to || ""}
                onChange={(e) => handleChange(part, "to", e.target.value)}
                disabled={!fromValue} // disable dropdown 'to' kalau 'from' belum dipilih
              >
                <option value="">To</option>
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
        Calculate
      </button>

      <button
  type="button"
  onClick={() => {
    setSelections({
      cap: { from: "", to: "" },
      watch: { from: "", to: "" },
      coat: { from: "", to: "" },
      pants: { from: "", to: "" },
      belt: { from: "", to: "" },
      weapon: { from: "", to: "" },
    });
    onReset(); // <- ini panggil onReset supaya kosongkan tabel juga
  }}
  className="px-4 py-2 ml-4 bg-red-500 text-white rounded hover:bg-red-600"
>
  Reset
</button>


    </form>
  );
};

export default GearForm;
