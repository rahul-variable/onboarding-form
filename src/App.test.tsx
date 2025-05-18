import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the OnboardingForm component
jest.mock("./pages/onboarding/OnboardingForm", () => {
  return function MockOnboardingForm() {
    return <div data-testid="mock-onboarding-form">Mock Onboarding Form</div>;
  };
});

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByTestId("mock-onboarding-form")).toBeInTheDocument();
  });
});
