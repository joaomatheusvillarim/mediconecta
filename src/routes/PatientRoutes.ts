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
 * /patients:
 *  post:
 *    tags:
 *      - patient
 *    summary: Criar um novo paciente.
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
router.post("/patients/", (request, response) => {PatientController.createPatient(request, response)});

/**
 * @swagger
 * /patients/{id}:
 *  get:
 *    tags:
 *      - patient
 *    summary: Recuperar paciente a partir de seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do paciente
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
router.get("/patients/:id", (request, response) => {PatientController.getPatientById(request, response)});

/**
 * @swagger
 * /patients/:
 *  get:
 *    tags:
 *      - patient
 *    summary: Recuperar todos os pacientes.
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
router.get("/patients/", (request, response) => {PatientController.getAllPatients(response)});

/**
 * @swagger
 * /patients/{id}:
 *  put:
 *    tags:
 *      - patient
 *    summary: Atualizar paciente.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do paciente
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
router.put("/patients/:id", (request, response) => {PatientController.updatePatient(request, response)});

/**
 * @swagger
 * /patients/{id}:
 *  delete:
 *    tags:
 *      - patient
 *    summary: Remover um paciente a partir de seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do paciente
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
router.delete("/patients/:id", (request, response) => {PatientController.deletePatient(request, response)});

export default router;