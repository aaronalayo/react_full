import {BrowserRouter, Routes, Route,NavLink,} from "react-router-dom";
import { EmailVerificationLandingPage } from "./pages/EmailVerificationLandingPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { LogInPage } from "./pages/LogInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { PasswordResetLandingPage } from "./pages/PasswordResetLandingPage";
import { PleaseVerifyEmailPage } from "./pages/PleaseVerifyEmailPage";
import { PrivateRoute, PrivateRouteStudent } from "./auth/PrivateRoute";
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
import { NotFound } from "./pages/NotFound";
import { Navbar } from "./pages/StudentNavbar";
import { PassPhrasePage } from "./pages/PassPhrasePage";
import { StudentOverviewPage } from "./pages/StudentOverviewPage";
import { GetSingleStudent } from "./pages/singleStudentPage";





export const Routing = () => {
    return (
        <BrowserRouter>
            <ToastContainer position="top-center"></ToastContainer>
            <Routes>
            <Route path="/" element={<LogInPage />}/>
            
            <Route path="/teacher_overview" element={<PrivateRoute><TeacherOverviewPage /></PrivateRoute>} />
            <Route path="/passphrase" element={<PrivateRoute><PassPhrasePage /></PrivateRoute>} />
            <Route path="/student_overview" element={<PrivateRouteStudent><StudentOverviewPage /></PrivateRouteStudent>} />
                <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage />}></Route>
                <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
                
                <Route path="/reset-password/:passwordResetCode"
                    element={<PasswordResetLandingPage />}></Route>
                <Route path="/please-verify" element={<PleaseVerifyEmailPage />}></Route>
                <Route path="/signup"element={<SignUpPage />}></Route>
                <Route path="/health_check" element={<HealthCheckPage />}></Route>
                
                <Route path="/addTeacher" element={<PrivateRoute><CreateTeacher /></PrivateRoute>}> </Route>
                <Route path="/teachers" element={<PrivateRoute><GetTeacherList /></PrivateRoute>}> </Route>
                <Route path="/teachers/findOne/:id" element={<PrivateRoute><GetSingleTeacher /></PrivateRoute>}></Route>

                <Route path="/admin" element={<PrivateRoute > <AdminPage /></PrivateRoute>}></Route>
                {/* <Route path="/addAdmin" element={<PrivateRoute><CreateAdmin /></PrivateRoute>}> </Route> */}

                <Route path="/students" element={<PrivateRoute><GetStudentList /></PrivateRoute>}> </Route>
                <Route path="/addStudent" element={<PrivateRoute><CreateStudent /></PrivateRoute>}> </Route>
                <Route path="/students/findOne/:id" element={<PrivateRoute><GetSingleStudent /></PrivateRoute>}> </Route>
                
                <Route path="/about"element={<About />}></Route>
                <Route path='*' element={<NotFound />}></Route>
            </Routes>
            
        </BrowserRouter>
    );
}