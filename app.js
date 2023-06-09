var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectDB = require("./config/database");
const { errorMiddleware } = require("./middleware/errorMiddleware");

var indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
var eventRouter = require("./routes/events");
let itemsRouter = require("./routes/items");
let requestRouter = require("./routes/request");


var app = express();
connectDB();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cors(corsOptions));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/events", eventRouter);
app.use("/items", itemsRouter);
app.use("/request", requestRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorMiddleware);

module.exports = app;
