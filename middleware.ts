import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Rotas protegidas
  const protectedRoutes = ['/admin', '/dashboard']
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // Se não tem sessão e está tentando acessar rota protegida
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Se tem sessão e está tentando acessar login/register
  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
    // Verificar se é funcionário para decidir redirecionamento
    const { data: funcionario } = await supabase
      .from('funcionarios')
      .select('cargo')
      .eq('email', session.user.email)
      .single()

    if (funcionario?.cargo === 'Gerente Geral') {
      return NextResponse.redirect(new URL('/admin', req.url))
    } else {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}