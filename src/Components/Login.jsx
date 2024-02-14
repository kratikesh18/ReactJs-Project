import React, { useState } from "react";
import { Logo } from "./index.js";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authLoginUser, getCurrentUser } from "../Appwrite/AppwriteAuth.js";
import { useDispatch } from "react-redux";
import { login } from "../Store/Slices/AuthSlice.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

   async function loginUser (data){
    console.log("data" ,data)
    setError("");
    try {
      const session = await authLoginUser(data);

      if (session) {
        const userData = await getCurrentUser();
        
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 mt-28">
        <div>
          <Logo />
        </div>

        <div className="flex items-center justify-center flex-col">
          <h2 className="font-semibold">Sign in to Your Account </h2>
          <p>
            Don&apos;t have an account?{" "}
            <Link to={"/signup"}>
              <span className="font-bold">Create One </span>
            </Link>
          </p>

          {error && <p className="text-red-600 font-semibold">{error}</p>}
        </div>

        <form
          className="flex flex-col gap-3 items-center"
          onSubmit={handleSubmit(loginUser)}
        >
          <input
            type="text"
            className="border-2 px-4 rounded-sm py-1 border-black/50"
            placeholder="Email"
            {...register("email", {
              required: true,
            })}
          />

          <input
            type="password"
            className="border-2 px-4 rounded-sm py-1 border-black/50"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
          />
          <button
            type="submit"
            className="bg-blue-800 text-white font-semibold w-fit px-6 py-2 rounded-md "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
