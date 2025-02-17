"use server";
import axios from "axios";
export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;
  try {
    const {message,success} = (await axios.post(url, {email,password})).data
    return {message,success};
  } catch (error) {
    return {message:"Something went wrong",success:false}
  }
};
