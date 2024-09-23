import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom"; // Import Navigate for redirection
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./components/assets/css/tailwind.css";
import './index.css';
import Sidebar from "./components/Sidebar";
import SignUp from "./components/CreateAccount";
import LogIn from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import { ThemeProvider } from './ThemeContext';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import the hook for auth state
import { auth } from './components/firebase'; // Make sure your firebase config is imported correctly

// PrivateRoute component for route protection
const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // You can add a spinner here if you like
  }

  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  const location = useLocation(); // Now useLocation is inside Router context
  const hideSidebarPaths = ['/login', '/signup']; // Paths where Sidebar should not show

  return (
    <div className={`${!hideSidebarPaths.includes(location.pathname) ? 'flex min-h-screen bg-gray-900' : ''}`}> {/* Full height, dark background */}
      {/* Conditionally show Sidebar based on path */}
      {!hideSidebarPaths.includes(location.pathname) && <Sidebar />}
      
      {/* Main Content */}
      <div className={`${!hideSidebarPaths.includes(location.pathname) ? 'ml-64 p-4' : ''} flex-1`}> {/* Push content to the right, full width */}
        {/* Toast Container to display toasts */}
        <ToastContainer />

        {/* Routes */}
        <Routes>
          {/* Protect the Dashboard route */}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent /> {/* The content using useLocation is now within the Router */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
