const AppointmentsModel = require("../models/Appointments");

const addNewAppointment = async (req, res) => {
  try {
    const newAppointment = {
      title: req.body.title,
      type: req.body.type,
      purpose: req.body.purpose,
      attendee: req.body.attendee,
      company: req.body.company,
      address: req.body.address,
      date: req.body.date,
      time: req.body.time,
      comment: req.body.comment,
      owner: req.userId,
    };
    await AppointmentsModel.create(newAppointment);

    res.json({ status: "ok", msg: "appointment saved" });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ status: "error", msg: "error adding appointment" });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const allAppointments = await AppointmentsModel.find({ owner: req.userId });
    res.json(allAppointments);
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ status: "error", msg: "error getting all appointments" });
  }
};

const deleteOneAppointmentById = async (req, res) => {
  try {
    await AppointmentsModel.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", msg: "appointment deleted" });
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ status: "error", msg: "error deleting appointment" });
  }
};

const getOneAppointmentById = async (req, res) => {
  try {
    const appointment = await AppointmentsModel.findById(req.body.id);
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ status: "error", msg: "error getting appointment" });
  }
};

const updateOneAppointment = async (req, res) => {
  try {
    const updateAppointment = {};
    if ("title" in req.body) updateAppointment.title = req.body.title;
    if ("type" in req.body) updateAppointment.type = req.body.type;
    if ("purpose" in req.body) updateAppointment.purpose = req.body.purpose;
    if ("attendee" in req.body) updateAppointment.attendee = req.body.attendee;
    if ("company" in req.body) updateAppointment.company = req.body.company;
    if ("address" in req.body) updateAppointment.address = req.body.address;
    if ("date" in req.body) updateAppointment.date = req.body.date;
    if ("time" in req.body) updateAppointment.time = req.body.time;
    if ("comment" in req.body) updateAppointment.comment = req.body.comment;

    await AppointmentsModel.findByIdAndUpdate(req.params.id, updateAppointment);
    res.json({ status: "ok", msg: "appointment updated" });
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ status: "error", msg: "error updating appointment" });
  }
};

module.exports = {
  addNewAppointment,
  getAllAppointments,
  deleteOneAppointmentById,
  getOneAppointmentById,
  updateOneAppointment,
};
