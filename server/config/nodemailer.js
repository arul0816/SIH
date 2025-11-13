// config/nodemailer.js (FIXED VERSION)
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({ // ✅ Remove 'r' from createTransporter
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Test the connection (optional)
transporter.verify((error, success) => {
  if (error) {
    console.log('📧 Email configuration error:', error.message);
  } else {
    console.log('📧 Email server is ready');
  }
});

export default transporter;