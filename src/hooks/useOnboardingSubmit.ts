import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { OnboardingFormData } from "pages/onboarding/Onboarding.model";
import { fetchData } from "utils/fetch";

export const useOnboardingSubmit = () => {
  return useMutation({
    mutationKey: ["onboarding"],
    mutationFn: (data: OnboardingFormData) => {
      return fetchData(
        "https://fe-hometask-api.qa.vault.tryvault.com/profile-details",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
    },
    onSuccess: () => {
      enqueueSnackbar("Onboarding submitted successfully", {
        variant: "success",
      });
    },
    onError: (e: Error) => {
      enqueueSnackbar(e.message || "Onboarding submission failed", {
        variant: "error",
      });
    },
  });
};
