// services/returnService.js
import sequelize from '../config/db.js';
import ReturnModel from '../models/returnModel.js';
import ExcelJS from 'exceljs';

const Return = ReturnModel(sequelize);

const createReturn = async (returnId, amount, reason, orderId) => {
  try {
    const newReturn = await Return.create({ returnId, amount, reason, orderId });
    return newReturn;
  } catch (err) {
    throw new Error(err);
  }
};

const getAllReturns = async (limit, offset) => {
  try {
    const returns = await Return.findAndCountAll({
      offset: offset,
      limit: limit,
    });
    return returns;
  } catch (err) {
    throw new Error('Error getting returns');
  }
};

const exportToExcel = async (filePath) => {
  try {
    const returns = await Return.findAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Returns');

    // Define the columns
    worksheet.columns = [
      { header: 'Return ID', key: 'returnId', width: 20 },
      { header: 'Amount', key: 'amount', width: 20 },
      { header: 'Reason', key: 'reason', width: 20 },
      { header: 'Order ID', key: 'orderId', width: 20 }
    ];

    // Add data to the worksheet
    returns.forEach(returnData => {
      worksheet.addRow({
        returnId: returnData.returnId,
        amount: returnData.amount,
        reason: returnData.reason,
        orderId: returnData.orderId
      });
    });

    // Save the workbook
    await workbook.xlsx.writeFile(filePath);
    console.log(`Excel file saved to ${filePath}`);
  } catch (err) {
    throw new Error('Error exporting to Excel');
  }
};

export default {
  createReturn,
  getAllReturns,
  exportToExcel
};
