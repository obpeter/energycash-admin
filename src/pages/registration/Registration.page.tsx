import React, {FC, useState} from "react";
import {Box, Button, Snackbar, Step, StepLabel, Stepper, Typography} from "@mui/material";

import {Swiper, SwiperSlide, SwiperClass} from "swiper/react";
import {useForm} from "react-hook-form";
import {AccountInfo, Address, Contact, EegRegister, Optionals} from "../../model/eeg.model";
import CommonEegPropertiesComponent from "../../components/registration/CommonEegProperties.component";
import {Navigation, Pagination} from "swiper";
import BusinessEegPropertiesComponent from "../../components/registration/BusinessEegProperties.component";
import AddressEegPropertiesComponent from "../../components/registration/AddressEegProperties.component";
import UserEegPropertiesComponent from "../../components/registration/UserEegProperties.component";
import PontonPropertiesComponent from "../../components/registration/PontonProperties.component";
import {eegService} from "../../services/eeg.service";


const RegistrationPage: FC = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass>();
  const [open, setOpen] = React.useState(true);

  const newEeg: EegRegister = {rcNumber: "", communityId: "", online: false, name: "", salesTax: "", settlement: "", description: "",
    user: {firstname: "", lastname: "", email: "", username: "", password: "", confirmPassword: ""},
    businessInfo: {legal: "verein", taxNumber: "", vatNumber: "", businessNr: "", settlementInterval: "MONTHLY"},
    grid: {id: "", name: "", area: "LOCAL", allocation: "DYNAMIC"},
    pontonInfo: {host: "", password: "", username: "", port: 0, confirmPassword: "", domain: "edanet.at"},
    accountInfo: {iban: "", sepa: false, owner:"", bankName: ""} as AccountInfo,
    contact: {street:"", city: "", zip: "", streetNumber: "", web: "", email: "", phone: "", owner: "", contactPerson: ""},
  }
  const steps: {label: string, optional?: boolean}[] = [
    {label: 'Common'},
    {label: 'Business'},
    {label: 'User'},
    {label: 'Contact'},
    {label: 'Interface'},
  ];

  const {handleSubmit, control, watch, formState: {errors}, reset} = useForm<EegRegister>({defaultValues: newEeg})

  const [activeStep, setActiveStep] = React.useState(0);
  const [message, setMessage] = React.useState({message: "", severity: "success"});
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (index: number) => {
    const step = steps[index]
    return step.optional && step.optional === true;
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
    reset();
  };

  const onSubmit = (data: EegRegister) => {
    try {
      eegService.registerEeg(trimEegRegisterData(data))
        .then(r => {
          setMessage({message: "Mitglied wurde angelegt!", severity: "success"})
          setOpen(true)
          handleReset()
        })
        .catch(e => {
          setMessage({message: "Error beim Anlegen des Mitglieds", severity: "warning"})
          setOpen(true)
          handleReset()
        })
    } catch (e) {
      console.log(e)
    }
  };

  const trimEegRegisterData = (data: EegRegister): EegRegister => {
    data.name = data.name.trim()
    data.communityId = data.communityId.trim();
    data.description = data.description.trim();
    data.salesTax = data.salesTax.trim();
    data.rcNumber = data.rcNumber.trim();
    data.settlement = data.settlement.trim();
    data.accountInfo.iban = data.accountInfo.iban.trim();
    data.accountInfo.owner = data.accountInfo.owner.trim();
    data.contact.contactPerson = data.contact.contactPerson.trim();
    data.contact.city = data.contact.city.trim();
    data.contact.phone = data.contact.phone.trim();
    data.contact.owner = data.contact.owner.trim();
    data.contact.email = data.contact.email.trim();
    data.contact.streetNumber = data.contact.streetNumber.trim();
    data.contact.zip = data.contact.zip.trim();
    data.contact.street = data.contact.street.trim();
    data.pontonInfo.host = data.pontonInfo.host.trim();
    data.pontonInfo.domain = data.pontonInfo.domain.trim();
    data.grid.name = data.grid.name.trim();
    data.grid.id = data.grid.id.trim();
    data.businessInfo.businessNr = data.businessInfo.businessNr.trim();
    data.businessInfo.taxNumber = data.businessInfo.taxNumber.trim();
    data.businessInfo.vatNumber = data.businessInfo.vatNumber.trim();
    data.user.email = data.user.email.trim();
    data.user.firstname = data.user.firstname.trim();
    data.user.lastname = data.user.lastname.trim();

    return data;
  }

  const renderStep = (currentStep: number) => {
    switch(currentStep) {
      case 0:
        return <CommonEegPropertiesComponent control={control}/>
      case 1:
        return <BusinessEegPropertiesComponent control={control}/>
      case 2:
        return <UserEegPropertiesComponent control={control} watch={watch}/>
      case 3:
        return <AddressEegPropertiesComponent control={control}/>
      case 4:
        return <PontonPropertiesComponent control={control} watch={watch}/>
      default:
        return <></>
    }
  }

  return (
    <Box display="flex" flexDirection="column" height="100%" color={"primary"}>
      <Snackbar autoHideDuration={2000} open={open} onClose={() => setOpen(false)} message={message.message} security={message.severity}/>
        {/*<div style={{display: "flex", flexDirection: "column", height: "100%", width: "100%"}}>*/}
          {/*<div className="parent">*/}
            <div style={{flex: "1 1 auto"}}>
              <Stepper activeStep={activeStep}>
                {steps.map((step:{label: string, optional?: boolean}, index) => {
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
              {Object.values(errors).map((e, i) => (
                <div>{e.message}</div>
              ))}
              {renderStep(activeStep)}
            </div>
            <div style={{flex: "0 1 40px"}}>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                {(activeStep === steps.length - 1) ?
                  (<Button onClick={handleSubmit(onSubmit)}>
                    Finish
                  </Button>) :
                  (<Button onClick={handleNext}>
                    Next
                  </Button>)
                }
              </Box>
            </div>
          {/*</div>*/}
        {/*</div>*/}
    </Box>
  )
}

export default RegistrationPage;