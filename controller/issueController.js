// controllers/issueController.js
import issueService from '../service/issueService.js';
import fs from 'fs';

const createIssue = async (req, res) => {
  const { category, subCategory, issueStatus, orderId } = req.body;
  try {
    const newIssue = await issueService.createIssue(category, subCategory, issueStatus, orderId);
    res.json(newIssue);
  } catch (err) {
    console.error('Error creating issue', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllIssues = async (req, res) => {
  try {
    const { limit, offset, category, subCategory, issueStatus, orderId, startTime, endTime } = req.query;
    const issues = await issueService.getAllIssues(limit, offset, category, subCategory, issueStatus, orderId, startTime, endTime);
    res.json(issues);
  } catch (err) {
    console.error('Error getting issues', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const exportToExcel = async (req, res) => {
  const filePath = 'issues.xlsx';
  try {
    await issueService.exportToExcel(filePath);
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
  createIssue,
  getAllIssues,
  exportToExcel
};
