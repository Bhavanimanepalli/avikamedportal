import React, { useState } from "react";
import "../Styling/Document.css";
import Navbar from "./Navbar";
import axios from "axios";

function DocumentUploadPage() {
  const [outPatient, setOutpatient] = useState("");

  const [inPatient, setInpatient] = useState("");

  const [PatientName, setPatientName] = useState("");

  const [age, setAge] = useState("");

  const [gender, setGender] = useState("");

  const [place, setPlace] = useState("");

  const [date, setDate] = useState("");
  const [isValid, setIsValid] = useState(true);

  const [file, setFile] = useState(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYXJhdGgiLCJ1c2VyaWQiOiJtZWRfMDIiLCJpYXQiOjE3MDM0MzcwNTh9.RkWdd6Y6-OQPgCxjD95fAJ238ibayDTVPdHvTF2mU5A";

  const handleOutPatient = (e) => {
    const opValue = e.target.value;
    if (!isNaN(opValue)) {
      setOutpatient(opValue);
    }
  };

  const handleInPatient = (e) => {
    const ipValue = e.target.value;
    if (!isNaN(ipValue)) {
      setInpatient(ipValue);
    }
  };

  const handlePatientName = (e) => {
    setPatientName(e.target.value);
  };

  const handleAge = (e) => {
    const ageNum = e.target.value;
    if (!isNaN(ageNum) && ageNum.length < 4) {
      setAge(ageNum);
    }
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handlePlace = (e) => {
    setPlace(e.target.value);
  };

  const handleDate = (e) => {
    const inputDate = e.target.value;

    // if (inputDate.length <= 10) {
    //   setDate(inputDate);
    // }

    setDate(inputDate);

    // if (!isNaN(inputDate)) {
    //   setDate(inputDate);
    // }

    // const updatedDate = inputDate.split("-").join("/");

    // setDate(updatedDate);

    // const [year, month, day] = inputDate.split("-");
    // const formattedDate = `${day}/${month}/${year}`;
    // setDate(formattedDate);

    // console.log(inputDate);
    // const regex = /^(\d{0,2})\/(\d{0,2})\/(\d{0,4})$/;

    // if (regex.test(inputDate)) {
    //   setDate(inputDate);
    // }
  };

  // else {
  //   alert("enter only in given format");
  // }

  // const dateRegex = `/(\d{2})/(\d{2})/(\d{4})/`;
  // // const test = inputDate.match(dateRegex);
  // if (inputDate.match(dateRegex)) {
  //   setDate(inputDate);
  // }

  const handleFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const type = file.type === "application/pdf";
    if (type) {
      setFile(file);
    } else {
      alert("only PDF files allowed");
    }
    // console.log(file);
    // console.log(file.split(" "));
    // if (file && file.type === "application/pdf") {

    // } else {
    // alert("only pdf files are allowed");
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const details = {
    //   op_number: outPatient,
    //   ip_number: inPatient,
    //   patient_name: PatientName,
    //   age: age,
    //   gender: gender,
    //   place: place,
    //   Date_of_registration: date,
    //   file_path: file,
    // };
    let data = new FormData();
    data.append("op_number", outPatient);
    data.append("ip_number", inPatient);
    data.append("patient_name", PatientName);
    data.append("age", age);
    data.append("gender", gender);
    data.append("place", place);
    data.append("Date_of_registration", date);
    data.append("referrence_by", "");
    data.append("patient_id", "1");
    data.append("file_path", file);
    try {
      const response = await axios.post(
        "https://med.test.avika.ai/api/file_upload",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data);
      // console.log(response.status);
      // console.log(response.data.message);
      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
      alert(err.response.data.errors[0].msg);
    }
  };
  return (
    <>
      <Navbar />

      <div className="DUPage">
        <div className="text">
          {" "}
          <h2>Patient Information</h2>{" "}
        </div>

        <div className="inputDiv">
          <form>
            <input
              type="text"
              placeholder="Outpatient (OP) Number*"
              value={outPatient}
              onChange={handleOutPatient}
            />

            <input
              type="text"
              placeholder="Inpatient (IP) Number*"
              value={inPatient}
              onChange={handleInPatient}
            />
          </form>
        </div>

        <div className="inputDiv2">
          <form>
            <input
              type="text"
              placeholder="Patient Name*"
              value={PatientName}
              onChange={handlePatientName}
            />
            <input
              type="text"
              placeholder="Age*"
              value={age}
              onChange={handleAge}
            />
          </form>
        </div>

        <div className="inputDiv3">
          <form>
            GENDER <br />
            <select
              name="gender"
              id="gender"
              className="gender"
              value={gender}
              onChange={handleGender}
            >
              <option value="select gender" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              type="text"
              placeholder="Place*"
              value={place}
              onChange={handlePlace}
            />
          </form>
        </div>

        <div className="inputDiv4">
          <form>
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              // pattern="\d{2}/\d{2}/\d{4}"
              value={date}
              onChange={handleDate}
            />
          </form>
        </div>

        <div className="inputDiv5">
          <span> Medical File</span>
          <form>
            <input
              type="file"
              placeholder="Choose a File"
              accept=".pdf"
              required
              // value={file}
              onChange={handleFile}
            />
          </form>
        </div>

        <div className="submit">
          <form>
            <button onClick={handleSubmit}>submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DocumentUploadPage;
