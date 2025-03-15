import express from 'express';
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  searchDoctorsBySpecialization
} from '../controllers/doctorController.js';

const router = express.Router();

router.post('/', createDoctor);
router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);
router.get('/search/specialization', searchDoctorsBySpecialization);

export default router;
