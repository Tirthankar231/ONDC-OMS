// routes/settlementDetailsRoutes.js

import express from 'express';
import settlementDetailsController from '../controller/settlementController.js';

const router = express.Router();

router.post('/settlement', settlementDetailsController.createSettlementDetails);
router.get('/settlement', settlementDetailsController.getAllSettlementDetails);
router.get('/settlement/exportExcel', settlementDetailsController.exportToExcel);

export default router;
