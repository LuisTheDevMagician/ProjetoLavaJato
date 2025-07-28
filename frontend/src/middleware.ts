
import { NextRequest, NextResponse } from 'next/server';
import { getCookieServer } from '@/lib/cookieServer'; 
import { api } from '@/services/api';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    
    if (pathname.startsWith("/_next") || pathname === "/") {
        return NextResponse.next();
    }

    const token = await getCookieServer(); 

    
    if (pathname.startsWith("/dashboard")) {
        if (!token) {
            console.warn('Redirecionando: Token não encontrado para /dashboard');
            return NextResponse.redirect(new URL("/", req.url));
        }

        const isValidToken = await validarToken(token, 'CLIENTE'); 
        if (!isValidToken) {
            console.warn('Redirecionando: Token inválido ou função incorreta para /dashboard');
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    
    if (pathname.startsWith("/dashBoardAdmin")) {
        if (!token) {
            console.warn('Redirecionando: Token não encontrado para /dashBoardAdmin');
            return NextResponse.redirect(new URL("/loginFuncionario", req.url)); 
        }

        const isValidToken = await validarToken(token, 'ADMIN'); 
        if (!isValidToken) {
            console.warn('Redirecionando: Token inválido ou função incorreta para /dashBoardAdmin');
            return NextResponse.redirect(new URL("/loginFuncionario", req.url));
        }
    }

  
    if (pathname.startsWith("/dashBoardFn")) {
        if (!token) {
            console.warn('Redirecionando: Token não encontrado para /dashBoardFn');
            return NextResponse.redirect(new URL("/loginFuncionario", req.url)); 
        }

        const isValidToken = await validarToken(token, 'FUNCIONARIO'); 
        if (!isValidToken) {
            console.warn('Redirecionando: Token inválido ou função incorreta para /dashBoardFn');
            return NextResponse.redirect(new URL("/loginFuncionario", req.url));
        }
    }

    return NextResponse.next();
}


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
                endpoint = "/funcionarioInfo"; 
                break;
            default:
                return false; 
        }

        const response = await api.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

       
        return response.data?.funcao === expectedRole;

    } catch (err) {
        console.error(`Erro ao validar token para ${expectedRole}:`, err);
        return false;
    }
}