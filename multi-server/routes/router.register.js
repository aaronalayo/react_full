const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require('uuid').v4
const db = require("../connectors/db.mysql");
const rateLimiter = require("../util/rate-limiter");
const { validateRegister } = require("../util/validate");

//POST
router.post("/signup", async (req, res) => {
  /*
    #swagger.tags = ['authentication/authorization', 'mysql']
    #swagger.summary = 'registertration for students and teachers'
    #swagger.consumes = ['application/json']
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'credentials',
        required: true,
        schema: {
            "email": "ASBC@kea.dk",
            "activation_code": "ASBC",
            "password": "weqweqwe",
            "repeat_password": "weqweqwe"
        }
    }
    #swagger.responses[200] = { description: "Succesfull registered and redirect to login" } */
  console.log(req.body);
  const { error } = validateRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message); //400 = bad request

  console.log(req.body);

  // We receive this from the request body
  const { email, activationCode, password } = req.body;
  const hashed_password = await bcrypt.hash(password, 10);
  const verificationString = uuid();

  db.sequelize.models.teachers
    .findOne({ where: { email: email } })
    .then((teacher) => {
      if (teacher) {
        if (teacher.password === activationCode) {
          teacher.update({ password: hashed_password, is_verified: false,
            verification_string: verificationString });
          jwt.sign(
            { role: "teacher", email: teacher.email, id: teacher.teacher_id, isVerified:false },
            process.env.JWT_SECRET,
            { expiresIn: "2d" },
            (err, token) => {
              if (err) {
                return res.status(500).send(err);
              }
              console.log("success");
              return res.status(200).json({ token });
            });
        } else {
          return res.status(400).send("Teacher: wrong activation code");
        }
      } else if (!teacher) {
        db.sequelize.models.students
          .findOne({ where: { user_name: email } })
          .then((student) => {
            if (student) {
              if (student.password === activationCode) {
                student.update({ password: hashed_password });
                jwt.sign(
                    { role: "student", email: student.email, id: student.student_id },
                    process.env.JWT_SECRET,
                    { expiresIn: "2d" },
                    (err, token) => {
                      if (err) {
                        return res.status(500).send(err);
                      }
                      console.log("success");
                      return res.status(200).json({ token });
                    });
              } else {
                return res.status(400).send("Student: wrong activation code");
              }
            } else {
              return res.status(400).send("Email is not in the system");
            }
          })
          .catch((err) => {
            //   return true;
            console.log(err);
            res.status(500).send(err)
          });
      }
    });
});

module.exports = router;
