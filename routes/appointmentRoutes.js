import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import {
  bookAppointment,
  getAppointmentById,
  getUserAppointments,
  updateAppointmentStatus
} from '../controllers/appointmentController.js';

const router = express.Router();

// Protected routes
router.use(protect);

// Book appointment (patients only)
router.post('/', authorize('patient'), bookAppointment);

// Get appointment details (both doctors and patients)
router.get('/:id', getAppointmentById);

// Get user appointments (both doctors and patients)
router.get('/', getUserAppointments);

// Update appointment status (doctors only)
router.patch('/:id/status', authorize('doctor'), updateAppointmentStatus);

export default router;