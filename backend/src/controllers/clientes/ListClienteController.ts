import { Request,Response } from "express";
import { ListClienteService } from "../../services/clientes/ListClienteService";

class ListClienteController {
    async handle(request: Request, response: Response) {
        const listClienteService = new ListClienteService();
        const clientes = await listClienteService.execute();
        return response.json(clientes);
    }
}

export { ListClienteController };