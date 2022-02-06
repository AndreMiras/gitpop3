import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("Application root", () => {
  it("renders", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("./index.jsx"); // eslint-disable-line global-require
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      div
    );
  });
});
