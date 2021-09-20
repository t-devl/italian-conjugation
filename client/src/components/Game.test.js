import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
    render(<Game verbData={verbData} selectVerb={selectVerb}></Game>);

    userEvent.type(screen.getByRole("textbox"), "mangi{enter}");
    expect(selectVerb).toHaveBeenCalledTimes(1);
  });
});

describe("accent buttons", () => {
  test("add the accent to input when clicked", () => {
    render(<Game></Game>);

    userEvent.click(screen.getByRole("button", { name: /à/i }));
    userEvent.click(screen.getByRole("button", { name: /è/i }));
    expect(screen.getByDisplayValue(/àè/i)).toBeInTheDocument();
  });

  test("give input focus when clicked", () => {
    render(<Game></Game>);

    userEvent.click(screen.getByRole("button", { name: /à/i }));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});
