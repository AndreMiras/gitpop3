import { describe, it, expect, vi, beforeAll } from "vitest";
import React from "react";

// Mock ReactDOM before importing index
const mockRender = vi.fn();
vi.mock("react-dom", () => ({
  default: {
    render: mockRender,
  },
}));

describe("index.tsx", () => {
  beforeAll(async () => {
    // Setup mock DOM element
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    // Import index.tsx to trigger ReactDOM.render call
    await import("./index");
  });

  it("calls ReactDOM.render with App in StrictMode", () => {
    expect(mockRender).toHaveBeenCalledTimes(1);

    // Verify first argument: <React.StrictMode><App /></React.StrictMode>
    const firstArg = mockRender.mock.calls[0][0];
    expect(firstArg.type).toBe(React.StrictMode);
    expect(firstArg.props.children.type.name).toBe("App");
  });

  it("calls ReactDOM.render targeting the root element", () => {
    expect(mockRender).toHaveBeenCalledTimes(1);

    // Verify second argument: document.getElementById("root")
    const secondArg = mockRender.mock.calls[0][1];
    expect(secondArg).toBe(document.getElementById("root"));
    expect(secondArg?.id).toBe("root");
  });
});
