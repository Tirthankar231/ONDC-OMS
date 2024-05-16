// routes/orderRoutes.js
import express from 'express';
import orderController from '../controller/orderController.js';
import { authenticateToken } from '../mddleware/auth.js';

const router = express.Router();

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/exportExcel', orderController.exportToExcel);

export default router;
