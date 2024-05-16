// services/orderService.js
import sequelize from '../config/db.js';
import OrderModel from '../models/orderModel.js';
import { Op } from 'sequelize';
import ExcelJS from 'exceljs';

const Order = OrderModel(sequelize);

const createOrder = async (orderId, currency, value, bff, collectedBy, paymentType) => {
  try {
    const newOrder = await Order.create({ orderId, currency, value, bff, collectedBy, paymentType });
    return newOrder;
  } catch (err) {
    throw new Error(err);
  }
};

const getAllOrders = async (currency, limit, offset) => {
  try {
    const whereCondition = currency ? { currency: { [Op.iLike]: `%${currency}%` } } : {};

    const orders = await Order.findAndCountAll({
      where: whereCondition,
      offset: offset,
      limit: limit,
    });
    return orders;
  } catch (err) {
    throw new Error(err);
  }
};

const exportToExcel = async (filePath) => {
  try {
    const orders = await Order.findAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orders');

    // Define the columns
    worksheet.columns = [
      { header: 'Order ID', key: 'orderId', width: 20 },
      { header: 'Currency', key: 'currency', width: 20 },
      { header: 'Value', key: 'value', width: 20 },
      { header: 'BFF', key: 'bff', width: 20 },
      { header: 'Collected By', key: 'collectedBy', width: 20 },
      { header: 'Payment Type', key: 'paymentType', width: 20 }
    ];

    // Add data to the worksheet
    orders.forEach(order => {
      worksheet.addRow({
        orderId: order.orderId,
        currency: order.currency,
        value: order.value,
        bff: order.bff,
        collectedBy: order.collectedBy,
        paymentType: order.paymentType
      });
    });

    // Save the workbook
    await workbook.xlsx.writeFile(filePath);
    console.log(`Excel file saved to ${filePath}`);
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  createOrder,
  getAllOrders,
  exportToExcel
};
