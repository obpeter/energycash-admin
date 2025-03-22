import {FC} from "react";
import {useSelector} from "react-redux";
import {selectedEeg} from "../../redux/features/eegStateSlice";
import {Box, Grid} from "@mui/material";


const EegMemberDetailsComponent: FC = () => {

  const eeg = useSelector(selectedEeg)

  if (!eeg) {
    return (
      <></>
    )
  }

  return (
    <Box sx={{margin: "16px"}}>
      <Grid container >
        <Grid item xs={6}>
          <div>{eeg.description}</div>
        </Grid>
        <Grid item xs={6}>
          <div>{eeg.allocationMode}</div>
        </Grid>

      </Grid>
    </Box>
  )
}

export default EegMemberDetailsComponent