import mail from "@sendgrid/mail";
import { EmailData } from "../types/express";
import * as dotenv from "dotenv";
dotenv.config();

const sendGridApiKEY: string =
  process.env.SENDGRID_API_KEY ?? "API key not provided.";
console.log(sendGridApiKEY);
mail.setApiKey(sendGridApiKEY);

export const sendResetPasswordMail = async (
  toEmail: EmailData,
  token: string
) => {
  const subject: string = "Please click on link to reset password";
  try {
    const mailResult = await mail.send({
      to: toEmail,
      from: "krupali.yadav@talentsystems.com",
      subject,
      text: token,
    });
    console.log(mailResult);
  } catch (error) {
    console.error(error);
  }
};
