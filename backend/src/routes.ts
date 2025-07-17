import express, {Router} from 'express';

import { CreateFuncionarioController } from './controllers/funcionarios/CreateFuncionarioController';
import { CreateClienteController } from './controllers/clientes/CreateClienteController';
import { AutFuncionarioController } from './controllers/funcionarios/AutFuncionarioController';
import { AutClienteController } from './controllers/clientes/AutClienteController';

const router = Router();

router.post('/funcionarios', new CreateFuncionarioController().handle);
router.post('/loginF', new AutFuncionarioController().handle);

router.post('/clientes', new CreateClienteController().handle);
router.post('/loginC', new AutClienteController().handle);

export{router};