import React, { useState } from "react";
import { Button, Input, Logo } from "./index";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import authServices from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { login as authLogin, login } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const userData = await authServices.createAccount(data);
      if (userData) {
        console.log(userData);
        const userData = await authServices.getCurrentUser();
        if (userData) {dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className=" w-full h-[30rem] bg-[#fafafa] flex flex-col justify-center   ">

      <div className=" text-black flex flex-col py-4 gap-4 justify-center items-center">
        <div>
          <span className="">
            < Logo />
          </span>
        </div>

        <h2 className="text-2xl">Create an Account</h2>
        <p className="text-base font-semibold">
            Have an account ?&nbsp;
          <Link className="underline" to="/login">Login</Link>
        </p>
        {error && <p className="text-red-600 font-bold">{error}</p>}

        <form 
          className="w-full flex justify-center items-center"
        onSubmit={handleSubmit(create)}>
          <div className="flex flex-col gap-4 justify-center items-center  
          ">
            <Input
            className="min-w-[20rem] flex justify-between"
              label="Name:"
              type="text"
              placeholder="Full Name"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              className="min-w-[20rem] flex justify-between"
              label="Email:"
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Enter valid email address",
                },
              })}
            />

            <Input
              className="min-w-[20rem] flex justify-between"
              label="Password"
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
              })}
            />

            <Button 
            className="
            bg-black rounded-md hover:scale-105 hover:shadow-lg hover:bg-black/85
            duration-75
            " type="submit">Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
