import React, { useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user.jsx";

const OverLay = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const titleRef = useRef();
  const typeRef = useRef();
  const purposeRef = useRef();
  const attendeeRef = useRef();
  const companyRef = useRef();
  const addressRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const commentRef = useRef();

  const updateAppointment = async (id) => {
    const res = await fetchData(
      "/api/appointments/" + id,
      "PATCH",
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
      props.getAppointments();
      props.setShowUpdateModal(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    titleRef.current.value = props.title;
    typeRef.current.value = props.type;
    purposeRef.current.value = props.purpose;
    attendeeRef.current.value = props.attendee;
    companyRef.current.value = props.company;
    addressRef.current.value = props.address;
    dateRef.current.value = props.date;
    timeRef.current.value = props.time;
    commentRef.current.value = props.comment;
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="flex-row">
          <div className="card shadow-sm mt-2">
            <div className="card-body">
              <h5 className="card-title text-primary">Update Appointment</h5>

              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    ref={titleRef}
                    type="text"
                    className="form-control"
                    id="title"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>
                  <input
                    ref={typeRef}
                    type="text"
                    className="form-control"
                    id="type"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="purpose" className="form-label">
                    Purpose
                  </label>
                  <input
                    ref={purposeRef}
                    type="text"
                    className="form-control"
                    id="purpose"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="attendee" className="form-label">
                    Attendee
                  </label>
                  <input
                    ref={attendeeRef}
                    type="text"
                    className="form-control"
                    id="attendee"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="company" className="form-label">
                    Company
                  </label>
                  <input
                    ref={companyRef}
                    type="text"
                    className="form-control"
                    id="company"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    ref={addressRef}
                    type="text"
                    className="form-control"
                    id="address"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    ref={dateRef}
                    type="text"
                    className="form-control"
                    id="date"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="time" className="form-label">
                    Time
                  </label>
                  <input
                    ref={timeRef}
                    type="text"
                    className="form-control"
                    id="time"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="comment" className="form-label">
                    Comment
                  </label>
                  <input
                    ref={commentRef}
                    type="text"
                    className="form-control"
                    id="comment"
                  />
                </div>
              </form>
            </div>

            <div className="card-footer text-end">
              <button
                className="btn btn-outline-danger me-2"
                onClick={() => props.deleteAppointment(props.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() => updateAppointment(props.id)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-secondary ms-2"
                onClick={() => props.setShowUpdateModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          title={props.title}
          type={props.type}
          purpose={props.purpose}
          attendee={props.attendee}
          date={props.date}
          time={props.time}
          comment={props.comment}
          deleteAppointment={props.deleteAppointment}
          getAppointments={props.getAppointments}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;
