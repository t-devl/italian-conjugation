import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Timer from "./Timer";

describe("start button", () => {
  test("displays when game is not running", () => {
    const isGameRunning = false;
    render(<Timer isGameRunning={isGameRunning}></Timer>);

    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
  });

  test("calls function to set game running state on first click", () => {
    const setIsGameRunning = jest.fn();
    const setIsGameOver = jest.fn();
    render(
      <Timer
        setIsGameRunning={setIsGameRunning}
        setIsGameOver={setIsGameOver}
      ></Timer>
    );

    userEvent.click(screen.getByRole("button", { name: /start/i }));
    expect(setIsGameRunning).toHaveBeenCalledTimes(1);
  });
});

describe("pause button", () => {
  test("displays when game is running", () => {
    const isGameRunning = true;
    render(<Timer isGameRunning={isGameRunning}></Timer>);

    expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
  });

  test("calls function to set game running state on click", () => {
    const isGameRunning = true;
    const setIsGameRunning = jest.fn();
    const setIsGameOver = jest.fn();
    render(
      <Timer
        isGameRunning={isGameRunning}
        setIsGameRunning={setIsGameRunning}
        setIsGameOver={setIsGameOver}
      ></Timer>
    );

    userEvent.click(screen.getByRole("button", { name: /pause/i }));
    expect(setIsGameRunning).toHaveBeenCalledTimes(1);
  });
});

describe("select", () => {
  test("displays selected option", async () => {
    const isGameRunning = false;
    const isGameOver = true;
    render(
      <Timer isGameRunning={isGameRunning} isGameOver={isGameOver}></Timer>
    );

    userEvent.selectOptions(await screen.findByRole("combobox"), "60000");
    expect(screen.getByDisplayValue(/1:00/i)).toBeInTheDocument();
  });
});
