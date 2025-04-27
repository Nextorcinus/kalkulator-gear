import React from "react";

const TableComponent = ({ selections }) => {
  // Contoh dummy data kalkulasi material
  const calculateMaterials = (from, to) => {
    if (!from || !to) return "-";
    return `${Math.abs(to.length - from.length) * 5}x Lunar Amber`;
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Upgrade Requirements</h2>
      <table className="table-auto border-collapse border w-full text-left">
        <thead>
          <tr>
            <th className="border px-4 py-2">Gear</th>
            <th className="border px-4 py-2">From</th>
            <th className="border px-4 py-2">To</th>
            <th className="border px-4 py-2">Material Needed</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(selections).map((gear) => (
            <tr key={gear}>
              <td className="border px-4 py-2">{gear}</td>
              <td className="border px-4 py-2">{selections[gear].from}</td>
              <td className="border px-4 py-2">{selections[gear].to}</td>
              <td className="border px-4 py-2">
                {calculateMaterials(selections[gear].from, selections[gear].to)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
