import { Routes, Route } from 'react-router-dom';
import SignupPage from '../Components/Signup';
import LoginPage from '../Components/Login';
import ForgotPasswordPage from '../Components/ForgotPassword';
import CreateProfilePage from '../Components/CreateProfile';
import TodoApp from '../Components/TodoApp';
// import ProfilePage from '../Components/'; // <-- create this component
import MainLayout from '../Components/MainLayout';
import ProfilePage from '../Components/profilePage';
import EditProfilePage from '../Components/EditProfile';
import NotFoundPage from '../Components/NotFoundPage';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/create-profile" element={<CreateProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />



      {/* Protected/Main Routes with Drawer */}
      <Route path="/" element={<MainLayout />}>
        <Route path="home" element={<TodoApp />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="editprofile" element={<EditProfilePage />} />

      </Route>
    </Routes>
  );
};

export default Navigation;
