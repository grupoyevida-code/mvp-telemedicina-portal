import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para as tabelas do Supabase
export interface Funcionario {
  id: string
  nome: string
  cpf: string
  email: string
  telefone: string
  endereco: string
  cargo: 'Gerente Geral' | 'Gerente de Cadastro' | 'Financeiro' | 'Revendedor'
  senha: string
  status: 'ativo' | 'inativo'
  data_criacao: string
  link_indicacao?: string
}

export interface Usuario {
  id: string
  nome: string
  cpf: string
  email: string
  tipo_plano: 'Individual' | 'Familiar' | 'Fit' | 'Empresarial'
  status: 'ativo' | 'inativo' | 'pendente'
  data_cadastro: string
}

export interface Plano {
  id: string
  nome: string
  tipo: 'Individual' | 'Familiar' | 'Fit' | 'Empresarial'
  valor: number
  status: 'ativo' | 'inativo'
  criado_em: string
}

export interface Transacao {
  id: string
  usuario_id: string
  valor: number
  status_pagamento: 'pendente' | 'pago' | 'cancelado'
  data: string
}

export interface Configuracao {
  id: string
  comissao_revenda: number
  parametros_sistema: Record<string, any>
}

// Função de login personalizada que verifica funcionários primeiro
export const signIn = async (email: string, password: string) => {
  // Primeiro verificar se é um funcionário
  const { data: funcionario } = await supabase
    .from('funcionarios')
    .select('*')
    .eq('email', email)
    .eq('senha', password)
    .eq('status', 'ativo')
    .single()

  if (funcionario) {
    // Se é funcionário, criar uma sessão simulada
    return {
      data: {
        user: {
          id: funcionario.id,
          email: funcionario.email,
          user_metadata: {
            nome: funcionario.nome,
            cargo: funcionario.cargo,
            tipo: 'funcionario'
          }
        }
      },
      error: null
    }
  }

  // Se não é funcionário, tentar login normal do Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  return { data, error }
}

export const signUp = async (email: string, password: string, metadata?: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Funções para funcionários
export const createFuncionario = async (funcionario: Omit<Funcionario, 'id' | 'data_criacao'>) => {
  // Gerar link de indicação se for revendedor
  const funcionarioId = crypto.randomUUID()
  let linkIndicacao = undefined
  if (funcionario.cargo === 'Revendedor') {
    linkIndicacao = `/indicacao/${funcionarioId}`
  }

  // Criar na tabela funcionarios
  const { data, error } = await supabase
    .from('funcionarios')
    .insert([{
      ...funcionario,
      id: funcionarioId,
      link_indicacao: linkIndicacao,
      data_criacao: new Date().toISOString()
    }])
    .select()

  return { data, error }
}

export const getFuncionarios = async () => {
  const { data, error } = await supabase
    .from('funcionarios')
    .select('*')
    .order('data_criacao', { ascending: false })

  return { data, error }
}

// Funções para usuários
export const createUsuario = async (usuario: Omit<Usuario, 'id' | 'data_cadastro'>) => {
  const { data, error } = await supabase
    .from('usuarios')
    .insert([{
      ...usuario,
      data_cadastro: new Date().toISOString()
    }])
    .select()

  return { data, error }
}

export const getUsuarios = async () => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .order('data_cadastro', { ascending: false })

  return { data, error }
}

// Funções para planos
export const getPlanos = async () => {
  const { data, error } = await supabase
    .from('planos')
    .select('*')
    .eq('status', 'ativo')
    .order('criado_em', { ascending: false })

  return { data, error }
}

// Funções para transações
export const createTransacao = async (transacao: Omit<Transacao, 'id' | 'data'>) => {
  const { data, error } = await supabase
    .from('transacoes')
    .insert([{
      ...transacao,
      data: new Date().toISOString()
    }])
    .select()

  return { data, error }
}

export const getTransacoes = async () => {
  const { data, error } = await supabase
    .from('transacoes')
    .select(`
      *,
      usuarios (nome, email)
    `)
    .order('data', { ascending: false })

  return { data, error }
}

// Funções para configurações
export const getConfiguracoes = async () => {
  const { data, error } = await supabase
    .from('configuracoes')
    .select('*')
    .single()

  return { data, error }
}

export const updateConfiguracoes = async (configuracoes: Partial<Configuracao>) => {
  const { data, error } = await supabase
    .from('configuracoes')
    .upsert(configuracoes)
    .select()

  return { data, error }
}

// Inicializar dados básicos do sistema
export const initializeSystemData = async () => {
  // Inserir planos padrão se não existirem
  const { data: existingPlans } = await supabase
    .from('planos')
    .select('id')
    .limit(1)

  if (!existingPlans || existingPlans.length === 0) {
    await supabase
      .from('planos')
      .insert([
        { nome: 'Individual', tipo: 'Individual', valor: 49.90, status: 'ativo' },
        { nome: 'Familiar', tipo: 'Familiar', valor: 129.00, status: 'ativo' },
        { nome: 'Fit', tipo: 'Fit', valor: 79.00, status: 'ativo' },
        { nome: 'Empresarial', tipo: 'Empresarial', valor: 0, status: 'ativo' }
      ])
  }

  // Inserir configurações padrão se não existirem
  const { data: existingConfig } = await supabase
    .from('configuracoes')
    .select('id')
    .limit(1)

  if (!existingConfig || existingConfig.length === 0) {
    await supabase
      .from('configuracoes')
      .insert([{
        comissao_revenda: 10.00,
        parametros_sistema: {
          app_name: 'YE VIDA',
          version: '1.0.0',
          maintenance_mode: false
        }
      }])
  }
}