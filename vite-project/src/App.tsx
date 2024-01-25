
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/Home';
import UserProfilePage from './pages/UserProfile';
import UploadRecipePage from './pages/UploadRecipePage';
import RecipeDetailPage from './pages/RecipeDetails';
import AdminPage from './pages/AdminPage';
import './App.css';
import { Box } from '@mui/system';
import ProtectedRoute from './utils/ProtectedRoutes';

function App() {
  
  return (
    <>
       <Navbar/>
      <Box className="root-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/upload" element={<UploadRecipePage />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />

         
          <Route path="/admin" element={<AdminPage />} /> 
          </Route>
        </Routes>
        </Box>
    </>
  );
}

export default App;
