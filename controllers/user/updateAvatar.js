const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const { User } = require('../../model');

const avatarDir = path.join(__dirname, '../../', 'public/avatars');

const updateAvatar = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    console.log(req.file)
    const { path: tempPath, originalname } = req.file;
    const uploadPath = path.join(avatarDir, userId, originalname);

    try {
      const file = await Jimp.read(tempPath);
      await file.resize(250, 250).write(tempPath);
      await fs.rename(tempPath, uploadPath);
      const avatarURL = `/avatars/${userId}/${originalname}`;

      const updateUser = await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });
      res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          result: updateUser,
          // result: avatarURL,
        }
      })
    } catch (error) {
      await fs.unlink(tempPath);
      throw error;
    }

  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;