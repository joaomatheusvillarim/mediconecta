import { Router } from 'express';
import UserController from '../controller/UserController';

const router = Router();
const userController = new UserController();

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;