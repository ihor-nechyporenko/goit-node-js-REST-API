const { Schema, model } = require('mongoose')
const Joi = require('joi')

const userSchema = Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: '',
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, { versionKey: false, timestamps: true })

const joiUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().default('starter'),
  token: Joi.string().default(null),
  avatarURL: Joi.string(),
  verify: Joi.boolean().default(false),
})

const joiUserEmailSchema = Joi.object({
  email: Joi.string().email().required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiUserSchema,
  joiUserEmailSchema,
}