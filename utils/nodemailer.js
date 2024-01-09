const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'task.management.project.bootcamp@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
}));

// Function to send the email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
      from: 'task.management.project.bootcamp@gmail.com',
      to,
      subject,
      text,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error(error);
      }
      console.log('Email sent:', info.response);
    });
};
  
// Function to schedule email based on due date
const scheduleEmail = (dueDate, emailDetails) => {
    const currentTime = new Date().getTime();
    const dayBefore = 24*60*60*1000
    const dueTime = new Date(new Date(dueDate).getTime()-dayBefore).getTime()
    const timeDifference = dueTime - currentTime;
  
    if (timeDifference > 0) {
      // Schedule the email to be sent when the due date is reached
      setTimeout(() => {
        sendEmail(emailDetails.to, emailDetails.subject, emailDetails.text);
      }, timeDifference);
    } else {
      console.log('Due date has already passed.');
    }
};

module.exports = { transporter, sendEmail, scheduleEmail }
  