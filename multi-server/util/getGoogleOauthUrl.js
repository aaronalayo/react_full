// import { oauthClient } from "./oauthClient";
const {oauthClient} = require("./oauthClient");

 const getGoogleOauthUrl = () => {
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ];

    return oauthClient.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
    });
}

module.exports.getGoogleOauthUrl = getGoogleOauthUrl;