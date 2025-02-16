import { Router } from 'express';
import PatientController from '../controllers/PatientController';

const router = Router();

router.post('/', PatientController.createPatient);
router.get('/:id', PatientController.getPatientById);
router.put('/:id', PatientController.updatePatient);
router.delete('/:id', PatientController.deletePatient);

export default router;
