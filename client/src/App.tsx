import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { setNavgiate } from "./lib/navigation";
import { ToastContainer } from "react-toastify";
import AppContainer from "./components/AppContainer";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ExplorePage from "./pages/ExplorePage";
import MainLayout from "./layouts/MainLayout";
import CartPage from "./pages/CartPage";
import NotificationsPage from "./pages/NotificationsPage";
import DashboardPage from "./pages/DashboardPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import CoursesPage from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";
import MyLearningPage from "./pages/MyLearningPage";
import PlayerPage from "./pages/PlayerPage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PlayerLayout from "./layouts/PlayerLayout";

function App() {
  const navgiate = useNavigate();
  setNavgiate(navgiate);
  return (
    <>
      <Routes>
        {/* Private Routes - Secured by AppContainer */}
        <Route element={<AppContainer />}>
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/dashboard/create-course"
            element={<CreateCoursePage />}
          />
          <Route
            path="/dashboard/create-course/:courseId"
            element={<CreateCoursePage />}
          />
          <Route path="/successful-payment" element={<PaymentSuccessPage />} />

          {/* Layout Routes */}
          <Route element={<MainLayout />}>
            <Route path="/my-learning" element={<MyLearningPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
          </Route>
        </Route>

        {/* Player Route */}
        <Route element={<PlayerLayout />} path="/player/:courseId">
          <Route path="/player/:courseId" element={<PlayerPage />} />
        </Route>

        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<ExplorePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CoursePage />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
