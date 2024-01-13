import React, {FC} from "react";
import {useForm} from "react-hook-form";
import {EegRegister, PontonRegister} from "../../model/eeg.model";
import {Box, Button} from "@mui/material";
import FormInputComponent from "../../components/form/FormInput.component";
import {eegService} from "../../services/eeg.service";

const RegistrationPontonPage: FC = () => {
  const [open, setOpen] = React.useState(true);
  const [message, setMessage] = React.useState({message: "", severity: "success"});

  const pontonReg: PontonRegister = {
    password: "", tenant: "", domain: "edanet.at", username: "",
  } as PontonRegister

  const {handleSubmit, control, watch, formState: {errors}, reset} = useForm<PontonRegister>({defaultValues: pontonReg})

  const onSubmit = (data: PontonRegister) => {
    console.log(data)
    try {
      eegService.registerPonton(data)
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

      <h4>Ponton Verbindung</h4>

      <FormInputComponent name={"tenant"} label="EEG RC-Nummer" control={control} type="text"/>
      <FormInputComponent name={"domain"} label="Ponton SMTP Domain Name" control={control} type="text"/>
      <FormInputComponent name={"username"} label="Ponton SMTP Username" control={control} type="text"/>
      <FormInputComponent name={"password"} label="Passwort" control={control} type="password"/>
      <FormInputComponent name={"confirmPassword"} label="Passwort bestätigen" control={control} type="password" rules={{validate: (value:string) => (watch ? value === watch("password") : false) || "Ponton Passwords do not match"}}/>

      <div style={{flex: "0 1 40px"}}>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleSubmit(onSubmit)}>
              Finish
            </Button>
        </Box>
      </div>
    </Box>
  )
}

export default RegistrationPontonPage;