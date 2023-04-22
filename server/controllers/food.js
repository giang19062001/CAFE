const { Food } = require("../models/food");

const fs = require("fs");

const foodController = {
  addFood: async (req, res) => {
    try {
      const name = req.body.name;
      const price = req.body.price;
      const recipe = req.body.recipe;
      const photo = req.file.filename;

      const newFoodJson = {
        name,
        price,
        recipe,
        photo,
      };

      const newFood = new Food(newFoodJson);
      const saveFood = await newFood.save();
      res.status(200).json(saveFood);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllIFoods: async (req, res) => {
    try {
      const allIFoods = await Food.find({ isDelete: false });
      res.status(200).json(allIFoods);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getFood: async (req, res) => {
    try {
      const food = await Food.findById(req.params.id);
      res.status(200).json(food);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteFood: async (req, res) => {
    try {
      const foodDelete = await Food.findByIdAndUpdate(
        { _id: req.params.id },
        { isDelete: true }
      );

      res.status(200).json("delete successfull");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateFood: async (req, res) => {
    try {

      const food = await Food.findById(req.params.id);


      if (req.file === undefined) {
        await food.updateOne({ $set: req.body });

      } else {

        // fs.unlinkSync("images/food/" + food.photo);
        const name = req.body.name;
        const price = req.body.price;
        const recipe = req.body.recipe;
        const photo = req.file.filename;
        const FoodDataUpdate = {
          name,
          price,
          recipe,
          photo,
        };
        await food.updateOne({ $set: FoodDataUpdate });
      }

      console.log("req.body", req.body);
      res.status(200).json("update successfull");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = foodController;
