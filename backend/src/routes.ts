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
import { ListProdutoController } from './controllers/produtos/ListProdutoController';

//------------------VENDAS------------------
import { CreateVendaController } from './controllers/vendas/CreateVendaController';
import { AddProdutoVendaController } from './controllers/vendas/AddProdutoVendaController';
import { ListVendaByClienteController } from './controllers/vendas/ListVendaByClienteController';
import { RemoveVendaController } from './controllers/vendas/RemoveVendaController';
import { RemoveProdutoVendaController } from './controllers/vendas/RemoveProdutoVendaController';
import { SendVendaController } from './controllers/vendas/SendVendaController';
import { DetalheVendaController } from './controllers/vendas/DetalheVendaController';
import { ConcluirVendaController } from './controllers/vendas/ConcluirVendaController';
import {ListVendaByClienteFinalizadaController} from './controllers/vendas/ListVendaByClienteFinalizadaController';

//------------------SERVIÇOS------------------
import { CreateServicoController } from './controllers/servicos/CreateServicoController';
import { SendServicoController } from './controllers/servicos/SendServicoController';
import { ListServicoDraftTrueController } from './controllers/servicos/ListServicoDraftTrueController';
import { DetalheServicoFuncionarioController } from './controllers/servicos/DetalheServicoFuncionarioController';
import { ConcluirServicoController } from './controllers/servicos/ConcluirServicoController';
import { DetalheServicoFuncionarioFinalizadoController } from './controllers/servicos/DetalheServicoFuncionarioFinalizadoController';
import { DetalheServicoClienteController } from './controllers/servicos/DetalheServicoClienteController';
import { DetalheServicoClienteFinalizadoController } from './controllers/servicos/DetalheServicoClienteFinalizado';
import { DeleteServicoClienteController } from './controllers/servicos/DeleteServicoClienteController';
import { ListServicoDraftFalseController } from './controllers/servicos/ListServicoDraftFalseController';


//------------------VEICULOS------------------
import { CreateVeiculoController } from './controllers/veiculo/CreateVeiculoController';
import { ListVeiculoByClienteController } from './controllers/veiculo/ListVeiculoByClienteController';
import { DeleteVeiculoByClienteController } from './controllers/veiculo/DeleteVeiculoByClienteController';


//------------------MIDDLEWARES------------------
import { isAutenticado } from './middlewares/isAutenticado';
import { isFuncionario } from './middlewares/isFuncionario';
import { isAdmin } from './middlewares/isAdmin';

//------------------multer------------------
import uploadconfig from './config/multer';
import { ListVendasController } from './controllers/vendas/ListVendasController';


const router = Router();
const upload = multer(uploadconfig.upload("./tmp"));

//------------------ROTAS FUNCIONARIOS------------------
router.post('/funcionarios', isAdmin, new CreateFuncionarioController().handle);
router.post('/loginF', new AutFuncionarioController().handle);
//rota para puxar autenticação de login
router.get('/funcionarioInfo', isFuncionario, new DetalheFuncionarioController().handle);
router.get('/adminInfo', isAdmin, new DetalheFuncionarioController().handle);
router.delete('/funcionariosDelete', isAdmin, new DeleteFuncionarioController().handle);
router.get('/funcionariosList', isAdmin, new ListFuncionarioController().handle);
router.put('/funcionariosEdit', isAdmin, new EditFuncionarioController().handle);

//------------------ROTAS CLIENTES------------------
router.post('/clientes', new CreateClienteController().handle);
router.post('/loginC',  new AutClienteController().handle);
//rota para puxar autenticação de login
router.get('/clienteInfo', isAutenticado, new DetalheClienteController().handle);
router.delete('/clientesDelete', isAutenticado, new DeleteClienteController().handle);
router.get('/clientesList', isAutenticado, new ListClienteController().handle);
router.put('/clientesEdit', isAutenticado, new EditClienteController().handle);

