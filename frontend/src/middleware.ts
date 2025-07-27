// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCookieServer } from '@/lib/cookieServer'; // Assumindo que este lê o cookie 'token'
import { api } from '@/services/api';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Ignora rotas internas do Next.js e a página inicial
    if (pathname.startsWith("/_next") || pathname === "/") {
        return NextResponse.next();
    }

    const token = await getCookieServer(); // Obtenha o token

    // --- Proteção para Rotas de Cliente (ex: /dashboard) ---
    // A rota '/dashboard' e suas sub-rotas
    if (pathname.startsWith("/dashboard")) {
        if (!token) {
            console.warn('Redirecionando: Token não encontrado para /dashboard');
            return NextResponse.redirect(new URL("/", req.url));
        }

        const isValidToken = await validarToken(token, 'CLIENTE'); // Passa o tipo de usuário esperado
        if (!isValidToken) {
            console.warn('Redirecionando: Token inválido ou função incorreta para /dashboard');
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // --- Proteção para Rotas de Administrador (ex: /dashBoardAdmin) ---
    // A rota '/dashBoardAdmin' e suas sub-rotas
    if (pathname.startsWith("/dashBoardAdmin")) {
        if (!token) {
            console.warn('Redirecionando: Token não encontrado para /dashBoardAdmin');
            return NextResponse.redirect(new URL("/loginFuncionario", req.url)); // Redireciona para o login de funcionário/admin
        }

        const isValidToken = await validarToken(token, 'ADMIN'); // Passa o tipo de usuário esperado
        if (!isValidToken) {
            console.warn('Redirecionando: Token inválido ou função incorreta para /dashBoardAdmin');
            return NextResponse.redirect(new URL("/loginFuncionario", req.url)); // Redireciona para o login de funcionário/admin
        }
    }

    // --- NOVO: Proteção para Rotas de Funcionário (ex: /dashBoardFn) ---
    // A rota '/dashBoardFn' e suas sub-rotas
    if (pathname.startsWith("/dashBoardFn")) {
        if (!token) {
            console.warn('Redirecionando: Token não encontrado para /dashBoardFn');
            return NextResponse.redirect(new URL("/loginFuncionario", req.url)); // Redireciona para o login de funcionário
        }

        const isValidToken = await validarToken(token, 'FUNCIONARIO'); // Passa o tipo de usuário esperado
        if (!isValidToken) {
            console.warn('Redirecionando: Token inválido ou função incorreta para /dashBoardFn');
            return NextResponse.redirect(new URL("/loginFuncionario", req.url)); // Redireciona para o login de funcionário
        }
    }

    return NextResponse.next();
}

// Função auxiliar para validar o token e verificar a função do usuário
async function validarToken(token: string, expectedRole: 'CLIENTE' | 'ADMIN' | 'FUNCIONARIO') {
    if (!token) {
        return false;
    }

    try {
        let endpoint: string;
        switch (expectedRole) {
            case 'CLIENTE':
                endpoint = "/clienteInfo";
                break;
            case 'ADMIN':
                endpoint = "/adminInfo";
                break;
            case 'FUNCIONARIO':
                endpoint = "/funcionarioInfo"; // Asumi que você tem um endpoint para funcionários
                break;
            default:
                return false; // Role desconhecido
        }

        const response = await api.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Verifica se a função retornada pela API corresponde à função esperada
        return response.data?.funcao === expectedRole;

    } catch (err) {
        console.error(`Erro ao validar token para ${expectedRole}:`, err);
        return false;
    }
}