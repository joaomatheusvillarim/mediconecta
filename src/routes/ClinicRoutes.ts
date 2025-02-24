import { Router } from 'express';
import ClinicController from '../controller/ClinicController';

/**
 * @swagger
 * tags:
 *  name: Consultórios
 *  description: Endpoints para CRUD de consultório
 */
const router = Router();

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
router.post("/clinics/", (request, response) => { ClinicController.createClinic(request, response); });

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
router.get("/clinics/:id", (request, response) => { ClinicController.getClinicById(request, response); });

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
router.get("/clinics/", (request, response) => { ClinicController.getAllClinics(response); });

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
router.put("/clinics/:id", (request, response) => { ClinicController.updateClinic(request, response); });

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
router.delete("/clinics/:id", (request, response) => { ClinicController.deleteClinic(request, response); });

export default router;
