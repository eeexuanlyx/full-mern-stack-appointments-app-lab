const express = require("express");
const {
  addNewAppointment,
  getAllAppointments,
  deleteOneAppointmentById,
  getOneAppointmentById,
  updateOneAppointment,
} = require("../controllers/appointments");
const {
  validateIdInBody,
  validateIdInParam,
} = require("../validators/appointments");
const checkErrors = require("../validators/checkErrors");
const router = express.Router();
const { auth } = require("../middleware/auth");

router.get("/appointments", auth, getAllAppointments);
router.put("/appointments", auth, addNewAppointment);
router.delete("/appointments/:id", auth, deleteOneAppointmentById);
router.post(
  "/appointments",
  auth,
  validateIdInBody,
  checkErrors,
  getOneAppointmentById
);
router.patch(
  "/appointments/:id",
  auth,
  validateIdInParam,
  updateOneAppointment
);

module.exports = router;
