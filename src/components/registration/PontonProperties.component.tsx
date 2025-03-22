import React, {FC, useState} from "react";
import {Control, UseFormWatch, useWatch} from "react-hook-form";
import {EegRegister} from "../../model/eeg.model";
import {Box, Checkbox, FormControlLabel} from "@mui/material";
import FormInputComponent from "../form/FormInput.component";
import FormCheckboxComponent from "../form/FormCheckbox.component";
import FormSelectComponent from "../form/FormSelect.component";

interface PontonPropertiesComponentProps {
  control: Control<EegRegister, any>
  watch?: UseFormWatch<EegRegister>
}

const PontonPropertiesComponent: FC<PontonPropertiesComponentProps> = ({control, watch}) => {
  const [eegOnline, setEegOnline] = useState<boolean>(false)

  const online = watch ? watch("online") : false
  const commType = useWatch({control: control, name: 'pontonInfo.pontonCommType'})

  return (
    <Box className={"flex-col-mgap"} style={{padding: "16px"}} bgcolor={"background.paper"}>

      <h4>Ponton Verbindung</h4>

      {/* eslint-disable-next-line react/jsx-no-undef */}
      {/*<FormControlLabel*/}
      {/*  control={*/}
      {/*    <Checkbox*/}
      {/*      checked={eegOnline}*/}
      {/*      onChange={() => setEegOnline(!eegOnline)}*/}
      {/*      inputProps={{ 'aria-label': 'controlled' }}*/}
      {/*    />*/}
      {/*  }*/}
      {/*  label="EEG ist online"/>*/}
      <FormCheckboxComponent name={"online"} label="EEG ist online" control={control}/>
      <FormSelectComponent control={control} label={"Ponton Kommunikation"} name={"pontonInfo.pontonCommType"}
                           options={[
                             {key: "KEP", value: "Kep Server"},
                             {key: "MAIL", value: "E-Mail"},
                           ]} disabled={!online}></FormSelectComponent>
      {commType === 'MAIL' &&
          <>
              <FormInputComponent name={"pontonInfo.host"} label="Ponton SMTP Hostname" control={control} type="text"
                                  disabled={!online}/>
              <FormInputComponent name={"pontonInfo.port"} label="Ponton SMTP Portnummer" control={control} type="text"
                                  disabled={!online}/>
              <FormInputComponent name={"pontonInfo.username"} label="Ponton SMTP Username" control={control}
                                  type="text" disabled={!online}/>
              <FormInputComponent name={"pontonInfo.password"} label="Passwort" control={control} type="password"
                                  disabled={!online}/>
              <FormInputComponent name={"pontonInfo.confirmPassword"} label="Passwort bestätigen" control={control}
                                  type="password"
                                  rules={online ? {validate: (value: string) => (watch ? value === watch("pontonInfo.password") : false) || "Ponton Passwords do not match"} : undefined}
                                  disabled={!online}/>
          </>
      }
    </Box>
  )
}

export default PontonPropertiesComponent;