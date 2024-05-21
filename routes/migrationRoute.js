// routes/migrationRoutes.js
import express from 'express';
import { migrateData } from '../migration/migrateData.js';

const router = express.Router();

// Define route for migration
router.post('/migrate', migrateData);

export default router;
