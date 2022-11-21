import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "../App";

describe("username", () => {
  it("exist username", () => {
    render(<App />);
    expect(screen.getByText("username")).toBeInTheDocument()
  });
});
