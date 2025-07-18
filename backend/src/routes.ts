import express, {Router} from 'express';
import multer from 'multer';


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

//------------------CATEGORIA PRODUTO------------------
import { CreateCaProdutoController } from './controllers/categoriaProduto/CreateCaProdutoController';
import { ListCaProdutoController } from './controllers/categoriaProduto/ListCaProdutoController';
import { DeleteCaProdutoController } from './controllers/categoriaProduto/DeleteCaProdutoController';
import { EditCaProdutoController } from './controllers/categoriaProduto/EditCaProdutoController';

//------------------CATEGORIA VEICULO------------------
import { CreateCaVeiculoController } from './controllers/categoriaVeiculo/CreateCaVeiculoController';
import { ListCaVeiculoController } from './controllers/categoriaVeiculo/ListCaVeiculoController';
import { DeleteCaVeiculoController } from './controllers/categoriaVeiculo/DeleteCaVeiculoController';
import { EditCaVeiculoController } from './controllers/categoriaVeiculo/EditCaVeiculoController';

//------------------CATEGORIA SERVICO------------------
import { CreateCaServicoController } from './controllers/categoriaServico/CreateCaServicoController';
import { ListCaServicoController } from './controllers/categoriaServico/ListCaServicoController';
import { DeleteCaServicoController } from './controllers/categoriaServico/DeleteCaServicoController';
import { EditCaServicoController } from './controllers/categoriaServico/EditCaServicoController';

//------------------PRODUTOS------------------
import { CreateProdutoController } from './controllers/produtos/CreateProdutoController';
import { ListByCaProdutoController } from './controllers/produtos/ListCaProdutoController';

//------------------VENDAS------------------
import { CreateVendaController } from './controllers/vendas/CreateVendaController';
import { AddProdutoVendaController } from './controllers/vendas/AddProdutoVendaController';

//------------------MIDDLEWARES------------------
import { isAutenticado } from './middlewares/isAutenticado';

//------------------multer------------------
import uploadconfig from './config/multer';

const router = Router();
const upload = multer(uploadconfig.upload("./tmp"));

//------------------ROTAS FUNCIONARIOS------------------
router.post('/funcionarios', isAutenticado, new CreateFuncionarioController().handle);
router.post('/loginF', new AutFuncionarioController().handle);
router.get('/funcionarioInfo', isAutenticado, new DetalheFuncionarioController().handle);
router.delete('/funcionariosDelete', isAutenticado, new DeleteFuncionarioController().handle);
router.get('/funcionariosList', isAutenticado, new ListFuncionarioController().handle);
router.put('/funcionariosEdit', isAutenticado, new EditFuncionarioController().handle);

//------------------ROTAS CLIENTES------------------
router.post('/clientes', new CreateClienteController().handle);
router.post('/loginC', new AutClienteController().handle);
router.get('/clienteInfo', isAutenticado, new DetalheClienteController().handle);
router.delete('/clientesDelete', isAutenticado, new DeleteClienteController().handle);
router.get('/clientesList', isAutenticado, new ListClienteController().handle);
router.put('/clientesEdit', isAutenticado, new EditClienteController().handle);

//------------------ROTAS CATEGORIA PRODUTO------------------
router.post('/categoriaProduto', new CreateCaProdutoController().handle);
router.get('/categoriaProdutoList',  new ListCaProdutoController().handle);
router.delete('/categoriaProdutoDelete',  new DeleteCaProdutoController().handle);
router.put('/categoriaProdutoEdit',  new EditCaProdutoController().handle);

//------------------ROTAS CATEGORIA VEICULO------------------
router.post('/categoriaVeiculo', new CreateCaVeiculoController().handle);
router.get('/categoriaVeiculoList', new ListCaVeiculoController().handle);
router.delete('/categoriaVeiculoDelete', new DeleteCaVeiculoController().handle);
router.put('/categoriaVeiculoEdit', new EditCaVeiculoController().handle);

//------------------ROTAS CATEGORIA SERVICO------------------
router.post('/categoriaServico',  new CreateCaServicoController().handle);
router.get('/categoriaServicoList', new ListCaServicoController().handle);
router.delete('/categoriaServicoDelete', new DeleteCaServicoController().handle);
router.put('/categoriaServicoEdit', new EditCaServicoController().handle);

//------------------ROTAS PRODUTOS------------------
router.post('/produtos', upload.single('file'), new CreateProdutoController().handle);
router.get('/produtosList',  new ListByCaProdutoController().handle);

//------------------ROTAS VENDAS------------------
router.post('/vendas',  new CreateVendaController().handle);
router.post('/addProdutoVenda',  new AddProdutoVendaController().handle);

export{router};