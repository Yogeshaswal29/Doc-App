import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RegisterStyles.css";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      console.log(
        "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
        values
      );
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        values
      );
      dispatch(hideLoading());
      if (res.data.success) {
        console.log(
          "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
        );
        message.success("Registered Successfully!");
        navigate("/login");
      } else {
        console.log("entered else");
        message.error(res.data.message);
      }
    } catch (error) {
      console.log("entered catch");
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          // onFinish={(e) => {
          //   console.log("hi there");
          // }}
          className="register-form"
        >
          <h3 className="text-center">Register From</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="m-2">
            Already registered? Go to Login
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
