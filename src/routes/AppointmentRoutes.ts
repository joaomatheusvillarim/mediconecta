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
 * /clinics/{clinic_id}/appointment:
 *  post:
 *    tags:
 *      - appointment
 *    summary: Criar uma nova consulta.
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
router.post("/clinics/:clinic_id/appointment", (request, response) => {AppointmentController.createAppointment(request, response)});

/**
 * @swagger
 * /clinics/{clinic_id}/appointment/{appointment_id}:
 *  get:
 *    tags:
 *      - appointment
 *    summary: Recuperar consulta por ID.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id da consulta
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
router.get("/clinics/:clinic_id/appointment/:appointment_id", (request, response) => {AppointmentController.getAppointmentById(request, response)});

/**
 * @swagger
 * /clinics/{clinic_id}/appointment:
 *  get:
 *    tags:
 *      - appointment
 *    summary: Recuperar todas as consultas.
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
router.get("/clinics/:clinic_id/appointment", (request, response) => {AppointmentController.getAllAppointments(response)});

/**
 * @swagger
 * /clinics/{clinic_id}/appointment/{appointment_id}:
 *  put:
 *    tags:
 *      - appointment
 *    summary: Atualizar consulta.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id da consulta
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
router.put("/clinics/:clinic_id/appointment/:appointment_id", (request, response) => {AppointmentController.updateAppointment(request, response)});

/**
 * @swagger
 * /clinics/{clinic_id}/appointment/{appointment_id}:
 *  delete:
 *    tags:
 *      - appointment
 *    summary: Remover uma consulta a partir de seu id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id da consulta
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
router.delete("/clinics/:clinic_id/appointment/:appointment_id", (request, response) => {AppointmentController.deleteAppointment(request, response)});

export default router;
