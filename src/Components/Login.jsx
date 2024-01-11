import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../Store/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return ( 
    <div className="w-full h-[30rem] bg-[#fafafa] flex flex-col justify-center">

      <div className="  text-black flex flex-col py-4 gap-4 justify-center items-center">
        <div>
          <span>
            <Logo  />
          </span>
        </div>
        
        <h2 className="text-2xl">Sign in to your account</h2>

        <p className="text-base font-semibold">
          Don&apos;t have any account?&nbsp;
          <Link className="underline" to="/signup">Sign up</Link>
        </p>

        {error && <p className="text-red-600 font-bold">{error}</p>}

        <form 
          className=" flex flex-col justify-center items-center"
          onSubmit={handleSubmit(login)}
        >
            <div className="flex   flex-col gap-4 justify-center items-center" >

                <Input
                className="min-w-[20rem] flex justify-between " 
                label = "Email:"
                placeholder = "Enter Your Email"
                type = "email"
                {...register('email' , {
                    required:true,
                    validate:{
                        matchPattern:(value)=> /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)||"Enter valid email address"
                    }
                })}
                />

                <Input
                className="min-w-[20rem] flex justify-between"
                label = "Password:"
                type = "password"
                placeholder = "Enter your Password"
                {...register("password",{
                    required:true
                })}
                />
                <Button className="bg-black rounded-md hover:scale-105 hover:shadow-lg hover:bg-black/85
                duration-75" type="submit">Login</Button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
