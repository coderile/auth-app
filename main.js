//third party inlclude the module
const express = require("express");
const logger = require("morgan");
const DB = require("mongoose");
//self made module
const config = require("./config");
const route = require("./routes/user");
//app intialization
const app = express();
//DB connection
DB.connect(config.DB_URL, () => {
  console.log("DB is connected");
});
//middleware
app.use(logger("dev"));
app.use(express.json());
//routing
app.use(route);
//PORT
const PORT = process.env.PORT || 5000;
//Start the server
app.listen(PORT, () => {
  console.log(`Server is Listening at port ${PORT}`);
});
