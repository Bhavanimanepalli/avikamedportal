import React from "react";
import Signin from "./Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import DocumentUploadPage from "./DocumentUploadPage";
import Data from "./data";
import FinalPage from "./FinalPage";

function Approutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/documentPage" element={<DocumentUploadPage />} />
          <Route path="/data" element={<Data />} />
          <Route path="/finalPage/:id" element={<FinalPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Approutes;
