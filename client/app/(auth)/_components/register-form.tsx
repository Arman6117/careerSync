"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Link from "next/link";

import { loginUser, registerUser } from "@/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const formSchema = z.object({
    email: z.string().email(),
    name: z
      .string()
      .min(3, { message: "Name should contain at least 3 characters" })
      .max(10, { message: "Name can't contain more than 10 characters" }),
    password: z.string().min(6).max(8),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsDisabled(true);
    const { name, email, password } = values;
    try {
      const { message, success } = await registerUser({
        name,
        email,
        password,
      });
      setMessage(message);
      if (success) form.reset();
    } catch (error) {
      setMessage("Something went wrong");
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  };
  return (
    <div className="h-[400px] shadow-indigo-950  rounded-lg shadow-2xl border-r px-4 flex-col gap- w-[300px] flex bg-white bg-gradient-to-br from-white from-[80%]  to-pink-600 via-indigo-300">
      <h1 className="text-2xl font-semibold mt-8 text-center">Sign Up </h1>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 mt-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-">
                <FormLabel className="text-sm font-semibold ml-1">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isDisabled}
                    className="w-full border-gray-900 rounded-xl focus-visible:border-pink-600 focus-visible:ring-0 focus-visible:border-2 transition-all placeholder:text-xs"
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>
                {message ? (
                  <FormMessage>{message}</FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap2">
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
                {message ? (
                  <FormMessage>{message}</FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap2">
                <FormLabel className="text-sm font-semibold ml-1">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isDisabled}
                    className="w-full border-gray-900 rounded-xl focus-visible:border-pink-600 focus-visible:ring-0 focus-visible:border-2 transition-all placeholder:text-xs"
                    placeholder="12345678"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button
              disabled={isDisabled}
              className="w-36 font-semibold  rounded-sm hover:bg-white hover:text-black transition-all hover:bg-clip-text hover:outline hover:outline-black bg-gradient-to-br from-indigo-200 from-[-3%] via-35% via-pink-500 to-[150%]  to-amber-400 text-white"
            >
              Sign Up
            </Button>
          </div>
          <div className="flex ga flex-col items-center ">
            <span className="text-center text-xs">
              Already have an Account ?
            </span>
            <Link
              href={"/login"}
              className="text-[11px] hover:underline text-pink-600"
            >
              Login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
