import React, {FC} from "react";
import {useForm, useWatch} from "react-hook-form";
import {EegRegister, PontonRegister} from "../../model/eeg.model";
import {Box, Button} from "@mui/material";
import FormInputComponent from "../../components/form/FormInput.component";
import {Api} from "../../services/eeg.service";
import FormCheckboxComponent from "../../components/form/FormCheckbox.component";
import FormSelectComponent from "../../components/form/FormSelect.component";
// import {eegService} from "../../services/eeg.service";

const RegistrationPontonPage: FC = () => {
  const [open, setOpen] = React.useState(true);
  const [message, setMessage] = React.useState({message: "", severity: "success"});

  const pontonReg: PontonRegister = {
    tenant: "", pontonInfo: {password: "", domain: "edanet.at", username: "", pontonCommType: "KEP"},
  } as PontonRegister

  const {handleSubmit, control, watch, formState: {errors}, reset} = useForm<PontonRegister>({defaultValues: pontonReg})

  const commType = useWatch({control: control, name: 'pontonInfo.pontonCommType'})

  const onSubmit = (data: PontonRegister) => {
    console.log(data)
    try {
      Api.eegService.registerPonton(data)
        .then(r => {
          setMessage({message: "Mitglied wurde angelegt!", severity: "success"})
          setOpen(true)
          reset()
        })
        .catch(e => {
          setMessage({message: "Error beim Anlegen des Mitglieds", severity: "warning"})
          setOpen(true)
          reset()
        })
    } catch (e) {
      console.log(e)
    }
  };
  return (
    <Box className={"flex-col-mgap"} style={{padding: "16px"}}>

      <h2>Ponton Verbindung</h2>

      <FormInputComponent name={"tenant"} label="EEG RC-Nummer" control={control} type="text"
                          rules={{required: "RC-Nummer erforderlich"}}/>

      <FormSelectComponent control={control} label={"Ponton Kommunikation"} name={"pontonInfo.pontonCommType"} options={[
        {key: "KEP", value: "Kep Server"},
        {key: "MAIL", value: "E-Mail"},
      ]}></FormSelectComponent>
      {commType === 'MAIL' &&
          <>
              <FormInputComponent name={"pontonInfo.domain"} label="Ponton SMTP Domain Name" control={control} type="text"
                                  rules={{required: "Email Domainname fehlt!"}}/>
              <FormInputComponent name={"pontonInfo.username"} label="Ponton SMTP Username" control={control} type="text"
                                  rules={{required: "Email Benutzername fehlt!"}}/>
              <FormInputComponent name={"pontonInfo.password"} label="Passwort" control={control} type="password"
                                  rules={{required: "Passwort fehlt!"}}/>
              <FormInputComponent name={"pontonInfo.confirmPassword"} label="Passwort bestätigen" control={control} type="password"
                                  rules={{validate: (value: string) => (watch ? value === watch("pontonInfo.password") : false) || "Ponton Passwords do not match"}}/>
          </>
      }
      <div style={{flex: "0 1 40px"}}>
        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
          <Box sx={{flex: '1 1 auto'}}/>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Finish
          </Button>
        </Box>
      </div>
    </Box>
  )
}

export default RegistrationPontonPage;