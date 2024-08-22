import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useApiRequests from "../services/useApiRequests";
import { hotToastError } from "../helper/hotToast";
import { passwordValidation } from "../helper/passwordValidator";
const Login = () => {
  const { loginApi } = useApiRequests();

  const loading = useSelector((state) => state.auth.loading);
  const [inputs, setInputs] = useState({
    username: "", 
    password: "",
  });
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } =
      inputs;
    if (!username || !password ) {
      hotToastError(
        "username and password fields are required!"
      );
      return;
    }
    if (!passwordValidation(password)) {
      hotToastError(
        "Invalid PasswordType - Rules- [lenght:8-16, at least: 1 upper, 1 lower, 1 number, 1 special[@$!%*?&]]"
      );
      return;
    } 

    loginApi(inputs);

    setInputs({
      username: "",  
      password: ""
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
          Login
          <span className="text-blue-500"> Chat App</span>
        </h1>
        <form onSubmit={handleSubmit} action="">
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
          </div>
          <Link
            to="/register"
            className="text-sm hover:underline hover:text-green-600 mt-2 inline-block cursor-pointer"
          >
            Don't you have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2 ">
              
            {!loading ? (
                "Login"
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

export default Login;
