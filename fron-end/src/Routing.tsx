import {BrowserRouter, Routes, Route,NavLink,} from "react-router-dom";
import { EmailVerificationLandingPage } from "./pages/EmailVerificationLandingPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { LogInPage } from "./pages/LogInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { PasswordResetLandingPage } from "./pages/PasswordResetLandingPage";
import { PleaseVerifyEmailPage } from "./pages/PleaseVerifyEmailPage";
import { PrivateRoute } from "./auth/PrivateRoute";
import { HealthCheckPage } from "./pages/HealthCheckPage";
import { TeacherOverviewPage } from "./pages/TeacherOverviewPage";
import { CreateAdmin } from "./pages/addAdmin";
import { ToastContainer } from 'react-toastify';
import { GetTeacherList } from "./pages/TeacherList";
import { GetStudentList } from "./pages/StudentList";
import { CreateTeacher } from "./pages/AddTeacher";
import { GetSingleTeacher } from "./pages/singleTeacher";
import { CreateStudent } from "./pages/AddStudent";
import { UpdateStudent } from "./pages/UpdateStudent";
import { AdminPage } from "./pages/AdminPage";
import { About } from "./pages/about";
import { Navbar } from "./pages/StudentNavbar";
import { HomePage } from "./pages/Home";




export const Routing = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <ToastContainer position="top-center"></ToastContainer>
            <Routes>
            <Route path="/" element={<LogInPage />}/>
            
            <Route path="/teacher_overview" element={<PrivateRoute><TeacherOverviewPage /></PrivateRoute>} />
                <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage />}></Route>
                <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
                
                <Route path="/reset-password/:passwordResetCode"
                    element={<PasswordResetLandingPage />}></Route>
                <Route path="/please-verify" element={<PleaseVerifyEmailPage />}></Route>
                <Route path="/signup"element={<SignUpPage />}></Route>
                <Route path="/health_check" element={<HealthCheckPage />}></Route>
                
                <Route path="/addTeacher" element={<CreateTeacher />}> </Route>
                <Route path="/teachers" element={<GetTeacherList />}> </Route>
                <Route path="/teachers/updateOne/:id" element={<GetSingleTeacher />}></Route>

                <Route path="/admin" element={<AdminPage />}></Route>
                <Route path="/addAdmin" element={<CreateAdmin />}> </Route>

                <Route path="/students" element={<GetStudentList />}> </Route>
                <Route path="/addStudent" element={<CreateStudent />}> </Route>
                <Route path="/updateStudent/:id" element={<UpdateStudent />}> </Route>
                
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/about"element={<About />}></Route>
            </Routes>
            
        </BrowserRouter>
    );
}