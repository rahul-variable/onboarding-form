import React from "react";
import {
  Controller,
  Control,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

interface TextInputProps<T extends FieldValues>
  extends Omit<TextFieldProps, "name" | "defaultValue"> {
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
}

export function TextInput<T extends FieldValues>({
  name,
  control,
  errors,
  onBlur,
  onFocus,
  ...props
}: TextInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...props}
          {...field}
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message as string}
          onBlur={(e) => {
            field.onBlur();
            if (onBlur) onBlur(e);
          }}
          onFocus={(e) => {
            if (onFocus) onFocus(e);
          }}
        />
      )}
    />
  );
}
