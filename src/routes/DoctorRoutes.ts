import { Router } from 'express';
import DoctorController from '../controller/DoctorController';

/**
 * @swagger
 * tags:
 *  name: Médicos
 *  description: Endpoints para CRUD de médicos
*/
const router = Router();

/**
 * @swagger
 * /doctors/:
 *  post:
 *    tags:
 *      - doctor
 *    summary: Criar um novo médico.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/DoctorPostRequest'
 *      required: true
 *    responses:
 *      201:
 *        description: Operação bem-sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DoctorResponse'
 *      500:
 *        description: Dados inválidos.
*/
router.post("/doctors/", (request, response) => {DoctorController.createDoctor(request, response)});

/**
 * @swagger
 * /doctors/{id}:
 *  get:
 *    tags:
 *      - doctor
 *    summary: Recuperar médico a partir de seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do médico
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
 *              $ref: '#/components/schemas/DoctorResponse'
 *      404:
 *        description: Médico não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.get("/doctors/:id", (request, response) => {DoctorController.getDoctorById(request, response)});

/**
 * @swagger
 * /doctors/:
 *  get:
 *    tags:
 *      - doctor
 *    summary: Recuperar todos os médicos.
 *    responses:
 *      200:
 *        description: Operação bem-sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/DoctorResponse'
 *      500:
 *        description: Erro no servidor.
*/
router.get("/doctors/", (request, response) => {DoctorController.getAllDoctors(response)});

/**
 * @swagger
 * /doctors/{id}:
 *  put:
 *    tags:
 *      - doctor
 *    summary: Atualizar médico.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do médico
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/DoctorPutRequest'
 *    responses:
 *      200:
 *        description: Operação bem sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DoctorResponse'
 *      404:
 *        description: médico não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.put("/doctors/:id", (request, response) => {DoctorController.updateDoctor(request, response)});

/**
 * @swagger
 * /doctors/{id}:
 *  delete:
 *    tags:
 *      - doctor
 *    summary: Remover um médico a partir de seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do médico
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      204:
 *        description: Operação bem sucedida.
 *      404:
 *        description: médico não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.delete("/doctors/:id", (request, response) => {DoctorController.deleteDoctor(request, response)});

export default router;
