import { PlanType, UserRole } from './types'

// Configurações dos planos
export const PLANS = {
  [PlanType.INDIVIDUAL]: {
    name: 'Individual',
    price: 49.90,
    maxDependents: 0,
    features: [
      'Consultas médicas ilimitadas',
      'Receitas digitais',
      'Suporte 24/7',
      'Histórico médico completo',
      'Lembretes de medicação'
    ],
    color: 'blue'
  },
  [PlanType.FAMILIAR]: {
    name: 'Familiar',
    price: 129.00,
    maxDependents: 6,
    features: [
      'Até 6 dependentes inclusos',
      'Consultas médicas ilimitadas',
      'Pediatria especializada',
      'Receitas digitais para todos',
      'Suporte 24/7',
      'Histórico médico familiar'
    ],
    color: 'green'
  },
  [PlanType.FIT]: {
    name: 'Fit',
    price: 79.00,
    maxDependents: 2,
    features: [
      'Consultas com nutricionista',
      'Acompanhamento com personal trainer',
      'Planos de exercícios personalizados',
      'Monitoramento de saúde fitness',
      'Consultas médicas básicas',
      'Até 2 dependentes'
    ],
    color: 'purple'
  },
  [PlanType.EMPRESARIAL]: {
    name: 'Empresarial',
    price: 0, // Sob consulta
    maxDependents: -1, // Ilimitado
    features: [
      'Planos customizados por empresa',
      'Gestão centralizada de funcionários',
      'Relatórios de saúde corporativa',
      'Consultas médicas ocupacionais',
      'Suporte dedicado',
      'Integração com RH'
    ],
    color: 'gray'
  }
}

// Configurações de permissões por role
export const PERMISSIONS = {
  [UserRole.ADMIN]: {
    name: 'Administrador',
    permissions: [
      'manage_users',
      'manage_plans',
      'view_financial_reports',
      'manage_system_config',
      'manage_permissions',
      'view_all_data',
      'export_data'
    ],
    color: 'red'
  },
  [UserRole.MANAGER]: {
    name: 'Gerente Geral',
    permissions: [
      'view_users',
      'view_basic_reports',
      'customer_support',
      'view_consultations',
      'manage_doctors'
    ],
    color: 'blue'
  },
  [UserRole.CLIENT]: {
    name: 'Cliente',
    permissions: [
      'schedule_consultations',
      'view_own_data',
      'manage_dependents',
      'view_prescriptions',
      'update_profile'
    ],
    color: 'green'
  },
  [UserRole.DOCTOR]: {
    name: 'Médico',
    permissions: [
      'conduct_consultations',
      'create_prescriptions',
      'view_patient_history',
      'update_consultation_notes'
    ],
    color: 'purple'
  }
}

// Especialidades médicas disponíveis
export const MEDICAL_SPECIALTIES = [
  'Clínico Geral',
  'Cardiologista',
  'Dermatologista',
  'Pediatra',
  'Ginecologista',
  'Ortopedista',
  'Psiquiatra',
  'Neurologista',
  'Endocrinologista',
  'Oftalmologista',
  'Otorrinolaringologista',
  'Urologista',
  'Nutricionista',
  'Psicólogo',
  'Fisioterapeuta'
]

// Tipos de relacionamento para dependentes
export const RELATIONSHIP_TYPES = [
  'Cônjuge',
  'Filho(a)',
  'Pai',
  'Mãe',
  'Irmão(ã)',
  'Avô(ó)',
  'Neto(a)',
  'Outro'
]

// Estados brasileiros
export const BRAZILIAN_STATES = [
  { code: 'AC', name: 'Acre' },
  { code: 'AL', name: 'Alagoas' },
  { code: 'AP', name: 'Amapá' },
  { code: 'AM', name: 'Amazonas' },
  { code: 'BA', name: 'Bahia' },
  { code: 'CE', name: 'Ceará' },
  { code: 'DF', name: 'Distrito Federal' },
  { code: 'ES', name: 'Espírito Santo' },
  { code: 'GO', name: 'Goiás' },
  { code: 'MA', name: 'Maranhão' },
  { code: 'MT', name: 'Mato Grosso' },
  { code: 'MS', name: 'Mato Grosso do Sul' },
  { code: 'MG', name: 'Minas Gerais' },
  { code: 'PA', name: 'Pará' },
  { code: 'PB', name: 'Paraíba' },
  { code: 'PR', name: 'Paraná' },
  { code: 'PE', name: 'Pernambuco' },
  { code: 'PI', name: 'Piauí' },
  { code: 'RJ', name: 'Rio de Janeiro' },
  { code: 'RN', name: 'Rio Grande do Norte' },
  { code: 'RS', name: 'Rio Grande do Sul' },
  { code: 'RO', name: 'Rondônia' },
  { code: 'RR', name: 'Roraima' },
  { code: 'SC', name: 'Santa Catarina' },
  { code: 'SP', name: 'São Paulo' },
  { code: 'SE', name: 'Sergipe' },
  { code: 'TO', name: 'Tocantins' }
]

