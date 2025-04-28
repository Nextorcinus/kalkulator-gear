import { useEffect, useRef } from "react";
import $ from "jquery";
import "./gearTableStyles.css";
import dt from "datatables.net";

const GearTable = ({ data }) => {
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

  useEffect(() => {
    const table = $(tableRef.current);

    if (dtInstance.current) {
      dtInstance.current.clear();
      dtInstance.current.rows.add(
        data.map(gear => [
          gear.gear,
          gear.from,
          gear.to,
          gear.plans,
          gear.polish,
          gear.alloy,
          gear.amber,
          gear.svs
        ])
      );
      dtInstance.current.draw();
    } else {
      dtInstance.current = table.DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        lengthMenu: [ [10, 25, 50, 100, 150, -1], [10, 25, 50, 100, 150, "All"] ],
        scrollX: false,
        autoWidth: false,  
      });
    }
  }, [data]);

  const total = data.reduce(
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
    <div className="mt-10 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Upgrade Requirements</h2>

      <table
        ref={tableRef}
        className="display stripe hover"
        style={{
          width: "100%",
          fontSize: "0.95rem",
          borderCollapse: "collapse",
          marginBottom: "1rem",
        }}
      >
        <thead className="bg-gray-300">
          <tr>
            <th>Gear</th>
            <th>From</th>
            <th>To</th>
            <th>Plans</th>
            <th>Polish</th>
            <th>Alloy</th>
            <th>Amber</th>
            <th>SvS Points</th>
          </tr>
        </thead>

        <tbody>
          {/* Harus dikosongkan! DataTables yang isi */}
        </tbody>

        <tfoot>
          <tr style={{ backgroundColor: "#fef08a", fontWeight: "bold" }}>
            <th colSpan="3" style={{ textAlign: "center" }}>TOTAL</th>
            <th>{total.plans}</th>
            <th>{total.polish}</th>
            <th>{total.alloy}</th>
            <th>{total.amber}</th>
            <th>{total.svs}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default GearTable;
