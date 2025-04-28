import { useState, useEffect } from "react";
import GearForm from "./components/GearForm";
import GearTable from "./components/GearTable";
import GearProgress from "./components/GearProgress"; // << Tambah ini
import { levels as levelsOrder } from "./levels";
import { ToastContainer } from "react-toastify";

function App() {
  const [materialData, setMaterialData] = useState([]);
  const [selectedGears, setSelectedGears] = useState([]);

  useEffect(() => {
    fetch("/MaterialDataGear.json")
      .then(response => response.json())
      .then(data => setMaterialData(data))
      .catch(error => console.error("Error loading JSON:", error));
  }, []);

  const handleFormSubmit = (selections) => {
    if (!materialData.length) {
      console.error("Material data belum dimuat!");
      return;
    }

    const gearResults = [];

    Object.keys(selections).forEach((gearPart) => {
      const fromLevel = selections[gearPart]?.from;
      const toLevel = selections[gearPart]?.to;

      if (!fromLevel || !toLevel) return;

      const fromIndex = levelsOrder.indexOf(fromLevel);
      const toIndex = levelsOrder.indexOf(toLevel);

      if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
        console.log(`Invalid level selection for ${gearPart}`);
        return;
      }

      for (let i = fromIndex; i < toIndex; i++) {
        const currentLevel = levelsOrder[i];
        const nextLevel = levelsOrder[i + 1];

        const upgradeData = materialData.find(item =>
          item.Type.toLowerCase() === gearPart.toLowerCase() &&
          item.Level.toLowerCase() === nextLevel.toLowerCase()
        );

        if (!upgradeData) {
          console.warn(`Data not found for ${gearPart} upgrade to ${nextLevel}`);
          continue;
        }

        gearResults.push({
          gear: gearPart,
          from: currentLevel,
          to: nextLevel,
          plans: upgradeData.Plans || 0,
          polish: upgradeData.Polish || 0,
          alloy: upgradeData.Alloy || 0,
          amber: upgradeData.Amber || 0,
          svs: upgradeData["SvS Points"] || 0,
        });
      }
    });

    setSelectedGears(gearResults);
  };

  // Hitung total kebutuhan material
  const totalMaterial = selectedGears.reduce(
    (acc, item) => ({
      plans: acc.plans + item.plans,
      polish: acc.polish + item.polish,
      alloy: acc.alloy + item.alloy,
      amber: acc.amber + item.amber,
      svs: acc.svs + item.svs,
    }),
    { plans: 0, polish: 0, alloy: 0, amber: 0, svs: 0 }
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="text-2xl font-bold mb-4 ">Calculator Upgrade Gear</h1>
      <GearForm onSubmit={handleFormSubmit} onReset={() => setSelectedGears([])} />
      
      {selectedGears.length > 0 && (
        <>
          <GearTable data={selectedGears} />
          <GearProgress total={totalMaterial} /> {/* <<< Integrasi disini */}
        </>
      )}
      <>
    {/* Konten kamu */}
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </>
    </div>
  );
}

export default App;
