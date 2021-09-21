const { User } = require('../../model');
const { sendEmail } = require('../../utils')

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found'
      })
    }

    if (!user.verify) {
      const { EMAIL } = process.env;

      const data = {
        to: email,
        from: EMAIL,
        subject: 'Registration',
        html: `<a href="http://localhost:3000/api/auth/users/verify/${user.verifyToken}">Confirm registration</a>`,
      };
  
      sendEmail(data);

      return res.status(200).json({
        status: 'saccess',
        code: 200,
        message: 'Verification email sent'
      })
    }

    res.status(400).json({
      status: 'Bad Request',
      code: 400,
      message: 'Verification has already been passed'
    })

  } catch (error) {
    next(error)
  }
};

module.exports = resendEmail;