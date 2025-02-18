"use server";
import axios from "axios";

const api = process.env.NEXT_PUBLIC_API_URL;
export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const url = `${api}/api/auth/login`;
  try {
    const { message, success } = (await axios.post(url, { email, password }))
      .data;
    return { message, success };
  } catch (error) {
    return { message: "Something went wrong", success: false };
  }
};

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const url = `${api}/api/auth/register`;

  try {
    const { message, success } = (
      await axios.post(url, { name, email, password })
    ).data;
    return { message, success };
  } catch (error) {
    return { message: "Something went wrong", success: false };
  }
};
