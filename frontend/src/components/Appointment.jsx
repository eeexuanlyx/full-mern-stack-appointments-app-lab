import React, { useState } from "react";

import UpdateModal from "./UpdateModal";

const Appointment = (props) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <>
      {showUpdateModal && (
        <UpdateModal
          id={props.id}
          title={props.title}
          type={props.type}
          purpose={props.purpose}
          attendee={props.attendee}
          company={props.company}
          address={props.address}
          date={props.date}
          time={props.time}
          comment={props.comment}
          deleteAppointment={props.deleteAppointment}
          getAppointments={props.getAppointments}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      <div className="flex-row mb-2 ">
        <div className="card shadow-sm mt-2">
          <div className="card-body mt-2 mb-2 px-4">
            <h5 className="card-title text-primary">{props.title}</h5>
            <p className="card-text">
              <strong>Type:</strong> {props.type}
              <br />
              <strong>Purpose:</strong> {props.purpose}
              <br />
              <strong>Attendee:</strong> {props.attendee}
              <br />
              <strong>Company:</strong> {props.company}
              <br />
              <strong>Address:</strong> {props.address}
              <br />
              <strong>Date:</strong> {props.date}
              <br />
              <strong>Time:</strong> {props.time}
              <br />
              <strong>Comment:</strong> {props.comment ? props.comment : "N/A"}
            </p>
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
              onClick={() => setShowUpdateModal(true)}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
