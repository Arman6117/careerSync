"use client";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  const onClick = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        name: "Arman",
        email: "Example.com",
        password: "1234",
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      Register page
      <Input />
      <Button onClick={onClick}>Make a request</Button>
    </div>
  );
};

export default RegisterPage;
