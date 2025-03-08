const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // Choose your desired port

app.use(express.json()); // To parse JSON data

app.post('/submit', (req, res) => {
  const { name, email, reason } = req.body;

  // Create a transporter object using your email credentials
  const transporter = nodemailer.createTransport({
    service: 'YOUR_EMAIL_SERVICE', // e.g., 'gmail'
    auth: {
      user: 'YOUR_EMAIL_ADDRESS',
      pass: 'YOUR_EMAIL_PASSWORD'
    }
  });

  // Compose the email message
  const mailOptions = {
    from: 'YOUR_EMAIL_ADDRESS',
    to: 'YOUR_EMAIL_ADDRESS', // Send to your email
    subject: 'New Ticket Submission',
    text: `Name: ${name}\nEmail: ${email}\nReason: ${reason}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error submitting form');
    } else {
      console.log('Email sent:', info.response);
      res.send('Form submitted successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
