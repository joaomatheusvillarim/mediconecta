import { Router } from 'express';
import AnnouncementController from '../controller/AnnouncementController';

/**
 * @swagger
 * tags:
 *  name: Avisos
 *  description: Endpoints para CRUD de avisos
 */
const router = Router();

/**
 * @swagger
 * /users/{user_id}/clinics/{clinic_id}/announcement/:
 *  post:
 *    tags:
 *      - Avisos
 *    summary: Criar um novo aviso.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AnnouncementPostRequest'
 *      required: true
 *    responses:
 *      201:
 *        description: Operação bem-sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AnnouncementResponse'
 *      500:
 *        description: Dados inválidos.
 */
router.post("/users/:user_id/clinics/:clinic_id/announcement/", (request, response) => { 
    AnnouncementController.createAnnouncement(request, response);
});

/**
 * @swagger
 * /users/{user_id}/clinics/{clinic_id}/announcement/{announcement_id}:
 *  get:
 *    tags:
 *      - Avisos
 *    summary: Recuperar aviso a partir do seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do aviso
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
 *              $ref: '#/components/schemas/AnnouncementResponse'
 *      404:
 *        description: Aviso não encontrado.
 *      500:
 *        description: Erro no servidor.
 */
router.get("/users/:user_id/clinics/:clinic_id/announcement/:announcement_id", (request, response) => { 
    AnnouncementController.getAnnouncementById(request, response);
});

/**
 * @swagger
 * /users/{user_id}/clinics/{clinic_id}/announcement/:
 *  get:
 *    tags:
 *      - Avisos
 *    summary: Recuperar todos os avisos.
 *    responses:
 *      200:
 *        description: Operação bem-sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/AnnouncementResponse'
 *      500:
 *        description: Erro no servidor.
 */
router.get("/users/:user_id/clinics/:clinic_id/announcement/", (request, response) => { 
    AnnouncementController.getAllAnnouncements(response);
});

/**
 * @swagger
 * /users/{user_id}/clinics/{clinic_id}/announcement/{announcement_id}:
 *  put:
 *    tags:
 *      - Avisos
 *    summary: Atualizar aviso.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do aviso
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AnnouncementPutRequest'
 *    responses:
 *      200:
 *        description: Operação bem sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AnnouncementResponse'
 *      404:
 *        description: aviso não encontrado.
 *      500:
 *        description: Erro no servidor.
 */
router.put("/users/:user_id/clinics/:clinic_id/announcement/:announcement_id", (request, response) => { 
    AnnouncementController.updateAnnouncement(request, response);
});

/**
 * @swagger
 * /users/{user_id}/clinics/{clinic_id}/announcement/{announcement_id}:
 *  delete:
 *    tags:
 *      - Avisos
 *    summary: Remover um aviso a partir de seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do aviso
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      204:
 *        description: Operação bem sucedida.
 *      404:
 *        description: aviso não encontrado.
 *      500:
 *        description: Erro no servidor.
 */
router.delete("/users/:user_id/clinics/:clinic_id/announcement/:announcement_id", (request, response) => { 
    AnnouncementController.deleteAnnouncement(request, response);
});

export default router;
