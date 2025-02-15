import React from "react";
import LoginForm from "../_components/login-form";

const LoginPage = () => {
  return (
    <main className="relative flex items-center justify-center h-screen w-full">
      <div  className="h-full absolute -z-10 w-full  pattern-zigzag-3d pattern-gray-600 pattern-opacity-5  pattern-bg-white pattern-size-32 "  ></div>
      <LoginForm/>
    </main>
  );
};

export default LoginPage;
