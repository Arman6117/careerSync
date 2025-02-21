"use server";
import axios, { AxiosError } from "axios";

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
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message, success: false };
    }
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
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message, success: false };
    }
    return { message: "Something went wrong", success: false };
  }
};

export const verifyEmail = async ({
  token,
}: {
  token: string;
}): Promise<{ message: string; success: boolean }> => {
  const url = `${api}/api/auth/verify-email`;

  try {
    const { message, success } = (await axios.post(url, { token })).data;

    return { message, success };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message, success: false };
    }

    return { message: "Something went wrong", success: false };
  }
};

export const sendForgotPassEmail = async ({ email }: { email: string }) => {
  const url = `${api}/api/auth/forgot-password`;

  try {
    const { message, success } = (await axios.post(url, { email })).data;
    return { message, success };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message, success: false };
    }
    return { message: "Something went wrong", success: false };
  }
};
export const resetUserPassword = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) => {
  const url = `${api}/api/auth/reset-password`;

  try {
    const { message, success } = (await axios.post(url, { token, newPassword }))
      .data;
    return { message, success };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message, success: false };
    }
    return { message: "Something went wrong", success: false };
  }
};
