const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { validateLogin } = require('../util/validate');
const ratelimiter = require('../util/rate-limiter');
const db = require('../connectors/db.mysql');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../util/authenticate');


router.post('/login', ratelimiter, async (req, res) => {

    
       /* swagger.tags = ['authentication/authorization', 'mysql']
        swagger.summary = 'login for students and teachers and get token'
        swagger.consumes = ['application/json']
        swagger.parameters['body'] = {
            in: 'body',
            description: 'credential set of email and password',
            required: true,
            schema: {
                email: "ASBC@kea.dk", 
                password: "12345678"
            }
        }
        swagger.responses[200] = { description: "Succesfull login and redirect to user's home" } */

    try {
        console.log(req.body)
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message); //400 = bad request
        // console.log("we are here")
        //Retrieve the input from frontend
        const email = req.body.email;
        const plainPassword = req.body.password;

        //Sequalize user -> Retrieve that teacher that matches the criteria
        const teacher = await db.sequelize.models.teachers.findOne({ where: { email } });
        const student = await db.sequelize.models.students.findOne({ where: { user_name: email } });
        const admin = await db.sequelize.models.admin.findOne({ where: { email } });

      
        if (teacher) {
            await bcrypt
              .compare(plainPassword, teacher.password)
              .then((isCorrect) => {
                if (isCorrect == true) {
                  jwt.sign(
                    {
                      role: "teacher",
                      email: teacher.email,
                      id: teacher.teacher_id,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "2d" },
                    (err, token) => {
                      if (err) {
                        res.status(500).json({ err });
                      }
                      res.status(200).json({ token });
                      // res.redirect('/teacher_overview')
                    }
                  );
                } else {
                  res.sendStatus(401);
                }
              });
          }
        else if (student) {
          await bcrypt
            .compare(plainPassword, student.password)
            .then((isCorrect) => {
              if (isCorrect == true) {
                jwt.sign(
                  {
                    role: "student",
                    email: student.user_name,
                    id: student.student_id,
                  },
                  process.env.JWT_SECRET,
                  { expiresIn: "2d" },
                  (err, token) => {
                    if (err) {
                      console.log({ err });
                      res.status(500).json({ err });
                    }
                    res.status(200).json({ token });
                  }
                );
              } else {
                res.status(400).json({ message: "Wrong password" });
              }
            });
        }
        else if (admin) {
          await bcrypt
            .compare(plainPassword, admin.password)
            .then((isCorrect) => {
              if (isCorrect == true) {
                jwt.sign(
                  {
                    role: "admin",
                    email: admin.email,
                    id: admin.admin_id,
                  },
                  process.env.JWT_SECRET,
                  { expiresIn: "2d" },
                  (err, token) => {
                    if (err) {
                      res.status(500).json({ err });
                    }
                    res.status(200).json({ token });
                    //res.redirect('/admin_overview')
                  }
                );
              } else {
                res.sendStatus(401);
              }
            });
        }
    } catch (error) {
        res.status(500).json({error});
    }

});


// router.get('/logout', (req, res) => {
//     res.clearCookie('accessToken');
//     return res.status(200).redirect('/login')
// })

module.exports = router;

