const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require("../connectors/db.mysql");

router.put("/users/:passwordResetCode/reset-password", async (req, res) => {
  const { passwordResetCode } = req.params;
  const { passwordValue } = req.body;
  console.log(passwordValue);

  const newPasswordHash = await bcrypt.hash(passwordValue, 10);
  const teacher = await db.sequelize.models.teachers.findOne({
    where: { password_reset_code : passwordResetCode},
  });
  if (teacher) {
   const result = teacher.update({ password: newPasswordHash });
  } else if (!teacher) {
    const student = await db.sequelize.models.students.findOne({
      where: { password_reset_code : passwordResetCode },
    });
    if (student) {
      student.update({ password: newPasswordHash });
    } else if (!student) {
      return res.sendStatus(404);
      
    }
  } else {
    res.status(200);
  }
});



module.exports = router;