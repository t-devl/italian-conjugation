import { render, screen } from "@testing-library/react";
import Score from "./Score";

test("displays score using props", () => {
  const numerator = 1;
  const denominator = 3;
  render(<Score numerator={numerator} denominator={denominator}></Score>);

  expect(screen.getByText(/1/i)).toBeInTheDocument();
  expect(screen.getByText(/3/i)).toBeInTheDocument();
});
