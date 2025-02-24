import { Router } from 'express';
import MedicalRecordController from '../controller/MedicalRecordController';

/**
 * @swagger
 * tags:
 *  name: Prontuários
 *  description: Endpoints para CRUD de prontuários
*/
const router = Router();

/**
 * @swagger
 * /medicalRecords:
 *  post:
 *    tags:
 *      - Prontuários
 *    summary: Criar um novo prontuário.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MedicalRecordPostRequest'
 *      required: true
 *    responses:
 *      201:
 *        description: Operação bem-sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MedicalRecordResponse'
 *      500:
 *        description: Dados inválidos.
*/
router.post("/medicalRecords/", (request, response) => {MedicalRecordController.createMedicalRecord(request, response)});

/**
 * @swagger
 * /medicalRecords/{id}:
 *  get:
 *    tags:
 *      - Prontuários
 *    summary: Recuperar prontuário a partir de seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do prontuário
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
 *              $ref: '#/components/schemas/MedicalRecordResponse'
 *      404:
 *        description: prontuário não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.get("/medicalRecords/:id", (request, response) => {MedicalRecordController.getMedicalRecordById(request, response)});

/**
 * @swagger
 * /medicalRecords/:
 *  get:
 *    tags:
 *      - Prontuários
 *    summary: Recuperar todos os Prontuários.
 *    responses:
 *      200:
 *        description: Operação bem sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/MedicalRecordResponse'
 *      500:
 *        description: Erro no servidor.
*/
router.get("/medicalRecords/", (request, response) => {MedicalRecordController.getAllMedicalRecords(response)});

/**
 * @swagger
 * /medicalRecords/{id}:
 *  put:
 *    tags:
 *      - Prontuários
 *    summary: Atualizar prontuário.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do prontuário
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MedicalRecordPutRequest'
 *    responses:
 *      200:
 *        description: Operação bem sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MedicalRecordResponse'
 *      404:
 *        description: prontuário não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.put("/medicalRecords/:id", (request, response) => {MedicalRecordController.updateMedicalRecord(request, response)});

/**
 * @swagger
 * /medicalRecords/{id}:
 *  delete:
 *    tags:
 *      - Prontuários
 *    summary: Remover um prontuário a partir de seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do prontuário
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      204:
 *        description: Operação bem sucedida.
 *      404:
 *        description: prontuário não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.delete("/medicalRecords/:id", (request, response) => {MedicalRecordController.deleteMedicalRecord(request, response)});

export default router;