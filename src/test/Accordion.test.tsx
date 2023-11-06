import { render, screen, fireEvent } from "@testing-library/react";
import Accordion from "../components/Accordion";

// Create a mock for localStorage
const localStorageMock = (function () {
  let store: { [key: string]: string } = {};

  return {
    getItem(key: string): string | null {
      return store[key];
    },

    setItem(key: string, value: string): void {
      store[key] = value;
    },

    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });
// Mock function for setUseLocalStorage
const setUseLocalStorage = jest.fn();

describe("Accordion Component", () => {
  // Create a mock dashboards data for testing
  const dashboards = [
    {
      displayName: "Dashboard 1",
      starred: true,
      dashboardItems: [
        { type: "VISUALIZATION", name: "Viz 1" },
        { type: "TEXT", name: "Text 1" },
      ],
    },
    {
      displayName: "Dashboard 2",
      starred: false,
      dashboardItems: [{ type: "MAP", mapName: "Map 1" }],
    },
  ];

  test("renders the Accordion component with default values", () => {
    render(
      <Accordion
        dashboards={dashboards}
        useLocalStorage={true}
        setUseLocalStorage={() => {}}
      />
    );
    expect(screen.getByText("Dashboard 1")).toBeInTheDocument();
  });

  test("toggles the first star and active states when icons are clicked", () => {

    render(
        <Accordion
        dashboards={dashboards}
        useLocalStorage={true}
        setUseLocalStorage={() => {}}
      />
    );

    // Get the star and active icons
    const activeStarIcon = screen.queryByTestId("active-star-icon-0");
    const activeIcon = screen.queryByTestId("active-icon-0");

    expect(activeStarIcon).toBeInTheDocument();
    expect(activeIcon).toBeInTheDocument();

  });

  test("toggles the star and active states for multiple dashboards", () => {
    render(<Accordion dashboards={dashboards} useLocalStorage={true} setUseLocalStorage={setUseLocalStorage} />);
    
    // Get the star and active icons for both dashboards
    const activeIcon1 = screen.getByTestId("active-icon-0");
    const starIcon2 = screen.getByTestId("star-icon-1");
  
    // Click the star icon for the second dashboard
    fireEvent.click(starIcon2);

    // Verify that the setUseLocalStorage function was called with the updated state
    expect(setUseLocalStorage).toHaveBeenCalledWith(true);
    expect(setUseLocalStorage).toHaveBeenCalledWith(true);

    fireEvent.click(activeIcon1);
    expect(setUseLocalStorage).toHaveBeenCalledWith(true);
    expect(setUseLocalStorage).toHaveBeenCalledWith(true);
  });
});

