import { BrowserRouter, Routes, Route, NavLink, } from "react-router-dom";
import { EmailVerificationLandingPage } from "./pages/EmailVerificationLandingPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { LogInPage } from "./pages/LogInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { UserInfoPage } from './pages/UserInfoPage';
import { PasswordResetLandingPage } from "./pages/PasswordResetLandingPage";
import { PleaseVerifyEmailPage } from "./pages/PleaseVerifyEmailPage";
import { PrivateRoute } from "./auth/PrivateRoute";
import { HealthCheckPage } from "./pages/HealthCheckPage";
import { TeacherOverviewPage } from "./pages/TeacherOverviewPage";
import { Admin } from "./pages/Admin";
import { ToastContainer } from 'react-toastify';
import { GetTeacherList } from "./pages/TeacherList";
import { GetStudentList } from "./pages/StudentList";
import { CreateTeacher } from "./pages/AddTeacher";
import { GetSingleTeacher } from "./pages/SingleTeacher";
import { CreateStudent } from "./pages/AddStudent";
import { UpdateStudent } from "./pages/UpdateStudent";
import { AdminPage } from "./pages/AdminPage";
import { About } from "./pages/About";
import NotFound from "./pages/NotFound";
import Navbar from "./pages/Navbar";
import Logout from "./pages/Logout";




export const Routing = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <ToastContainer position="top-center"></ToastContainer>
            <Routes>
                <Route path="/" element={<PrivateRoute><UserInfoPage /></PrivateRoute>} />
                <Route path="/admin" element={<AdminPage />}></Route>
                <Route path="/teacher_overview" element={<PrivateRoute><TeacherOverviewPage /></PrivateRoute>} />
                <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage />}></Route>
                <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
                <Route path="/login" element={<LogInPage />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
                <Route path="/reset-password/:passwordResetCode" element={<PasswordResetLandingPage />}></Route>
                <Route path="/please-verify" element={<PleaseVerifyEmailPage />}></Route>
                <Route path="/signup" element={<SignUpPage />}></Route>
                <Route path="/health_check" element={<HealthCheckPage />}></Route>
                <Route path="/addTeacher" element={<CreateTeacher />}> </Route>
                <Route path="/teachers" element={<GetTeacherList />}> </Route>
                <Route path="/students" element={<GetStudentList />}> </Route>
                <Route path="/addStudent" element={<CreateStudent />}> </Route>
                <Route path="/updateStudent" element={<UpdateStudent />}> </Route>
                <Route path="/teachers/updateOne/:id" element={<GetSingleTeacher />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path='*' element={<NotFound />}></Route>
            </Routes>

        </BrowserRouter>
    );
}