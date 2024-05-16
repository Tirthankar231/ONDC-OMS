// routes/sellerRoutes.js

import express from 'express';
import sellerController from '../controller/sellerController.js';

const router = express.Router();

router.post('/sellers', sellerController.createSeller);
router.get('/sellers', sellerController.getAllSellers);
router.get('/sellers/exportExcel', sellerController.exportToExcel);

export default router;
