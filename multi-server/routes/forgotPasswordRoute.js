// import { v4 as uuid} from 'uuid';
// import { sendEmail } from '../util/sendEMail';
// import { getDbConnection } from '../db';
const express = require("express");
const router = express.Router();
const uuid = require("uuid").v4;

const sendEmail = require("../util/sendEMail");
const db = require("../connectors/db.mysql");

router.put("/forgot-password/:email", async (req, res) => {
  const { email } = req.params;
  console.log(email);
  const passwordResetCode = uuid();
  const teacher = await db.sequelize.models.teachers.findOne({
    where: { email },
  });
  if (teacher) {
    const result = await teacher.update({ password_reset_code: passwordResetCode });
    console.log(result)
    // const  { result } = await db.collection('users').updateOne({ email}, { $set: { passwordResetCode }});
    if (result) {
      try {
        await sendEmail({
          to: email,
          from: "aaron.aa@me.com",
          subject: "Password Reset",
          text: `
                        To reset your password, click this link:
                        http://localhost:3000/reset-password/${passwordResetCode}
                    `,
        });
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    }
  }

  res.sendStatus(200);
});

module.exports = router;
