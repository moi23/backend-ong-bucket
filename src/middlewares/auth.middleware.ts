import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  usuario_id: string;
}

export default async function validaUsuarioAutenticado(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return response.status(401).json({
        message: 'Erro na autenticação xD',
      });
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      return response.status(401).json({
        message: 'Erro na autenticação xD',
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return response.status(401).json({
        message: 'Erro na autenticação xD',
      });
    }

    try {
      const decoded = verify(token, secret);

      const { usuario_id } = decoded as TokenPayload;
      request.usuario = {
        id: usuario_id,
      };

      if (!decoded) {
        return response.status(401).json({
          message: 'Erro na autenticação xD',
        });
      }

      return next();
    } catch (err) {
      return response.status(401).json({
        message: 'Erro na autenticação xD',
      });
    }
  } catch (err) {
    return response.status(401).json({
      message: 'Erro na autenticação xD',
    });
  }
}
