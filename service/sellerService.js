// services/sellerService.js
import sequelize from '../config/db.js';
import SellerModel from '../models/sellerModel.js';
import { Op } from 'sequelize';
import ExcelJS from 'exceljs';

const Seller = SellerModel(sequelize);

const createSeller = async (gst, pan, bppId, name) => {
  try {
    const newSeller = await Seller.create({ gst, pan, bpp_id: bppId, name });
    return newSeller;
  } catch (err) {
    throw new Error(err);
  }
};

const getAllSellers = async (limit, offset, name, gst, pan) => {
  try {
    const whereCondition = {};
    if (name) {
      whereCondition.name = { [Op.iLike]: `%${name}%` };
    }
    if (gst) {
      whereCondition.gst = { [Op.iLike]: `%${gst}%` };
    }
    if (pan) {
      whereCondition.pan = { [Op.iLike]: `%${pan}%` };
    }

    const sellers = await Seller.findAndCountAll({
      where: whereCondition,
      offset: offset,
      limit: limit,
    });
    return sellers;
  } catch (err) {
    throw new Error('Error getting sellers');
  }
};

const exportToExcel = async (filePath) => {
  try {
    const sellers = await Seller.findAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sellers');

    // Define the columns
    worksheet.columns = [
      { header: 'GST', key: 'gst', width: 20 },
      { header: 'PAN', key: 'pan', width: 20 },
      { header: 'BPP ID', key: 'bppId', width: 20 },
      { header: 'Name', key: 'name', width: 20 }
    ];

    // Add data to the worksheet
    sellers.forEach(seller => {
      worksheet.addRow({
        gst: seller.gst,
        pan: seller.pan,
        bppId: seller.bpp_id,
        name: seller.name
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
  createSeller,
  getAllSellers,
  exportToExcel
};
