import { Request, Response } from "express";
import { DetalheClienteService } from "../../services/clientes/DetalheClienteService";

class DetalheClienteController {
    async handle(request: Request, response: Response) {

        const user_id = request.user_id;

        const detalheClienteService = new DetalheClienteService();

        const cliente = await detalheClienteService.execute(user_id);

        return response.json(cliente);
    }
}

export { DetalheClienteController };