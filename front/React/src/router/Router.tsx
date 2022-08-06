import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth";
import { Home } from "../components/Home/Home";
import { Login } from "../components/Login/Login";
import { Register } from "../components/Register/Register";

export const Router = () => {
  const [logged] = useAuth();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={logged ? <Home /> : <Navigate to={"login"} replace />}
        />
        <Route path="register" element={<Register />} />
        <Route
          path="login"
          element={logged ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </>
  );
};
