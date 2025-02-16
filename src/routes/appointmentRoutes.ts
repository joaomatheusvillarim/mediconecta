import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController';

const router = Router();

router.post('/', AppointmentController.createAppointment);
router.get('/:id', AppointmentController.getAppointmentById);
router.put('/:id', AppointmentController.updateAppointment);
router.delete('/:id', AppointmentController.deleteAppointment);
router.get('/', AppointmentController.getAllAppointments);

export default router;
