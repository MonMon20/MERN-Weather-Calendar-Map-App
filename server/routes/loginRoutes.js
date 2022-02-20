const UserSchema = require("../models/UserSchema");

const loginRoutes = (app) => {
  app.post(`/api/login`, async (req, res) => {
    const session = req.session;
    console.log(req.body);
    const { email, password, username } = req.body;
    if (!email || !username || !password) {
      res.status(400).json({ message: "Something missing" });
    }
    console.log(email, username);
    UserSchema.findOne({ email }).then((user) => {
      console.log(user);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      if (user.password === password) {
        //Not something thats supposed to be in production
        const userSession = { name: user.username, email: user.email };
        session.userSession = userSession;
        return res
          .status(200)
          .json({ message: "You have logged in successfully", userSession });
      } else {
        return res.status(400).send("The credentials are incorrect");
      }
    });
  });
  app.delete(`/api/logout`, async (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        return res.status(400).send("error logging out");
      }
      res.clearCookie("session_id");
      return res.status(200).send("Logout Success");
    });
  });
};

module.exports = loginRoutes;
