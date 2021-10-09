import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OptionsModal from "./OptionsModal";

describe("apply selections button", () => {
  test("results in apply selections function being called when clicked", () => {
    const isActive = true;
    const setIsActive = jest.fn();
    const applySelections = jest.fn();
    render(
      <OptionsModal
        isActive={isActive}
        setIsActive={setIsActive}
        applySelections={applySelections}
      ></OptionsModal>
    );

    userEvent.click(screen.getByRole("button", { name: /apply selections/i }));
    expect(applySelections).toHaveBeenCalledTimes(1);
  });

  test("closes modal when clicked", () => {
    const isActive = true;
    const setIsActive = jest.fn();
    const applySelections = jest.fn();
    render(
      <OptionsModal
        isActive={isActive}
        setIsActive={setIsActive}
        applySelections={applySelections}
      ></OptionsModal>
    );

    userEvent.click(screen.getByRole("button", { name: /apply selections/i }));
    waitFor(() => {
      expect(
        getByRole("button", { name: /apply selections/i })
      ).not.toBeInTheDocument();
    });
  });
});

describe("form selects", () => {
  test("display selected options", () => {
    const isActive = true;
    const setIsActive = jest.fn();
    const applySelections = jest.fn();
    render(
      <OptionsModal
        isActive={isActive}
        setIsActive={setIsActive}
        applySelections={applySelections}
      ></OptionsModal>
    );

    expect(screen.getByDisplayValue(/indicativo/i)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(/condizionale/i)).not.toBeInTheDocument();

    userEvent.selectOptions(
      screen.getByRole("combobox", { name: /mood/i }),
      "condizionale"
    );
    expect(screen.getByDisplayValue(/condizionale/i)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(/indicativo/i)).not.toBeInTheDocument();
  });

  test("display different tense options based on selected mood", async () => {
    const isActive = true;
    const setIsActive = jest.fn();
    const applySelections = jest.fn();
    render(
      <OptionsModal
        isActive={isActive}
        setIsActive={setIsActive}
        applySelections={applySelections}
      ></OptionsModal>
    );

    expect(await screen.findByDisplayValue(/presente/)).toBeInTheDocument();

    userEvent.selectOptions(
      screen.getByRole("combobox", { name: /mood/i }),
      "infinito"
    );
    expect(await screen.findByDisplayValue(/passato/)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(/presente/)).not.toBeInTheDocument();
  });
});
