"use client";

import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";

import Link from "next/link";

import { verifyEmail } from "@/actions";

import { toast } from "sonner";

import { BsCheckCircleFill } from "react-icons/bs";
import { RiLoader3Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EmailVerificationForm = () => {
  const search = useSearchParams();
  const token = search.get("token")?.replace("/", "");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  if (!token) {
    return (
      <div className="h-[200px] shadow-indigo-950 items-center justify-center  rounded-lg shadow-2xl border-r px-4 flex-col gap-6 w-[300px] flex bg-white bg-gradient-to-br from-white from-[80%]  to-pink-600 via-indigo-300">
        <h1 className="font-semibold text-gray-700">No Token Provided!!</h1>
      </div>
    );
  }

  const handleResendEmail = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification-email`;
      const { message, success } = (await axios.post(url, { email })).data;
      if (success) {
        toast.success(message);
      }
      if (!success) {
        toast.error(message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error("Something went wrong");
    }
  };
  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const { message, success } = await verifyEmail({ token });

      if (!success) {
        toast.error(message);
        return;
      }
      if (
        (!success && message == "Token Expired") ||
        message == "NoTokenError"
      ) {
        toast.error(message);
        return (
          <form
            onSubmit={handleResendEmail}
            className="h-[200px] shadow-indigo-950   justify-center items-center rounded-lg shadow-2xl border-r px-4 flex-col gap-6 w-[300px] flex bg-white bg-gradient-to-br from-white from-[80%]  to-pink-600 via-indigo-300"
          >
            <Input
              // disabled={isLoading}
              className="w-full border-gray-900 rounded-xl focus-visible:border-pink-600 focus-visible:ring-0 focus-visible:border-2 transition-all placeholder:text-xs"
              placeholder="john@example.com"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="bg-pink-500 text-white" type="submit">
              Submit
            </Button>
          </form>
        );
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
