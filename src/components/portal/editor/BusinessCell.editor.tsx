import {FC} from "react";
import {GridRenderCellParams} from "@mui/x-data-grid";
import {EegParticipant, Metering} from "../../../model/eeg.model";
import moment from "moment";
import {AdminUpdateData} from "../../../model/admin.model";
import {Api} from "../../../services/eeg.service";
import {Controller, useForm} from "react-hook-form";
import {CellEditElement} from "./CellEdit.element";
import {editDialog} from "../CellEdit.dialog";
import {FormControl, FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";

export const BusinessCellEditor: FC<{params: GridRenderCellParams<EegParticipant, any>, label: string, header: string, proto: string, propertyName: keyof EegParticipant, updateParticipant: (meter: EegParticipant) => void}> = ({params, label, header, proto, propertyName, updateParticipant}) => {

  const onUpdate = (participant: EegParticipant) => {

    let participantData = {
      tenant: params.row.tenant!,
      participantId: params.row.id,
      value: {[propertyName]: (participant as any)[propertyName]}} as AdminUpdateData;

    Api.portalService.changeParticipantState(proto, participantData)
      .then(row => updateParticipant(row))
      .catch(e => reset());
  }

  const { handleSubmit, control, reset } = useForm<EegParticipant>({
    defaultValues: {
      ...params.row
    },
  });

  return (
    <CellEditElement params={params} onStartEdit={(row) => {
      editDialog (
        <div>
          <FormControl>
            <Controller
              rules={{ required: true }}
              control={control}
              name={propertyName}
              render={({ field }) => (<RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                {...field}
              >
                <FormControlLabel value="EEG_PRIVATE" control={<Radio />} label="Privat" />
                <FormControlLabel value="EEG_BUSINESS" control={<Radio />} label="Business" />
              </RadioGroup>)}
            />
          </FormControl>
        </div>, header, handleSubmit(onUpdate))
    }} />
  )
}