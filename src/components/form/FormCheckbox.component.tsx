import React, {FC} from "react";
import {Control, Controller} from "react-hook-form";
import {Checkbox, FormControl, FormControlLabel, InputLabel, OutlinedInput} from "@mui/material";

interface FormCheckboxComponentProps {
  control: Control<any, any>;
  label: string;
  name: string;
  size?: 'small' | 'medium' | undefined;
}

const FormCheckboxComponent: FC<FormCheckboxComponentProps> = ({control, label, name, size}) => {

  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        render={({
                   field: { onChange, value },
                   fieldState: { error },
                   formState,
                 }) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={onChange}
            />
            }
          label={label}/>
        )}
      />
    </FormControl>
  )
}

export default FormCheckboxComponent