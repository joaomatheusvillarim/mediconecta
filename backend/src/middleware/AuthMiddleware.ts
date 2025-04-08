import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '../util/auth';
import { Doctor } from '../model/Doctor';
import { Patient } from '../model/Patient';
import { Secretary } from '../model/Secretary';
import { Clinic } from '../model/Clinic';

export const authenticate: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Acesso negado. Token ausente.' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

export const authorize = (allowedRoles: string[]): RequestHandler => {
  return async (req, res, next): Promise<void> => {
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ message: 'Acesso negado. Usuário não autenticado.' });
      return;
    }

    let role = null;

    const isAdmin = await Clinic.findOne({ where: { adminId: user.id } });
    if (isAdmin) role = 'admin';

    const isDoctor = await Doctor.findOne({ where: { userId: user.id } });
    if (isDoctor) role = 'doctor';

    const isPatient = await Patient.findOne({ where: { userId: user.id } });
    if (isPatient) role = 'patient';

    const isSecretary = await Secretary.findOne({ where: { userId: user.id } });
    if (isSecretary) role = 'secretary';

    if (!role || !allowedRoles.includes(role)) {
      res.status(403).json({ message: 'Acesso negado. Permissão insuficiente.' });
      return;
    }

    next();
  };
};
