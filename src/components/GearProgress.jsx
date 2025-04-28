import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";




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

    toast.success("✅ Progress calculated successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    });
  };

  const calculateProgress = (available, required) => {
    if (required <= 0) return 100;
    const percent = Math.min(100, Math.max(0, (available / required) * 100));
    return Math.round(percent);
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return "bg-green-500"; // Sufficient
    if (progress >= 50) return "bg-yellow-400"; // Medium
    return "bg-red-500"; // Insufficient
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Existing Items (Optional)</h2>

      {/* Form Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6 transition-all duration-500">
        {[
          { name: "plans", label: "Design Plans" },
          { name: "polish", label: "Polishing Solution" },
          { name: "alloy", label: "Hardened Alloy" },
          { name: "amber", label: "Lunar Amber" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label htmlFor={field.name} className="mb-1 font-semibold">{field.label}</label>
            <input
              id={field.name}
              type="number"
              name={field.name}
              value={existing[field.name]}
              onChange={handleChange}
              placeholder={`Enter your ${field.label}`}
              className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 block mx-auto mb-6 transition-all duration-300"
      >
        Calculate
      </button>

      {/* Result Table */}
      {result && (
        <div className="mt-8 transition-all duration-500">
          <h3 className="text-lg font-bold mb-4 text-center">Item Requirements</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="border p-2">Item</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Progress</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Design Plans", key: "plans" },
                  { label: "Polishing Solution", key: "polish" },
                  { label: "Hardened Alloy", key: "alloy" },
                  { label: "Lunar Amber", key: "amber" },
                ].map(item => {
                  const available = parseInt(existing[item.key]) || 0;
                  const required = total[item.key] || 0;
                  const progress = calculateProgress(available, required);
                  return (
                    <tr key={item.key}>
                      <td className="border p-2">{item.label}</td>
                      <td className="border p-2">
                        {result[item.key] >= 0
                          ? <span className="text-green-600">({result[item.key]} left) Sufficient</span>
                          : <span className="text-red-600">({Math.abs(result[item.key])} needed) Insufficient</span>
                        }
                      </td>
                      <td className="border p-2">
                        <div className="w-full bg-gray-300 rounded h-3 overflow-hidden">
                          <div
                            className={`h-3 transition-all duration-700 ease-in-out ${getProgressColor(progress)}`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-center mt-1">{progress}%</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default GearProgress;