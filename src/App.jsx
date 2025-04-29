import { useState, useEffect } from "react";
import GearForm from "./components/GearForm";
import GearTable from "./components/GearTable";
import GearProgress from "./components/GearProgress";
import { ToastContainer, toast } from "react-toastify";
import { levels as levelsOrder } from "./levels";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

function App() {
  const [materialData, setMaterialData] = useState([]);
  const [selectedGears, setSelectedGears] = useState([]);
  const [loadingMaterialData, setLoadingMaterialData] = useState(true);
  const { t } = useTranslation();

 

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "MaterialDataGear.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
      .then((data) => {
        setMaterialData(data);
        setLoadingMaterialData(false);
      })
      .catch((error) => {
        console.error("Error loading JSON:", error);
        setLoadingMaterialData(false);
      });
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

        const upgradeData = materialData.find(
          (item) =>
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
    toast.success(t("calculation_success") || "Calculation completed successfully!");
  };

  const handleReset = () => {
    setSelectedGears([]);
    toast.info(t("reset_success") || "Reset successful!");
  };

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
    <div className="min-h-screen">
      <div className="border-b shadow-sm">
        <LanguageSwitcher />
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>

        <GearForm onSubmit={handleFormSubmit} onReset={handleReset} materialDataLoaded={materialData.length > 0} />

        {selectedGears.length > 0 && (
          <>
            <GearTable data={selectedGears} />
            <GearProgress total={totalMaterial} />
          </>
        )}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
