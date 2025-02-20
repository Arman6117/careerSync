"use client";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { sendForgotPassEmail } from "@/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const ForgotPasswordForm = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      const { message, success } = await sendForgotPassEmail({ email });
      if (success) {
        toast.success(message);
      }
      if (!success) {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error)
    } finally {
      setIsDisabled(false);
    }
  };
  return (
    <form onSubmit={onSubmit} className="h-[200px] shadow-indigo-950   justify-center items-center rounded-lg shadow-2xl border-r px-4 flex-col gap-6 w-[300px] flex bg-white bg-gradient-to-br from-white from-[80%]  to-pink-600 via-indigo-300">
      <Input
        disabled={isDisabled}
        className="w-full border-gray-900 rounded-xl focus-visible:border-pink-600 focus-visible:ring-0 focus-visible:border-2 transition-all placeholder:text-xs"
        placeholder="john@example.com"
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button className="bg-pink-500 text-white" type="submit">Submit</Button>
    </form>
  );
};

export default ForgotPasswordForm;