// Configurações do sistema
export const SYSTEM_CONFIG = {
  APP_NAME: 'YE VIDA',
  APP_DESCRIPTION: 'Plataforma de Telemedicina',
  SUPPORT_EMAIL: 'suporte@yevida.com.br',
  SUPPORT_PHONE: '(11) 9999-9999',
  SUPPORT_WHATSAPP: '5511999999999',
  
  // Limites do sistema
  MAX_DEPENDENTS_PER_PLAN: {
    [PlanType.INDIVIDUAL]: 0,
    [PlanType.FAMILIAR]: 6,
    [PlanType.FIT]: 2,
    [PlanType.EMPRESARIAL]: -1 // Ilimitado
  },
  
  // Configurações de consulta
  CONSULTATION_DURATION: 30, // minutos
  ADVANCE_BOOKING_DAYS: 30,
  CANCELLATION_HOURS: 24,
  
  // Configurações de pagamento
  PAYMENT_DUE_DAYS: 5,
  LATE_FEE_PERCENTAGE: 2,
  
  // Configurações de notificação
  REMINDER_HOURS_BEFORE: [24, 2], // horas antes da consulta
  
  // Configurações de arquivo
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
  
  // URLs e links
  TERMS_URL: '/terms',
  PRIVACY_URL: '/privacy',
  HELP_URL: '/help'
}

// Mensagens do sistema
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login realizado com sucesso!',
    REGISTER: 'Cadastro realizado com sucesso!',
    UPDATE_PROFILE: 'Perfil atualizado com sucesso!',
    CONSULTATION_SCHEDULED: 'Consulta agendada com sucesso!',
    CONSULTATION_CANCELLED: 'Consulta cancelada com sucesso!',
    PAYMENT_PROCESSED: 'Pagamento processado com sucesso!',
    DEPENDENT_ADDED: 'Dependente adicionado com sucesso!',
    DEPENDENT_UPDATED: 'Dependente atualizado com sucesso!',
    DEPENDENT_REMOVED: 'Dependente removido com sucesso!'
  },
  ERROR: {
    GENERIC: 'Ocorreu um erro inesperado. Tente novamente.',
    INVALID_CREDENTIALS: 'Email ou senha incorretos.',
    EMAIL_ALREADY_EXISTS: 'Este email já está cadastrado.',
    WEAK_PASSWORD: 'A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.',
    INVALID_EMAIL: 'Email inválido.',
    INVALID_PHONE: 'Telefone inválido.',
    INVALID_CPF: 'CPF inválido.',
    CONSULTATION_CONFLICT: 'Já existe uma consulta agendada para este horário.',
    PAYMENT_FAILED: 'Falha no processamento do pagamento.',
    UNAUTHORIZED: 'Você não tem permissão para realizar esta ação.',
    NOT_FOUND: 'Recurso não encontrado.',
    NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.'
  },
  WARNING: {
    CONSULTATION_REMINDER: 'Você tem uma consulta em {time}.',
    PAYMENT_DUE: 'Seu pagamento vence em {days} dias.',
    PLAN_EXPIRING: 'Seu plano expira em {days} dias.',
    MAINTENANCE_MODE: 'Sistema em manutenção. Algumas funcionalidades podem estar indisponíveis.'
  },
  INFO: {
    CONSULTATION_STARTED: 'Sua consulta começou. Clique aqui para entrar.',
    PRESCRIPTION_READY: 'Sua receita está disponível para download.',
    WELCOME: 'Bem-vindo ao YE VIDA! Complete seu perfil para começar.'
  }
}

// Configurações de cores do tema
export const THEME_COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8'
  },
  secondary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d'
  },
  accent: {
    50: '#fdf4ff',
    100: '#fae8ff',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed'
  }
}

// Configurações de animação
export const ANIMATIONS = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500
  },
  EASING: {
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out'
  }
}