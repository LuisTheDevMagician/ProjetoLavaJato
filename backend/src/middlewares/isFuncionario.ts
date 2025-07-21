import {Request, Response} from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../prisma";

interface TokenPayload {
    sub: string;
    funcao: string;
}

export function isFuncionario(request: Request, response: Response, next: Function) {
    const autToken = request.headers.authorization;

    if (!autToken) {
        return response.status(401).json({ error: "Token não fornecido" });
    }

    const [, token] = autToken.split(" ");

    try {
        const { sub, funcao } = verify(token, process.env.JWT_SECRET) as TokenPayload;

        // Verificar se a função é FUNCIONARIO 
        if (funcao !== 'FUNCIONARIO') {
            return response.status(403).json({ error: "Acesso negado. Apenas funcionários podem acessar esta rota." });
        }

        // Verificar se o usuário ainda existe e tem a função correta
        prismaClient.funcionario.findFirst({
            where: {
                id: Number(sub),
                funcao: {
                    in: ['FUNCIONARIO']
                }
            }
        }).then(funcionario => {
            if (!funcionario) {
                return response.status(403).json({ error: "Usuário não encontrado ou sem permissão." });
            }

            request.user_id = sub;
            request.user_funcao = funcao;
            return next();
        }).catch(err => {
            return response.status(500).json({ error: "Erro interno do servidor" });
        });

    } catch (err) {
        return response.status(401).json({ error: "Token inválido" });
    }
}