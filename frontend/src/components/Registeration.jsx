import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const Registration = (props) => {
  const fetchData = useFetch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async () => {
    setIsError(false);
    setError(null);
    const res = await fetchData("/auth/register", "PUT", {
      email,
      password,
    });

    if (res.ok) {
      setEmail("");
      setPassword("");
      props.setShowLogin(true);
      props.setSignedUp(true);
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
      <div className="col-md-12 text-center mb-4 ">
        <h1 className="h1">Appointments Tracker</h1>
      </div>
      <div className="row mt-5 ">
        <div className="col-md-4"></div>
        <input
          className="form-control-lg col-md-4 mb-1"
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div className="col-md-4"></div>
      </div>

      <div className="row">
        <div className="col-md-4"></div>
        <input
          className="form-control-lg col-md-4 mb-3"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="col-md-4"></div>
      </div>

      <div className="row">
        <div className="col-md-4"></div>
        <button
          className="btn btn-outline-success col-md-4"
          type="submit"
          onClick={registerUser}
        >
          register
        </button>
        <div className="col-md-4"></div>
      </div>

      <div className="row">
        <div className="col-md-4"></div>
        <button
          className="btn btn-link"
          onClick={() => props.setShowLogin(true)}
          type="submit"
        >
          Already signed up? Login Here
        </button>
        <div className="col-md-4"></div>
      </div>
    </>
  );
};

export default Registration;
