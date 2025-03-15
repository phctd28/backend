import express from 'express';
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  searchPatientsByCondition
} from '../controllers/patientController.js';

const router = express.Router();

router.post('/', createPatient);
router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);
router.get('/search/condition', searchPatientsByCondition);

export default router;
