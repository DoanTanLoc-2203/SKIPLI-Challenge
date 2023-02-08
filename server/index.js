// Import lib
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");

/* ROUTE */
const createRoute = require("./src/routes/create.route");
const githubUserRoute = require("./src/routes/githubUser.route");
const userRoute = require("./src/routes/user.route");


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan("tiny"));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "ABCDEFGH",
    cookie: { maxAge: 60000 },
  })
);

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/create", createRoute);
app.use("/github", githubUserRoute);
app.use("/user", userRoute);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
