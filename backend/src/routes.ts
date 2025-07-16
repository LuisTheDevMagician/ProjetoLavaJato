import express, {Router} from 'express';

import { CreateFuncionarioController } from './controllers/funcionarios/CreateFuncionarioController';
import { CreateClienteController } from './controllers/clientes/CreateClienteController';

const router = Router();

router.post('/funcionarios', new CreateFuncionarioController().handle);

router.post('/clientes', new CreateClienteController().handle);

export{router};