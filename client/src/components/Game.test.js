import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "./Game";

test("displays selected mood", () => {
  const mood = "indicativo";
  const fetchedVerbsData = [];
  render(<Game mood={mood} fetchedVerbsData={fetchedVerbsData}></Game>);

  expect(screen.getByText(/indicativo/i)).toBeInTheDocument();
});

test("displays selected tense", () => {
  const tense = "presente";
  const fetchedVerbsData = [];
  render(<Game tense={tense} fetchedVerbsData={fetchedVerbsData}></Game>);

  expect(screen.getByText(/presente/i)).toBeInTheDocument();
});

describe("form", () => {
  test("displays current verb", () => {
    const fetchedVerbsData = [
      {
        conjugation: "mangi",
        subject: "tu",
        verb: "mangiare",
        weight: 3,
      },
    ];
    render(<Game fetchedVerbsData={fetchedVerbsData}></Game>);

    expect(screen.getByText(/mangiare/i)).toBeInTheDocument();
  });

  test("does not accept empty submitted user input", () => {
    const fetchedVerbsData = [];
    const isGameRunning = true;
    render(
      <Game
        fetchedVerbsData={fetchedVerbsData}
        isGameRunning={isGameRunning}
      ></Game>
    );

    userEvent.type(screen.getByRole("textbox"), "{enter}");
    expect(screen.getByText(/input cannot be empty\./i)).toBeInTheDocument();
  });

  test("does not accept only whitespace submitted user input", () => {
    const fetchedVerbsData = [];
    const isGameRunning = true;
    render(
      <Game
        fetchedVerbsData={fetchedVerbsData}
        isGameRunning={isGameRunning}
      ></Game>
    );

    userEvent.type(screen.getByRole("textbox"), "{space}{space}{space}{enter}");
    expect(screen.getByText(/input cannot be empty\./i)).toBeInTheDocument();
  });

  test("only accepts letters for submitted user input", () => {
    const fetchedVerbsData = [
      {
        conjugation: "conjugation",
        weight: 3,
      },
    ];
    const isGameRunning = true;
    render(
      <Game
        fetchedVerbsData={fetchedVerbsData}
        isGameRunning={isGameRunning}
      ></Game>
    );

    userEvent.type(screen.getByRole("textbox"), "123{enter}");
    expect(
      screen.getByText(
        /input can only include letters, single spaces and apostrophes\. input must start with a letter and end with a letter or an apostrophe\./i
      )
    ).toBeInTheDocument();

    userEvent.clear(screen.getByRole("textbox"));
    userEvent.type(screen.getByRole("textbox"), "tèxt{enter}");
    expect(
      screen.queryByText(
        /input can only include letters, single spaces and apostrophes\. input must start with a letter and end with a letter or an apostrophe\./i
      )
    ).not.toBeInTheDocument();
  });
});

describe("input", () => {
  test("is not disabled if game is running", () => {
    const fetchedVerbsData = [];
    const isGameRunning = true;
    render(
      <Game
        fetchedVerbsData={fetchedVerbsData}
        isGameRunning={isGameRunning}
      ></Game>
    );

    userEvent.type(screen.getByRole("textbox"), "abc");
    expect(screen.getByDisplayValue(/abc/i)).toBeInTheDocument();
  });

  test("is disabled if game is not running", () => {
    const fetchedVerbsData = [];
    const isGameRunning = false;
    render(
      <Game
        fetchedVerbsData={fetchedVerbsData}
        isGameRunning={isGameRunning}
      ></Game>
    );

    userEvent.type(screen.getByRole("textbox"), "abc");
    expect(screen.queryByDisplayValue(/abc/i)).not.toBeInTheDocument();
  });

  test("is given focus", () => {
    const fetchedVerbsData = [];
    const isGameRunning = true;
    render(
      <Game
        fetchedVerbsData={fetchedVerbsData}
        isGameRunning={isGameRunning}
      ></Game>
    );

    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});

describe("accent buttons", () => {
  test("add the accent to input when clicked", () => {
    const fetchedVerbsData = [];
    const isGameRunning = true;
    render(
      <Game
        fetchedVerbsData={fetchedVerbsData}
        isGameRunning={isGameRunning}
      ></Game>
    );

    userEvent.click(screen.getByRole("button", { name: /à/i }));
    userEvent.click(screen.getByRole("button", { name: /è/i }));
    expect(screen.getByDisplayValue(/àè/i)).toBeInTheDocument();
  });

  test("give input focus when clicked", () => {
    const fetchedVerbsData = [];
    const isGameRunning = true;
    render(
      <Game
        fetchedVerbsData={fetchedVerbsData}
        isGameRunning={isGameRunning}
      ></Game>
    );

    userEvent.click(screen.getByRole("button", { name: /à/i }));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  test("are not clickable if the game is not running", () => {
    const fetchedVerbsData = [];
    const isGameRunning = false;
    render(
      <Game
        fetchedVerbsData={fetchedVerbsData}
        isGameRunning={isGameRunning}
      ></Game>
    );

    userEvent.click(screen.getByRole("button", { name: /à/i }));
    expect(screen.getByRole("textbox")).not.toHaveFocus();
    expect(screen.queryByDisplayValue(/à/i)).not.toBeInTheDocument();
  });
});

test("error message displays if the user input does not match the conjugation", () => {
  const fetchedVerbsData = [
    {
      conjugation: "mangi",
      subject: "tu",
      verb: "mangiare",
      weight: 3,
    },
  ];
  const isGameRunning = true;
  render(
    <Game
      fetchedVerbsData={fetchedVerbsData}
      isGameRunning={isGameRunning}
    ></Game>
  );

  userEvent.type(screen.getByRole("textbox"), "parlo{enter}");
  expect(screen.getByText(/incorrect\. try again\./i)).toBeInTheDocument();
});
