import { BrowserRouter, Routes, Route, NavLink, } from "react-router-dom";
import { EmailVerificationLandingPage } from "./pages/authentication/EmailVerificationLandingPage";
import { ForgotPasswordPage } from "./pages/authentication/ForgotPasswordPage";
import { LogInPage } from "./pages/authentication/LogInPage";
import { SignUpPage } from "./pages/authentication/SignUpPage";
import { PasswordResetLandingPage } from "./pages/authentication/PasswordResetLandingPage";
import { PleaseVerifyEmailPage } from "./pages/authentication/PleaseVerifyEmailPage";
import { PrivateRoute } from "./auth/PrivateRoute";
import { HealthCheckPage } from "./pages/authentication/HealthCheckPage";
import { TeacherOverviewPage } from "./pages/teacher/TeacherOverviewPage";
import { ToastContainer } from 'react-toastify';
import { GetTeacherList } from "./pages/admin/TeacherList";
import { GetStudentList } from "./pages/admin/StudentList";
import { CreateTeacher } from "./pages/admin/AddTeacher";
import { GetSingleTeacher } from "./pages/admin/SingleTeacher";
import { CreateStudent } from "./pages/admin/AddStudent";
import { UpdateStudent } from "./pages/admin/UpdateStudent";
import { AdminPage } from "./pages/admin/AdminPage";
import { About } from "./pages/About";
import NotFound from "./util/NotFound";
import Logout from './pages/authentication/Logout'
import { StudentOverviewPage } from "./pages/student/StudentOverviewPage";



export const Routing = () => {
    return (
        <BrowserRouter>
            <ToastContainer position="top-center"></ToastContainer>
            <Routes>
                {/* Index */}
                <Route path="/" element={<PrivateRoute><LogInPage /></PrivateRoute>} />

                {/* Auth  */}
                <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage />}></Route>
                <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
                <Route path="/login" element={<LogInPage />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
                <Route path="/reset-password/:passwordResetCode" element={<PasswordResetLandingPage />}></Route>
                <Route path="/please-verify" element={<PleaseVerifyEmailPage />}></Route>
                <Route path="/signup" element={<SignUpPage />}></Route>

                <Route path="/health_check" element={<HealthCheckPage />}></Route>

                {/* Admin  */}
                <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>}></Route>
                <Route path="/students" element={<PrivateRoute><GetStudentList /></PrivateRoute>}> </Route>
                <Route path="/teachers" element={<PrivateRoute><GetTeacherList /></PrivateRoute>}> </Route>
                <Route path="/addTeacher" element={<PrivateRoute><CreateTeacher /></PrivateRoute>}> </Route>
                <Route path="/addStudent" element={<PrivateRoute><CreateStudent /></PrivateRoute>}> </Route>
                <Route path="/teachers/update/:id" element={<PrivateRoute><GetSingleTeacher /></PrivateRoute>}></Route>
                <Route path="/students/update/:id" element={<PrivateRoute><UpdateStudent /></PrivateRoute>}> </Route>

                {/* Teacher */}
                <Route path="/teacher_overview" element={<PrivateRoute><TeacherOverviewPage /></PrivateRoute>} />
                
                {/* Student */}
                <Route path="/student_overview" element={<PrivateRoute><StudentOverviewPage /></PrivateRoute>} />

                {/* General */}
                <Route path="/about" element={<About />}></Route>
                <Route path='*' element={<NotFound />}></Route>
            </Routes>

        </BrowserRouter>
    );
}