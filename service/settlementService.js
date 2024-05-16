// services/settlementDetailsService.js
import sequelize from '../config/db.js';
import SettlementDetailsModel from '../models/settlementDetailsModel.js';
import { Op } from 'sequelize';
import ExcelJS from 'exceljs'

const SettlementDetails = SettlementDetailsModel(sequelize);

const createSettlementDetails = async (settlementType, accountNo, bankName, branchName) => {
    try {
        const newSettlementDetails = await SettlementDetails.create({ settlementType, accountNo, bankName, branchName });
        return newSettlementDetails;
    } catch (err) {
        throw new Error('Error creating settlement details');
    }
};

const getAllSettlementDetails = async (limit, offset, bankName, branchName) => {
    try {
        const whereCondition = {};
        if (bankName) {
            whereCondition.bankName = { [Op.iLike]: `%${bankName}%` };
        }
        if (branchName) {
            whereCondition.branchName = { [Op.iLike]: `%${branchName}%` };
        }

        const settlementDetails = await SettlementDetails.findAndCountAll({
            where: whereCondition,
            offset: offset,
            limit: limit,
        });
        return settlementDetails;
    } catch (err) {
        throw new Error(err);
    }
};

const exportToExcel = async (filePath) => {
    try {
        const settlementDetails = await SettlementDetails.findAll();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('SettlementDetails');

        // Define the columns
        worksheet.columns = [
            { header: 'Settlement Type', key: 'settlementType', width: 20 },
            { header: 'Account No', key: 'accountNo', width: 20 },
            { header: 'Bank Name', key: 'bankName', width: 20 },
            { header: 'Branch Name', key: 'branchName', width: 20 }
        ];

        // Add data to the worksheet
        settlementDetails.forEach(details => {
            worksheet.addRow({
                settlementType: details.settlementType,
                accountNo: details.accountNo,
                bankName: details.bankName,
                branchName: details.branchName
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
    createSettlementDetails,
    getAllSettlementDetails,
    exportToExcel
};
