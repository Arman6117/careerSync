"use client";

import { verifyEmail } from "@/actions";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiLoader3Line } from "react-icons/ri";
import { toast } from "sonner";

const EmailVerificationForm = () => {
  const search = useSearchParams();
  const token = search.get("token")?.replace("/", "");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!token) {
    return (
      <div className="h-[200px] shadow-indigo-950 items-center justify-center  rounded-lg shadow-2xl border-r px-4 flex-col gap-6 w-[300px] flex bg-white bg-gradient-to-br from-white from-[80%]  to-pink-600 via-indigo-300">
        <h1 className="font-semibold text-gray-700">No Token Provided!!</h1>
      </div>
    );
  }
  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const { message, success } = await verifyEmail({ token });
      console.log(message)
      if (!success) {
        toast.error(message);
        return;
      }
      if (success) {
        toast.success(message);
        setIsVerified(true);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div className="h-[200px] shadow-indigo-950 items-center justify-center  rounded-lg shadow-2xl border-r px-4 flex-col gap-6 w-[300px] flex bg-white bg-gradient-to-br from-white from-[80%]  to-pink-600 via-indigo-300">
      {isVerified ? (
        <h1 className="font-semibold text-gray-700">Verifying Your Email</h1>
      ) : (
        <h1 className="font-semibold text-gray-700">Email Verified</h1>
      )}
      {isLoading && (
        <RiLoader3Line className="animate-spin text-gray-500 text-6xl " />
      )}
      {isVerified && <BsCheckCircleFill className="  text-gray-500 text-5xl" />}
    </div>
  );
};

export default EmailVerificationForm;
