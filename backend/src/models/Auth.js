const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    hash: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "authAppt" }
);

module.exports = mongoose.model("Auth", AuthSchema);
