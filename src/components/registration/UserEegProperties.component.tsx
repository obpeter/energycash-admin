import React, {FC, useState} from "react";
import {Control, Controller, FieldErrors, UseFormWatch} from "react-hook-form";
import {EegRegister} from "../../model/eeg.model";
import FormInputComponent from "../form/FormInput.component";
import {Box} from "@mui/material";
import {IbanInputForm} from "../form/IbanInput.component";

interface UserEegPropertiesComponentProps {
  control: Control<EegRegister, any>
  watch?: UseFormWatch<EegRegister>
}

const UserEegPropertiesComponent: FC<UserEegPropertiesComponentProps> = ({control, watch}) => {

  const [eegOnline, setEegOnline] = useState<boolean>(false)

  return (
    <Box className={"flex-col-mgap"} style={{padding: "16px"}} bgcolor={"background.paper"}>
    {/*<CorePageTemplate>*/}
      <h2>EEG Betreiber</h2>
      <FormInputComponent name={"user.firstname"} label="Vorname" control={control} type="text" rules={{required: "Vorname fehlt"}}/>
      <FormInputComponent name={"user.lastname"} label="Nachname" control={control} type="text" rules={{required: "Nachname fehlt"}}/>
      <FormInputComponent name={"contact.street"} label="Straße" control={control} rules={{required: false}} type="text" />
      <FormInputComponent name={"contact.streetNumber"} label="Hausnummer" control={control} rules={{required: false}} type="text" />
      <FormInputComponent name={"contact.city"} label="Ort" control={control} rules={{required: false}} type="text" />
      <FormInputComponent name={"contact.zip"} label="Postleitzahl" control={control} rules={{required: false}} type="text"/>
      <FormInputComponent name={"contact.phone"} label="Telefonnummer" control={control} type="text"/>
      <FormInputComponent name={"user.email"} label="E-Mail" control={control} type="text" rules={{required: "E-Mail fehlt"}}/>
      <h4>Konto</h4>
      <IbanInputForm name={"accountInfo.iban"} label="IBAN" control={control} type="text" rules={{required: "IBAN"}}/>
      <FormInputComponent name={"accountInfo.owner"} label="Konto Inhaber" control={control} type="text" rules={{required: "Konto Inhaber"}}/>
      <h4>Keycloak User</h4>
      <FormInputComponent name={"user.username"} label="User Name" control={control} type="text"/>
      <FormInputComponent name={"user.password"} label="Passwort" control={control} type="password"/>
      <FormInputComponent name={"user.confirmPassword"} label="Passwort bestätigen" control={control} type="password" rules={{validate: (value:string) => (watch ? value === watch("user.password") : false) || "Passwords do not match"}}/>
    </Box>
  )
}

export default UserEegPropertiesComponent