import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AnsweredIncorrectlyModal from "./AnsweredIncorrectlyModal";

test("displays results in order", () => {
  const conjugationsData = {
    arrivano: [
      { conjugation: "arrivano", subject: "lui", verb: "arrivare" },
      1,
    ],
    mangiamo: [
      { conjugation: "mangiamo", subject: "nous", verb: "mangiare" },
      3,
    ],
    parlo: [{ conjugation: "parlo", subject: "io", verb: "parlare" }, 2],
  };
  render(
    <AnsweredIncorrectlyModal
      conjugationsData={conjugationsData}
    ></AnsweredIncorrectlyModal>
  );

  expect(screen.getByRole("list").firstChild.textContent).toBe(
    "mangiare (nous) - mangiamo"
  );
});

test("close button calls function to set modal visibility state on click", () => {
  const setIsVisible = jest.fn();
  const conjugationsData = {
    arrivano: [
      { conjugation: "arrivano", subject: "lui", verb: "arrivare" },
      1,
    ],
  };
  render(
    <AnsweredIncorrectlyModal
      setIsVisible={setIsVisible}
      conjugationsData={conjugationsData}
    ></AnsweredIncorrectlyModal>
  );

  userEvent.click(screen.getByRole("button", { name: /close/i }));
  expect(setIsVisible).toHaveBeenCalledTimes(1);
});
