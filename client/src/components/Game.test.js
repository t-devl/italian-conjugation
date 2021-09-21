import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "./Game";

test("displays selected mood", () => {
  const mood = "indicativo";
  render(<Game mood={mood}></Game>);

  expect(screen.getByText(/indicativo/i)).toBeInTheDocument();
});

test("displays selected tense", () => {
  const tense = "presente";
  render(<Game tense={tense}></Game>);

  expect(screen.getByText(/presente/i)).toBeInTheDocument();
});

describe("form", () => {
  test("receives and displays current verb", () => {
    const verbData = {
      conjugation: "mangi",
      subject: "tu",
      verb: "mangiare",
    };
    render(<Game verbData={verbData}></Game>);

    expect(screen.getByText(/mangiare/i)).toBeInTheDocument();
  });

  test("results in select verb function being called when submitted if the user input matches the conjugation", () => {
    const verbData = {
      conjugation: "mangi",
      subject: "tu",
      verb: "mangiare",
    };
    const selectVerb = jest.fn();
    const isGameRunning = true;
    render(
      <Game
        verbData={verbData}
        selectVerb={selectVerb}
        isGameRunning={isGameRunning}
      ></Game>
    );

    userEvent.type(screen.getByRole("textbox"), "mangi{enter}");
    expect(selectVerb).toHaveBeenCalledTimes(1);
  });
});

describe("input", () => {
  test("is not disabled if game is running", () => {
    const isGameRunning = true;
    render(<Game isGameRunning={isGameRunning}></Game>);

    userEvent.type(screen.getByRole("textbox"), "abc");
    expect(screen.getByDisplayValue(/abc/i)).toBeInTheDocument();
  });

  test("is disabled if game is not running", () => {
    const isGameRunning = false;
    render(<Game isGameRunning={isGameRunning}></Game>);

    userEvent.type(screen.getByRole("textbox"), "abc");
    expect(screen.queryByDisplayValue(/abc/i)).not.toBeInTheDocument();
  });

  test("is given focus", () => {
    const isGameRunning = true;
    render(<Game isGameRunning={isGameRunning}></Game>);

    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});

describe("accent buttons", () => {
  test("add the accent to input when clicked", () => {
    const isGameRunning = true;
    render(<Game isGameRunning={isGameRunning}></Game>);

    userEvent.click(screen.getByRole("button", { name: /à/i }));
    userEvent.click(screen.getByRole("button", { name: /è/i }));
    expect(screen.getByDisplayValue(/àè/i)).toBeInTheDocument();
  });

  test("give input focus when clicked", () => {
    const isGameRunning = true;
    render(<Game isGameRunning={isGameRunning}></Game>);

    userEvent.click(screen.getByRole("button", { name: /à/i }));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  test("are not clickable if the game is not running", () => {
    const isGameRunning = false;
    render(<Game isGameRunning={isGameRunning}></Game>);

    userEvent.click(screen.getByRole("button", { name: /à/i }));
    expect(screen.getByRole("textbox")).not.toHaveFocus();
    expect(screen.queryByDisplayValue(/à/i)).not.toBeInTheDocument();
  });
});

test("error message displays if the user input does not match the conjugation", () => {
  const verbData = {
    conjugation: "mangi",
    subject: "tu",
    verb: "mangiare",
  };
  const isGameRunning = true;
  render(<Game verbData={verbData} isGameRunning={isGameRunning}></Game>);

  userEvent.type(screen.getByRole("textbox"), "parlo{enter}");
  expect(screen.getByText(/incorrect\. try again\./i)).toBeInTheDocument();
});
