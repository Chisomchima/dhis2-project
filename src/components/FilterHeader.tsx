import React, { useEffect, useState } from "react";
import { DashboardDetail } from "../utils/interfaces";
import { Select } from "flowbite-react";

interface FilterHeaderProps {
  setDashboards: React.Dispatch<React.SetStateAction<any[]>>;
  setUseLocalStorage: React.Dispatch<React.SetStateAction<boolean>>;
  resolvedData: string | null;
}

function FilterHeader({
  setDashboards,
  setUseLocalStorage,
  resolvedData,
}: FilterHeaderProps) {
  // Retrieve the selected item type from localStorage
  let selected = localStorage.getItem("selectedItem");

  // Initialize selected item type with the stored value or "ALL"
  const [selectedItemType, setSelectedItemType] = useState<string>(
    selected ? JSON.parse(selected) : "ALL"
  );

  // Handle the item type change
  const handleItemTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItemType(e.target.value);
    localStorage.setItem("selectedItem", JSON.stringify(e.target.value));
    setUseLocalStorage(false);
  };

  useEffect(() => {
    // Function to filter dashboards based on the selected item type
    const filterFunction = () => {
      if (resolvedData) {
        const dashboardData = JSON.parse(resolvedData);
        const filteredData = dashboardData?.map(
          (dashboard: DashboardDetail) => {
            if (selectedItemType === "ALL") {
              return dashboard;
            } else {
              const { dashboardItems, ...others } = dashboard;
              const filtered = dashboardItems.filter(
                (detail) => detail.type === selectedItemType
              );
              const newDashboard = {
                ...others,
                dashboardItems: filtered,
              };
              return newDashboard;
            }
          }
        );
        setDashboards(filteredData);
      }
    };
    filterFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItemType, resolvedData]);

  return (
    <div className="filter pt-4">
      <h2 className="font-bold">Dashboards</h2>
      <span className="w-[200px] p-2">
        <Select
          data-testid="item-type-select"
          required
          className="focus:outline-none focus:border-none w-full"
          onChange={(e) => handleItemTypeChange(e)}
          value={selectedItemType}
        >
          <option className="text-sm" value="ALL">
            ALL TYPES
          </option>
          <option className="text-sm" value="VISUALIZATION">
            VISUALIZATION
          </option>
          <option className="text-sm" value="MAP">
            MAP
          </option>
          <option className="text-sm" value="TEXT">
            TEXT
          </option>
        </Select>
      </span>
    </div>
  );
}

export default FilterHeader;
