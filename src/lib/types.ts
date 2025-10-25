// Tipos para usuários
export interface User {
  id: string
  name: string
  email: string
  whatsapp: string
  password: string
  role: UserRole
  plan: PlanType
  status: UserStatus
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
  dependents?: Dependent[]
}

export interface Dependent {
  id: string
  name: string
  relationship: string
  age: number
  userId: string
  createdAt: Date
}

// Tipos para planos
export interface Plan {
  id: string
  name: string
  type: PlanType
  price: number
  description: string
  features: string[]
  maxDependents: number
  status: PlanStatus
  createdAt: Date
  updatedAt: Date
}

// Tipos para transações financeiras
export interface Transaction {
  id: string
  userId: string
  planId: string
  amount: number
  status: TransactionStatus
  paymentMethod: PaymentMethod
  description: string
  dueDate: Date
  paidAt?: Date
  createdAt: Date
}

export interface Invoice {
  id: string
  userId: string
  transactionId: string
  amount: number
  status: InvoiceStatus
  issueDate: Date
  dueDate: Date
  paidAt?: Date
  description: string
}

// Tipos para consultas médicas
export interface Consultation {
  id: string
  userId: string
  doctorId: string
  type: ConsultationType
  status: ConsultationStatus
  scheduledAt: Date
  completedAt?: Date
  notes?: string
  prescription?: Prescription
  createdAt: Date
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  crm: string
  email: string
  phone: string
  status: DoctorStatus
  createdAt: Date
}

export interface Prescription {
  id: string
  consultationId: string
  medications: Medication[]
  instructions: string
  validUntil: Date
  createdAt: Date
}

export interface Medication {
  name: string
  dosage: string
  frequency: string
  duration: string
}

// Enums
export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  CLIENT = 'client',
  DOCTOR = 'doctor'
}

export enum PlanType {
  INDIVIDUAL = 'individual',
  FAMILIAR = 'familiar',
  FIT = 'fit',
  EMPRESARIAL = 'empresarial'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending'
}

export enum PlanStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISCONTINUED = 'discontinued'
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PIX = 'pix',
  BANK_SLIP = 'bank_slip',
  BANK_TRANSFER = 'bank_transfer'
}

export enum InvoiceStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled'
}

export enum ConsultationType {
  VIDEO = 'video',
  PHONE = 'phone',
  CHAT = 'chat',
  EMERGENCY = 'emergency'
}

export enum ConsultationStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}

export enum DoctorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ON_LEAVE = 'on_leave'
}

// Tipos para formulários
export interface LoginForm {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterForm {
  name: string
  email: string
  whatsapp: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface UserProfileForm {
  name: string
  email: string
  whatsapp: string
  birthDate?: Date
  cpf?: string
  address?: Address
}

export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

// Tipos para dashboard e relatórios
export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  monthlyGrowth: number
  totalConsultations: number
  pendingPayments: number
}

export interface RevenueReport {
  period: string
  totalRevenue: number
  planRevenue: PlanRevenue[]
  growth: number
}

export interface PlanRevenue {
  planType: PlanType
  revenue: number
  userCount: number
  averageRevenue: number
}

// Tipos para API responses
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Tipos para filtros e busca
export interface UserFilters {
  role?: UserRole
  status?: UserStatus
  plan?: PlanType
  search?: string
  dateFrom?: Date
  dateTo?: Date
}

export interface TransactionFilters {
  status?: TransactionStatus
  paymentMethod?: PaymentMethod
  amountFrom?: number
  amountTo?: number
  dateFrom?: Date
  dateTo?: Date
  userId?: string
}

// Tipos para configurações do sistema
export interface SystemConfig {
  siteName: string
  supportEmail: string
  supportPhone: string
  maintenanceMode: boolean
  allowRegistration: boolean
  maxDependentsPerPlan: Record<PlanType, number>
  paymentMethods: PaymentMethod[]
}

// Tipos para notificações
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  createdAt: Date
  data?: Record<string, any>
}

export enum NotificationType {
  CONSULTATION_REMINDER = 'consultation_reminder',
  PAYMENT_DUE = 'payment_due',
  PAYMENT_CONFIRMED = 'payment_confirmed',
  PLAN_EXPIRING = 'plan_expiring',
  SYSTEM_MAINTENANCE = 'system_maintenance',
  WELCOME = 'welcome'
}