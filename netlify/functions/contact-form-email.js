const sgMail = require('@sendgrid/mail')
const {
  SENDGRID_API_KEY,
  METSAN_OTUS_NAME,
  METSAN_OTUS_ADDRESS }
  = process.env

exports.handler = async (event, context, callback) => {

  const payload = JSON.parse(event.body)
  const { email, subject } = payload

  sgMail.setApiKey(SENDGRID_API_KEY)

  const body = Object.keys(payload).map((k) => {
    return `${k}: ${payload[k]}`
  }).join("<br><br>");

  const msg = {
    to: email,
    name: METSAN_OTUS_NAME,
    from: METSAN_OTUS_ADDRESS,
    subject: subject ? subject : 'Kiitos yhteydenotosta!',
    text: body,
  };

  try {
    await sgMail.send(msg)
    return {
      statusCode: 200,
      body: "Viesti lähetetty"
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message
    }
  }
};