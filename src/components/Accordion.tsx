import React, { useEffect, useState } from "react";
import "../App.css";
import AccordionView from "./AccordionItem"; // Import the AccordionView component

// Define the DashboardItem and AccordionData interfaces
interface DashboardItem {
  type: string;
  visualization?: {
    type: string;
    name: string;
  };
  name?: string;
  mapName?: string;
  text?: {
    name: string;
  };
  map?: {
    name: string;
  };
}

interface AccordionData {
  displayName: string;
  starred: boolean;
  isActive: boolean;
  details: DashboardItem[];
}

// Define the AccordionProps interface
interface AccordionProps {
  dashboards: any[];
  useLocalStorage: boolean;
  setUseLocalStorage: (value: boolean) => void;
}

function Accordion({
  dashboards,
  useLocalStorage,
  setUseLocalStorage,
}: AccordionProps) {
  const [accordionData, setAccordionData] = useState<AccordionData[]>([]); // State for storing accordion data
  const storedData = localStorage.getItem("accordionData");

  useEffect(() => {
    if (dashboards && dashboards.length > 0) {
      const setDashboardData = () => {
        const dashboardData = dashboards?.map((dashboard, i) => {
          return {
            displayName: dashboard?.displayName,
            starred: dashboard?.starred,
            isActive: i === 0 ? true : false,
            details: dashboard?.dashboardItems?.map((item: DashboardItem) => ({
              type: item?.type,
              name: item?.visualization
                ? item?.visualization?.name
                : item?.text,
              mapName: item?.map && item.map.name,
            })),
          };
        });
        localStorage.setItem("accordionData", JSON.stringify(dashboardData));
        setAccordionData(dashboardData);
        setUseLocalStorage(true);
      };
      if (useLocalStorage) {
        if (storedData !== null && storedData?.length > 0) {
          setAccordionData(JSON.parse(storedData));
        } else {
          setDashboardData();
        }
      } else {
        setDashboardData();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboards]);

  const handleFill = (index: number, starred: boolean) => {
    const updatedAccordionData = [...accordionData];
    updatedAccordionData[index].starred = starred;
    localStorage.setItem("accordionData", JSON.stringify(updatedAccordionData));
    setAccordionData(updatedAccordionData);
    setUseLocalStorage(true);
  };

  const handleActive = (index: number, isActive: boolean) => {
    const updatedAccordionData = accordionData.map((data, i) => {
      if (i === index) {
        data.isActive = isActive;
      } else {
        data.isActive = false;
      }
      return data;
    });
    setAccordionData(updatedAccordionData);
    setUseLocalStorage(true);
  };

  return (
    <div className="flex items-center flex-col w-[80%] my-3">
      {accordionData.map((data, i) => (
        <AccordionView
          data={data}
          index={i}
          handleFill={handleFill}
          handleActive={handleActive}
          key={i}
        />
      ))}
    </div>
  );
}

export default Accordion;
