const { User } = require("../models/user");
const bcrypt = require("bcrypt");

const userController = {
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newUser = await new User({
        fullname: req.body.fullname,
        phone: req.body.phone,
        password: hashed,
        roles: req.body.roles,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  loginUser: async (req, res) => {
    try {
      console.log(" req.body.phone ", req.body.phone);
      const user = await User.findOne({ phone: req.body.phone });
      if (!user) {
        return res.status(200).send("Người dùng không tồn tại");
      } else {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          return res.status(200).send("Sai mật khẩu");
        } else {
          res.status(200).json(user);
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const allUser = await User.find();
      res.status(200).json(allUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  checkUserDuplicate: async (req, res) => {
    try {
      console.log("req.params.id",req.params.id)
      const user = await User.findOne({ phone: req.params.id});
      if (user) {
        res.status(200).send(true);
      } else {
        res.status(200).send(false);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });

      res.status(200).json("update successfull");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
