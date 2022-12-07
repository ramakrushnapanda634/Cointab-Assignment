import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../Components/PrivateRoute";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<Signup />} />
    </Routes>
  );
};

export default AllRoutes;
