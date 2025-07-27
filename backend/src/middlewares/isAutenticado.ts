import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../prisma";

interface TokenPayload {
  sub: string;
  funcao: string;
}

export async function isAutenticado(request: Request, response: Response, next: NextFunction) {
  const autToken = request.headers.authorization;

  if (!autToken) {
    return response.status(401).json({ error: "Token não fornecido." });
  }

  const [, token] = autToken.split(" ");

  try {
    const { sub, funcao } = verify(token, process.env.JWT_SECRET) as TokenPayload;

    if (funcao !== "CLIENTE") {
      return response.status(403).json({ error: "Acesso negado. Apenas clientes podem acessar esta rota." });
    }

    const cliente = await prismaClient.cliente.findFirst({
      where: {
        id: Number(sub),
        funcao: 'CLIENTE',
      },
    });

    if (!cliente) {
      return response.status(403).json({ error: "Usuário não encontrado ou sem permissão." });
    }

    // Adiciona no request os dados do usuário autenticado
    request.user_id = sub;
    request.user_funcao = funcao;

    return next();

  } catch (err) {
    return response.status(401).json({ error: "Token inválido ou expirado." });
  }
}
