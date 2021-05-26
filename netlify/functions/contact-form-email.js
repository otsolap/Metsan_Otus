const sgMail = require('@sendgrid/mail')
const {
  SENDGRID_API_KEY,
  METSAN_OTUS_NAME,
  METSAN_OTUS_ADDRESS }
  = process.env

exports.handler = async (event, context, callback) => {

  const payload = JSON.parse(event.body)
  const { email } = payload

  sgMail.setApiKey(SENDGRID_API_KEY)


  const msg = {
    to: email,
    name: METSAN_OTUS_NAME,
    from: METSAN_OTUS_ADDRESS,
    subject: 'Kiitos yhteydenotosta!',
    html: `Kiitos viestistäsi! Palaan viestiisi noin viikon sisällä. Ystävällisin, Metsän Otus.`
  };

  try {
    await sgMail.send(msg)
    return {
      statusCode: 200,
      body: "Viesti lähetetty"
    }
  } catch (e) {
    return {
      statusCode: e.code,
      body: e.message
    }
  }
};