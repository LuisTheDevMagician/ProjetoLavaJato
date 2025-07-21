import {NextRequest, NextResponse} from 'next/server';
import {getCookieServer} from '@/lib/cookieServer';
import {api} from '@/services/api';

export async function middleware(req: NextRequest) {
    const {pathname} = req.nextUrl;

    
    if(pathname.startsWith("/_next") || pathname === "/"){
        return NextResponse.next();
    }

    const token = await getCookieServer();

    if(pathname.startsWith("/dashBoardFn")){
        if(!token){
            return NextResponse.redirect(new URL("/", req.url));
        }

        const isValidFuncionario = await validarFuncionario(token);

        if(!isValidFuncionario){
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
    
}

async function validarFuncionario(token: string){
    if(!token){
        return false;
    }

    try {
        const response = await api.get("/funcionarioInfo",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const funcionario = response.data;
        if(funcionario && (funcionario.funcao === 'FUNCIONARIO')){
            return true;
        }

        return false;

    } catch (err) {
        return false;
    }
}