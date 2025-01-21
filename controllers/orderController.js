const Order = require('../models/orderModel');

exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create({
      ...req.body,
      user: req.user.id
    });
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};