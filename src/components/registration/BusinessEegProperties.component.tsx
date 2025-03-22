import React, {FC} from "react";
import {Control, Controller} from "react-hook-form";

import FormInputComponent from "../form/FormInput.component";
import FormSelectComponent from "../form/FormSelect.component";
import {Box, FormControlLabel, Switch} from "@mui/material";
import {EegRegister} from "../../model/eeg.model";
import getFieldValue from "react-hook-form/dist/logic/getFieldValue";


interface BusinessEegPropertiesComponentProps {
  control: Control<EegRegister, any>
}

const BusinessEegPropertiesComponent: FC<BusinessEegPropertiesComponentProps> = ({control}) => {
  return (
    <Box className={"flex-col-mgap"} style={{padding: "16px"}} bgcolor={"background.paper"}>
    {/*<CorePageTemplate>*/}
      <h2>Geschäftliches</h2>
      <FormInputComponent name={"businessInfo.businessNr"} label="Geschäftsnummer" control={control} type="text" placeholder="Geschäftsnummer deiner EEG"/>
      <FormInputComponent name={"businessInfo.taxNumber"} label="Streuernummer" control={control} type="text"/>
      <FormInputComponent name={"businessInfo.vatNumber"} label="Mehrwertsteuer-ID" control={control} type="text"/>

      <h4>Verrechnung</h4>
      <FormSelectComponent label={"Abrechnungszeitraum"} placeholder={"Abrechnungszeitraum"} control={control}
                  name={"businessInfo.settlementInterval"} options={[
        {key: "MONTHLY", value: "Monatlich"},
        {key: "QUARTER", value: "Vierteljährlich"},
        {key: "BIANNUAL", value: "Halbjährlich"},
        {key: "ANNUAL", value: "Jährlich"},
      ]}></FormSelectComponent>
      <FormInputComponent name={"accountInfo.iban"} label="IBAN" control={control} type="text" rules={{required: "IBAN"}}/>
      <FormInputComponent name={"accountInfo.owner"} label="Konto Inhaber" control={control} type="text" rules={{required: "Konto Inhaber"}}/>
      <FormInputComponent name={"accountInfo.bankName"} label="Bankname" control={control} type="text" rules={{required: "Bankname"}}/>
      <FormControlLabel control={
        <Controller
          name={"accountInfo.sepa"}
          control={control}
          render={({field}) => {
            const {onChange, value} = field;
            return (<Switch
              checked={value}
              onChange={onChange} />)
      }}/>} label={"Sepa"} />
    </Box>
  )
}

export default BusinessEegPropertiesComponent