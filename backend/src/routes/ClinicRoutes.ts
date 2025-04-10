import { Router } from 'express';
import { ClinicController } from '../controller/ClinicController';
import { authenticate, authorize } from '../middleware/AuthMiddleware';
import { ClinicService } from '../service/ClinicService';

/**
 * @swagger
 * tags:
 *  name: Consultórios
 *  description: Endpoints para CRUD de consultório
 */
const router = Router();
const clinicService = new ClinicService();
const clinicController = new ClinicController(clinicService);

/**
 * @swagger
 * /clinics/:
 *  post:
 *    tags:
 *      - Consultórios
 *    summary: Criar um novo consultório.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ClinicPostRequest'
 *      required: true
 *    responses:
 *      201:
 *        description: Operação bem-sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ClinicResponse'
 *      500:
 *        description: Dados inválidos.
 */
router.post("/clinics/", authenticate, (request, response) => { clinicController.createClinic(request, response); });

/**
 * @swagger
 * /clinics/{id}:
 *  get:
 *    tags:
 *      - Consultórios
 *    summary: Recuperar consultório a partir de seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do consultório
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      200:
 *        description: Operação bem-sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ClinicResponse'
 *      404:
 *        description: Consultório não encontrado.
 *      500:
 *        description: Erro no servidor.
 */
router.get("/clinics/:id", authenticate, (request, response) => { clinicController.getClinicById(request, response); });

/**
 * @swagger
 * /clinics/:
 *  get:
 *    tags:
 *      - Consultórios
 *    summary: Recuperar todos os consultórios.
 *    responses:
 *      200:
 *        description: Operação bem-sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ClinicResponse'
 *      500:
 *        description: Erro no servidor.
 */
router.get("/clinics/", authenticate, (request, response) => { clinicController.getAllClinics(response); });

/**
 * @swagger
 * /clinics/{id}:
 *  put:
 *    tags:
 *      - Consultórios
 *    summary: Atualizar consultório.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do consultório
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ClinicPutRequest'
 *    responses:
 *      200:
 *        description: Operação bem sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ClinicResponse'
 *      404:
 *        description: consultório não encontrado.
 *      500:
 *        description: Erro no servidor.
 */
router.put("/clinics/:id", authenticate, authorize(['admin']), (request, response) => { clinicController.updateClinic(request, response); });

/**
 * @swagger
 * /clinics/{id}:
 *  delete:
 *    tags:
 *      - Consultórios
 *    summary: Remover um consultório a partir de seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do consultório
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      204:
 *        description: Operação bem sucedida.
 *      404:
 *        description: consultório não encontrado.
 *      500:
 *        description: Erro no servidor. 
 */
router.delete("/clinics/:id", authenticate, authorize(['admin']), (request, response) => { clinicController.deleteClinic(request, response); });

export default router;
