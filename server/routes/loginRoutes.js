

const loginRoutes = (app) => {
    app.post(`/api/login`, async (req, res) => {
     const session = req.session;
    if (req.body.email && req.body.username) {
     session.email = req.body.email
     session.username = req.body.username
    }
     res.end()
     //todo send email to mongodb
    //  if(session.email) {
    //    return res.status(200).send({email:"test@test.com"});
    //  } else {
    //      console.log("error")
    //      return res.status(400).send("Request failed");
    //  }
    });
}


module.exports = loginRoutes;