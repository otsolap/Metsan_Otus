require('dotenv').config();
const sgMail = require('@sendgrid/mail')
const {
  SENDGRID_API_KEY,
  METSAN_OTUS_NAME,
  METSAN_OTUS_ADDRESS }
  = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

exports.handler = async (event, context, callback) => {

  const payload = JSON.stringify(event.body)
  const { email, subject, message } = payload

  const msg = {
    to: METSAN_OTUS_ADDRESS,
    name: METSAN_OTUS_NAME,
    from: email,
    subject: subject ? subject : 'Yhteydenotto lomakkeesta',
    text: message,
  };

  try {
    await sgMail.send(msg)
    return {
      statusCode: 200,
      body: "Viesti lähetetty"
    }
  } catch (e) {
    return {
      body: e.message,
      statusCode: 500,
    }
  }
};