import { Router } from 'express';
import UserController from '../controller/UserController';

const router = Router();

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Criar um novo usuário.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserPostRequest'
 *      required: true
 *    responses:
 *      201:
 *        description: Operação bem-sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
 *      500:
 *        description: Dados inválidos.
*/
router.post("/users/", (request, response) => {UserController.createUser(request, response)});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: Recuperar usuário a partir de seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do usuário
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
 *              $ref: '#/components/schemas/UserResponse'
 *      404:
 *        description: Usuário não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.get("/users/:id", (request, response) => {UserController.getUserById(request, response)});

/**
 * @swagger
 * /users/:
 *  get:
 *    summary: Recuperar todos os usuários.
 *    responses:
 *      200:
 *        description: Operação bem sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/UserResponse'
 *      500:
 *        description: Erro no servidor.
*/
router.get("/users/", (request, response) => {UserController.getAllUsers(response)});

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Atualizar usuário.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do usuário
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserPutRequest'
 *    responses:
 *      200:
 *        description: Operação bem sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
 *      404:
 *        description: Usuário não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.put("/users/:id", (request, response) => {UserController.updateUser(request, response)});

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    summary: Remover um usuário a partir de seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do usuário
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      204:
 *        description: Operação bem sucedida.
 *      404:
 *        description: Usuário não encontrado.
 *      500:
 *        description: Erro no servidor.
*/
router.delete("/users/:id", (request, response) => {UserController.deleteUser(request, response)});

export default router;