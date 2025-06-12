import {ChangeEvent, FC} from "react";
import {useParticipantContext} from "./context/participant.context";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {Search} from "@mui/icons-material";
import {StyledInputBase} from "./components/InputBase.component";


export const MemberSearchComponent: FC = () => {
  const {setSearchItem} = useParticipantContext()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              spellCheck={false}
              onInput={(e: ChangeEvent<HTMLInputElement>) => setSearchItem(e.target?.value)}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  )
}