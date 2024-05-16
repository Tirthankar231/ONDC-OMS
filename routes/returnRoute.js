// routes/returnRoutes.js
import express from 'express';
import returnController from '../controller/returnController.js';

const router = express.Router();

router.post('/return', returnController.createReturn);
router.get('/return', returnController.getAllReturns);
router.get('/return/exportExcel', returnController.exportToExcel);

export default router;
