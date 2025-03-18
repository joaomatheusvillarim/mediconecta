import { Router } from 'express';
import PatientController from '../controller/PatientController';

/**
 * @swagger
 * tags:
 *  name: Pacientes
 *  description: Endpoints para CRUD de pacientes
*/
const router = Router();

/**
 * @swagger
 * /clinics/{clinicId}/patients/:
 *  post:
 *    tags:
 *      - Pacientes
 *    summary: Vincular um usuário como paciente de um consultório.
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
 *            $ref: '#/components/schemas/PatientPostRequest'
 *      required: true
 *    responses:
 *      201:
 *        description: Operação bem-sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PatientResponse'
 *      500:
 *        description: Dados inválidos.
*/
router.post("/clinics/:clinicId/patients", (request, response) => {PatientController.createPatient(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/patients/{userId}:
 *  get:
 *    tags:
 *      - Pacientes
 *    summary: Recuperar paciente de uma clínica a partir do ID de usuário.
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
 *        description: Operação bem sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PatientResponse'
 *      404:
 *        description: paciente não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.get("/clinics/:clinicId/patients/:userId", (request, response) => {PatientController.getPatientById(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/patients:
 *  get:
 *    tags:
 *      - Pacientes
 *    summary: Recuperar todos os pacientes de um consultório.
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
 *        description: Operação bem sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/PatientResponse'
 *      500:
 *        description: Erro no servidor.
*/
router.get("/clinics/:clinicId/patients", (request, response) => {PatientController.getAllPatients(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/patients/{userId}:
 *  put:
 *    tags:
 *      - Pacientes
 *    summary: Atualizar paciente de um consultório.
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
 *            $ref: '#/components/schemas/PatientPutRequest'
 *    responses:
 *      200:
 *        description: Operação bem sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PatientResponse'
 *      404:
 *        description: paciente não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.put("/clinics/:clinicD/patients/:userId", (request, response) => {PatientController.updatePatient(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/patients/{userId}:
 *  delete:
 *    tags:
 *      - Pacientes
 *    summary: Remover um paciente a partir de seu id.
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
 *        description: paciente não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.delete("/clinics/:clinicId/patients/:userId", (request, response) => {PatientController.deletePatient(request, response)});

export default router;