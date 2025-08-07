import { render, screen, fireEvent } from "@testing-library/react";
import TaskInput from "./TaskInput";

describe("TaskInput Component", () => {
  it("renders input and button", () => {
    const mockSetTask = vi.fn();
    const mockHandleAdd = vi.fn();

    render(
      <TaskInput task="" setTask={mockSetTask} handleAdd={mockHandleAdd} />
    );

    expect(screen.getByPlaceholderText("Enter task")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("calls setTask on input change", () => {
    const mockSetTask = vi.fn();
    const mockHandleAdd = vi.fn();

    render(
      <TaskInput task="" setTask={mockSetTask} handleAdd={mockHandleAdd} />
    );

    const input = screen.getByPlaceholderText("Enter task");
    fireEvent.change(input, { target: { value: "New Task" } });

    expect(mockSetTask).toHaveBeenCalledWith("New Task");
  });
  it("calls handleAdd when Add button is clicked", () => {
    const mockSetTask = vi.fn();
    const mockHandleAdd = vi.fn();

    render(
      <TaskInput
        task="Buy milk"
        setTask={mockSetTask}
        handleAdd={mockHandleAdd}
      />
    );

    const button = screen.getByRole("button", { name: /add/i });
    fireEvent.click(button);

    expect(mockHandleAdd).toHaveBeenCalled();
  });
});
