import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {Api} from "../../services/eeg.service";
import {setEegAll, setOperators} from "../../redux/features/eegStateSlice";
import {useDispatch} from "react-redux";

const RegistrationPageLayout = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    Api.eegService.getOperators().then(operators => dispatch(setOperators(operators)))
  }, []);

  return (
    <><Outlet /></>
  );
};

export default RegistrationPageLayout;