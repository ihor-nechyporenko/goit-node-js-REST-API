const express = require('express')
const router = express.Router()

const { validation, authenticate, upload } = require('../../middlewares')
const { joiUserSchema } = require('../../model')
const { auth: ctrlAuth, contacts: ctrlContacts, user: ctrlUser } = require('../../controllers')

const validationUserMiddleware = validation(joiUserSchema)

router.post('/users/signup', validationUserMiddleware, ctrlAuth.signup)

router.get('/verify/:verificationToken', ctrlAuth.verify)

router.post('/users/signin', validationUserMiddleware, ctrlAuth.signin)

router.get('/users/signout', authenticate, ctrlAuth.signout)

router.get('/users/current', authenticate, ctrlContacts.getAll)

router.patch('/users', authenticate, ctrlUser.updateSubscr)

router.get('/users/favorite', authenticate, ctrlContacts.getFavorite)

router.patch('/users/avatars', authenticate, upload.single("avatarURL"), ctrlUser.updateAvatar)

module.exports = router