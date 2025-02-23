import { Router } from 'express';
import SecretaryController from '../controller/SecretaryController';

/**
 * @swagger
 * tags:
 *  name: Secretários
 *  description: Endpoints para CRUD de secretários
*/
const router = Router();

/**
 * @swagger
 * /secretaries:
 *  post:
 *    tags:
 *      - Secretários
 *    summary: Criar um novo secretário(a).
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
router.post("/secretaries/", (request, response) => {SecretaryController.createSecretary(request, response)});

/**
 * @swagger
 * /secretaries/{id}:
 *  get:
 *    tags:
 *      - Secretários
 *    summary: Recuperar secretário(a) a partir de seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do secretário(a)
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
router.get("/secretaries/:id", (request, response) => {SecretaryController.getSecretaryById(request, response)});

/**
 * @swagger
 * /secretaries/:
 *  get:
 *    tags:
 *      - Secretários
 *    summary: Recuperar todos os secretário(a)s.
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
router.get("/secretaries/", (request, response) => {SecretaryController.getAllSecretaries(response)});

/**
 * @swagger
 * /secretaries/{id}:
 *  put:
 *    tags:
 *      - Secretários
 *    summary: Atualizar secretário(a).
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do secretário(a)
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
router.put("/secretaries/:id", (request, response) => {SecretaryController.updateSecretary(request, response)});

/**
 * @swagger
 * /secretaries/{id}:
 *  delete:
 *    tags:
 *      - Secretários
 *    summary: Remover um secretário(a) a partir de seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do secretário(a)
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
router.delete("/secretaries/:id", (request, response) => {SecretaryController.deleteSecretary(request, response)});

export default router;