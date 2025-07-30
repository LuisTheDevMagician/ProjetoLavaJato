import {Request, Response} from 'express';
import { ListServicoDraftFalseService } from '../../services/servicos/ListServicoDraftFalse';

class ListServicoDraftFalseController {
    async handle(req: Request, res: Response) {
        const listServicoDraftFalseService = new ListServicoDraftFalseService();

        const servicos = await listServicoDraftFalseService.execute();

        return res.json(servicos);
    }
}

export { ListServicoDraftFalseController };