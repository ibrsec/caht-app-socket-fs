import React from "react";
import {Link} from 'react-router-dom'
import GenderCheckbox from "../components/register/GenderCheckbox";
const Register = () => {
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
        <form action="">
          <div>
            <label htmlFor="username" className="form-control w-full max-w-xs">
              <div className="label">
                <span className="text-base label-text">Username</span>
              </div> 
              <input
              id="username"
                type="text"
                placeholder="Username"
                className="input input-bordered input-accent w-full max-w-xs"
              />
            </label>
            <label htmlFor="email" className="form-control w-full max-w-xs">
              <div className="label">
                <span className="text-base label-text">Email</span>
              </div> 
              <input
              id="email"
                type="text"
                placeholder="Email"
                className="input input-bordered input-accent w-full max-w-xs"
              />
            </label>
            <label htmlFor="fullname" className="form-control w-full max-w-xs">
              <div className="label">
                <span className="text-base label-text">Full name</span>
              </div> 
              <input
              id="fullname"
                type="text"
                placeholder="Full name"
                className="input input-bordered input-accent w-full max-w-xs"
              />
            </label>
            <label htmlFor="password" className="form-control w-full max-w-xs">
              <div className="label">
                <span className="text-base label-text">Password</span>
              </div> 
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="input input-bordered input-accent w-full max-w-xs"
              />
            </label>
            <label htmlFor="image" className="form-control w-full max-w-xs">
              <div className="label">
                <span className="text-base label-text">Image</span>
              </div> 
              <input
              id="image"
                type="file"
                placeholder="Image"
                className="input input-bordered input-accent w-full max-w-xs"
              />
            </label>
            <GenderCheckbox />
          </div>
            <a  className="text-sm hover:underline hover:text-green-600 mt-2 inline-block cursor-pointer" >Do you have an account?</a>
            <div><button className="btn btn-block btn-sm mt-2 ">Register</button></div>
        </form>
      </div>
    </div>
  );
};

export default Register;
