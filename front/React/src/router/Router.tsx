import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../components/Home/Home";
import { Register } from "../components/Register/Register";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
};
