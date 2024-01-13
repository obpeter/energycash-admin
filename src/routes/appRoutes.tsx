import HomePage from "../pages/home/HomePage";
import {RouteType} from "./config";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RegistrationPage from "../pages/registration/Registration.page";
import RegistrationPontonPage from "../pages/registration/RegistrationPonton.page";

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
    state: "registration",
    sidebarProps: {
      displayText: "Registration",
      icon: <FileDownloadOutlinedIcon />
    }
  },
  {
    path: "/register-ponton",
    element: <RegistrationPontonPage />,
    state: "registrationPonton",
    sidebarProps: {
      displayText: "Ponton Registration",
      icon: <FileDownloadOutlinedIcon />
    }
  },
];

export default appRoutes;