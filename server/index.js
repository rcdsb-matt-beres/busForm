const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON body parsing

//API for emails to get sent
app.post('/api/send-email', async (req, res) => {
  // 1. Extract the two required parameters from the request body
  const { address, body } = req.body;

  // 2. Validation
  if (!address || !body) {
    return res.status(400).json({ error: 'Missing required parameters: "address" and "body".' });
  }

  try {
    // Use the parameters to send the email
    const info = await sendEmail(address, body);

    // 4. Success Response
    res.status(200).json({
      message: 'Email successfully queued for delivery.',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('SMTP SERVER ERROR:', error.message);

    // 5. Failure Response
    res.status(500).json({
      error: 'Failed to send email via SMTP.',
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const nodemailer = require('nodemailer');

//Grab environment variables
require('dotenv').config();
const USER = process.env.SMTP_USER;
const PASS = process.env.SMTP_PASS;

//Configure SMTP
const SMTP_CONFIG = {
  host: 'mail.rcdsb.on.ca',
  port: 25,
  // Since port 25 is typically unencrypted, we set secure to false.
  // If your server required STARTTLS (explicit TLS), this setting is correct.
  secure: false,
  // auth: {
  //   user: process.env.SMTP_USER,
  //   pass: process.env.SMTP_PASS
  // },
  // Optional: Enables logging of SMTP communication to the console for debugging
  logger: true,
  debug: true
};

const transporter = nodemailer.createTransport(SMTP_CONFIG);

// Check if credentials are set before proceeding
if (!USER || !PASS) {
  console.error("ERROR: SMTP_USER or SMTP_PASS environment variables are not set.");
  console.log("Please set the credentials and try again.");
  return;
}

//function that sends the emails
async function sendEmail(address, body) {
  try {
    //Populate email info using params
    const recipientArray = address.split(',').map(s => s.trim());
    const mailInfo = {
      from: `"Registration & Transfer" <${USER}>`, // Sender's display name and address
      to: recipientArray,                    // Recipient's address
      subject: "Registration & Transfer Form Submission", // Your first string (Subject)
      text: body, // Your second string (Body)
    }

    // Use await to wait for the email to be sent
    const info = await transporter.sendMail(mailInfo);

    console.log("\n--- SUCCESS ---");
    console.log('Email sent successfully!');
    console.log('Message ID: %s', info.messageId);

    return info;
  } catch (error) {
    console.error("\n--- FAILURE ---");
    console.error('Error details:', error.message);
    console.error('Nodemailer Error Code:', error.code);

    // Most common error for Port 25 is 'Connection timeout' or 'EHOSTUNREACH'
    if (error.code === 'EPROTOCOL' || error.code === 'ECONNRESET') {
      console.error("\n*** DEBUG TIP: If the connection fails, your network or hosting provider may be blocking Port 25. ***");
      console.error("Consider trying Port 587 (TLS, secure: false) or Port 465 (SSL, secure: true) if available.");
    }
    throw error;
  }
}