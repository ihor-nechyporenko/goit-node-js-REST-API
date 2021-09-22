const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../../model')

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Wrong email'
      })
    }

    if(!user.verify) {
      return res.status(403).json({
        status: 'error',
        code: 403,
        message: 'Email is not verified'
      })
    }

    const hashPassword = user.password
    const compareResult = bcrypt.compareSync(password, hashPassword)

    if (!compareResult) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Wrong password'
      })
    }

    const payload = {
      id: user._id
    }
    const { SECRET_KEY } = process.env
    const token = jwt.sign(payload, SECRET_KEY)
    await User.findByIdAndUpdate(user._id, { token })

    res.json({
      token
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signin