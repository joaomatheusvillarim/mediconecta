import { Request, Response, RequestHandler } from 'express';
import { comparePassword, generateToken } from '../util/auth';
import { User } from '../model/User';

class AuthController {

  login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }

      const token = generateToken(user.id);

      res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao realizar login', error });
    }
  };

  logout: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(200).json({ message: 'Logout bem-sucedido' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao realizar logout', error });
    }
  };
}

export default new AuthController();