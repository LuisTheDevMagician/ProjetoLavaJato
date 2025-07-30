import {Request, Response} from 'express';
import { ListServicoDraftTrueService } from '../../services/servicos/ListServicoDraftTrueService';

class ListServicoDraftTrueController {
    async handle(req: Request, res: Response) {
        const listServicoDraftTrueService = new ListServicoDraftTrueService();

        const servicos = await listServicoDraftTrueService.execute();

        return res.json(servicos);
    }
}

export { ListServicoDraftTrueController };