const UserSchema = require("../models/UserSchema");

const loginRoutes = (app) => {
  app.post(`/api/login`, async (req, res) => {
    const session = req.session;
    const { email, password, username } = req.body;
    if (!email || !username || !password) {
      res.status(400).json({ message: "Something missing" });
    }
    console.log(email, username)
    UserSchema.findOne({ username:username }).then((user) => {
        console.log(user)
      if (!user) {
       return res.status(400).json({ message: "User not found" });
      }
      const userSession = { name: user.login.username, email: user.email };
      session.userSession = userSession
      res.status(200).json({ message: "You have logged in successfully", userSession });
    });
  });
  app.get(`/api/logout`, async (req, res) => {
    req.session.destroy((error) => {
      res.status(200).send("Logout Success");
    });
  });
};

module.exports = loginRoutes;
