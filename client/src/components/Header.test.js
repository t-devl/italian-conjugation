import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

test("open options modal function is called when change options button is clicked", () => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
  const openOptionsModal = jest.fn();
  render(<Header openOptionsModal={openOptionsModal}></Header>);

  userEvent.click(screen.getByRole("button", { name: /change options/i }));
  expect(openOptionsModal).toHaveBeenCalledTimes(1);
});
