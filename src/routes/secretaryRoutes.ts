import { Router } from 'express';
import SecretaryController from '../controllers/SecretaryController';

const router = Router();

router.post('/', SecretaryController.createSecretary);
router.get('/:id', SecretaryController.getSecretaryById);
router.put('/:id', SecretaryController.updateSecretary);
router.delete('/:id', SecretaryController.deleteSecretary);
router.get('/', SecretaryController.getAllSecretaries);

export default router;
