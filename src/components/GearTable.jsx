import { useEffect, useRef } from "react";
import $ from "jquery";
import "./gearTableStyles.css";
import dt from "datatables.net";
import { useTranslation } from "react-i18next";

const GearTable = ({ data }) => {
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

  useEffect(() => {
    const table = $(tableRef.current);

    if (dtInstance.current) {
      dtInstance.current.destroy();
      dtInstance.current = null;
    }

    dtInstance.current = table.DataTable({
      data: data.map(gear => [
        gear.gear,
        gear.from,
        gear.to,
        gear.plans,
        gear.polish,
        gear.alloy,
        gear.amber,
        gear.svs
      ]),
      paging: true,
      searching: true,
      ordering: true,
      info: true,
      lengthMenu: [ [10, 25, 50, 100, 150, -1], [10, 25, 50, 100, 150, "All"] ],
      scrollX: false,
      autoWidth: false,
    });
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

  const { t } = useTranslation();
  return (
    <div className="mt-10 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('upgradeRequirements')}</h2>

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
            <th>{t('gear')}</th>
            <th>{t('from')}</th>
            <th>{t('to')}</th>
            <th>{t('designPlans')}</th>
            <th>{t('polish')}</th>
            <th>{t('Alloy')}</th>
            <th>{t('amber')}</th>
            <th>{t('svsPoints')}</th>
          </tr>
        </thead>

        <tbody>
          {/* DataTables manages tbody rows */}
        </tbody>

        <tfoot>
          <tr style={{ backgroundColor: "#fef08a", fontWeight: "bold" }}>
            <th colSpan="3" style={{ textAlign: "center" }}>{t('total')}</th>
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
