import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY || "re_fbhpYLCj_2Bni1bkG6zCkpc7YygpimXd7"
);

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";
export const sendResetPasswordEmail = async (
  email: string,
  token: string
) => {
    const resetLink = `${domain}/reset-password?token=${token}`;
  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Password",
    html: `<p>Click on <a href=${resetLink}/> to reset your password</p>
    `,
  });
};
