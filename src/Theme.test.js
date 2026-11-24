import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/Banner", () => ({ Banner: () => null }));
jest.mock("./components/Background", () => ({ Background: () => null }));

test("defaults to light and remembers the selected theme across visits", () => {
  localStorage.clear();
  const first = render(<App />);
  const toggle = () => screen.getByRole("button", { name: "Dark theme" });
  expect(first.container.firstChild).toHaveAttribute("data-theme", "light");
  fireEvent.click(toggle());
  expect(first.container.firstChild).toHaveAttribute("data-theme", "dark");
  first.unmount();
  const second = render(<App />);
  expect(toggle()).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(toggle());
  expect(second.container.firstChild).toHaveAttribute("data-theme", "light");
  expect(localStorage.getItem("portfolio-theme")).toBe("light");
});
