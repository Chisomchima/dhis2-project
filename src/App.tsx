import React, { useEffect, useState } from "react";
import FilterHeader from "./components/FilterHeader";
import AccordionData from "./components/Accordion";
import DashbordService from "./service";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

function App() {
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [useLocalStorage, setUseLocalStorage] = useState<boolean>(true);
  const dashboardData = localStorage.getItem("dashboardData");

  useEffect(() => {
    const getDashboards = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await DashbordService.getDashboards();

        const dashboardDetails = response?.dashboards?.map(
          async (dashboard) => {
            const detail = await DashbordService.getDashboardDetail(
              dashboard.id
            );
            return detail;
          }
        );

        const resolvedData = await Promise.all(dashboardDetails);
        localStorage.setItem("dashboardData", JSON.stringify(resolvedData));

        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      } finally {
        setError(false);
        setLoading(false);
      }
    };

    if (dashboardData && dashboardData.length > 0) {
      return;
    } else {
      getDashboards();
    }
  }, [dashboardData]);

  return (
    <div className="App" data-testid="dashboard">
      {loading && (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-slate-200 flex items-center justify-center w-full h-full">
          <div
            data-testid="loading-spinner"
            className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"
          ></div>
        </div>
      )}
      <div className="wrapper">
        <FilterHeader
          data-testid="item-type-select"
          setDashboards={setDashboards}
          setUseLocalStorage={setUseLocalStorage}
          resolvedData={dashboardData}
        />

        <AccordionData
          dashboards={dashboards}
          useLocalStorage={useLocalStorage}
          setUseLocalStorage={setUseLocalStorage}
        />
      </div>
      {error && (
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium" data-testid="error-message">
            Something went wrong
          </span>{" "}
          try refreshing again.
        </Alert>
      )}
    </div>
  );
}

export default App;
