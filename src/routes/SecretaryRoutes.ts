import { Router } from 'express';
import SecretaryController from '../controller/SecretaryController';
import { authenticate, authorize } from '../middleware/AuthMiddleware';

/**
 * @swagger
 * tags:
 *  name: Secretários
 *  description: Endpoints para CRUD de secretários
*/
const router = Router();

/**
 * @swagger
 * /clinics/{clinicId}/secretaries:
 *  post:
 *    tags:
 *      - Secretários
 *    summary: Vincular um usuário como secretário de um consultório.
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
 *            $ref: '#/components/schemas/SecretaryPostRequest'
 *      required: true
 *    responses:
 *      201:
 *        description: Operação bem-sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SecretaryResponse'
 *      500:
 *        description: Dados inválidos.
*/
router.post("/clinics/:clinicId/secretaries", authenticate, (request, response) => {SecretaryController.createSecretary(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/secretaries/{userId}:
 *  get:
 *    tags:
 *      - Secretários
 *    summary: Recuperar secretário(a) a partir de seu id.
 *    parameters:
 *      - name: clinicId
 *        in: path
 *        description: id do secretário(a)
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
 *              $ref: '#/components/schemas/SecretaryResponse'
 *      404:
 *        description: Secretário(a) não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.get("/clinics/:clinicId/secretaries/:userId", authenticate, authorize(['patient', 'doctor', 'secretary']), (request, response) => {SecretaryController.getSecretaryById(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/secretaries/:
 *  get:
 *    tags:
 *      - Secretários
 *    summary: Recuperar todos os secretário(a)s.
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
 *                $ref: '#/components/schemas/SecretaryResponse'
 *      500:
 *        description: Erro no servidor.
*/
router.get("/clinics/:clinicId/secretaries", authenticate, authorize(['patient', 'doctor', 'secretary']), (request, response) => {SecretaryController.getAllSecretaries(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/secretaries/{userId}:
 *  put:
 *    tags:
 *      - Secretários
 *    summary: Atualizar secretário(a).
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
 *            $ref: '#/components/schemas/SecretaryPutRequest'
 *    responses:
 *      200:
 *        description: Operação bem sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SecretaryResponse'
 *      404:
 *        description: Secretário(a) não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.put("/clinics/:clinicId/secretaries/:userId", authenticate, authorize(['admin']), (request, response) => {SecretaryController.updateSecretary(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/secretaries/{userId}:
 *  delete:
 *    tags:
 *      - Secretários
 *    summary: Remover um secretário(a) a partir de seu id.
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
 *        description: Secretário(a) não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.delete("/clinics/:clinicId/secretaries/:userId", authenticate, authorize(['admin']), (request, response) => {SecretaryController.deleteSecretary(request, response)});

export default router;