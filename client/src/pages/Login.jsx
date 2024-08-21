import React from "react";
import {Link} from 'react-router-dom'
const Login = () => {
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
        <form action="">
          <div>
          <label htmlFor="username" className="form-control w-full max-w-xs">
              <div className="label">
                <span className="text-base label-text">Username or Email</span>
              </div> 
              <input
              id="username"
                type="text"
                placeholder="Username or Email"
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
          </div>
            <a  className="text-sm hover:underline hover:text-green-600 mt-2 inline-block cursor-pointer" >Don't you have an account?</a>
            <div><button className="btn btn-block btn-sm mt-2 ">Login</button></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
