// __tests__/OnboardingForm.test.tsx
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import OnboardingForm from "../OnboardingForm";

// Mock fetch for corporation number check and form submission
beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation((url, options) => {
    if (typeof url === "string" && url.includes("/corporation-number/")) {
      // Mock corporation number check
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ valid: true }),
      } as Response);
    }
    if (typeof url === "string" && url.includes("/profile-details")) {
      // Mock form submission
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response);
    }
    // Default mock
    return Promise.resolve({
      ok: false,
      json: () => Promise.resolve({}),
    } as Response);
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

const theme = createTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

describe("OnboardingForm", () => {
  test("renders all input fields and submit button", () => {
    render(<OnboardingForm />, { wrapper });

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Corporation Number/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("shows validation errors for empty fields", async () => {
    render(<OnboardingForm />, { wrapper });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/Enter/i).length).toBeGreaterThan(0);
    });
  });

  test("prevents submission if corporation number is invalid", async () => {
    render(<OnboardingForm />, { wrapper });

    fireEvent.input(screen.getByLabelText(/Corporation Number/i), {
      target: { value: "123" },
    });
    fireEvent.blur(screen.getByLabelText(/Corporation Number/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Corporation number must be exactly 9 characters/i)
      ).toBeInTheDocument();
    });
  });

  test("submits form with valid data", async () => {
    render(<OnboardingForm />, { wrapper });

    fireEvent.input(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.input(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.input(screen.getByLabelText(/Phone Number/i), {
      target: { value: "+11234567890" },
    });
    fireEvent.input(screen.getByLabelText(/Corporation Number/i), {
      target: { value: "123456789" },
    });

    fireEvent.blur(screen.getByLabelText(/Corporation Number/i));
    await waitFor(() => {
      expect(
        screen.getByText(/Checking corporation number.../i)
      ).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/Onboarding submitted successfully/i)
      ).toBeInTheDocument();
    });
  });
});
