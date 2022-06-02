const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const { getGoogleUser } =require('../util/getGoogleUser');
const { updateOrCreateUserFromOauth } = require('../util/updateOrCreateUserFromOauth');


// export const googleOauthCallbackRoute = {
//     path: '/auth/google/callback',
//     method: 'get',
//     handler: async (req, res) => {
//         const { code } = req.query;

//         const oauthUserInfo = await getGoogleUser({ code });
//         const updateduser = await updateOrCreateUserFromOauth({ oauthUserInfo });
//         const { _id: id, isVerified, email, info } = updateduser;

//         jwt.sign(
//             {id, isVerified, email, info}, 
//             process.env.JWT_SECRET,
//             (error, token) => {
//                 if(error) return res.sendStatus(500);
//                 res.redirect(`http://localhost:3000/login?token=${token}`);
//             })

//         }
// }


router.get('/auth/google/callback', async(req, res) =>{
    const { code } = req.query;

    const oauthUserInfo = await getGoogleUser({ code });
    
    const updateduser = await updateOrCreateUserFromOauth({ oauthUserInfo });
    
    const { role, email, id, isVerified } = updateduser;

    jwt.sign(
        {role:role, email: email, id: id, isVerified: isVerified}, 
        process.env.JWT_SECRET,
        (error, token) => {
            if(error) return res.sendStatus(500);
            res.redirect(`http://localhost:3000/?token=${token}`);
        })
})

module.exports = router;