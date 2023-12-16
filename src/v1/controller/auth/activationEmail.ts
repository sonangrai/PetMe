import nodemailer from "nodemailer";

/**
 * Create activate token and save to mongodb
 */
const SendActivationMail = async (id: string, token: string, email: string) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "shonahangrae@gmail.com",
      pass: process.env.myPass,
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Password Reset Request", // Subject line
    text: "Forgot Your Password", // plain text body
    html: `<p>CLick here to change your password <a href="/api/resetpassword/${id}/${token}">Reset password</a> </p>`, // html body
  });
};

export default SendActivationMail;
