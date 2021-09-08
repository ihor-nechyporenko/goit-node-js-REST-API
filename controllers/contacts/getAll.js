const { Contact } = require('../../model')

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit

    const total = await Contact.find({ owner: req.user._id })
    const result = await Contact
      .find({ owner: req.user._id }, '', { skip, limit: +limit })
      .populate('owner', '_id email subscription')

    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts: total.length,
        pages: Math.ceil(total.length / limit),
        result,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
