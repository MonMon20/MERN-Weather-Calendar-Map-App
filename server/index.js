require("dotenv").config();

const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// IMPORT YOUR SCHEMAS HERE
require("./models/Profiles"); //This is just an example. Don't forget to delete this

const app = express();
//Initating the session.

// This is where your API is making its initial connection to the database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
});
const mongoStore = new MongoStore({
  uri: process.env.DATABASE_CONNECTION_STRING,
  collection: "my_session",
});
app.use(
  session({
    secret: "a1s2d3f4g5h6",
    store: mongoStore,
    name: "session_id",
    cookie: { maxAge: 1000 * 60 * 60 * 1 },
    sameSite: false,
    secure: false,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// IMPORT YOUR API ROUTES HERE
// Below is just an example. Don't forget to delete it.
// It's importing and using everything from the profilesRoutes.js file and also passing app as a parameter for profileRoutes to use
require("./routes/profilesRoutes")(app);
require("./routes/loginRoutes")(app);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
