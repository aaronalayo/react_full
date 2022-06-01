const express = require("express");
const router = express.Router();
const db = require("../connectors/db.mysql");

// Create and Save a new Teacher
router.post("/create", (req, res) => {
  /*
    #swagger.tags = ['admin', 'mysql']
    #swagger.summary = 'create a admin record in mysql database'
    #swagger.consumes = ['application/json']
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'admin details',
        required: true,
        schema: {
            "first_name": "Max",
            "last_name": "will",
            "email": "Max@test.com",
            "password": "12345678",
            "department_id": 2
        }
    } */
  console.log(req.body);
  try {
    db.sequelize.models.admin.create({

          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password
    })
      .then(newAdmin => res.send(newAdmin));
  }
  catch (error) {
    res.status(501).send(error);
  }
});


module.exports = router;