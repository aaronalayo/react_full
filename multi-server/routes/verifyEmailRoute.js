// import {ObjectID } from 'mongodb';
// import  jwt  from 'jsonwebtoken';
// import { getDbConnection } from '../db';

const db = require('../connectors/db.mysql');
const jwt = require('jsonwebtoken');
export const verifyEmailRoute = {
        path: '/verify-email',
        method: 'put',
        handler: async (req, res) => {
            const { verificationString } = req.body;
            // const db = getDbConnection('react-auth-db');
            const teacher = await db.sequelize.models.teachers.findOne({ where: { verificationString } });
            // const result = await db.collection('users').findOne({
            //     verificationString,
            // });
            if(!teacher) return res.status(401).json({message: 'The email verification code is incorrect'});

            // const { _id: id, email, info } = result;
            
            // await db.collection('users').updateOne({_id: ObjectID(id)}, {
            //     $set:{isVerified: true}
            // });
            await teacher.update({verificationString:verificationString})

            jwt.sign({role: 'teacher', email: teacher.email, id: teacher.teacher_id}, process.env.JWT_SECRET, {expiresIn: '2d'}, (err, token) =>{
                if(err) return res.sendStatus(500);
                res.status(200).json({token})

            })
        }
}