"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SignInSignUpForm = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  return (
    <div className="h-screen bg-slate-300/20 w-screen flex justify-center items-center">
      <div
        className={`relative w-[768px]  max-w-full min-h-[480px] bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ${
          isSignUpActive ? "right-panel-active" : ""
        }`}
      >
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center transition-all duration-500 ${
            isSignUpActive
              ? "translate-x-full opacity-100 z-10"
              : "opacity-0 z-0"
          }`}
        >
          <form className="flex flex-col items-center text-center gap-3">
            <h1 className="text-xl font-bold">Create Account</h1>
            <div className="flex gap-3">
              <button className="p-2 rounded-full border">🔵</button>
              <button className="p-2 rounded-full border">🔴</button>
              <button className="p-2 rounded-full border">🟢</button>
            </div>
            <span className="text-sm text-gray-500">
              Or use your email for registration
            </span>
            <input type="text" placeholder="Name" className="input-field" />
            <input type="email" placeholder="Email" className="input-field" />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
            />
            <button
              className="text-[16px] font-semibold  py-1 px-2 w-40 text-white hover:bg-gradient-to-b 
    hover:outline hover:outline-1 transition-all hover:outline-neutral-800 
    hover:bg-clip-text hover:text-transparent rounded-md from-indigo-200 
    from-[-3%] via-35% bg-gradient-to-br via-pink-500 to-[150%] to-amber-400"
            >
              Register
            </button>
          </form>
        </div>

        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center transition-all duration-500 ${
            isSignUpActive
              ? "translate-x-full opacity-0 z-0"
              : "opacity-100 z-10"
          }`}
        >
          <form className="flex flex-col items-center text-center gap-3">
            <h1 className="text-xl font-bold">Login</h1>
            <div className="flex gap-3">
              <button className="p-2 rounded-full border">🔵</button>
              <button className="p-2 rounded-full border">🔴</button>
              <button className="p-2 rounded-full border">🟢</button>
            </div>
            <span className="text-sm text-gray-500">Or use your account</span>
            <input type="email" placeholder="Email" className="input-field" />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
            />
            <a href="#" className="text-sm text-blue-500">
              Forgot your password?
            </a>
            <Button
              className="text-[16px] font-semibold py-1 px-2 w-40 text-white hover:bg-gradient-to-b 
    hover:outline hover:outline-1 transition-all hover:outline-neutral-800 
    hover:bg-clip-text hover:text-transparent rounded-md from-indigo-200 
    from-[-3%] via-35% bg-gradient-to-br via-pink-500 to-[150%] to-amber-400"
            >
              Sign In
            </Button>
          </form>
        </div>

        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full flex items-center justify-center text-white text-center transition-all duration-500 ${
            isSignUpActive ? "-translate-x-full" : "translate-x-0"
          } bg-gradient-to-r from-pink-500 to-red-500`}
        >
          <div className="flex flex-col items-center p-6">
            {isSignUpActive ? (
              <>
                <h1 className="text-2xl font-bold">Already Have An Account</h1>
                <p className="text-sm mt-2">
                  To keep connected with us, please login with your info.
                </p>
                <Button
                  className=" font-semibold bg-white mt-2 text-black"
                  onClick={() => setIsSignUpActive(false)}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold">Don't Have An Account!</h1>
                <p className="text-sm mt-2">
                  Enter your details and start your journey with us.
                </p>
                <Button
                  className="bg-white text-black font-semibold mt-4"
                  onClick={() => setIsSignUpActive(true)}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUpForm;
