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
    <div className=" py-4 bg-slate-700 text-white">
      <div className="flex flex-col gap-[1rem] justify-center items-center">
        <div>
          <span className="">
            < Logo />
          </span>
        </div>

        <h2>Create an Account</h2>
        <p>
            Have an account ?&nbsp;
          <Link className="underline " to="/login">Login</Link>
        </p>
        {error && <p>{error}</p>}

        <form 
          className="w-full flex justify-center items-center"
        onSubmit={handleSubmit(create)}>
          <div className="flex flex-col gap-[0.8rem] justify-center items-center  
          ">
            <Input
            className="mx-2 px-2"
              label="Name:"
              type="text"
              placeholder="Full Name"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              className="mx-2 px-2"
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
              className="mx-2 px-2"
              label="Password"
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit">Sign Up</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
