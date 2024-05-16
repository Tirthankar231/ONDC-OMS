// controllers/orderController.js
import orderService from '../service/orderService.js';
import fs from 'fs';

const createOrder = async (req, res) => {
  const { orderId, currency, value, bff, collectedBy, paymentType } = req.body;
  try {
    const newOrder = await orderService.createOrder(orderId, currency, value, bff, collectedBy, paymentType);
    res.json(newOrder);
  } catch (err) {
    console.error('Error creating order', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { currency, limit, offset } = req.query;
    const orders = await orderService.getAllOrders(currency, limit, offset);
    res.json(orders);
  } catch (err) {
    console.error('Error getting orders', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const exportToExcel = async (req, res) => {
  const filePath = 'orders.xlsx';
  try {
    await orderService.exportToExcel(filePath);
    res.download(filePath, (err) => {
      if (err) {
        throw new Error('Error downloading file');
      } else {
        // Delete the file after download
        fs.unlinkSync(filePath);
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  createOrder,
  getAllOrders,
  exportToExcel
};
