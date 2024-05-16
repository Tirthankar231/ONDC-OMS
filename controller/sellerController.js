// controllers/sellerController.js
import sellerService from '../service/sellerService.js';
import fs from 'fs';

const createSeller = async (req, res) => {
  const { gst, pan, bppId, name } = req.body;
  try {
    const newSeller = await sellerService.createSeller(gst, pan, bppId, name);
    res.json(newSeller);
  } catch (err) {
    console.error('Error creating seller', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllSellers = async (req, res) => {
  try {
    const { limit, offset, name, gst, pan, bpp_id } = req.query;
    const sellers = await sellerService.getAllSellers(limit, offset, name, gst, pan, bpp_id);
    res.json(sellers);
  } catch (err) {
    console.error('Error getting sellers', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const exportToExcel = async (req, res) => {
  const filePath = 'sellers.xlsx';
  try {
    await sellerService.exportToExcel(filePath);
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
  createSeller,
  getAllSellers,
  exportToExcel
};
