import React, { useState } from "react";
import AppointmentDisplay from "./components/AppointmentDisplay";
import UserContext from "./context/user.jsx";
import Login from "./components/Login.jsx";
import Registration from "./components/Registeration.jsx";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [signedUp, setSignedUp] = useState(false);

  return (
    <>
      <UserContext.Provider
        value={{ accessToken, setAccessToken, refreshToken, setRefreshToken }}
      >
        {accessToken.length > 0 && <AppointmentDisplay />}
        {accessToken.length === 0 && showLogin && (
          <Login signedUp={signedUp} setShowLogin={setShowLogin} />
        )}
        {accessToken.length === 0 && !showLogin && (
          <Registration setShowLogin={setShowLogin} setSignedUp={setSignedUp} />
        )}
      </UserContext.Provider>
    </>
  );
}

export default App;
