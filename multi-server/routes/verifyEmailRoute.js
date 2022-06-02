const express = require("express");
const router = express.Router();
const db = require("../connectors/db.mysql");
const jwt = require("jsonwebtoken");

router.put("/verify-email", async (req, res) => {
  const { verificationString } = req.body;
  // const db = getDbConnection('react-auth-db');
  const teacher = await db.sequelize.models.teachers.findOne({
    where: { verificationString },
  });
  // const result = await db.collection('users').findOne({
  //     verificationString,
  // });
  
  // const { _id: id, email, info } = result;

  // await db.collection('users').updateOne({_id: ObjectID(id)}, {
  //     $set:{isVerified: true}
  // });
  if(teacher){
    await teacher.update({ is_verified: true });

    jwt.sign(
      { role: "teacher", email: teacher.email, id: teacher.teacher_id },
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) return res.sendStatus(500);
        res.status(200).json({ token });
      }
    );
  }else if(!teacher){
    const student = await db.sequelize.models.students.findOne({
        where: { verificationString },
      });
      if(!student){
        return res
        .status(401)
        .json({ message: "The email verification code is incorrect" });
      }else {
        await student.update({ is_verified: true });
        jwt.sign(
            { role: "student", email: student.email, id: student.student_id },
            process.env.JWT_SECRET,
            { expiresIn: "2d" },
            (err, token) => {
              if (err) return res.sendStatus(500);
              res.status(200).json({ token });
            }
          );
      }
  }else {
    return res.status(401).json({message: 'The email verification code is incorrect'});
  }

});



module.exports = router;