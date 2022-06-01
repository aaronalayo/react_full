const express = require('express');
const router = express.Router();
const db = require('../connectors/db.mysql');




// Create and Save a new student
router.post("/create", (req, res) => {

    /*
   #swagger.tags = ['student', 'mysql']
   #swagger.summary = 'create a student record in mysql database'
   #swagger.consumes = ['application/json']
   #swagger.parameters['body'] = {
       in: 'body',
       description: 'Students details',
       required: true,
       schema: {
           "first_name": "Ole",
           "last_name": "Sørensen",
           "user_name": "Ole1234@kea.dk",
           "password": "Ole1234",
           "program_id": 2
       }
   } */

    try {
        db.sequelize.models.students.create({

            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            password: req.body.password,
            program_id: req.body.program_id
        }).then(newStudent => res.send(newStudent));
    }
    catch (error) {
        res.status(501).send(error);
    }
});


// Retrieve all Student from the database.

router.get("/all", (req, res) => {

    /*
   #swagger.tags = ['student', 'mysql']
   #swagger.summary = 'get all students records from mysql database'*/


    db.sequelize.models.students.findAll().then(allStudents => res.send(allStudents));

});


// Find a single Student with an id

router.get("/findOne/:id", (req, res) => {

    /*
    #swagger.tags = ['student', 'mysql']
    #swagger.summary = 'find one student from mysql database'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'student id',
        required: true
    } */

    db.sequelize.models.students.findOne({ where: { student_id: req.params.id } })
        .then(oneStudent => {
            if (!oneStudent) {
                res.status(404).send("Student not found")
            }
            else {
                res.send(oneStudent.toJSON())
            }
        })
        .catch(err => res.status(500).send('Something went wrong'));
});


// Update a student by the id 
router.post("/update/:id", (req, res) => {

    /*
    #swagger.tags = ['student', 'mysql']
    #swagger.summary = 'update a student's record details in mysql db'
    #swagger.consumes = ['application/json']
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'student details',
        required: true,
        schema: {
            "first_name": "Ole",
           "last_name": "Sørensen",
           "user_name": "Ole1234@kea.dk",
           "password": "Ole1234",
           "program_id": 2
        }
    }
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'student id',
        required: true
    } */

    const { first_name, last_name, user_name, password, program_id } = req.body;

    db.sequelize.models.students.update({

        first_name,
        last_name,
        user_name,
        password,
        program_id,
    },
        { where: { student_id: req.params.id } }

    ).then(rowsaffected => {
        if (rowsaffected == 0) {
            res.status(404).send("Student not found")
        }
        else {
            res.send("Updated student with ID: " + req.params.id)
        }
    }).catch(error => {
        console.log(error)
        return res.status(500).send({
            message: 'Unable to update data',
            errors: error
        });
    });
});

// Delete a student by id 
router.post("/delete/:id", (req, res) => {

    /*
    #swagger.tags = ['student', 'mysql']
    #swagger.summary = 'delete one student from mysql database'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'student id',
        required: true
    } */

    db.sequelize.models.students.destroy({ where: { student_id: req.params.id } })
        .then(rowDeleted => {
            if (rowDeleted == 0) {
                res.status(404).send("Student not found");
            }
            else {
                res.send("Deleted student with ID: " + req.params.id);
            }
        })
        .catch(err => res.status(500).send('Something went wrong'));

});



module.exports = router
