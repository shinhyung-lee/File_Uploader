require('dotenv').config();
const express = require("express");
const app = express();
const path = require("node:path");
const loginRouter = require("./routes/loginRouter");
const indexRouter = require("./routes/indexRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/assets'));

app.use("/", indexRouter);
app.use("/auth", loginRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});