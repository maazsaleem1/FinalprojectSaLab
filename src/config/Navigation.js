import { Routes, Route } from 'react-router-dom';
import SignupPage from '../Components/Signup';
import LoginPage from '../Components/Login';
import ForgotPasswordPage from '../Components/ForgotPassword';
import CreateProfilePage from '../Components/CreateProfile';
import TodoApp from '../Components/TodoApp';
// import ProfilePage from '../Components/'; // <-- create this component
import MainLayout from '../Components/MainLayout';
import ProfilePage from '../Components/profilePage';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/create-profile" element={<CreateProfilePage />} />

      {/* Protected/Main Routes with Drawer */}
      <Route path="/" element={<MainLayout />}>
        <Route path="home" element={<TodoApp />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
