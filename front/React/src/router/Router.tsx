import React from "react";
import { Routes, Route } from "react-router-dom";
import { Register } from "../components/Register/Register";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
};
