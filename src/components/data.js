import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Table, DatePicker } from "antd";
import "../Styling/data.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReloadOutlined } from "@ant-design/icons";
import moment from "moment/moment";

const { RangePicker } = DatePicker;

function Data() {
  const [tableData, setTableData] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [patientSearch, setPatientSearch] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [dateRange, setDateRange] = useState([]);

  const Navigate = useNavigate();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhhcmlzaCIsInVzZXJpZCI6Im1lZF8wMSIsImlhdCI6MTcwNjAxMzI4OX0.-CFNPJkG-aCZil_zITGUWScSvrlKlaVijNT_rMEf6y0";

  useEffect(() => {
    const apiData = async () => {
      try {
        const data = await axios.get(
          "https://med.test.avika.ai/admin/records",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // "Content-Type": "application/json",
            },
          }
        );

        if (data.status === 200) {
          console.log(data);
          console.log(data.data);
          console.log(data.data.data);

          const dataResponse = data.data.data;
          console.log(dataResponse.length);
          const formattedData = dataResponse.map((item, index) => ({
            key: index,
            s_no: index + 1,
            PatientName: item.patient_name,
            Age: item.age,
            Gender: item.gender,
            DateOfRegistration: item.Date_of_registration,
            Place: item.place,
            UploadedDate: item.created_at,
            op_number: item.op_number,
            ip_number: item.ip_number,
            id: item.id,
          }));

          setTableData(formattedData);
          setTotalDocuments(dataResponse.length);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    apiData();
  }, []);

  const handleSearch = (e) => {
    setPatientSearch(e.target.value.toLowerCase());
  };

  const handleGenderSearch = (e) => {
    setSelectGender(e.target.value);
  };

  const handleDateRange = (dates) => {
    setDateRange(dates);
  };
  const searchedData = tableData.filter((item) => {
    if (selectGender && dateRange.length === 2) {
      return (
        item.PatientName.toLowerCase().includes(patientSearch) &&
        item.Gender.toLowerCase() === selectGender &&
        moment(item.UploadedDate, "DD/MM/YYYY") >= dateRange[0] &&
        moment(item.UploadedDate, "DD/MM/YYYY") <= dateRange[1]
      );
    } else if (dateRange.length === 2) {
      return (
        item.PatientName.toLowerCase().includes(patientSearch) &&
        moment(item.DateOfRegistration, "DD/MM/YYYY") >= dateRange[0] &&
        moment(item.DateOfRegistration, "DD/MM/YYYY") <= dateRange[1]
      );
    } else if (selectGender) {
      return (
        item.PatientName.toLowerCase().includes(patientSearch) &&
        item.Gender.toLowerCase() === selectGender
      );
    }

    return item.PatientName.toLowerCase().includes(patientSearch);
  });

  const displayCount =
    patientSearch || selectGender || dateRange.length > 0
      ? searchedData.length
      : totalDocuments;

  const handleButton = (id) => {
    // Navigate("/finalPage");
    // console.log(id);
    Navigate(`/finalPage/${id}`);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const columns = [
    {
      title: "S.NO",
      dataIndex: "s_no",
      width: 100,
    },
    {
      title: "Patient Name",
      width: 150,
      dataIndex: "PatientName",
      // key: "name",
      // fixed: "left",
    },
    {
      title: "Age",
      width: 100,
      dataIndex: "Age",
      // key: "age",
      // fixed: "left",
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      // key: "1",
      width: 100,
    },
    {
      title: "Date Of Registration",
      dataIndex: "DateOfRegistration",
      // key: "2",
      width: 150,
    },
    {
      title: "Place",
      dataIndex: "Place",
      // key: "3",
      width: 150,
    },
    {
      title: "Uploaded Date",
      dataIndex: "UploadedDate",
      // key: "4",
      width: 150,
    },
    {
      title: "IP Number",
      dataIndex: "ip_number",
      // key: "5",
      width: 150,
    },
    {
      title: "OP Number",
      dataIndex: "op_number",
      // key: "6",
      width: 150,
    },
    // {
    //   title: "id",
    //   dataIndex: "id",
    //   // key: "6",
    //   width: 150,
    // },
    {
      title: "Action",
      key: "operation",
      dataIndex: "id",
      fixed: "right",
      width: 100,
      // render: () => (
      //   <button onClick={() => handleButton(dataIndex)}>Details</button>
      render: (text, record) => (
        <button
          onClick={() => handleButton(record.id)}
          className="btn btn-outline-primary"
        >
          Details
        </button>
      ),
    },
  ];
  // <LeftCircleOutlined />
  // const data = [];
  // for (let i = 0; i < data; i++) {
  //   data.push({
  //     SNo: i,
  //     PatientName: `Edward ${i}`,
  //     age: 32,
  //     gender: `London Park no. ${i}`,
  //     DateOfRegistration: "12/03/2024",
  //     Place: "hyd",
  //     UploadedDate: "12/02/2024",
  //     IpNumber: "123",
  //     OpNumber: "11",
  //   });
  // }

  return (
    <>
      <Navbar />

      <div className="cont">
        <div className="contChild">
          <h2>All Document Records</h2>
          <div>
            <span className="text-white"> All documents :{displayCount}</span>
          </div>
        </div>

        <div className="contChild2">
          <input
            type="text"
            placeholder="Search Patient"
            className="form-control"
            style={{ width: "320px", margin: "10px 20px", padding: "5px" }}
            onChange={handleSearch}
          />

          <select
            id="gender"
            style={{ width: "170px", margin: "10px 20px", padding: "5px" }}
            onChange={handleGenderSearch} className="form-select"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* <button className="refresh" onClick={refreshPage}>
            Refresh
          </button> */}
          <ReloadOutlined
            onClick={refreshPage}
            style={{
              width: "30px",
              height: "30px",
              color: "black",
              fontSize: "24px",
            }}
          />

          <select
            id="date"
            style={{
              width: "250px",
              marginLeft: "390px",
              marginRight: "10px",
              padding: "5px",
            }}
            className="form-select"
            // onChange={handleUploadedDateSearch}
          >
            <option value="">Search By Date Range</option>
            <option value="Uploaded Date ">Uploaded Date</option>
            <option value="Date Of Registration">Date Of Registration</option>
          </select>

          <RangePicker format="DD/MM/YYYY" onChange={handleDateRange} />
        </div>
        {/* <TableData /> */}
        {
          <Table
            columns={columns}
            // dataSource={data}
            dataSource={searchedData}
            // scroll={{
            //   x: 1500,
            //   y: 900,
            // }}
          />
        }
      </div>
    </>
  );
}

export default Data;
