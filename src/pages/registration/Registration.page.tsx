import React, {FC, useState} from "react";
import {Alert, Box, Button, Step, StepLabel, Stepper, Typography} from "@mui/material";

import {SwiperClass} from "swiper/react";
import {FormProvider, useForm} from "react-hook-form";
import {AccountInfo, EegRegister} from "../../model/eeg.model";
import CommonEegPropertiesComponent from "../../components/registration/CommonEegProperties.component";
import UserEegPropertiesComponent from "../../components/registration/UserEegProperties.component";
import PontonPropertiesComponent from "../../components/registration/PontonProperties.component";
import {Api, APIError} from "../../services/eeg.service";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

const RegistrationPage: FC = () => {

  const newEeg: EegRegister = {
    tenant: "", rcNumber: "", communityId: "", online: false, name: "", settlement: "", description: "",
    user: {firstname: "", lastname: "", email: "", username: "", password: "", confirmPassword: ""},
    businessInfo: {legal: "verein", settlementInterval: "MONTHLY"},
    grid: {id: "", name: "", area: "LOCAL", allocation: "DYNAMIC"},
    pontonInfo: {
      host: "",
      password: "",
      username: "",
      port: 0,
      confirmPassword: "",
      domain: "edanet.at",
      pontonCommType: "NONE"
    },
    accountInfo: {iban: "", sepa: false, owner: ""} as AccountInfo,
    contact: {
      street: "",
      city: "",
      zip: "",
      streetNumber: "",
      phone: "",
    },
  }
  const steps: { label: string, optional?: boolean }[] = [
    {label: 'Allgemein'},
    {label: 'Betreiber'},
    // {label: 'Business'},
    // {label: 'Contact'},
    {label: 'Kommunikation'},
  ];

  // const {handleSubmit, control, watch, formState: {errors}, reset} = useForm<EegRegister>({defaultValues: newEeg})
  const formMethods = useForm<EegRegister>({defaultValues: newEeg, mode: "all"});

  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [message, setMessage] = React.useState<{message: string, severity: "success" | "error" | "warning" | "info" | undefined}>({message: "", severity: "success"});
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (index: number) => {
    const step = steps[index]
    return step.optional && step.optional;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    formMethods.reset();
  };

  const onSubmit = (data: EegRegister) => {
    try {
      Api.eegService.registerEeg(trimEegRegisterData(data))
        .then(r => {
          setMessage({message: "Mitglied wurde angelegt!", severity: "success"})
          setOpen(true)
          handleReset()
        })
        .catch((e: APIError) => {
          console.log("ERROR-Request: ", e, "Code: ", e.code)
          switch (e.code) {
            case 501:
              setMessage({message: e.message, severity: "error"})
              break;
            case 502:
            case 510:
              setMessage({message: e.message, severity: "warning"})
              break;
            default:
              setMessage({message: "Error beim Anlegen des Mitglieds", severity: "error"})
          }
          setOpen(true)
          handleReset()
        })
    } catch (e) {
      console.log("ERROR: ", e)
    }
  };

  const trimEegRegisterData = (data: EegRegister): EegRegister => {
    data.name = data.name.trim()
    data.communityId = data.communityId.trim();
    data.description = data.description.trim();
    data.rcNumber = data.rcNumber.trim();
    data.settlement = data.settlement.trim();
    data.accountInfo.iban = data.accountInfo.iban.trim();
    data.accountInfo.owner = data.accountInfo.owner.trim();
    data.contact.city = data.contact.city.trim();
    data.contact.phone = data.contact.phone.trim();
    data.contact.streetNumber = data.contact.streetNumber.trim();
    data.contact.zip = data.contact.zip.trim();
    data.contact.street = data.contact.street.trim();
    data.pontonInfo.host = data.pontonInfo.host.trim();
    data.pontonInfo.domain = data.pontonInfo.domain.trim();
    data.grid.name = data.grid.name.trim();
    data.grid.id = data.grid.id.trim();
    data.user.email = data.user.email.trim();
    data.user.firstname = data.user.firstname.trim();
    data.user.lastname = data.user.lastname.trim();
    data.user.username = data.user.username.trim()

    return data;
  }

  const renderStep = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return <CommonEegPropertiesComponent/>
      case 1:
        return <UserEegPropertiesComponent control={formMethods.control} watch={formMethods.watch}/>
      // case 2:
      //   return <BusinessEegPropertiesComponent control={formMethods.control}/>
      // case 3:
      //   return <AddressEegPropertiesComponent />
      case 2:
        return <PontonPropertiesComponent control={formMethods.control} watch={formMethods.watch}/>
      default:
        return <></>
    }
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" height="100%" color={"primary.main"} bgcolor={"background.paper"} overflow={"auto"} margin={"24px"}>
      <Snackbar autoHideDuration={10000} open={open} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message.message}
        </Alert>
      </Snackbar>
      <FormProvider {...formMethods} >
        <div style={{flex: "1 1 auto"}}>
          <Stepper activeStep={activeStep}>
            {steps.map((step: { label: string, optional?: boolean }, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={step.label} {...stepProps}>
                  <StepLabel {...labelProps}>{step.label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {/*{Object.values(formMethods.formState.errors).map((e, i) => (*/}
          {/*  <div>{e.message}</div>*/}
          {/*))}*/}
          {renderStep(activeStep)}
        </div>
        <div style={{flex: "0 1 40px", paddingBottom: "10px"}}>
          <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{mr: 1}}
            >
              Back
            </Button>
            <Box sx={{flex: '1 1 auto'}}/>
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{mr: 1}}>
                Skip
              </Button>
            )}
            {(activeStep === steps.length - 1) ?
              (<Button variant="contained" onClick={formMethods.handleSubmit(onSubmit)}>
                Finish
              </Button>) :
              (<Button variant="outlined" onClick={formMethods.handleSubmit(handleNext)}>
                Next
              </Button>)
            }
          </Box>
          <span></span>
        </div>
      </FormProvider>
    </Box>
  )
}

export default RegistrationPage;