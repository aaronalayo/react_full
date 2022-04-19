import bcrypt from 'bcrypt';
import { getDbConnection } from '../db';

export const resetpasswordRoute = {
    path: '/api/users/:passwordResetCode/reset-password',
    method: 'put',
    handler: async (req, res) => {
        const { passwordResetCode } = req.params;
        const { passwordValue } = req.body;
        console.log(passwordValue)
        const db = getDbConnection('react-auth-db');

        const newPasswordHash = await bcrypt.hash(passwordValue, 10);

        const result = await db.collection('users').findOneAndUpdate({ passwordResetCode }, {$set: { passwordHash: newPasswordHash}, $unset: {passwordResetCode: ''},});
        const teacher = await db.sequelize.models.teachers.findOne({ where: { email } });
        if(result.lastErrorObject.n === 0) return res.sendStatus(404);

        res.sendStatus(200);


    }
}