import React from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import OnboardingFormUI from "pages/onboarding/OnboardingFormUI";
import { OnboardingFormData } from "pages/onboarding/Onboarding.model";
import { onboardingFormSchema } from "pages/onboarding/OnboardingForm.schema";
import { Form } from "components/Form/Form";
import { useForm } from "react-hook-form";
import {
  StyledBox,
  StyledContainer,
} from "pages/onboarding/OnboardingForm.style";
import { useOnboardingSubmit } from "hooks/useOnboardingSubmit";

const initialValues: OnboardingFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  corporationNumber: "",
};

function OnboardingForm() {
  const formHook = useForm<OnboardingFormData>({
    resolver: joiResolver(onboardingFormSchema),
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues: initialValues,
  });

  const { mutate } = useOnboardingSubmit();
  const onSubmit = (data: OnboardingFormData) => {
    if (Object.keys(formHook.formState.errors).length === 0) {
      mutate(data);
    }
  };

  return (
    <StyledBox>
      <StyledContainer>
        <Form<OnboardingFormData> onSubmit={onSubmit} {...formHook}>
          <OnboardingFormUI />
        </Form>
      </StyledContainer>
    </StyledBox>
  );
}

export default OnboardingForm;
