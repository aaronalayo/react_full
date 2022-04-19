// import { v4 as uuid} from 'uuid';
// import { sendEmail } from '../util/sendEMail';
// import { getDbConnection } from '../db';

const uuid = require('uuid').v4;
const sendEmail = require('../util/sendEMail');
const db = require('../connectors/db.mysql');

export const forgotPasswordRoute = {
    path: '/forgot-password/:email',
    method: 'put',
    handler: async (req, res) => {
        const { email } = req.params;

        // const db = getDbConnection('react-auth-db');
        const passwordResetCode = uuid();
        const teacher = await db.sequelize.models.teachers.findOne({ where: { email } });
        if(teacher){
            await teacher.update({ password: passwordResetCode });
        }
        
        // const  { result } = await db.collection('users').updateOne({ email}, { $set: { passwordResetCode }});
        console.log(result)
        if(result.nModified > 0){
            try {
                await sendEmail({
                    to: email,
                    from: 'aaron.aa@me.com',
                    subject: 'Password Reset',
                    text: `
                        To reset your password, click this link:
                        http://localhost:3000/reset-password/${passwordResetCode}
                    `
                })
            } catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        }

        res.sendStatus(200);

    }
}