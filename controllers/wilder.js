const WilderModel = require("../models/Wilder");

module.exports = {
  create: async (req, res, next) => {
    try {
      await WilderModel.init();
      const wilder = new WilderModel(req.body);
      const result = await wilder.save();
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  },
  read: async (req, res, next) => {
    try {
      const result = await WilderModel.find();
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const result = await WilderModel.updateOne(
        { _id: req.body._id },
        req.body
      );
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const result = await WilderModel.deleteOne({ _id: req.body._id });
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  },
};
