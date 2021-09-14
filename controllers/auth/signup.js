const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const path = require('path')
const fs = require('fs/promises')

const { User } = require('../../model')

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

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const defaultAvatar = gravatar.url(email, {protocol: 'https', s: '250'})
    const result = await User.create({ email, password: hashPassword, avatarURL: defaultAvatar })

    const id = result._id.toString()
    const pathDir = path.join(avatarDir, id);
    await fs.mkdir(pathDir)
    console.log(pathDir)
    
    res.status(201).json({
      status: 'saccess',
      code: 201,
      messsage: 'Saccess signup'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signup