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
 * /clinics/{clinicId}/doctors:
 *  post:
 *    tags:
 *      - Médicos
 *    summary: Vincular um usuário como médico de um consultório.
 *    parameters:
 *      - name: clinicId
 *        in: path
 *        description: ID do consultório
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
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
router.post("/clinics/:clinicId/doctors/", (request, response) => {DoctorController.createDoctor(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/doctors/{doctorId}:
 *  get:
 *    tags:
 *      - Médicos
 *    summary: Recuperar médico a partir de seu id.
 *    parameters:
 *      - name: clinicId
 *        in: path
 *        description: ID do consultório
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *      - name: userId
 *        in: path
 *        description: ID do usuário paciente
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
 * /clinics/{clinicId}/doctors:
 *  get:
 *    tags:
 *      - Médicos
 *    summary: Recuperar todos os médicos.
 *    parameters:
 *      - name: clinicId
 *        in: path
 *        description: ID do consultório
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
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/DoctorResponse'
 *      500:
 *        description: Erro no servidor.
*/
router.get("/clinics/:clinicId/doctors/", (request, response) => {DoctorController.getAllDoctors(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/doctors/{doctorId}:
 *  put:
 *    tags:
 *      - Médicos
 *    summary: Atualizar médico.
 *    parameters:
 *      - name: clinicId
 *        in: path
 *        description: ID do consultório
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *      - name: userId
 *        in: path
 *        description: ID do usuário paciente
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
router.put("/clinics/:clinicId/doctors/:doctorId", (request, response) => {DoctorController.updateDoctor(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/doctors/{doctorId}:
 *  delete:
 *    tags:
 *      - Médicos
 *    summary: Remover um médico a partir de seu id.
 *    parameters:
 *      - name: clinicId
 *        in: path
 *        description: ID do consultório
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *      - name: userId
 *        in: path
 *        description: ID do usuário paciente
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
router.delete("/clinics/:clinicId/doctors/:doctorId", (request, response) => {DoctorController.deleteDoctor(request, response)});

export default router;
