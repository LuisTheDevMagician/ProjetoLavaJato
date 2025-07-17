import { Request, Response } from "express";
import { DeleteClienteService } from "../../services/clientes/DeleteClienteService";

class DeleteClienteController {
    async handle(request: Request, response: Response) {
        const { email, senha } = request.body;

        const deleteClienteService = new DeleteClienteService();

        const result = await deleteClienteService.execute({ email, senha });

        return response.json(result);
    }
}

export { DeleteClienteController };