import { Router } from 'express';
import AppointmentController from '../controller/AppointmentController';

/**
 * @swagger
 * tags:
 *  name: Consultas
 *  description: Endpoints para CRUD de consultas
*/
const router = Router();

/**
 * @swagger
 * /clinics/{clinicId}/appointments:
 *  post:
 *    tags:
 *      - Consultas
 *    summary: Criar uma nova consulta.
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
 *            $ref: '#/components/schemas/AppointmentPostRequest'
 *      required: true
 *    responses:
 *      201:
 *        description: Operação bem-sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AppointmentResponse'
 *      500:
 *        description: Dados inválidos.
*/
router.post("/clinics/:clinicId/appointments", (request, response) => {AppointmentController.createAppointment(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/appointments/{appointmentId}:
 *  get:
 *    tags:
 *      - Consultas
 *    summary: Recuperar consulta por ID.
 *    parameters:
 *      - name: clinicId
 *        in: path
 *        description: ID do consultório
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *      - name: appointmentId
 *        in: path
 *        description: ID da consulta
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
 *              $ref: '#/components/schemas/AppointmentResponse'
 *      404:
 *        description: Consulta não encontrada.
 *      500:
 *        description: Erro no servidor.
*/
router.get("/clinics/:clinicId/appointments/:appointmentId", (request, response) => {AppointmentController.getAppointmentById(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/appointments:
 *  get:
 *    tags:
 *      - Consultas
 *    summary: Recuperar todas as consultas.
 *    parameters:parameters:
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
 *                $ref: '#/components/schemas/AppointmentResponse'
 *      500:
 *        description: Erro no servidor.
*/
router.get("/clinics/:clinicId/appointments", (request, response) => {AppointmentController.getAllAppointments(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/appointments/{appointmentId}:
 *  put:
 *    tags:
 *      - Consultas
 *    summary: Atualizar consulta.
 *    parameters:
 *      - name: clinicId
 *        in: path
 *        description: ID do consultório
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *      - name: appointmentId
 *        in: path
 *        description: ID da consulta
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AppointmentPutRequest'
 *    responses:
 *      200:
 *        description: Operação bem sucedida.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AppointmentResponse'
 *      404:
 *        description: consulta não encontrada.
 *      500:
 *        description: Erro no servidor.
*/
router.put("/clinics/:clinicId/appointments/:appointmentId", (request, response) => {AppointmentController.updateAppointment(request, response)});

/**
 * @swagger
 * /clinics/{clinicId}/appointments/{appointmentId}:
 *  delete:
 *    tags:
 *      - Consultas
 *    summary: Remover uma consulta a partir de seu id.
 *    parameters:
 *      - name: clinicId
 *        in: path
 *        description: ID do consultório
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *      - name: appointmentId
 *        in: path
 *        description: ID da consulta
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    responses:
 *      204:
 *        description: Operação bem sucedida.
 *      404:
 *        description: Consulta não encontrada.
 *      500:
 *        description: Erro no servidor. 
*/
router.delete("/clinics/:clinicId/appointments/:appointmentId", (request, response) => {AppointmentController.deleteAppointment(request, response)});

export default router;
