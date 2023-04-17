import { RegistrationForm, SignIn } from "../components/Forms";
import BgImage from "../images/auth-bg.png";
import React, { useState } from "react";
const FORMS = {
  LOGIN: "LOGIN",
  REGISTRATION: "REGISTRATION",
};
export function AuthScreen() {
  const [currentForm, setCurrentForm] = useState(FORMS.LOGIN);

  const goToLogin = () => {
    setCurrentForm(FORMS.LOGIN);
  };
  function goToRegistration() {
    setCurrentForm(FORMS.REGISTRATION);
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems:'center',
        justifyContent:'center',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundImage: `url(${BgImage})`,
      }}
    >
        {currentForm == FORMS.LOGIN && (
          <SignIn goToRegistration={goToRegistration} />
        )}
        {currentForm == FORMS.REGISTRATION && (
          <RegistrationForm goToLogin={goToLogin} />
        )}
    </div>
  );
}
