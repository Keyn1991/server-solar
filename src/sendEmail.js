const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

require('dotenv').config();
router.post('/send-email', (req, res) => {
    const { firstName, lastName, email, phone, termsAccepted, state } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER, // замініть на змінну середовища
            pass: process.env.EMAIL_PASS // замініть на змінну середовища
        },
    });

    const mailOptions = {
        from: 'No reply',
        to: process.env.TO_EMAIL, // замініть на адресу отримувача
        subject: 'New order',
        html: `
    <html>
      <head>
        <style>
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
          th, td {
            padding: 5px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <h1>New Proposal Submitted</h1>
        <table>
          <tr>
            <th>Nazwa pola</th>
            <th>Wartość</th>
          </tr>
          <tr>
            <td>Imię</td>
            <td>${firstName}</td>
          </tr>
          <tr>
            <td>Nazwisko</td>
            <td>${lastName}</td>
          </tr>
          <tr>
            <td>E-mail</td>
            <td>${email}</td>
          </tr>
          <tr>
            <td>Telefon</td>
            <td>${phone}</td>
          </tr>
          <tr>
            <td>Warunki zaakceptowane</td>
            <td>${termsAccepted}</td>
          </tr>
          <tr>
           <td><b>Przesłane dane</b> 
</td>
<td>
  ${Object.entries(state)
            .map(([key, value]) => `<b>${key}:</b> ${value}<br/>`)
            .join('')}
</td>
        </table>
      </body>
    </html>
  `,
    };

       transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent successfully');
            res.send('Email sent successfully');
        }
    });
});

module.exports = router;
