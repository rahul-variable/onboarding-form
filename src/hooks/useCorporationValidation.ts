import { useQuery } from "@tanstack/react-query";
import { fetchData } from "utils/fetch";

export function useCorporationValidation(number: string, enabled: boolean) {
  return useQuery({
    queryKey: ["corporationNumber", number],
    queryFn: () =>
      fetchData<{ valid: boolean }>(
        `https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/${number}`
      ),
    enabled,
  });
}
