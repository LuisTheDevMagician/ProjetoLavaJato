import express, {Router} from 'express';


//------------------FUNCIONARIOS------------------
import { CreateFuncionarioController } from './controllers/funcionarios/CreateFuncionarioController';
import { AutFuncionarioController } from './controllers/funcionarios/AutFuncionarioController';
import { DetalheFuncionarioController } from './controllers/funcionarios/DetalheFuncionarioController';
import { DeleteFuncionarioController } from './controllers/funcionarios/DeleteFuncionarioController';
import { ListFuncionarioController } from './controllers/funcionarios/ListFuncionarioController';
import { EditFuncionarioController } from './controllers/funcionarios/EditFuncionarioController';

//------------------CLIENTES------------------
import { CreateClienteController } from './controllers/clientes/CreateClienteController';
import { AutClienteController } from './controllers/clientes/AutClienteController';
import { DetalheClienteController } from './controllers/clientes/DetalheClienteController';
import { DeleteClienteController } from './controllers/clientes/DeleteClienteController';
import { ListClienteController } from './controllers/clientes/ListClienteController';
import { EditClienteController } from './controllers/clientes/EditClienteController';

//------------------MIDDLEWARES------------------
import { isAutenticado } from './middlewares/isAutenticado';

const router = Router();

//------------------ROTAS FUNCIONARIOS------------------
router.post('/funcionarios', new CreateFuncionarioController().handle);
router.post('/loginF', new AutFuncionarioController().handle);
router.get('/funcionarioInfo', isAutenticado, new DetalheFuncionarioController().handle);
router.delete('/funcionariosDelete', new DeleteFuncionarioController().handle);
router.get('/funcionariosList',  new ListFuncionarioController().handle);
router.put('/funcionariosEdit', new EditFuncionarioController().handle);

//------------------ROTAS CLIENTES------------------
router.post('/clientes', new CreateClienteController().handle);
router.post('/loginC', new AutClienteController().handle);
router.get('/clienteInfo', isAutenticado, new DetalheClienteController().handle);
router.delete('/clientesDelete', new DeleteClienteController().handle);
router.get('/clientesList', new ListClienteController().handle);
router.put('/clientesEdit', new EditClienteController().handle);

export{router};