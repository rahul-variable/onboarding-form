import Joi from "joi";

export const onboardingFormSchema = Joi.object({
  firstName: Joi.string().max(50).trim().required().messages({
    "string.empty": "Enter first name",
    "string.max": "First name must be at most 50 characters",
  }),
  lastName: Joi.string().max(50).trim().required().messages({
    "string.empty": "Enter last name",
    "string.max": "Last name must be at most 50 characters",
  }),
  phone: Joi.string()
    .pattern(/^\+1\d{10}$/)
    .trim()
    .required()
    .messages({
      "string.empty": "Enter phone number",
      "string.pattern.base":
        "Enter a valid Canadian phone number starting with +1 and 10 digits",
    }),
  corporationNumber: Joi.string().length(9).trim().required().messages({
    "string.empty": "Enter corporation number",
    "string.length": "Corporation number must be exactly 9 characters",
  }),
});
