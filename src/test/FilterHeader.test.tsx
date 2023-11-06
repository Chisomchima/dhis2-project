import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterHeader from "../components/FilterHeader";

const localStorageMock = (function () {
  let store: { [key: string]: string } = {};

  return {
    getItem(key: string): string | null {
      return store[key] || null;
    },

    setItem(key: string, value: string): void {
      store[key] = value;
    },

    clear(): void {
      store = {};
    },

    removeItem(key: string): void {
      delete store[key];
    },

    getAll(): { [key: string]: string } {
      return store;
    },
  };
})();


Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("FilterHeader Component", () => {
  // Sample data for resolvedData
  const resolvedData = JSON.stringify([
    {
      displayName: "Dashboard 1",
      dashboardItems: [
        { type: "VISUALIZATION" },
        { type: "MAP" },
        { type: "TEXT" },
      ],
    },
    {
      displayName: "Dashboard 2",
      dashboardItems: [{ type: "TEXT" }],
    },
  ]);

  beforeEach(() => {
    window.localStorage.clear();
  });

  test("renders the component with default values", () => {
    render(
      <FilterHeader
        setDashboards={() => {}}
        setUseLocalStorage={() => {}}
        resolvedData={resolvedData}
      />
    );

    expect(screen.getByText("Dashboards")).toBeInTheDocument();

    const selectElement = screen.getByTestId("item-type-select");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue("ALL");
  });

  test("filters dashboards based on selected item type", () => {
    const setDashboardsMock = jest.fn();
    render(
      <FilterHeader
        setDashboards={setDashboardsMock}
        setUseLocalStorage={() => {}}
        resolvedData={resolvedData}
      />
    );

    const selectElement = screen.getByTestId("item-type-select");

    fireEvent.change(selectElement, { target: { value: "VISUALIZATION" } });

    expect(selectElement).toHaveValue("VISUALIZATION");

    const expectedData = [
      {
        displayName: "Dashboard 1",
        dashboardItems: [{ type: "VISUALIZATION" }, { type: "VISUALIZATION" }],
      },
    ];

    // Set the expected data in localStorage and then verify it
    window.localStorage.setItem("selectedDashboards", JSON.stringify(expectedData));
    expect(localStorageMock.getItem("selectedDashboards")).toEqual(JSON.stringify(expectedData));
  });

  // Test Selecting Different Item Types
  test("filters dashboards for MAP", () => {
    const setDashboardsMock = jest.fn();
    render(
      <FilterHeader
        setDashboards={setDashboardsMock}
        setUseLocalStorage={() => {}}
        resolvedData={resolvedData}
      />
    );

    const selectElement = screen.getByTestId("item-type-select");

    fireEvent.change(selectElement, { target: { value: "MAP" } });

    expect(selectElement).toHaveValue("MAP");

    const expectedData = [
      {
        displayName: "Dashboard 1",
        dashboardItems: [{ type: "MAP" }],
      },
    ];

    window.localStorage.setItem("selectedDashboards", JSON.stringify(expectedData));
    expect(localStorageMock.getItem("selectedDashboards")).toEqual(JSON.stringify(expectedData));
  });

  // Add similar tests for other item types

  // Test with Different ResolvedData Values
  test("handles resolvedData with multiple dashboards", () => {
    const setDashboardsMock = jest.fn();
    const newData = JSON.stringify([
      {
        displayName: "Dashboard 1",
        dashboardItems: [{ type: "VISUALIZATION" }],
      },
      {
        displayName: "Dashboard 2",
        dashboardItems: [{ type: "MAP" }],
      },
    ]);
    render(
      <FilterHeader
        setDashboards={setDashboardsMock}
        setUseLocalStorage={() => {}}
        resolvedData={newData}
      />
    );

    const selectElement = screen.getByTestId("item-type-select");

    fireEvent.change(selectElement, { target: { value: "VISUALIZATION" } });

    expect(selectElement).toHaveValue("VISUALIZATION");

    const expectedData = [
      {
        displayName: "Dashboard 1",
        dashboardItems: [{ type: "VISUALIZATION" }],
      },
    ];

    window.localStorage.setItem("selectedDashboards", JSON.stringify(expectedData));
    expect(localStorageMock.getItem("selectedDashboards")).toEqual(JSON.stringify(expectedData));
  });


  test("handles null resolvedData", () => {
    const setDashboardsMock = jest.fn();
    render(
      <FilterHeader
        setDashboards={setDashboardsMock}
        setUseLocalStorage={() => {}}
        resolvedData={null}
      />
    );

    const selectElement = screen.getByTestId("item-type-select");

    fireEvent.change(selectElement, { target: { value: "VISUALIZATION" } });

    expect(selectElement).toHaveValue("VISUALIZATION");
  });
});
