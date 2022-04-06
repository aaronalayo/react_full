import {BrowserRouter, Routes, Route} from "react-router-dom";
import { EmailVerificationLandingPage } from "./pages/EmailVerificationLandingPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { LogInPage } from "./pages/LogInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { UserInfoPage } from './pages/UserInfoPage';
import { PasswordResetLandingPage } from "./pages/PasswordResetLandingPage";
import { PleaseVerifyEmailPage } from "./pages/PleaseVerifyEmailPage";
import { PrivateRoute } from "./auth/PrivateRoute";


export const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<PrivateRoute><UserInfoPage /></PrivateRoute>} />
                <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage />}></Route>
                <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
                <Route path="/login"
                    element={<LogInPage />}>
                </Route>
                <Route path="/reset-password/:passwordResetCode"
                    element={<PasswordResetLandingPage />}>

                </Route>
                <Route path="/please-verify" element={<PleaseVerifyEmailPage/>}></Route>
                <Route path="/signup"
                    element={<SignUpPage />}>

                </Route>
            </Routes>
            
        </BrowserRouter>
    );
}