import React from "react";
import { TextInput } from "@mantine/core";
import { SetValues } from "@mantine/form/lib/types";

interface IProps {
  field: string;
  value: string;
  error?: string;
  onChange: (field: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  setValues: SetValues<any>;
  width?: string;
  maxWidth?: string;
}

export const FormInput = ({
  field,
  value,
  error,
  onChange,
  onBlur,
  onFocus,
  setValues,
  width = '100%',
  maxWidth,
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
        width,
        maxWidth
      }}
    />
  );
};
