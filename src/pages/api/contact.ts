import { Product } from "@/api/product/interfaces";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface EmailData {
  firstName: string;
  lastName: string;
  message: string;
  email: string;
  phone: string;
  items: Product[];
}

const getNames = (items: Product[]) => {
  return items.map((item) => item.name).join(", ");
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract data from the request body
  const { firstName, lastName, phone, message, email, items }: EmailData =
    req.body;

  const newMessage = `
  מתעניין במצורים :${getNames(items)}
    \n
    הודעת לקוח :${message}
    
  `;
  console.log({ body: req.body });
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_COMPANY, // Replace with your company's email
      pass: process.env.EMAIL_PASSOWRD_COMPANY, // Replace with your email password or app-specific password
    },
  });

  console.log({
    user: process.env.EMAIL_COMPANY,
    pass: process.env.EMAIL_PASSOWRD_COMPANY,
  });

  const mailOptions = {
    from: email, // Sender's email address
    to: process.env.EMAIL_COMPANY, // Your company's email address
    subject: `${firstName} ${lastName} - phone: ${phone}`,
    text: newMessage,
  };

  try {
    console.log("=======");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}
