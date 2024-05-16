// services/issueService.js
import sequelize from '../config/db.js';
import IssueModel from '../models/issueModel.js';
import { Op } from 'sequelize';
import ExcelJS from 'exceljs';

const Issue = IssueModel(sequelize);

const createIssue = async (category, subCategory, issueStatus, orderId) => {
  try {
    const newIssue = await Issue.create({ category, subCategory, issueStatus, orderId });
    return newIssue;
  } catch (err) {
    throw new Error(err);
  }
};

const getAllIssues = async (limit, offset, category, subCategory) => {
  try {
    // Build the where condition for category and subCategory filters
    const whereCondition = {};
    if (category) {
      whereCondition.category = { [Op.iLike]: `%${category}%` };
    }
    if (subCategory) {
      whereCondition.subCategory = { [Op.iLike]: `%${subCategory}%` };
    }

    const issues = await Issue.findAndCountAll({
      where: whereCondition,
      offset: offset,
      limit: limit,
    });
    return issues;
  } catch (err) {
    throw new Error('Error getting issues');
  }
};

const exportToExcel = async (filePath) => {
  try {
    const issues = await Issue.findAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Issues');

    // Define the columns
    worksheet.columns = [
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Subcategory', key: 'subCategory', width: 20 },
      { header: 'Issue Status', key: 'issueStatus', width: 20 },
      { header: 'Order ID', key: 'orderId', width: 20 }
    ];

    // Add data to the worksheet
    issues.forEach(issue => {
      worksheet.addRow({
        category: issue.category,
        subCategory: issue.subCategory,
        issueStatus: issue.issueStatus,
        orderId: issue.orderId
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
  createIssue,
  getAllIssues,
  exportToExcel
};
