import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Register from "./pages/registration/register";
import PageLayout from "./utils/pagelayout/pageLayout/pagelayout";
import DashboardLayout from "./utils/pagelayout/dashboardLayout/dashboardLayout";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Profile from "./pages/profile/profile";
import { localStorageAction } from "./utils/functions/localStorage";

function App() {
  const isAuthenticated = false;
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorageAction("token")) {
  //     navigate("/");
  //   }
  // }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard/profile/:id" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
