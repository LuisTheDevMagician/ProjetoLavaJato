import {Request, Response} from "express";
import { EditClienteService } from "../../services/clientes/EditClienteService";

class EditClienteController {
    async handle(req: Request, res: Response) {
        const { id, nome, email, senha, rua, bairro, numero } = req.body;

        const editClienteService = new EditClienteService();

        try {
            const cliente = await editClienteService.execute({
                id,
                nome,
                email,
                senha,
                rua,
                bairro,
                numero
            });

            return res.json(cliente);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { EditClienteController };