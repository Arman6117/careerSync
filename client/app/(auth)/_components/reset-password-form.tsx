"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { resetUserPassword } from "@/actions";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const  router =useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.replace("/", "");

  if (!token) {
    toast.error("No token provided");
    return;
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      if (newPassword !== confirmPass) {
        toast.error("Password does not match");
      }
      const { message, success } = await resetUserPassword({
        token,
        newPassword,
      });
      if (success) {
        toast.success(message);
        router.push('/login')
      }
      if (!success) {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <>
     
      <form
        onSubmit={onSubmit}
        className="h-[200px] shadow-indigo-950   justify-center items-center rounded-lg shadow-2xl border-r px-4 flex-col gap-6 w-[300px] flex bg-white bg-gradient-to-br from-white from-[80%]  to-pink-600 via-indigo-300"
      >
        <Input
          disabled={isDisabled}
          className="w-full border-gray-900 rounded-xl focus-visible:border-pink-600 focus-visible:ring-0 focus-visible:border-2 transition-all placeholder:text-xs"
          placeholder="New Password"
          type="password"
          required
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          disabled={isDisabled}
          className="w-full border-gray-900 rounded-xl focus-visible:border-pink-600 focus-visible:ring-0 focus-visible:border-2 transition-all placeholder:text-xs"
          placeholder="Confirm New Password"
          type="password"
          required
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        <Button
          disabled={isDisabled}
          className="bg-pink-500 text-white"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
