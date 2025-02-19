require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/db/db");
const appointments = require("./src/routers/appointments");
const auth = require("./src/routers/auth");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", appointments);
app.use("/auth", auth);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
