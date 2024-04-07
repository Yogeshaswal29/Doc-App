import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";
const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  // login user data
  const getUserData = async () => {
    console.log("home router render call ", localStorage.getItem("token"));
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/user/getAllDoctors",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
        console.log("ooooooooooooooooooooooooooooooooooooooooooooooooooo");
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {doctors &&
          doctors.map((doctor) => (
            <DoctorList key={DoctorList} doctor={doctor} />
          ))}
      </Row>
    </Layout>
  );
};

export default HomePage;
