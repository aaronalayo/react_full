import { forgotPasswordRoute } from './forgotPasswordRoute';
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute';
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute';
import { testRoute } from './testRoute';
import { signUpRoute } from './signUpRoute';
import { resetpasswordRoute } from './resetPasswordRoute';
import { logInRoute } from './logInRoute';
import {updateUserInfoRoute} from './updateUserInfoRoute';
import { testEmailRoute } from './testEmailRoute';
import { verifyEmailRoute } from './verifyEmailRoute';

export const routes = [
    forgotPasswordRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,
    signUpRoute,
    resetpasswordRoute,
    logInRoute,
    testRoute,
    testEmailRoute,
    updateUserInfoRoute,
    verifyEmailRoute,
];
