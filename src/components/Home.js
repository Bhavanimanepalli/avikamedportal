import React from "react";
import "../Styling/Home.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const Navigate = useNavigate();

  const navigateToDocument = () => {
    Navigate("/documentPage");
  };
  return (
    <>
      <Navbar />
      <div className="homeDiv">
        <h1 onClick={navigateToDocument}>UPLOAD MEDICAL DOCUMENT</h1>
      </div>
    </>
  );
}

export default Home;
