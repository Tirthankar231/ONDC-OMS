// controllers/returnController.js
import returnService from '../service/returnService.js';
import fs from 'fs';

const createReturn = async (req, res) => {
  const { returnId, amount, reason, orderId } = req.body;
  try {
    const newReturn = await returnService.createReturn(returnId, amount, reason, orderId);
    res.json(newReturn);
  } catch (err) {
    console.error('Error creating return', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllReturns = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const returns = await returnService.getAllReturns(limit, offset);
    res.json(returns);
  } catch (err) {
    console.error('Error getting returns', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const exportToExcel = async (req, res) => {
  const filePath = 'returns.xlsx';
  try {
    await returnService.exportToExcel(filePath);
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
  createReturn,
  getAllReturns,
  exportToExcel
};
