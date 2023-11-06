import { render, screen, fireEvent } from "@testing-library/react";
import AccordionView from "../components/AccordionItem";

describe("AccordionView Component", () => {
  const testData = {
    displayName: "Test Dashboard",
    starred: true,
    isActive: false,
    details: [
      { type: "VISUALIZATION", name: "Viz 1" },
      { type: "MAP", mapName: "Map 1" },
    ],
  };

  test("renders the AccordionView component with default values", () => {
    render(
      <AccordionView data={testData} index={0} handleFill={() => {}} handleActive={() => {}} />
    );

    // Assert that the component rendered correctly
    expect(screen.getByText("Viz 1")).toBeInTheDocument();
    
  });

  test("toggles the first star and active states when icons are clicked", () => {
    const handleFill = jest.fn();
    const handleActive = jest.fn();

    render(
      <AccordionView data={testData} index={0} handleFill={handleFill} handleActive={handleActive} />
    );

    // Get the star and active icons
    const activeStarIcon = screen.getByTestId("active-star-icon-0");
    const notActiveIcon = screen.getByTestId("not-active-icon-0");

    // Click the star icon to toggle
    fireEvent.click(activeStarIcon);
    expect(handleFill).toHaveBeenCalledWith(0, false);

    fireEvent.click(notActiveIcon);
    expect(handleActive).toHaveBeenCalledWith(0, true);
  });
});


