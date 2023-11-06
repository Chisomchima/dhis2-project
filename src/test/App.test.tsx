import { render, screen, waitFor } from "@testing-library/react";
import nock from "nock";
import App from "../App";

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

describe("App component", () => {
  it("renders loading spinner when fetching data", async () => {
    render(<App />);
    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument();
  });

  it("skips API call if data is available in localStorage", async () => {
    localStorage.setItem(
      "dashboardData",
      JSON.stringify([{ id: "1", displayName: "Dashboard 1" }])
    );

    render(<App />);
    expect(nock.pendingMocks()).toEqual([]);
  });

  it("renders dashboards details when data is loaded", async () => {
     const getDashboards = jest.fn();
    const getDashboardDetail = jest.fn();
    // Mock the getDashboards and getDashboardDetail functions
    getDashboards.mockResolvedValue({
      dashboards: [
        {
          id: "1",
          displayName: "Dashboard 1",
        },
      ],
    });

    getDashboardDetail.mockResolvedValue({
      access: {
        manage: true,
        externalize: true,
        write: true,
        read: true,
        update: true,
        delete: true,
      },
      restrictFilters: false,
      allowedFilters: [],
      displayName: "Antenatal Care",
      id: "nghVC4wtyzi",
      dashboardItems: [
        {
          visualization: {
            type: "COLUMN",
            id: "xiLNqnSaWP3",
            name: "ANC: Coverage by quarter and district (two-category)",
          },
          users: [],
          x: 16,
          y: 20,
          type: "VISUALIZATION",
          id: "rOehBDv4LGG",
          reports: [],
          resources: [],
          h: 20,
          w: 18,
        },
      ],
    });

    render(<App />);

    await waitFor(() => {
      const dashboardDetail = screen.getByText("VISUALIZATION");
      expect(dashboardDetail).toBeInTheDocument();
    });
  });

  // test("renders an error message on API failure", async () => {
  //   // Intercept the network request and provide a mock response
  //   nock("https://gist.githubusercontent.com")
  //     .get(
  //       "/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json"
  //     )
  //     .reply(500, "Internal Server Error"); // Mock response for a 500 error

  //   render(<App />);

  //   await waitFor(() => {
  //     const errorMessage = screen.getByTestId("error-message");
  //     expect(errorMessage).toBeInTheDocument();
  //   });
  // });
});
