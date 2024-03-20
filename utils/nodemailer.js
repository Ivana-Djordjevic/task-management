const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { Notification } = require('../models/Notification');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport(smtpTransport({
    pool: true,
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      tls: {
        servername: 'smtp.gmail.com',
      },
    auth: {
        user: 'task.management.project.bootcamp@gmail.com',
        pass: process.env.EMAIL_PASSWORD,
    },
}));

// Function to send the email
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: 'task.management.project.bootcamp@gmail.com',
        to,
        subject,
        text,
    //   text: generateEmail(text),
    // create function to generate an HTML body
    };
    console.log('transporter send mail')
    return await transporter.sendMail(mailOptions);
};

// Function to schedule email based on due date
const scheduleEmail = async (dueDate, emailDetails) => {
    // const currentTime = new Date().getTime();
    const dayBefore = 24*60*60*1000;
    const dueTime = new Date(new Date(dueDate).getTime()-dayBefore);
    // const timeDifference = dueTime - currentTime;
    // console.log('due time: ' , new Date(dueTime))
    // console.log(timeDifference)
    try {
        const notification = await Notification.create({
            due_date: dueTime,
            details: JSON.stringify(emailDetails)
        });
        console.log(notification);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { transporter, sendEmail, scheduleEmail };