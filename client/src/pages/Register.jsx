import React, { useState } from "react";
import { Link } from "react-router-dom";
import GenderCheckbox from "../components/register/GenderCheckbox";

import { hotToastError } from "../helper/hotToast";
import { passwordValidation } from "../helper/passwordValidator";
import useApiRequests from "../services/useApiRequests";
import { useSelector } from "react-redux";
const Register = () => {
  const { registerApi } = useApiRequests();

  const loading = useSelector((state) => state.auth.loading);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmedPassword: "",
    gender: "",
  });
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, username, email, password, confirmedPassword, gender } =
      inputs;
    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !confirmedPassword ||
      !gender
    ) {
      hotToastError(
        "fullName, username, email, password, confirmedPassword, gender fields are required!"
      );
      return;
    }
    if (!passwordValidation(password)) {
      hotToastError(
        "Invalid PasswordType - Rules- [lenght:8-16, at least: 1 upper, 1 lower, 1 number, 1 special[@$!%*?&]]"
      );
      return;
    }
    if (password !== confirmedPassword) {
      hotToastError("Password and ConfirmedPassword are not matched!");
      return;
    }

    registerApi(inputs);
    setInputs({
      username: "",
      email: "",
      fullName: "",
      password: "",
      confirmedPassword: "",
      gender: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div
        className="
h-full w-full p-6 bg-pink-800 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-green-700 shadow-lg
"
      >
        <h1 className="text-3xl fond-semibold text-center text-gray-300">
          Register
          <span className="text-blue-500"> Chat App</span>
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="form-control w-full max-w-xs">
              <div className="label">
                <span className="text-base label-text">Username</span>
              </div>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                className="input input-bordered input-accent w-full max-w-xs"
                value={inputs.username}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="email" className="form-control w-full max-w-xs">
              <div className="label">
                <span className="text-base label-text">Email</span>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered input-accent w-full max-w-xs"
                value={inputs.email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="fullName" className="form-control w-full max-w-xs">
              <div className="label">
                <span className="text-base label-text">Full name</span>
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Full name"
                className="input input-bordered input-accent w-full max-w-xs"
                value={inputs.fullName}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password" className="form-control w-full max-w-xs">
              <div className="label">
                <span className="text-base label-text">Password</span>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered input-accent w-full max-w-xs"
                value={inputs.password}
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="confirmedPassword"
              className="form-control w-full max-w-xs"
            >
              <div className="label">
                <span className="text-base label-text">Confirmed Password</span>
              </div>
              <input
                id="confirmedPassword"
                name="confirmedPassword"
                type="password"
                placeholder="Confirmed Password"
                className="input input-bordered input-accent w-full max-w-xs"
                value={inputs.confirmedPassword}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="image" className="form-control w-full max-w-xs">
              <div className="label">
                <span className="text-base label-text">Image</span>
              </div>
              <input
                id="image"
                name="image"
                type="file"
                placeholder="Image"
                className="input input-bordered input-accent w-full max-w-xs"
              />
            </label>
            <GenderCheckbox inputs={inputs} setInputs={setInputs} />
          </div>
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-green-600 mt-2 inline-block cursor-pointer"
          >
            Do you have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2 ">
              {!loading ? (
                "Register"
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
