const { Contact, joiContactSchema } = require('./contact')
const { User, joiUserSchema, joiUserEmailSchema } = require('./user')

module.exports = {
  Contact,
  joiContactSchema,
  User,
  joiUserSchema,
  joiUserEmailSchema,
}
