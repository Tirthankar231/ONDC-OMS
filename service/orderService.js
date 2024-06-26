// services/orderService.js
import sequelize from '../config/db.js';
import OrderModel from '../models/orderModel.js';
import { Op } from 'sequelize';
import ExcelJS from 'exceljs';

const Order = OrderModel(sequelize);

const createOrder = async (orderId, currency, value, bff, collectedBy, paymentType, state, sellerId) => {
  try {
    const newOrder = await Order.create({ orderId, currency, value, bff, collectedBy, paymentType, state, sellerId });
    return newOrder;
  } catch (err) {
    throw new Error(err);
  }
};

const getAllOrders = async (orderId, currency, value, bff, collectedBy, paymentType, limit, offset, state, startTime, endTime) => {
  try {
    const whereCondition = {};
    if (orderId) {
      whereCondition.orderId = { [Op.iLike]: `%${orderId}%` };
    }
    if (currency) {
      whereCondition.currency = { [Op.iLike]: `%${currency}%` };
    }
    if (value) {
      whereCondition.value = { [Op.iLike]: `%${value}%` };
    }
    if (bff) {
      whereCondition.bff = { [Op.iLike]: `%${bff}%` };
    }
    if (collectedBy) {
      whereCondition.collectedBy = { [Op.iLike]: `%${collectedBy}%` };
    }
    if (paymentType) {
      whereCondition.paymentType = { [Op.iLike]: `%${paymentType}%` };
    }
    if (state) {
      whereCondition.state = { [Op.iLike]: `%${state}%` };
    }
    // Adding conditions for filtering by startTime and endTime
    if (startTime && endTime) {
      // Convert epoch timestamps to JavaScript Date objects in milliseconds
      const startDate = parseInt(startTime);
      const endDate = parseInt(endTime);

      if (startDate <= endDate) {
        whereCondition.createdAt = {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        };
      } else {
        throw new Error('startTime must be less than or equal to endTime');
      }
    }

    const orders = await Order.findAndCountAll({
      where: whereCondition,
      offset: offset,
      limit: limit,
      order: [['createdAt', 'DESC']],
    });
    return orders;
  } catch (err) {
    throw new Error(err);
  }
};

const getOrderById = async (id) => {
  try {
    const order = await Order.findOne({
      where: {
        id: id
      },
    });
    return order;
  } catch (err) {
    throw new Error(err);
  }
};

const getOrderStateCounts = async () => {
  try {
    // Count the total number of states
    const stateCounts = await Order.count({
      attributes: ['state'],
      group: ['state']
    });
    // Prepare response data
    const totalCount = stateCounts.reduce((total, stateCount) => {
      return {
        ...total,
        [stateCount.state]: stateCount.count
      };
    }, {});

    return totalCount;
  } catch (error) {
    console.error('Error counting order states:', error);
    throw new Error('Error counting order states');
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
  exportToExcel,
  getOrderById,
  getOrderStateCounts
};
