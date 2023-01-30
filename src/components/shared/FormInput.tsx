import React from "react";
import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { SetValues } from "@mantine/form/lib/types";

type Values = {
  field: string;
};

interface IProps {
  field: string;
  value: string;
  error?: string;
  onChange: (field: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  setValues: SetValues<any>;
}

export const FormInput = ({
  field,
  value,
  error,
  onChange,
  onBlur,
  onFocus,
  setValues,
}: IProps) => {
  return (
    <TextInput
      value={value}
      error={error}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      onFocus={onFocus}
      label={field}
      placeholder={field}
      rightSection={
        <div
          style={{ cursor: "pointer", fontSize: 12, opacity: 0.6 }}
          onClick={() => setValues({ [field]: "" })}
        >
          x
        </div>
      }
      style={{
        width: "100%",
      }}
    />
  );
};
