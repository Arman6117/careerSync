"use client";

import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Link from "next/link";

import { verifyEmail } from "@/actions";

import { toast } from "sonner";

import { BsCheckCircleFill } from "react-icons/bs";
import { RiLoader3Line } from "react-icons/ri";

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
    <div className="h-[200px] shadow-indigo-950 items-center justify-center  rounded-lg shadow-2xl border-r px-4 flex-col gap-5 w-[300px] flex bg-white bg-gradient-to-br from-white from-[80%]  to-pink-600 via-indigo-300">
      {isVerified ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-semibold text-gray-700">Email Verified</h1>
          <Link
            href={"/login"}
            className="text-[11px] hover:underline text-pink-600"
          >
           Back To Login
          </Link>
        </div>
      ) : (
        <h1 className="font-semibold text-gray-700">Verifying Your Email</h1>
      )}
      {!isVerified && isLoading && (
        <RiLoader3Line className="animate-spin text-gray-500 text-6xl " />
      )}
      {isVerified && <BsCheckCircleFill className="  text-gray-500 text-5xl" />}
    </div>
  );
};

export default EmailVerificationForm;
