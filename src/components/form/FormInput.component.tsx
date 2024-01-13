import React, {FC} from "react";
import {Control, Controller} from "react-hook-form";
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";


interface FormInputComponentProps {
  control: Control<any, any>;
  rules?: object,
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  size?: 'small' | 'medium' | undefined;
  disabled?: boolean
}

const FormInputComponent: FC<FormInputComponentProps> = ({control, rules, label, name, disabled, ...rest}) => {
  return (
    <FormControl>
      <InputLabel htmlFor={"component-outlined-"+name}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={disabled ? undefined : rules}
        render={({
                   field: { onChange, value },
                   fieldState: { error },
                   formState,
                 }) => (
          <OutlinedInput
            id={"component-outlined-"+name}
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            disabled={disabled}
            {...rest}
          />
        )}
      />
    </FormControl>
  )
}

export default FormInputComponent;