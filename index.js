const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

require("./dbConnect")();

//middlewares
app.use(require("cors")());
app.use(express.json());
app.use(cookieParser());

//client
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//routes
app.use("/api/users", require("./routes/users"));

//starting server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
