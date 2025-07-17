import { Request, Response } from "express";  
import { AutClienteService } from '../../services/clientes/AutClienteService';

class AutClienteController {
    async handle(req: Request, res: Response) {
        const { email, senha } = req.body;

        const autClienteService = new AutClienteService();

        const result = await autClienteService.execute({ email, senha });
        
        return res.json(result);
    }
}

export { AutClienteController };