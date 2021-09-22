const sendgridMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sendgridMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: 'naturalbeautygoods@ukr.net' };
    await sendgridMail.send(email);
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      messsage: 'Not found',
    })
  }
};

module.exports = sendEmail;