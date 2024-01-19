import { useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import LogoGold from "../assets/logoGold.png"

const baseUrl = "http://localhost:3000";

export const LoginPage = () => {
  let input = {
    id: useRef(),
    password: useRef(),
  };
  const navigate = useNavigate();

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(`${baseUrl}/login`, {
        id_kampus: input.id.current.value,
        password: input.password.current.value,
      });

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id", data.user.id);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("id_kampus", data.user.id_kampus);
      localStorage.setItem("name", data.user.name);

      Swal.fire({
        width: 200,
        icon: "success",
        text: `Login Successfull`,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
      const error = err.response.data.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex min-h-full flex-1 items-center">
          <div className="hidden w-0 flex-1 lg:block">
            <img className="inset-0 w-full object-cover" src={LogoGold} alt="banner" />
          </div>
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 h-screen">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account:</h2>
              </div>
              <div className="mt-6">
                <div>
                  <form className="space-y-6" action="" method="POST" onSubmit={(e) => submitForm(e)}>
                    <div className="relative">
                      <label htmlFor="name" className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                        NPK / NIK
                      </label>
                      <input
                        ref={input.id}
                        id="email"
                        name="email"
                        type="text"
                        autoComplete="email"
                        required
                        className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 ring-gray-300`}
                      />
                    </div>
                    <div className="relative mt-5">
                      <label htmlFor="name" className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                        Password
                      </label>
                      <input
                        ref={input.password}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6  ring-gray-300`}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-full bg-red-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                      >
                        Sign In
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
