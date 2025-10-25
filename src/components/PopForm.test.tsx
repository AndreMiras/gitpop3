import { describe, it, test, expect, vi } from "vitest";
import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import PopForm from "./PopForm";

library.add(fas);

test("renders", () => {
  const onSubmit = () => ({});
  const tree = renderer
    .create(<PopForm onSubmit={onSubmit} loading={false} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe.each([true, false])("loading='%s'", (loading) => {
  test("renders", () => {
    const onSubmit = () => ({});
    const tree = renderer
      .create(<PopForm onSubmit={onSubmit} loading={loading} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

test("submit", () => {
  const onSubmit = vi.fn();
  render(<PopForm onSubmit={onSubmit} loading={false} />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const expectedUrl = "https://github.com/django/django";
  fireEvent.change(searchInput, { target: { value: expectedUrl } });
  const submitButton = screen.getByRole("button");
  // mouse click
  fireEvent.click(submitButton);
  expect(onSubmit).toHaveBeenNthCalledWith(1, expectedUrl);
  // invalid URL should not trigger the submit callback
  const invalidUrl = "https://github.com/invalid-url";
  fireEvent.change(searchInput, { target: { value: invalidUrl } });
  fireEvent.click(submitButton);
  expect(onSubmit).toHaveBeenNthCalledWith(1, expectedUrl);
  // submit (keyboard Enter) should also be mapped
  fireEvent.change(searchInput, { target: { value: expectedUrl } });
  fireEvent.submit(searchInput);
  expect(onSubmit).toHaveBeenNthCalledWith(2, expectedUrl);
});

/**
 * Empty form should not trigger the submit callback
 */
test("submit empty", () => {
  const onSubmit = vi.fn();
  render(<PopForm onSubmit={onSubmit} loading={false} />);
  const searchInput = screen.getByPlaceholderText(/github.com/);
  const url = "";
  fireEvent.change(searchInput, { target: { value: url } });
  fireEvent.submit(searchInput);
  expect(onSubmit).not.toHaveBeenCalled();
});

test("renders with initial URL", () => {
  const onSubmit = vi.fn();
  const initialUrl = "https://github.com/django/django";
  render(
    <PopForm onSubmit={onSubmit} loading={false} initialUrl={initialUrl} />,
  );

  const searchInput = screen.getByPlaceholderText(
    /github.com/,
  ) as HTMLInputElement;
  expect(searchInput.value).toBe(initialUrl);
});

test("updates when initialUrl prop changes", () => {
  const onSubmit = vi.fn();
  const { rerender } = render(
    <PopForm
      onSubmit={onSubmit}
      loading={false}
      initialUrl="https://github.com/django/django"
    />,
  );

  let searchInput = screen.getByPlaceholderText(
    /github.com/,
  ) as HTMLInputElement;
  expect(searchInput.value).toBe("https://github.com/django/django");

  rerender(
    <PopForm
      onSubmit={onSubmit}
      loading={false}
      initialUrl="https://github.com/python/cpython"
    />,
  );

  searchInput = screen.getByPlaceholderText(/github.com/) as HTMLInputElement;
  expect(searchInput.value).toBe("https://github.com/python/cpython");
});
