"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Link from "next/link";

import { loginUser } from "@/actions/login";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(8),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="h-[400px] shadow-indigo-950  rounded-lg shadow-2xl border-r px-4 flex-col gap-6 w-[300px] flex bg-white bg-gradient-to-br from-white from-[80%]  to-pink-600 via-indigo-300">
      <h1 className="text-2xl font-semibold mt-10 text-center">Login </h1>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 "
          onSubmit={form.handleSubmit(() => {})}
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
                    className="w-full border-gray-900 rounded-xl focus-visible:border-pink-600 focus-visible:ring-0 focus-visible:border-2 transition-all placeholder:text-xs"
                    placeholder="12345678"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button className="w-36 font-semibold  rounded-sm hover:bg-white hover:text-black transition-all hover:bg-clip-text hover:outline hover:outline-black bg-gradient-to-br from-indigo-200 from-[-3%] via-35% via-pink-500 to-[150%]  to-amber-400 text-white">
              Login
            </Button>
          </div>
          <div className="flex ga flex-col items-center ">
            <span className="text-center text-xs">
              Already have an Account ?
            </span>
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
