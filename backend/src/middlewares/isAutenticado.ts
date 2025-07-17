import {Request, Response} from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
    sub: string;
}

export function isAutenticado(request: Request, response: Response, next: Function) {
    const autToken = request.headers.authorization;

    if (!autToken) {
        return response.status(401).end();
    }

    const [, token] = autToken.split(" ");

    try {

        const { sub } = verify(token, process.env.JWT_SECRET) as TokenPayload;

        //recupera o id do usuário e colocar dentro de uma variável user_id do request
        request.user_id = sub;

        return next();

    }catch (err) {
        return response.status(401).end();
    }
}