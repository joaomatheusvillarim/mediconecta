import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Corrigir o tipo para StringValue
const expiresIn: jwt.SignOptions['expiresIn'] = process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] ?? '1h';

export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};