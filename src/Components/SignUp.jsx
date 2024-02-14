import React, { useState } from "react";
import Logo from "./Navbar/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { authCreateUser, getCurrentUser } from "../Appwrite/AppwriteAuth.js";
import { login } from "../Store/Slices/AuthSlice.js";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const createNewUser = async (data) => {
    setError("");
    try {
      const createdUserData = await authCreateUser(data);
      if (createdUserData) {
        const userData = await getCurrentUser();

        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
      console.log("Error while registering user ", error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 mt-28">
        <div>
          <Logo />
        </div>

        <div className="flex flex-col  justify-center items-center">
          <h2 className="font-semibold">Sign up an Account </h2>
          <p>
            Already have an account?
            <Link to={"/login"}>
              <span className="font-bold"> Sign In </span>
            </Link>
          </p>
          {error && <p className="text-red-700 font-semibold">{error}</p>}
        </div>

        <form
          className="flex flex-col gap-3 items-center"
          onSubmit={handleSubmit(createNewUser)}
        >
          <input
            type="text"
            className="border-2 px-4 rounded-sm py-1 border-black/50"
            placeholder="Email"
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
          <input
            type="text"
            className="border-2 px-4 rounded-sm py-1 border-black/50"
            placeholder="Username"
            {...register("name", { required: true })}
          />
          <input
            type="password"
            className="border-2 px-4 rounded-sm py-1 border-black/50"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <button
            type="submit"
            className="bg-blue-800 text-white font-semibold w-fit px-6 py-2 rounded-md "
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
