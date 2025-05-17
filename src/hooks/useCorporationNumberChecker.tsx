import { useEffect } from "react";
import { useCorporationValidation } from "hooks/useCorporationValidation";

export const useCorporationNumberChecker = ({
  number,
  onApiError,
  onApiSuccess,
  enabled,
}: {
  number: string;
  onApiError: (msg: string) => void;
  onApiSuccess: () => void;
  enabled: boolean;
}) => {
  const { data, isFetching, error } = useCorporationValidation(number, enabled);

  useEffect(() => {
    if (isFetching) {
      onApiError("Checking corporation number...");
    }
    if (error) {
      onApiError(error.message);
    } else if (data?.valid) {
      onApiSuccess();
    }
  }, [error, data, onApiError, onApiSuccess, isFetching]);

  return { isFetching, error };
};
