import nodemailer from "nodemailer"

export const sendEmailVerificationOTP = async (req, res) => {
  const { OTP, email } = req.body;
  console.log("req.body: ", req.body);

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "sonu.mondal.2027@gmail.com",
      pass: "ghfs wdlk pkwd pjmg",
    },
  });

  // Setup email data
  let mailOptions = {
    from: "sonu.mondal.2027@gmail.com",
    to: email,
    subject: "Verify your email",
    text: `Welcome to the family finance manager. Please, verify your email by entering the OTP: ${OTP}`,
  };

  console.log("mailOptions: ", mailOptions);

  try {
    await transporter.sendMail(mailOptions);
    res.send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
};
