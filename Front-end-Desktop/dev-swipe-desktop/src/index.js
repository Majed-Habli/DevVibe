import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Layout from "./layout/layout";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import PageLayout from "./layout/pagelayout";
import Users from "./pages/view users/users";
import NewRecruites from "./pages/view users/newrecruites";
import Developers from "./pages/view users/developers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/users/new-developers" element={<Users />} />
          <Route
            path="/dashboard/users/new-recruiters"
            element={<NewRecruites />}
          />
          <Route
            path="/dashboard/users/old-developers"
            element={<Developers />}
          />
          <Route
            path="/dashboard/users/old-recruiters"
            element={<Developers />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
