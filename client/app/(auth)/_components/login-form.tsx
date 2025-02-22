"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

import { loginUser } from "@/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "sonner";

const LoginForm = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(10),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsDisabled(true);
    const { email, password } = values;
    try {
      const { message, success } = await loginUser({
        email,
        password,
      });
      if (!success) toast.error(message);
      if (success) {
        form.reset();
        toast.success(message);
        router.push("/user");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  };
  return (
    <div className="h-[400px] shadow-indigo-950  rounded-lg shadow-2xl border-r px-4 flex-col gap-6 w-[300px] flex bg-white bg-gradient-to-br from-white from-[80%]  to-pink-600 via-indigo-300">
      <h1 className="text-2xl font-semibold mt-10 text-center">Login </h1>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-sm font-semibold ml-1">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isDisabled}
                    className="w-full border-gray-900 rounded-xl focus-visible:border-pink-600 focus-visible:ring-0 focus-visible:border-2 transition-all placeholder:text-xs"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-sm font-semibold ml-1">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isDisabled}
                    className="w-full border-gray-900 rounded-xl focus-visible:border-pink-600 focus-visible:ring-0 focus-visible:border-2 transition-all placeholder:text-xs"
                    placeholder="12345678"
                    type="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center gap-3 justify-center">
            <Button
              disabled={isDisabled}
              className="w-36 font-semibold  rounded-sm hover:bg-white hover:text-black transition-all hover:bg-clip-text hover:outline hover:outline-black bg-gradient-to-br from-indigo-200 from-[-3%] via-35% via-pink-500 to-[150%]  to-amber-400 text-white"
            >
              Login
            </Button>
            <Link
              href={"/forgot-password"}
              className="text-[11px] hover:underline text-pink-600"
            >
              Forgot Password
            </Link>
          </div>
          <div className="flex ga flex-col items-center ">
            <span className="text-center text-xs">Don't have an Account ?</span>
            <Link
              href={"/register"}
              className="text-[11px] hover:underline text-pink-600"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
