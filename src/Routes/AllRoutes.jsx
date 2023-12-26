import React from "react";
import { Routes, Route } from "react-router-dom";
import InputForm from "../Components/InputForm";
import TableForm from "../Components/TableForm";

export const AllRoutes = () => {
  return (
    <div>
      {
        <Routes>
          <Route path="/" element={<InputForm />}></Route>
          <Route path="/tableform" element={<TableForm />}></Route>
        </Routes>
      }
    </div>
  );
};
