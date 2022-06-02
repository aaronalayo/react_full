// import { getDbConnection } from "../db";
const db = require("../connectors/db.mysql");
const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
  const { id: googleId, verified_email: is_verified, email: oauthMail, name } = oauthUserInfo;
    const fullName = name.split(' ');
    console.log(fullName[0])
  // const db = getDbConnection('react-auth-db');
  // const existingUser = await db.collection('users').findOne({ email });
  const teacher = await db.sequelize.models.teachers.findOne({
    where: { first_name: fullName[0], last_name:fullName[1] }});

  if (teacher) { 
    teacher.update({ google_id: googleId, is_verfied: is_verified, oauth_email:oauthMail });

    const id = teacher.teacher_id;
    const isVerified = is_verified;
    const email = oauthMail;
    const role = "teacher";
    const updateduser = { role, email, id, isVerified } 

    return updateduser;

  } else if (!teacher) {
    const student = await db.sequelize.models.students.findOne({
      where: { first_name: fullName[0], last_name:fullName[1] },
    });
    if (student) {
      student.update({ google_id: googleId, is_verfied: is_verified, oauth_email:oauthMail });
      const id = student.student_id;
      const isVerified = is_verified;
      const email = oauthMail;
      const role = "student";
      const updateduser = { role, email, id, isVerified };

      return updateduser;
    }
  }

};

module.exports.updateOrCreateUserFromOauth = updateOrCreateUserFromOauth;
