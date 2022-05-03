const express = require('express');
const router = express.Router();
const { getGoogleOauthUrl } = require("../util/getGoogleOauthUrl");

//  const getGoogleOauthUrlRoute = {
//     path: '/auth/google/url',
//     method: 'get',
//     handler: (req, res) => {
//         const url = getGoogleOauthUrl();
//         res.status(200).json({ url })
//     }
// }

router.get('/auth/google/url', (req, res) => {
    const url = getGoogleOauthUrl();
    res.status(200).json({ url });
});

module.exports = router;