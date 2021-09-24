import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RevealAnswer from "./RevealAnswer";

describe("answer", () => {
  test("does not display when answer is set to be not visible", () => {
    const answer = "bevo";
    const isAnswerVisible = false;
    render(
      <RevealAnswer
        answer={answer}
        isAnswerVisible={isAnswerVisible}
      ></RevealAnswer>
    );

    expect(screen.queryByText(/bevo/i)).not.toBeInTheDocument();
  });

  test("displays when answer is set to be visible", () => {
    const answer = "bevo";
    const isAnswerVisible = true;
    render(
      <RevealAnswer
        answer={answer}
        isAnswerVisible={isAnswerVisible}
      ></RevealAnswer>
    );

    expect(screen.getByText(/bevo/i)).toBeInTheDocument();
  });
});

test("button calls function to set answer visibility state on click", () => {
  const setIsAnswerVisible = jest.fn();
  render(<RevealAnswer setIsAnswerVisible={setIsAnswerVisible}></RevealAnswer>);

  userEvent.click(screen.getByRole("button", { name: /reveal answer/i }));
  expect(setIsAnswerVisible).toHaveBeenCalledTimes(1);
});
