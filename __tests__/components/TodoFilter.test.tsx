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
