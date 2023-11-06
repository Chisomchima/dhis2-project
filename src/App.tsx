import React, { useEffect, useState } from "react";
import HeroBanner from "./components/Banner";
import FilterHeader from "./components/FilterHeader";
import AccordionData from "./components/Accordion";
import DashbordService from "./service";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

function App() {
  // State variables to manage dashboard data, loading state, and errors
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // State variable to control whether to use local storage
  const [useLocalStorage, setUseLocalStorage] = useState<boolean>(true);

  // Retrieve dashboard data from local storage, if available
  const dashboardData = localStorage.getItem("dashboardData");

  useEffect(() => {
    // Function to fetch dashboard data
    const getDashboards = async () => {
      setLoading(true);
      setError(false);

      try {
        // Fetch dashboards from a service
        const response = await DashbordService.getDashboards();

        // Fetch details for each dashboard
        const dashboardDetails = response?.dashboards?.map(
          async (dashboard) => {
            const detail = await DashbordService.getDashboardDetail(
              dashboard.id
            );
            return detail;
          }
        );

        // Resolve details for all dashboards
        const resolvedData = await Promise.all(dashboardDetails);

        // Store the dashboard data in local storage
        localStorage.setItem("dashboardData", JSON.stringify(resolvedData));

        setError(false);
        setLoading(false);
      } catch (error) {
        // Handle errors during data fetching
        setError(true);
        setLoading(false);
      } finally {
        // Reset loading and error states
        setError(false);
        setLoading(false);
      }
    };

    // Check if dashboard data is available in local storage
    if (dashboardData && dashboardData.length > 0) {
      return;
    } else {
      // Fetch dashboards if no data is found in local storage
      getDashboards();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App" data-testid="dashboard">
      {loading && (
        // Display a loading spinner when data is being fetched
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-slate-200 flex items-center justify-center w-full h-full">
          <div
            data-testid="loading-spinner"
            className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"
          ></div>
        </div>
      )}
      <HeroBanner />
      <div className="wrapper">
        {/* Render the FilterHeader component */}
        <FilterHeader
          data-testid="item-type-select"
          setDashboards={setDashboards}
          setUseLocalStorage={setUseLocalStorage}
          resolvedData={dashboardData}
        />

        {/* Render the AccordionData component */}
        <AccordionData
          dashboards={dashboards}
          useLocalStorage={useLocalStorage}
          setUseLocalStorage={setUseLocalStorage}
        />
      </div>
      {error && (
        // Display an error message if an error occurs
        <Alert color="failure" icon={HiInformationCircle} role="alert">
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
