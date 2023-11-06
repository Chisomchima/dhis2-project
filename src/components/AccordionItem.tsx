import React from "react";
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

interface AccordionViewProps {
  data: AccordionData;
  index: number;
  handleFill: (index: number, starred: boolean) => void;
  handleActive: (index: number, isActive: boolean) => void;
}

function AccordionView({ data, index, handleFill, handleActive }: AccordionViewProps) {
  return (
    <div
      className={`shadow my-2 w-full  bg-white ${
        data?.isActive ? "border border-indigo-500" : ""
      }`}
    >
      <div className="flex items-center justify-between w-full p-3 mb-3">
        <h3 className="font-bold">{data?.displayName}</h3>
        <div className="flex gap-3">
          {data?.starred ? (
            <AiFillStar
              style={{ color: "gold", cursor: "pointer" }}
              onClick={() => handleFill(index, false)}
              data-testid={`active-star-icon-${index}`}
            />
          ) : (
            <AiOutlineStar
              style={{ color: "gold", cursor: "pointer" }}
              onClick={() => handleFill(index, true)}
              data-testid={`star-icon-${index}`}
            />
          )}
          {data?.isActive ? (
            <BsChevronUp
              data-testid={`active-icon-${index}`}
              style={{ cursor: "pointer" }}
              onClick={() => handleActive(index, false)}
            />
          ) : (
            <BsChevronDown
              style={{ cursor: "pointer" }}
              onClick={() => handleActive(index, true)}
              data-testid={`not-active-icon-${index}`}
            />
          )}
        </div>
      </div>
      <div
        className={`transitioning-accordion ${data?.isActive ? "active" : ""}`}
      >
        {data?.details && data.details.length > 0 ? (
          data.details.map((detail, j) => (
            <div
              key={j}
              className="flex items-center gap-3 border-b my-2 p-3 w-full"
            >
              <div className="flex">
                {detail?.type === "VISUALIZATION" && <VscGraph />} {/* Visualizations icon */}
                {detail?.type === "MAP" && <BsGlobeAmericas />} {/* Map icon */}
                {detail?.type === "TEXT" && <BsFileTextFill />} {/* Text icon */}
              </div>
              <h3>{detail?.name || detail?.mapName}</h3> {/* Display name or map name */}
            </div>
          ))
        ) : (
          <h3 className="p-3">
            No data to show for the selected visualization
          </h3>
        )}
      </div>
    </div>
  );
}

export default AccordionView;
