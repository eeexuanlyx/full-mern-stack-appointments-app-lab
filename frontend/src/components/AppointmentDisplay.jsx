import React, { useEffect, useRef, useState, useContext } from "react";
import Appointment from "./Appointment";
import useFetch from "../hooks/useFetch.jsx";
import UserContext from "../context/user.jsx";

const AppointmentDisplay = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const titleRef = useRef();
  const typeRef = useRef();
  const purposeRef = useRef();
  const attendeeRef = useRef();
  const companyRef = useRef();
  const addressRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const commentRef = useRef();

  const resetForm = () => {
    titleRef.current.value = "";
    typeRef.current.value = "";
    purposeRef.current.value = "";
    attendeeRef.current.value = "";
    companyRef.current.value = "";
    addressRef.current.value = "";
    dateRef.current.value = "";
    timeRef.current.value = "";
    commentRef.current.value = "";
  };

  const handleLogout = () => {
    userCtx.setAccessToken("");
    userCtx.setRefreshToken("");
  };

  const getAppointments = async () => {
    const res = await fetchData(
      "/api/appointments",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setAppointments(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const addAppointment = async () => {
    const res = await fetchData(
      "/api/appointments",
      "PUT",
      {
        title: titleRef.current.value,
        type: typeRef.current.value,
        purpose: purposeRef.current.value,
        attendee: attendeeRef.current.value,
        company: companyRef.current.value,
        address: addressRef.current.value,
        date: dateRef.current.value,
        time: timeRef.current.value,
        comment: commentRef.current.value,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      getAppointments();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }

    resetForm();
  };

  const deleteAppointment = async (id) => {
    // follow useFetch endpoint, method, body, token
    const res = await fetchData(
      "/api/appointments/" + id,
      "DELETE",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      getAppointments();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center mb-4 mt-2 ">
          <h1 className="h1">Appointments Tracker</h1>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-9">
          <h3>New Appointment</h3>
        </div>
        <button
          className="btn btn-outline-danger col-md-3 "
          onClick={handleLogout}
          type="submit"
        >
          logout
        </button>
      </div>

      <form className="row g-3 border rounded shadow-none p-3 mb-5 bg-light mt-4 ">
        <div className="col-12">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            ref={titleRef}
            className="form-control"
            id="title"
            placeholder="Name your appointment"
          />
        </div>
        <div className="col-6">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <input
            type="text"
            ref={typeRef}
            className="form-control"
            id="type"
            placeholder="e.g., interviews, medical, dental, lunch, dinner, etc."
          />
        </div>
        <div className="col-6">
          <label htmlFor="purpose" className="form-label">
            Purpose
          </label>
          <input
            type="text"
            ref={purposeRef}
            className="form-control"
            id="purpose"
            placeholder="e.g., meet to change deliverables"
          />
        </div>
        <div className="col-6">
          <label htmlFor="attendee" className="form-label">
            Attendee
          </label>
          <input
            type="text"
            ref={attendeeRef}
            className="form-control"
            id="attendee"
            placeholder="Who are you meeting?"
          />
        </div>
        <div className="col-6">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            type="text"
            ref={companyRef}
            className="form-control"
            id="company"
            placeholder="where the appointment is held"
          />
        </div>
        <div className="col-12">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            ref={addressRef}
            className="form-control"
            id="address"
            placeholder="address of company"
          />
        </div>
        <div className="col-6">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="text"
            ref={dateRef}
            className="form-control"
            id="date"
            placeholder="Date"
          />
        </div>
        <div className="col-6">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            type="text"
            ref={timeRef}
            className="form-control"
            id="time"
            placeholder="Time"
          />
        </div>
        <div className="col-12">
          <label htmlFor="comment" className="form-label">
            Comment
          </label>
          <input
            type="text"
            ref={commentRef}
            className="form-control"
            id="comment"
            placeholder="Comment"
          />
        </div>

        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addAppointment}
          >
            Add Appointment
          </button>
        </div>
      </form>
      <h3>Upcoming Appointments</h3>
      {appointments.map((item) => {
        return (
          <Appointment
            key={item._id}
            id={item._id}
            title={item.title}
            type={item.type}
            purpose={item.purpose}
            attendee={item.attendee}
            company={item.company}
            address={item.address}
            date={item.date}
            time={item.time}
            comment={item.comment}
            deleteAppointment={deleteAppointment}
            getAppointments={getAppointments}
          />
        );
      })}
    </div>
  );
};

export default AppointmentDisplay;
