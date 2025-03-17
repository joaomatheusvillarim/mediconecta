import { Router } from 'express';
import RecordController from '../controller/RecordController';

/**
 * @swagger
 * tags:
 *  name: Prontuários
 *  description: Endpoints para CRUD de prontuários
*/
const router = Router();

/**
 * @swagger
 * /clinics/{clinicId}/patients/{userId}/record:
 *  post:
 *    tags:
 *      - Prontuários
 *    summary: Criar um novo registro em prontuário.
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
 *            $ref: '#/components/schemas/RecordPostRequest'
 *      required: true
 *    responses:
 *      201:
 *        description: Operação bem-sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecordResponse'
 *      500:
 *        description: Dados inválidos.
*/
router.post("/clinics/:clinicId/patients/:userId/record", (request, response) => {RecordController.createRecordEntry(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/patients/{userId}/record/{entryIndex}:
 *  get:
 *    tags:
 *      - Prontuários
 *    summary: Recuperar registro em prontuário a partir de seu índice.
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
 *      - name: entryIndex
 *        in: path
 *        description: índice do registro no prontuário
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
 *              $ref: '#/components/schemas/RecordResponse'
 *      404:
 *        description: prontuário não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.get("/clinics/:clinicId/patients/:userId/record/:entryIndex", (request, response) => {RecordController.getRecordEntryByIndex(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/patients/{userId}/record:
 *  get:
 *    tags:
 *      - Prontuários
 *    summary: Recuperar todos os registros de um prontuário.
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
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/RecordResponse'
 *      500:
 *        description: Erro no servidor.
*/
router.get("/clinics/:clinicId/patients/:userId/record", (request, response) => {RecordController.getAllRecordEntries(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/patients/{userId}/record/{entryIndex}:
 *  put:
 *    tags:
 *      - Prontuários
 *    summary: Atualizar prontuário.
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
 *      - name: entryIndex
 *        in: path
 *        description: índice do registro no prontuário
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RecordPutRequest'
 *    responses:
 *      200:
 *        description: Operação bem sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecordResponse'
 *      404:
 *        description: prontuário não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.put("/clinics/:clinicId/patients/:userId/record/:entryIndex", (request, response) => {RecordController.updateRecord(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/patients/{userId}/record/{entryIndex}:
 *  delete:
 *    tags:
 *      - Prontuários
 *    summary: Remover um prontuário a partir de seu id.
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
 *      - name: entryIndex
 *        in: path
 *        description: índice do registro no prontuário
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
router.delete("/clinics/:clinicId/patients/:userId/record/:entryIndex", (request, response) => {RecordController.deleteRecordEntry(request, response)});

export default router;