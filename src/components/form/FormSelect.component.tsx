import React, {FC} from "react";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import {Control, Controller} from "react-hook-form";
import {SelectAllOutlined} from "@mui/icons-material";

interface FormSelectComponentProps {
  control: Control<any, any>;
  rules?: object,
  label: string;
  name: string;
  options: { key: any, value: string }[];
  placeholder?: string;
  size?: 'small' | 'medium' | undefined;
  disabled?: boolean;
}

const FormSelectComponent: FC<FormSelectComponentProps> = ({control, rules, label, name, options, disabled, ...rest}) => {
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
          <Select
            labelId={"component-outlined-"+name}
            onChange={onChange}
            label={label}
            value={value}
            disabled={disabled}
            {...rest}
          >
            {options.map((o, i) =>(
              <MenuItem key={i} value={o.key}>
                {o.value}
              </MenuItem>
            ))}

          </Select>
        )}
      />
    </FormControl>

  )
}

export default FormSelectComponent