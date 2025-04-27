import { useState } from "react";

const GearProgress = ({ total }) => {
  const [existing, setExisting] = useState({
    plans: "",
    polish: "",
    alloy: "",
    amber: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setExisting({
      ...existing,
      [e.target.name]: e.target.value,
    });
  };

  const handleCalculate = () => {
    const newResult = {
      plans: (parseInt(existing.plans) || 0) - total.plans,
      polish: (parseInt(existing.polish) || 0) - total.polish,
      alloy: (parseInt(existing.alloy) || 0) - total.alloy,
      amber: (parseInt(existing.amber) || 0) - total.amber,
    };
    setResult(newResult);
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Existing Items (Optional)</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {/* Design Plans */}
        <div className="flex flex-col">
          <label htmlFor="plans" className="mb-1 font-semibold">Design Plans</label>
          <input
            id="plans"
            type="number"
            name="plans"
            value={existing.plans}
            onChange={handleChange}
            placeholder="Enter your Design Plans"
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* Polishing Solution */}
        <div className="flex flex-col">
          <label htmlFor="polish" className="mb-1 font-semibold">Polishing Solution</label>
          <input
            id="polish"
            type="number"
            name="polish"
            value={existing.polish}
            onChange={handleChange}
            placeholder="Enter your Polishing Solution"
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* Hardened Alloy */}
        <div className="flex flex-col">
          <label htmlFor="alloy" className="mb-1 font-semibold">Hardened Alloy</label>
          <input
            id="alloy"
            type="number"
            name="alloy"
            value={existing.alloy}
            onChange={handleChange}
            placeholder="Enter your Hardened Alloy"
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* Lunar Amber */}
        <div className="flex flex-col">
          <label htmlFor="amber" className="mb-1 font-semibold">Lunar Amber</label>
          <input
            id="amber"
            type="number"
            name="amber"
            value={existing.amber}
            onChange={handleChange}
            placeholder="Enter your Lunar Amber"
            className="border px-3 py-2 rounded"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 block mx-auto mb-6"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4 text-center">Item Requirements</h3>
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Item</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Design Plans", key: "plans" },
                { label: "Polishing Solution", key: "polish" },
                { label: "Hardened Alloy", key: "alloy" },
                { label: "Lunar Amber", key: "amber" },
              ].map(item => (
                <tr key={item.key}>
                  <td className="border p-2">{item.label}</td>
                  <td className="border p-2">
                    {result[item.key] >= 0
                      ? <span className="text-green-600">({result[item.key]} left) Sufficient</span>
                      : <span className="text-red-600">({Math.abs(result[item.key])} needed) Insufficient</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GearProgress;
