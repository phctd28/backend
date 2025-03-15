import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import {
  createNursingStaff,
  getAllNursingStaff,
  getNursingStaffById,
  updateNursingStaff,
  deleteNursingStaff
} from '../controllers/nursingStaffController.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Public routes (still requires authentication)
router.get('/', getAllNursingStaff);
router.get('/:id', getNursingStaffById);

// Admin only routes
router.post('/', authorize('admin'), createNursingStaff);
router.put('/:id', authorize('admin'), updateNursingStaff);
router.delete('/:id', authorize('admin'), deleteNursingStaff);

export default router;