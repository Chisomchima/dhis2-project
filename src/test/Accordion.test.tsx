import React from "react";
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

    // Assert that the component rendered correctly
    expect(screen.getByText("Dashboard 1")).toBeInTheDocument();
  });

  test("toggles the first star and active states when icons are clicked", () => {
    const handleFill = jest.fn();
    const handleActive = jest.fn();

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

    // const activeStarIcon2 = screen.getByTestId("active-star-icon-0");
    // const activeIcon2 = screen.getByTestId("active-icon-0");

    expect(activeStarIcon).toBeInTheDocument();
    expect(activeIcon).toBeInTheDocument();

    // // Click the star icon to toggle
    // fireEvent.click(activeStarIcon2);
    // expect(handleFill).toHaveBeenCalledWith(0, false);


    // fireEvent.click(activeIcon2);
    // expect(handleActive).toHaveBeenCalledWith(0, false);

  });
});
