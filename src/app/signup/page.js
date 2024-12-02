"use client";

import HeaderMain from "../componentes/header";
import LoginForm from "../componentes/user/login";
import UserRegistrationForm from "../componentes/user/register";

const signup = () => {

  return (
    <>
        <HeaderMain/>
        <UserRegistrationForm/>
        {/* <LoginForm/> */}
    </>
  );
}

export default signup;