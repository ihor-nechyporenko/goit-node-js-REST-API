const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const path = require('path')
const fs = require('fs/promises')
const { v4 } = require('uuid')

const { User } = require('../../model')
const { sendEmail } = require('../../utils')

const avatarDir = path.join(__dirname, '../../', 'public/avatars');

const signup = async (req, res, next) => {
  try {
    const { password, email } = req.body
    const user = await User.findOne({ email })

    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        messsage: 'Already exist'
      })
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const defaultAvatar = gravatar.url(email, {protocol: 'https', s: '250'});
    const verifyToken = v4();

    const result = await User.create({ 
      email, 
      password: hashPassword, 
      avatarURL: defaultAvatar, 
      verifyToken,
    })

    const id = result._id.toString()
    const pathDir = path.join(avatarDir, id);
    await fs.mkdir(pathDir)

    const { EMAIL } = process.env;

    const data = {
      to: email,
      from: EMAIL,
      subject: 'Registration',
      html: `<a href="http://localhost:3000/api/auth/verify/${verifyToken}">Confirm registration</a>`,
    };

    sendEmail(data);
    
    res.status(201).json({
      status: 'saccess',
      code: 201,
      messsage: 'Saccess signup',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signup