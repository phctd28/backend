import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital
} from '../controllers/hospitalController.js';

const router = express.Router();

// Public routes
router.get('/', getAllHospitals);
router.get('/:id', getHospitalById);

// Protected admin routes
router.use(protect);
router.use(authorize('admin'));

router.post('/', createHospital);
router.put('/:id', updateHospital);
router.delete('/:id', deleteHospital);

export default router;