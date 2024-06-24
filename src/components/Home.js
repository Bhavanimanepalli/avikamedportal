import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";
import '../Styling/Homepage.css';


const Home = () => {
  return (
    <div className="containers">
      <div className="header">
        <img
          className="logo"
          src="https://res.cloudinary.com/dpfnyv0ut/image/upload/v1709751594/avika-img_msxfud.png"
          alt="Avika Logo"/>
           <Link to="/signin">
            <Button variant="primary">Admin Login</Button>
          </Link>
      </div>
      <div className="poster-container">
        <img
          className="poster-img"
          src="https://res.cloudinary.com/dus7nod3l/image/upload/v1719229013/pexels-biluk-165537_fn47pc.jpg"
          alt="Poster"
        />
        <div className="poster-text">
          <h1>Nurturing Mind Health</h1>
          <h3>Enriching Lives</h3>
        </div>
      </div>
      <div className="card-container">
        <Card className="content-card">
          <Card.Body>
            <Card.Img
              className="content-img"
              variant="top"
              src="https://res.cloudinary.com/dpfnyv0ut/image/upload/v1709258515/img2_lnqtvn.webp"
            />
            <Card.Title className="card-body">Upload your details</Card.Title>
            <Link to="/userlogin">
            <Button variant="light" className="card-body">Upload file</Button>
          </Link>
          </Card.Body>
        </Card>
      </div>
      <footer className="footer">
        <div className="footer-section">
          <div className="about-us">
            <h3>About us</h3>
            <p>
              In today’s interconnected world, there are many challenges to
              our mental and emotional well-being. From the pressures of the
              corporate world to the stresses of domestic life, people need a
              reliable source of support and resilience.
            </p>
          </div>
          <div className="links">
            <h3>Links</h3>
            <ul>
              <li>Home</li>
              <li>avika for Practitioners</li>
              <li>avika for Workplaces</li>
              <li>Contact Us</li>
              <li>Blog</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="office">
            <h3>Address</h3>
            <p>
              Plot No. 22, Vinay Towers, Survey No: 70, 89, Nallagandla
              Serilingampally, Ranga Reddy Telangana 500020
            </p>
            <p>connection@avika.ai</p>
          </div>
        </div>
        <div className="copyright">
          <p>Avika © 2023. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;