import { ReactNode } from "react";
import {
  FormProvider,
  FieldValues,
  SubmitHandler,
  FormProviderProps,
} from "react-hook-form";

interface FormProps<T extends FieldValues> extends FormProviderProps<T> {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
}

export function Form<T extends FieldValues>({
  onSubmit,
  children,
  ...props
}: FormProps<T>) {
  return (
    <FormProvider<T> {...props}>
      <form onSubmit={props.handleSubmit(onSubmit)} noValidate>
        {children}
      </form>
    </FormProvider>
  );
}
