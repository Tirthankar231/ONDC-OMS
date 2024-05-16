// routes/issueRoutes.js
import express from 'express';
import issueController from '../controller/issueController.js';

const router = express.Router();

router.post('/issue', issueController.createIssue);
router.get('/issue', issueController.getAllIssues);
router.get('/issue/exportExcel', issueController.exportToExcel);

export default router;
