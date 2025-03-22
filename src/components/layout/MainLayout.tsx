import {Outlet} from "react-router-dom";
import {Box, useTheme} from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import Sidebar from "../common/Sidebar";

const MainLayout = () => {
  const theme = useTheme()
  return (
    <Box sx={{ display: "flex" }} maxHeight="100vh" overflow="auto">
      {/*<Topbar />*/}
      <Box
        component="nav"
        sx={{
          width: sizeConfigs.sidebar.width,
          flexShrink: 0
        }}
      >
        <Sidebar />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${sizeConfigs.sidebar.width})`,
          minHeight: "100vh",
          maxHeight: "100vh",
          overview: "auto",
          backgroundColor: colorConfigs.mainBg
        }}
      >
        {/*<Toolbar />*/}
          <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;