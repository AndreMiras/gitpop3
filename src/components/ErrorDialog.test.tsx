import React, { ReactNode, ReactPortal } from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";
import ErrorDialog from "./ErrorDialog";

describe("ErrorDialog", () => {
  /**
   * Workaround for the modal not rendering properly in tests.
   * https://stackoverflow.com/a/58076920/185510
   */
  const oldCreatePortal = ReactDOM.createPortal;
  beforeAll(() => {
    ReactDOM.createPortal = (node: ReactNode): ReactPortal =>
      node as ReactPortal;
  });

  afterAll(() => {
    ReactDOM.createPortal = oldCreatePortal;
  });

  test("renders", () => {
    const onClose = () => ({});
    const tree = renderer
      .create(<ErrorDialog detail="Error details renders" onClose={onClose} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("onClose omitted", () => {
    const tree = renderer
      .create(<ErrorDialog detail="Error details onClose omitted" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("onClose", (done) => {
    render(<ErrorDialog detail="Error details onClose" onClose={done} />);
    const closeButton = screen.getByRole("button", {
      hidden: true,
    });
    fireEvent.click(closeButton);
  });
});
