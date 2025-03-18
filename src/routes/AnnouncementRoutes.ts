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
 * /clinics/{clinicId}/announcements:
 *  post:
 *    tags:
 *      - Avisos
 *    summary: Criar um novo aviso pertencente a um consultório    
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
router.post("/clinics/:clinicId/announcements", (request, response) => {AnnouncementController.createAnnouncement(request, response);});

/**
 * @swagger
 * /clinics/{clinicId}/announcements/{announcementId}:
 *  get:
 *    tags:
 *      - Avisos
 *    summary: Recuperar aviso a partir do seu id.
 *    parameters:
 *      - name: clinicId
 *        in: path
 *        description: ID do consultório
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *      - name: announcementId
 *        in: path
 *        description: ID do anuncio
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
router.get("/clinics/:clinicId/announcements/:announcementId", (request, response) => { AnnouncementController.getAnnouncementById(request, response);});

/**
 * @swagger
 * /users/{userId}/clinics/{clinicId}/announcements:
 *  get:
 *    tags:
 *      - Avisos
 *    summary: Recuperar todos os avisos.
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
 *                $ref: '#/components/schemas/AnnouncementResponse'
 *      500:
 *        description: Erro no servidor.
 */
router.get("/clinics/:clinicId/announcements", (request, response) => { AnnouncementController.getAllAnnouncements(request, response);});

/**
 * @swagger
 * /clinics/{clinicId}/announcements/{announcementId}:
 *  put:
 *    tags:
 *      - Avisos
 *    summary: Atualizar aviso.
 *    parameters:
 *      - name: clinicId
 *        in: path
 *        description: ID do consultório
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *      - name: announcementId
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
router.put("/clinics/:clinicId/announcements/:announcementId", (request, response) => { AnnouncementController.updateAnnouncement(request, response);});

/**
 * @swagger
 * /clinics/{clinicId}/announcements/{announcementId}:
 *  delete:
 *    tags:
 *      - Avisos
 *    summary: Remover um aviso a partir de seu id.
 *    parameters:
 *      - name: clinicId
 *        in: path
 *        description: ID do consultório
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *      - name: announcementId
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
router.delete("/clinics/:clinicId/announcements/:announcementId", (request, response) => { 
    AnnouncementController.deleteAnnouncement(request, response);
});

export default router;
