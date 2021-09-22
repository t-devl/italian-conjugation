import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "./Game";

test("displays selected mood", () => {
  const mood = "indicativo";
  const verbsData = [];
  render(<Game mood={mood} verbsData={verbsData}></Game>);

  expect(screen.getByText(/indicativo/i)).toBeInTheDocument();
});

test("displays selected tense", () => {
  const tense = "presente";
  const verbsData = [];
  render(<Game tense={tense} verbsData={verbsData}></Game>);

  expect(screen.getByText(/presente/i)).toBeInTheDocument();
});

describe("form", () => {
  test("displays current verb", () => {
    const verbsData = [
      {
        conjugation: "mangi",
        subject: "tu",
        verb: "mangiare",
      },
    ];
    render(<Game verbsData={verbsData}></Game>);

    expect(screen.getByText(/mangiare/i)).toBeInTheDocument();
  });

  test("does not accept empty submitted user input", () => {
    const verbsData = [];
    const isGameRunning = true;
    render(<Game verbsData={verbsData} isGameRunning={isGameRunning}></Game>);

    userEvent.type(screen.getByRole("textbox"), "{enter}");
    expect(screen.getByText(/input cannot be empty\./i)).toBeInTheDocument();
  });

  test("does not accept only whitespace submitted user input", () => {
    const verbsData = [];
    const isGameRunning = true;
    render(<Game verbsData={verbsData} isGameRunning={isGameRunning}></Game>);

    userEvent.type(screen.getByRole("textbox"), "{space}{space}{space}{enter}");
    expect(screen.getByText(/input cannot be empty\./i)).toBeInTheDocument();
  });

  test("only accepts letters for submitted user input", () => {
    const verbsData = [];
    const isGameRunning = true;
    render(<Game verbsData={verbsData} isGameRunning={isGameRunning}></Game>);

    userEvent.type(screen.getByRole("textbox"), "123{enter}");
    expect(
      screen.getByText(/input must be made up of letters\./i)
    ).toBeInTheDocument();

    userEvent.clear(screen.getByRole("textbox"));
    userEvent.type(screen.getByRole("textbox"), "text");
    expect(
      screen.queryByText(/input must be made up of letters\./i)
    ).not.toBeInTheDocument();
  });
});

describe("input", () => {
  test("is not disabled if game is running", () => {
    const verbsData = [];
    const isGameRunning = true;
    render(<Game verbsData={verbsData} isGameRunning={isGameRunning}></Game>);

    userEvent.type(screen.getByRole("textbox"), "abc");
    expect(screen.getByDisplayValue(/abc/i)).toBeInTheDocument();
  });

  test("is disabled if game is not running", () => {
    const verbsData = [];
    const isGameRunning = false;
    render(<Game verbsData={verbsData} isGameRunning={isGameRunning}></Game>);

    userEvent.type(screen.getByRole("textbox"), "abc");
    expect(screen.queryByDisplayValue(/abc/i)).not.toBeInTheDocument();
  });

  test("is given focus", () => {
    const verbsData = [];
    const isGameRunning = true;
    render(<Game verbsData={verbsData} isGameRunning={isGameRunning}></Game>);

    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});

describe("accent buttons", () => {
  test("add the accent to input when clicked", () => {
    const verbsData = [];
    const isGameRunning = true;
    render(<Game verbsData={verbsData} isGameRunning={isGameRunning}></Game>);

    userEvent.click(screen.getByRole("button", { name: /à/i }));
    userEvent.click(screen.getByRole("button", { name: /è/i }));
    expect(screen.getByDisplayValue(/àè/i)).toBeInTheDocument();
  });

  test("give input focus when clicked", () => {
    const verbsData = [];
    const isGameRunning = true;
    render(<Game verbsData={verbsData} isGameRunning={isGameRunning}></Game>);

    userEvent.click(screen.getByRole("button", { name: /à/i }));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  test("are not clickable if the game is not running", () => {
    const verbsData = [];
    const isGameRunning = false;
    render(<Game verbsData={verbsData} isGameRunning={isGameRunning}></Game>);

    userEvent.click(screen.getByRole("button", { name: /à/i }));
    expect(screen.getByRole("textbox")).not.toHaveFocus();
    expect(screen.queryByDisplayValue(/à/i)).not.toBeInTheDocument();
  });
});

test("error message displays if the user input does not match the conjugation", () => {
  const verbsData = [
    {
      conjugation: "mangi",
      subject: "tu",
      verb: "mangiare",
    },
  ];
  const isGameRunning = true;
  render(<Game verbsData={verbsData} isGameRunning={isGameRunning}></Game>);

  userEvent.type(screen.getByRole("textbox"), "parlo{enter}");
  expect(screen.getByText(/incorrect\. try again\./i)).toBeInTheDocument();
});
