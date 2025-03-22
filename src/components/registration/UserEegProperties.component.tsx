import React, {FC, useState} from "react";
import {Control, Controller, FieldErrors, UseFormWatch} from "react-hook-form";
import {EegRegister} from "../../model/eeg.model";
import FormInputComponent from "../form/FormInput.component";
import {Box} from "@mui/material";

interface UserEegPropertiesComponentProps {
  control: Control<EegRegister, any>
  watch?: UseFormWatch<EegRegister>
}

const UserEegPropertiesComponent: FC<UserEegPropertiesComponentProps> = ({control, watch}) => {

  const [eegOnline, setEegOnline] = useState<boolean>(false)

  return (
    <Box className={"flex-col-mgap"} style={{padding: "16px"}} bgcolor={"background.paper"}>
    {/*<CorePageTemplate>*/}
      <h2>EEG Besitzer</h2>
      <FormInputComponent name={"user.firstname"} label="Vorname" control={control} type="text" rules={{required: "Vorname fehlt"}}/>
      <FormInputComponent name={"user.lastname"} label="Nachname" control={control} type="text" rules={{required: "Nachname fehlt"}}/>
      <FormInputComponent name={"user.email"} label="E-Mail" control={control} type="text" rules={{required: "E-Mail fehlt"}}/>
      <FormInputComponent name={"user.username"} label="User Name" control={control} type="text" rules={{required: "Benutzername fehlt"}}/>
      <FormInputComponent name={"user.password"} label="Passwort" control={control} type="password" rules={{required: "Passwort fehlt"}}/>
      <FormInputComponent name={"user.confirmPassword"} label="Passwort bestätigen" control={control} type="password" rules={{validate: (value:string) => (watch ? value === watch("user.password") : false) || "Passwords do not match"}}/>
    </Box>
  )
}

export default UserEegPropertiesComponent