import React, { useEffect, useState } from "react";
import "../App.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  BsChevronUp,
  BsChevronDown,
  BsGlobeAmericas,
  BsFileTextFill,
} from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";

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

interface AccordionProps {
  dashboards: any[]; // Adjust the type according to your actual data structure
  useLocalStorage: boolean;
  setUseLocalStorage: (value: boolean) => void;
}

function Accordion({
  dashboards,
  useLocalStorage,
  setUseLocalStorage,
}: AccordionProps) {
  const [accordionData, setAccordionData] = useState<AccordionData[]>([]);
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
        <div
          key={i}
          className={`shadow my-2 w-full  bg-white ${
            data?.isActive ? "border border-[cyan]" : ""
          }`}
        >
          <div className="flex items-center justify-between w-full p-3 mb-3">
            <h3 className="font-bold ">{data?.displayName}</h3>
            <div className="flex gap-3">
              {data?.starred ? (
                <AiFillStar
                  style={{ color: "gold", cursor: "pointer" }}
                  onClick={() => handleFill(i, false)}
                />
              ) : (
                <AiOutlineStar
                  style={{ color: "gold", cursor: "pointer" }}
                  onClick={() => handleFill(i, true)}
                  data-testid={`star-icon-${i}`}
                />
              )}
              {data?.isActive ? (
                <BsChevronUp
                  data-testid={`active-icon-${i}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleActive(i, false)}
                />
              ) : (
                <BsChevronDown
                  style={{ cursor: "pointer" }}
                  onClick={() => handleActive(i, true)}
                />
              )}
            </div>
          </div>
          <div
            className={`transitioning-accordion ${
              data?.isActive ? "active" : ""
            }`}
          >
            {data?.details && data.details.length > 0 ? (
              data.details.map((detail, j) => (
                <div
                  key={j}
                  className="flex items-center gap-3 border-b my-2 p-3 w-full"
                >
                  <div className="flex">
                    {detail?.type === "VISUALIZATION" && <VscGraph />}
                    {detail?.type === "MAP" && <BsGlobeAmericas />}
                    {detail?.type === "TEXT" && <BsFileTextFill />}
                  </div>
                  <h3>{detail?.name || detail?.mapName}</h3>
                </div>
              ))
            ) : (
              <h3 className="p-3">
                No data to show for the selected visualization
              </h3>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;
