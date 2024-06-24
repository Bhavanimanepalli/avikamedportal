import React from "react";
import Signin from "./Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DocumentUploadPage from "./DocumentUploadPage";
import Data from "./data";
import FinalPage from "./FinalPage";
import User from "./User";
import Home from "./Home";
import Userlogin from "./Userlogin";

function Approutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

        <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/pateintDeatils" element={<Data />} />
          <Route path="/finalPage/:id" element={<FinalPage />} />
          <Route path="/userlogin" element={<Userlogin />} />
          <Route path="/user" element={<User/>} />
          <Route path="/documentPage" element={<DocumentUploadPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Approutes;
