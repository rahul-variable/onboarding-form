import React, { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Grid, Typography } from "@mui/material";
import { TextInput } from "components/Inputs/TextInput";
import {
  StyledFormWrapper,
  StyledSubmitButton,
} from "pages/onboarding/OnboardingForm.style";
import { useCorporationNumberChecker } from "hooks/useCorporationNumberChecker";
import { OnboardingFormData } from "pages/onboarding/Onboarding.model";
import { useIsMutating } from "@tanstack/react-query";

const OnboardingFormUI: React.FC = () => {
  const {
    control,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useFormContext<OnboardingFormData>();

  const [corpBlurred, setCorpBlurred] = useState(false);
  const isMutating = useIsMutating({ mutationKey: ["onboarding"] });

  const corporationNumber = watch("corporationNumber");

  const handleApiError = useCallback(
    (msg: string) => {
      setError("corporationNumber", {
        type: "manual",
        message: msg,
      });
    },
    [setError]
  );

  const handleApiSuccess = useCallback(() => {
    clearErrors("corporationNumber");
  }, [clearErrors]);

  const { error } = useCorporationNumberChecker({
    number: corporationNumber,
    onApiError: handleApiError,
    onApiSuccess: handleApiSuccess,
    enabled: corpBlurred && corporationNumber.length === 9,
  });

  useEffect(() => {
    if (error) {
      setError("corporationNumber", {
        type: "manual",
        message: error.message,
      });
    }
  }, [error, setError, errors]);

  return (
    <StyledFormWrapper>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 400, fontFamily: "inherit" }}
      >
        Onboarding Form
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextInput
            name="firstName"
            control={control}
            label="First Name"
            fullWidth
            errors={errors}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextInput
            name="lastName"
            control={control}
            label="Last Name"
            fullWidth
            errors={errors}
          />
        </Grid>
        <Grid size={12}>
          <TextInput
            name="phone"
            control={control}
            label="Phone Number"
            fullWidth
            errors={errors}
          />
        </Grid>
        <Grid size={12}>
          <TextInput
            name="corporationNumber"
            control={control}
            label="Corporation Number"
            fullWidth
            errors={errors}
            onBlur={() => setCorpBlurred(true)}
            onFocus={() => setCorpBlurred(false)}
          />
        </Grid>
        <Grid size={12}>
          <StyledSubmitButton
            loading={!!isMutating}
            type="submit"
            fullWidth
            variant="contained"
            loadingPosition="end"
            endIcon={<span style={{ fontSize: 22, marginLeft: 8 }}>→</span>}
          >
            Submit
          </StyledSubmitButton>
        </Grid>
      </Grid>
    </StyledFormWrapper>
  );
};

export default OnboardingFormUI;
