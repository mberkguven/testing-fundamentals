// Test suite for the TodoFilter component
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoFilter } from "@/components/TodoFilter";

let onChange: jest.Mock;
beforeEach(() => {
  onChange = jest.fn();
});

// Test: Should call onChange with 'active' when active filter is clicked
it("calls onChange with 'active' when active filter is clicked", () => {
  render(<TodoFilter current="all" onChange={onChange} />);
  fireEvent.click(screen.getByLabelText("filter-active"));
  expect(onChange).toHaveBeenCalledWith("active");
});

// Test: Should call onChange with 'completed' when completed filter is clicked
it("calls onChange with 'completed' when completed filter is clicked", () => {
  render(<TodoFilter current="all" onChange={onChange} />);
  fireEvent.click(screen.getByLabelText("filter-completed"));
  expect(onChange).toHaveBeenCalledWith("completed");
});

// Test: Applies active styles to the current filter button
it("applies active styles to the current filter button", () => {
  render(<TodoFilter current="active" onChange={onChange} />);
  const activeBtn = screen.getByLabelText("filter-active");
  const allBtn = screen.getByLabelText("filter-all");
  expect(activeBtn).toHaveClass("bg-blue-600", "text-white");
  expect(allBtn).not.toHaveClass("bg-blue-600");
});

// // Uncomment the test below to see a failing example of style assertions.
// // It intentionally expects the wrong button to be active, so it will fail.
// it("marks 'all' as active when current is 'active' (this will fail)", () => {
//   render(<TodoFilter current="active" onChange={onChange} />);
//   expect(screen.getByLabelText("filter-all")).toHaveClass("bg-blue-600");
// });
