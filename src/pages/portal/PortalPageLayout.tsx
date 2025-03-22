import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, Grid} from "@mui/material";
import {Api} from "../../services/eeg.service";
import {EegMember} from "../../model/eeg.model";
import EegMemberDetailsComponent from "../../components/portal/EegMemberDetails.component";
import {useDispatch} from "react-redux";
import {setSelectedEeg} from "../../redux/features/eegStateSlice"

const PortalPageLayout = () => {

  const [members, setMembers] = useState<EegMember[]>()
  const dispatch = useDispatch()

  useEffect(() => {
    Api.eegService.getEeg().then(eegs => setMembers(eegs))
  }, []);


  const card = (m: EegMember) => (
    <React.Fragment>
      <CardContent>
        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
            <div>{m.tenant}</div>
            <div>{m.name}</div>
          </div>
        </div>
      </CardContent>
    </React.Fragment>
  );

  return (
    <Box height="100%" flex={1}>
      <Grid container height="100%">
        <Grid item xs={3} height="100%">
          <Box display="flex" flexDirection="column" height="100%">
            <div>Members</div>
            <div style={{overflow: "auto", flex: "1"}}>
              <Box style={{display: "flex", flexDirection: "column", rowGap: "10px", width: "100%", padding: "12px"}}
                   overflow="auto">
                {members && members.map((m, i) => {
                  return (
                    <Card variant="outlined" key={i} onClick={() => dispatch(setSelectedEeg(m))}>{card(m)}</Card>
                    //   <div style={{display: "flex", flexDirection: "column", border: "1px solid gray", width: "100%"}}>
                    //   <div style={{display: "flex", flexDirection: "row", border: "1px solid gray", width: "100%"}}>
                    //     <div>{m.tenant}</div>
                    //     <div>{m.name}</div>
                    //   </div>
                    //
                    // </div>
                  )
                })}
              </Box>
            </div>
          </Box>
        </Grid>
        <Grid item flex={1}>
          <EegMemberDetailsComponent />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortalPageLayout;