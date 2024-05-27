import React, { useEffect, useState } from "react";
import "../Styling/finalPage.css";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { LeftCircleOutlined } from "@ant-design/icons";

function FinalPage() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [record, setRecord] = useState();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhhcmlzaCIsInVzZXJpZCI6Im1lZF8wMSIsImlhdCI6MTcwNTk4OTkzNX0.iWfMAGO6mNr7u9wKNmxHSkOu0WWP9DN2BeoTFwX9-zg";

  useEffect(() => {
    const callThis = async () => {
      try {
        const data = await axios.get(
          `https://med.test.avika.ai/admin/getMedicalRecord/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // "Content-Type": "application/json",
            },
          }
        );
        // console.log(data);
        setRecord(data.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    callThis();
  }, [id]);

  const navigateToPreviousPage = () => {
    Navigate("/data");
  };
  const handleFile = (filePath) => {
    window.open(`${filePath}`, "_blank");
    // console.log(filePath);
  };
  return (
    <>
      <Navbar />

      {record != null && (
        <div className="finalPageMainCont">
          <div className="buttonsDiv">
            {/* <button onClick={navigateToPreviousPage} className="previousPage">
              Previous Page
            </button> */}

            <LeftCircleOutlined
              onClick={navigateToPreviousPage}
              style={{ fontSize: "36px" }}
            />

            <button
              className="viewFile"
              onClick={() => handleFile(record.file_path)}
            >
              View File
            </button>
          </div>

          <div className="finalPageCont">
            <h4>Patient Details</h4> <hr />
            <div className="patientData">
              <div className="singlePatientName">
                <span> Patient Name</span>

                <span>:</span>
                <span>{record.patient_name}</span>
                {/* <span>:</span>
              <span>.</span> */}
              </div>
              <div>
                <span>Age</span>
                <span>:</span>
                <span>{record.age}</span>

                {/* <span>:</span>
              <span>.</span> */}
              </div>
              <div>
                <span>Gender</span>
                <span>:</span>
                <span>{record.gender}</span>
                {/* <span>:</span>
              <span>.</span> */}
              </div>
              <div>
                <span>Date Of Registration</span>
                <span>:</span>
                <span>{record.Date_of_registration}</span>
                {/* <span>:</span>
              <span>.</span> */}
              </div>
              <div>
                <span>IP Number</span>
                <span>:</span>
                <span>{record.ip_number}</span>
                {/* <span>:</span>
              <span>.</span> */}
              </div>
              <div>
                <span>OP Number</span>
                <span>:</span>
                <span>{record.op_number}</span>
                {/* <span>:</span>
              <span>.</span> */}
              </div>
              <div>
                <span>Place</span>
                <span>:</span>
                <span>{record.place}</span>
                {/* <span>:</span>
              <span>.</span> */}
              </div>
              <div>
                <span>Reference By</span>
                <span>:</span>
                <span>{record.referrence_by}</span>
                {/* <span>:</span>
              <span>.</span> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FinalPage;
