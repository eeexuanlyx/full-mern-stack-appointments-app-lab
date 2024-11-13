import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch.jsx";
import UserContext from "../context/user";

const Login = (props) => {
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetchData = useFetch();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setIsError(false);
    setError(null);

    const res = await fetchData("/auth/login", "POST", { email, password });

    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      userCtx.setRefreshToken(res.data.refresh);
    } else {
      console.error(res.msg);
      setError(res.msg);
      setIsError(true);
    }
  };

  return (
    <>
      <br></br>
      {isError && (
        <div className="text-center">
          <p>{error}</p>
        </div>
      )}
      <br />
      {props.signedUp && (
        <div className="text-center">
          <p>Signed Up Successful, please log in</p>
        </div>
      )}
      <div className="col-md-12 text-center mb-4 ">
        <h1 className="h1">Appointments Tracker</h1>
      </div>
      <div className="row mt-5">
        <div className="col-md-4"></div>
        <input
          type="text"
          className="form-control-lg col-md-4 mb-1"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="col-md-4"></div>
      </div>

      <div className="row">
        <div className="col-md-4"></div>
        <input
          type="password"
          className="form-control-lg col-md-4 mb-3"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="col-md-4"></div>
      </div>

      <div className="row">
        <div className="col-md-4"></div>
        <button
          className="btn btn-outline-primary col-md-4"
          onClick={handleLogin}
          type="submit"
        >
          login
        </button>
        <div className="col-md-4"></div>
      </div>

      <div className="row">
        <div className="col-md-4"></div>

        <button
          className="btn btn-link text-success"
          onClick={() => props.setShowLogin(false)}
          type="submit"
        >
          No account? Sign Up here
        </button>

        <div className="col-md-4"></div>
      </div>
    </>
  );
};

export default Login;
