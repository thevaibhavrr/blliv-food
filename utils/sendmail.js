
const nodemailer = require("nodemailer");

// send mail to user
const sendEmail = async (email, subject, message, isHTML = false) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "vaibhavrathorema@gmail.com",
      pass: "rsjm bgsh rcyt jcux",
    },
  });

  // Create mail options
  let mailOptions = {
    from: "vaibhavrathorema@gmail.com",
    to: email,
    subject: subject,
    text: isHTML ? undefined : message,
    html: isHTML ? message : undefined,
  };

  // Send mail
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// Export the sendEmail function
module.exports = sendEmail;
