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

test("receives and displays current verb", () => {
  const verbData = {
    conjugation: "mangi",
    subject: "tu",
    verb: "mangiare",
  };
  render(<Game verbData={verbData}></Game>);

  expect(screen.getByText(/mangiare/i)).toBeInTheDocument();
});

test("select verb function is called if the submitted answer is correct", () => {
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