//------------------ROTAS CATEGORIA PRODUTO------------------
router.post('/categoriaProduto', isAdmin, new CreateCaProdutoController().handle);
router.get('/categoriaProdutoList', isAdmin, new ListCaProdutoController().handle);
router.delete('/categoriaProdutoDelete', isAdmin, new DeleteCaProdutoController().handle);
router.put('/categoriaProdutoEdit', isAdmin, new EditCaProdutoController().handle);

//------------------ROTAS CATEGORIA VEICULO------------------
router.post('/categoriaVeiculo', isAdmin, new CreateCaVeiculoController().handle);
router.get('/categoriaVeiculoList',  new ListCaVeiculoController().handle);
router.delete('/categoriaVeiculoDelete', isAdmin, new DeleteCaVeiculoController().handle);
router.put('/categoriaVeiculoEdit', isAdmin, new EditCaVeiculoController().handle);

//------------------ROTAS VEICULOS------------------
router.post('/veiculos', isAutenticado, new CreateVeiculoController().handle);
router.get('/veiculosClientes', isAutenticado, new ListVeiculoByClienteController().handle);
router.delete('/veiculosDelete', isAutenticado, new DeleteVeiculoByClienteController().handle);

//------------------ROTAS CATEGORIA SERVICO------------------
router.post('/categoriaServico', isAdmin, new CreateCaServicoController().handle);
router.get('/categoriaServicoList',  new ListCaServicoController().handle);
router.delete('/categoriaServicoDelete', isAdmin, new DeleteCaServicoController().handle);
router.put('/categoriaServicoEdit', isAdmin, new EditCaServicoController().handle);

//------------------ROTAS PRODUTOS------------------
router.post('/produtos', isAdmin, upload.single('file'), new CreateProdutoController().handle);
router.get('/produtosListCategoria', isAdmin, new ListByCaProdutoController().handle);
router.get('/produtosListAll',  new ListProdutoController().handle);

//------------------ROTAS VENDAS------------------
router.post('/vendas', isAutenticado, new CreateVendaController().handle);
router.post('/addProdutoVenda',  isAutenticado,new AddProdutoVendaController().handle);
router.get('/vendasList',  new ListVendasController().handle);
router.get('/vendasclientes', isAutenticado, new ListVendaByClienteController().handle);
router.delete("/vendasDelete",  isAutenticado, new RemoveVendaController().handle);
router.delete("/removeProdutoVenda",  isAutenticado, new RemoveProdutoVendaController().handle);
router.put("/sendVenda",  isAutenticado, new SendVendaController().handle);
router.get("/detalheVenda",  isAutenticado, new DetalheVendaController().handle);
router.put("/concluirVenda",  isAutenticado, new ConcluirVendaController().handle);
router.get("/vendasclientesfinalizadas", isAutenticado, new ListVendaByClienteFinalizadaController().handle);

//------------------ROTAS SERVIÇOS------------------
router.post('/servicos', isAutenticado, new CreateServicoController().handle);
router.put('/sendServico', isFuncionario, new SendServicoController().handle);
router.get('/servicosDraftTrue',  new ListServicoDraftTrueController().handle);
router.get('/detalheServico',  isFuncionario, new DetalheServicoFuncionarioController().handle);
router.put('/concluirServico', isFuncionario, new ConcluirServicoController().handle);
router.get('/detalheServicoFinalizado', isFuncionario, new DetalheServicoFuncionarioFinalizadoController().handle);
router.get('/detalheServicoCliente', isAutenticado, new DetalheServicoClienteController().handle);
router.get('/detalheServicoClienteFinalizado', isAutenticado, new DetalheServicoClienteFinalizadoController().handle);
router.delete('/servicosDelete', isAutenticado, new DeleteServicoClienteController().handle);
router.get('/servicosDraftFalse',  new ListServicoDraftFalseController().handle);

export{router};