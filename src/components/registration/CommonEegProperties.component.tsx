import React, {FC} from "react";
import {Control, FieldErrors} from "react-hook-form";
import {EegRegister} from "../../model/eeg.model";
import FormInputComponent from "../form/FormInput.component";
import FormSelectComponent from "../form/FormSelect.component";
import {Box, MenuItem, Select} from "@mui/material";

import "../component.scss"

interface CommonEegPropertiesComponentProps {
  control: Control<EegRegister, any>
}

const CommonEegPropertiesComponent: FC<CommonEegPropertiesComponentProps> = ({control}) => {
  const [value, setValue] = React.useState(1);
  return (
    <Box className={"flex-col-mgap"} style={{padding: "16px"}}>
      {/*<CorePageTemplate>*/}
      <h2>Allgemeine Einstellungen Erneuerbarer Energie Gemeinschaften</h2>
      <FormInputComponent name={"name"} label="Kurzname" control={control} rules={{required: "Name fehlt"}} type="text" placeholder="Kurzname deiner EEG"/>
      <FormInputComponent name={"description"} label="EEG Beschreibung" control={control} rules={{required: "Name fehlt"}} type="text" placeholder="Kurzbeschreibung deiner EEG"/>
      <FormInputComponent name={"rcNumber"} label="RC-Nummer" control={control} rules={{required: "RC-Nummer fehlt"}} type="text" />
      <FormInputComponent name={"communityId"} label="Gemeinschafts-ID" control={control} rules={{required: "Gemeinschafts-ID fehlt"}} type="text" />
      <FormSelectComponent name={"businessInfo.legal"} label="Rechtsform" control={control} options={[
        {key: "verein", value: "Verein"},
        {key: "genossenschaft", value: "Genossenschaft"},
        {key: "gesellschaft", value: "Gesellschaft"}]} />
      <FormSelectComponent name={"grid.allocation"} label="Verteilung" control={control} options={[
        {key: "STATIC", value: "Statisch"},
        {key: "DYNAMIC", value: "Dynamisch"}]} placeholder="Verteilung"/>
      <FormSelectComponent name={"grid.area"} label="Region" control={control} options={[
        {key: "LOCAL", value: "Local"},
        {key: "REGIONAL", value: "Regional"},
        {key: "GEA", value: "Gemeinschaftliche Erzeugungsanlagen"},
        {key: "BEG", value: "Bürgergemeinschaften"}]} placeholder="Region"/>
      <FormInputComponent name={"grid.id"} label="Netzbetreiber-ID" control={control} rules={{required: "Netzbetreiber-ID fehlt"}} type="text" />
      <FormInputComponent name={"grid.name"} label="Netzbetreiber-Name" control={control} rules={{required: "Netzbetreiber-Name fehlt"}} type="text" />
      {/*</CorePageTemplate>*/}

      {/*<FormControl sx={{ m: 1, minWidth: 120 }}>*/}
      {/*  <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>*/}
      {/*</FormControl>*/}
    </Box>

  )
}

export default CommonEegPropertiesComponent;