"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Heart, 
  User, 
  CreditCard, 
  Users, 
  Settings, 
  Calendar, 
  FileText, 
  Phone,
  Video,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  Bell,
  Menu,
  X
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  const upcomingConsultations = [
    {
      id: 1,
      doctor: "Dr. Maria Silva",
      specialty: "Clínico Geral",
      date: "2024-01-15",
      time: "14:30",
      type: "video"
    },
    {
      id: 2,
      doctor: "Dr. João Santos",
      specialty: "Cardiologista",
      date: "2024-01-18",
      time: "10:00",
      type: "video"
    }
  ]

  const recentConsultations = [
    {
      id: 1,
      doctor: "Dr. Ana Costa",
      specialty: "Dermatologista",
      date: "2024-01-10",
      status: "completed",
      prescription: true
    },
    {
      id: 2,
      doctor: "Dr. Carlos Lima",
      specialty: "Pediatra",
      date: "2024-01-08",
      status: "completed",
      prescription: false
    }
  ]

  const invoices = [
    {
      id: "INV-001",
      date: "2024-01-01",
      amount: 49.90,
      status: "paid",
      description: "Plano Individual - Janeiro 2024"
    },
    {
      id: "INV-002",
      date: "2024-01-15",
      amount: 25.00,
      status: "pending",
      description: "Consulta adicional"
    }
  ]

  const dependents = [
    {
      id: 1,
      name: "Maria Silva",
      relationship: "Esposa",
      age: 32,
      plan: "Familiar"
    },
    {
      id: 2,
      name: "João Silva",
      relationship: "Filho",
      age: 8,
      plan: "Familiar"
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
            <Heart className="w-5 h-5 mr-3" />
            Telemedicina
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="w-5 h-5 mr-3" />
            Financeiro
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <User className="w-5 h-5 mr-3" />
            Meus Dados
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="w-5 h-5 mr-3" />
            Dependentes
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
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Bem-vindo de volta, João Silva!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">João Silva</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <Tabs defaultValue="telemedicina" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:inline-flex">
              <TabsTrigger value="telemedicina">Telemedicina</TabsTrigger>
              <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
              <TabsTrigger value="dados">Meus Dados</TabsTrigger>
              <TabsTrigger value="dependentes">Dependentes</TabsTrigger>
            </TabsList>

            {/* Telemedicina Tab */}
            <TabsContent value="telemedicina" className="space-y-6">
              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-blue-200 hover:border-blue-400 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Nova Consulta</h3>
                    <p className="text-sm text-gray-600 mb-4">Agende uma consulta médica online</p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Agendar
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-green-200 hover:border-green-400 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Emergência</h3>
                    <p className="text-sm text-gray-600 mb-4">Atendimento médico urgente</p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Ligar Agora
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 hover:border-purple-400 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Receitas</h3>
                    <p className="text-sm text-gray-600 mb-4">Visualizar receitas médicas</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Ver Receitas
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Current Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-blue-600" />
                    <span>Meu Plano</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Plano Familiar</h3>
                      <p className="text-gray-600">Ativo até 15/02/2024</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Ativo
                        </Badge>
                        <span className="text-sm text-gray-600">3 dependentes inclusos</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">R$ 129</div>
                      <div className="text-gray-600">/mês</div>
                      <Button variant="outline" size="sm" className="mt-2">
                        Alterar Plano
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Consultations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>Próximas Consultas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingConsultations.map((consultation) => (
                      <div key={consultation.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <Video className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{consultation.doctor}</h4>
                            <p className="text-sm text-gray-600">{consultation.specialty}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {consultation.date} às {consultation.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Entrar na Consulta
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Consultations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span>Consultas Recentes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentConsultations.map((consultation) => (
                      <div key={consultation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{consultation.doctor}</h4>
                            <p className="text-sm text-gray-600">{consultation.specialty}</p>
                            <p className="text-sm text-gray-500">{consultation.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {consultation.prescription && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              Receita disponível
                            </Badge>
                          )}
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financeiro Tab */}
            <TabsContent value="financeiro" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Faturas Pagas</p>
                        <p className="text-2xl font-bold text-gray-900">R$ 49,90</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pendentes</p>
                        <p className="text-2xl font-bold text-gray-900">R$ 25,00</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Gasto</p>
                        <p className="text-2xl font-bold text-gray-900">R$ 74,90</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Faturas e Pagamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900">{invoice.description}</h4>
                          <p className="text-sm text-gray-600">Fatura #{invoice.id} - {invoice.date}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">R$ {invoice.amount.toFixed(2)}</p>
                            <Badge
                              variant={invoice.status === 'paid' ? 'default' : 'secondary'}
                              className={invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                            >
                              {invoice.status === 'paid' ? 'Pago' : 'Pendente'}
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            {invoice.status === 'paid' ? 'Ver Comprovante' : 'Pagar'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Meus Dados Tab */}
            <TabsContent value="dados" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Gerencie seus dados cadastrais</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Nome Completo</Label>
                      <p className="text-gray-900">João Silva Santos</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">E-mail</Label>
                      <p className="text-gray-900">joao.silva@email.com</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">WhatsApp</Label>
                      <p className="text-gray-900">(11) 99999-9999</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Data de Nascimento</Label>
                      <p className="text-gray-900">15/03/1985</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">CPF</Label>
                      <p className="text-gray-900">123.456.789-00</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Plano Atual</Label>
                      <p className="text-gray-900">Familiar</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Editar Informações
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dependentes Tab */}
            <TabsContent value="dependentes" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Dependentes</h2>
                  <p className="text-gray-600">Gerencie os dependentes do seu plano familiar</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Adicionar Dependente
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {dependents.map((dependent) => (
                  <Card key={dependent.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{dependent.name}</h3>
                          <p className="text-sm text-gray-600">{dependent.relationship} • {dependent.age} anos</p>
                          <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                            {dependent.plan}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}