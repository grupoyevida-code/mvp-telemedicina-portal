"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Heart, 
  Users, 
  CreditCard, 
  Settings, 
  BarChart3,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  LogOut,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  DollarSign
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  // Mock data
  const stats = {
    totalUsers: 1247,
    activeUsers: 1089,
    totalRevenue: 156780.50,
    monthlyGrowth: 12.5
  }

  const users = [
    {
      id: 1,
      name: "João Silva Santos",
      email: "joao.silva@email.com",
      plan: "Familiar",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-20"
    },
    {
      id: 2,
      name: "Maria Oliveira",
      email: "maria.oliveira@email.com",
      plan: "Individual",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-19"
    },
    {
      id: 3,
      name: "Carlos Mendes",
      email: "carlos.mendes@email.com",
      plan: "Empresarial",
      status: "inactive",
      joinDate: "2024-01-05",
      lastLogin: "2024-01-18"
    }
  ]

  const plans = [
    {
      id: 1,
      name: "Individual",
      price: 49.90,
      users: 456,
      revenue: 22772.40,
      status: "active"
    },
    {
      id: 2,
      name: "Familiar",
      price: 129.00,
      users: 234,
      revenue: 30186.00,
      status: "active"
    },
    {
      id: 3,
      name: "Fit",
      price: 79.00,
      users: 189,
      revenue: 14931.00,
      status: "active"
    },
    {
      id: 4,
      name: "Empresarial",
      price: 0,
      users: 12,
      revenue: 48000.00,
      status: "active"
    }
  ]

  const recentTransactions = [
    {
      id: "TXN-001",
      user: "João Silva",
      plan: "Familiar",
      amount: 129.00,
      date: "2024-01-20",
      status: "completed"
    },
    {
      id: "TXN-002",
      user: "Maria Oliveira",
      plan: "Individual",
      amount: 49.90,
      date: "2024-01-20",
      status: "completed"
    },
    {
      id: "TXN-003",
      user: "Carlos Mendes",
      plan: "Empresarial",
      amount: 4000.00,
      date: "2024-01-19",
      status: "pending"
    }
  ]

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            YE VIDA
          </span>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-blue-600 bg-blue-50">
            <BarChart3 className="w-5 h-5 mr-3" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="w-5 h-5 mr-3" />
            Usuários
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Heart className="w-5 h-5 mr-3" />
            Planos
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="w-5 h-5 mr-3" />
            Financeiro
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Shield className="w-5 h-5 mr-3" />
            Permissões
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-5 h-5 mr-3" />
            Configurações
          </Button>
        </div>
      </nav>
      
      <div className="absolute bottom-4 left-3 right-3">
        <Button
          variant="outline"
          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-gray-600">Gerencie usuários, planos e relatórios</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:inline-flex">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="plans">Planos</TabsTrigger>
              <TabsTrigger value="financial">Financeiro</TabsTrigger>
              <TabsTrigger value="permissions">Permissões</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total de Usuários</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Usuários Ativos</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Receita Total</p>
                        <p className="text-2xl font-bold text-gray-900">R$ {stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Crescimento Mensal</p>
                        <p className="text-2xl font-bold text-gray-900">+{stats.monthlyGrowth}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Transações Recentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{transaction.user}</h4>
                            <p className="text-sm text-gray-600">{transaction.plan} • {transaction.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">R$ {transaction.amount.toFixed(2)}</p>
                            <Badge
                              variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                              className={transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                            >
                              {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Planos Mais Populares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {plans.slice(0, 3).map((plan) => (
                        <div key={plan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{plan.name}</h4>
                            <p className="text-sm text-gray-600">{plan.users} usuários</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {plan.price > 0 ? `R$ ${plan.price.toFixed(2)}` : 'Sob consulta'}
                            </p>
                            <p className="text-sm text-green-600">R$ {plan.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Gestão de Usuários</h2>
                  <p className="text-gray-600">Gerencie todos os usuários da plataforma</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Novo Usuário
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar usuários..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Usuário
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Plano
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cadastro
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Último Acesso
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                {user.plan}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                variant={user.status === 'active' ? 'default' : 'secondary'}
                                className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                              >
                                {user.status === 'active' ? 'Ativo' : 'Inativo'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.joinDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.lastLogin}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Plans Tab */}
            <TabsContent value="plans" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Gestão de Planos</h2>
                  <p className="text-gray-600">Configure e gerencie os planos disponíveis</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Novo Plano
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id} className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{plan.name}</span>
                        <Badge className="bg-green-100 text-green-800">
                          {plan.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">
                            {plan.price > 0 ? `R$ ${plan.price.toFixed(2)}` : 'Sob consulta'}
                          </p>
                          <p className="text-sm text-gray-600">/mês</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Usuários:</span>
                            <span className="text-sm font-medium">{plan.users}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Receita:</span>
                            <span className="text-sm font-medium text-green-600">
                              R$ {plan.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Editar Plano
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Relatórios Financeiros</h2>
                <p className="text-gray-600">Acompanhe receitas, pagamentos e métricas financeiras</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Receita Mensal</p>
                        <p className="text-2xl font-bold text-gray-900">R$ 89.456,78</p>
                        <p className="text-sm text-green-600">+15.2% vs mês anterior</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pagamentos Processados</p>
                        <p className="text-2xl font-bold text-gray-900">1.234</p>
                        <p className="text-sm text-blue-600">98.5% taxa de sucesso</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pagamentos Pendentes</p>
                        <p className="text-2xl font-bold text-gray-900">R$ 12.345,67</p>
                        <p className="text-sm text-yellow-600">23 transações</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Transações Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900">{transaction.user}</h4>
                          <p className="text-sm text-gray-600">{transaction.plan} • ID: {transaction.id}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">R$ {transaction.amount.toFixed(2)}</p>
                          <Badge
                            variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                            className={transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                          >
                            {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Permissions Tab */}
            <TabsContent value="permissions" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Configurações de Permissões</h2>
                <p className="text-gray-600">Gerencie perfis de acesso e permissões do sistema</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-red-600" />
                      <span>Admin</span>
                    </CardTitle>
                    <CardDescription>Acesso total ao sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>✓ Gerenciar usuários</p>
                      <p>✓ Configurar planos</p>
                      <p>✓ Relatórios financeiros</p>
                      <p>✓ Configurações do sistema</p>
                      <p>✓ Gerenciar permissões</p>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Editar Permissões
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span>Gerente Geral</span>
                    </CardTitle>
                    <CardDescription>Gestão operacional</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>✓ Visualizar usuários</p>
                      <p>✓ Relatórios básicos</p>
                      <p>✓ Suporte ao cliente</p>
                      <p>✗ Configurações do sistema</p>
                      <p>✗ Gerenciar permissões</p>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Editar Permissões
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-green-600" />
                      <span>Cliente</span>
                    </CardTitle>
                    <CardDescription>Acesso aos serviços</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>✓ Agendar consultas</p>
                      <p>✓ Visualizar histórico</p>
                      <p>✓ Gerenciar dependentes</p>
                      <p>✓ Dados pessoais</p>
                      <p>✗ Funcionalidades admin</p>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Editar Permissões
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}