"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Heart, 
  User, 
  Users, 
  Settings, 
  FileText, 
  CreditCard,
  LogOut,
  Bell,
  Menu,
  X,
  Plus,
  AlertCircle,
  CheckCircle,
  DollarSign,
  TrendingUp,
  UserPlus,
  Link as LinkIcon
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  supabase, 
  signOut, 
  createFuncionario, 
  getFuncionarios, 
  getUsuarios, 
  getTransacoes,
  getConfiguracoes,
  updateConfiguracoes,
  type Funcionario 
} from "@/lib/supabase"

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [transacoes, setTransacoes] = useState<any[]>([])
  const [configuracoes, setConfiguracoes] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showNewFuncionario, setShowNewFuncionario] = useState(false)
  const [newFuncionario, setNewFuncionario] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    endereco: "",
    cargo: "",
    senha: ""
  })
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [funcionariosRes, usuariosRes, transacoesRes, configRes] = await Promise.all([
        getFuncionarios(),
        getUsuarios(),
        getTransacoes(),
        getConfiguracoes()
      ])

      if (funcionariosRes.data) setFuncionarios(funcionariosRes.data)
      if (usuariosRes.data) setUsuarios(usuariosRes.data)
      if (transacoesRes.data) setTransacoes(transacoesRes.data)
      if (configRes.data) setConfiguracoes(configRes.data)
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  const handleCreateFuncionario = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const { data, error: createError } = await createFuncionario(newFuncionario as any)
      
      if (createError) {
        setError("Erro ao criar funcionário: " + createError.message)
      } else {
        setSuccess("Funcionário criado com sucesso!")
        setNewFuncionario({
          nome: "",
          cpf: "",
          email: "",
          telefone: "",
          endereco: "",
          cargo: "",
          senha: ""
        })
        setShowNewFuncionario(false)
        loadData()
      }
    } catch (err) {
      setError("Erro ao criar funcionário")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateComissao = async (novaComissao: number) => {
    try {
      await updateConfiguracoes({
        id: configuracoes?.id,
        comissao_revenda: novaComissao
      })
      setSuccess("Comissão atualizada com sucesso!")
      loadData()
    } catch (err) {
      setError("Erro ao atualizar comissão")
    }
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

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
            <Users className="w-5 h-5 mr-3" />
            Funcionários
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <User className="w-5 h-5 mr-3" />
            Usuários
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="w-5 h-5 mr-3" />
            Relatórios
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="w-5 h-5 mr-3" />
            Financeiro
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
                <p className="text-gray-600">Gerenciamento completo do sistema</p>
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
                <span className="text-sm font-medium text-gray-700">Admin Master</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Alerts */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-700">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700">{success}</span>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Funcionários</p>
                    <p className="text-2xl font-bold text-gray-900">{funcionarios.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Usuários</p>
                    <p className="text-2xl font-bold text-gray-900">{usuarios.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Transações</p>
                    <p className="text-2xl font-bold text-gray-900">{transacoes.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Comissão</p>
                    <p className="text-2xl font-bold text-gray-900">{configuracoes?.comissao_revenda || 0}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="funcionarios" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:inline-flex">
              <TabsTrigger value="funcionarios">Funcionários</TabsTrigger>
              <TabsTrigger value="usuarios">Usuários</TabsTrigger>
              <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
              <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
              <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
            </TabsList>

            {/* Funcionários Tab */}
            <TabsContent value="funcionarios" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Funcionários</h2>
                  <p className="text-gray-600">Gerencie os funcionários do sistema</p>
                </div>
                <Dialog open={showNewFuncionario} onOpenChange={setShowNewFuncionario}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Funcionário
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Novo Funcionário</DialogTitle>
                      <DialogDescription>
                        Preencha os dados do novo funcionário
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateFuncionario} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo</Label>
                        <Input
                          id="nome"
                          value={newFuncionario.nome}
                          onChange={(e) => setNewFuncionario(prev => ({ ...prev, nome: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          value={newFuncionario.cpf}
                          onChange={(e) => {
                            const formatted = formatCPF(e.target.value)
                            setNewFuncionario(prev => ({ ...prev, cpf: formatted }))
                          }}
                          maxLength={14}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newFuncionario.email}
                          onChange={(e) => setNewFuncionario(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          value={newFuncionario.telefone}
                          onChange={(e) => {
                            const formatted = formatPhone(e.target.value)
                            setNewFuncionario(prev => ({ ...prev, telefone: formatted }))
                          }}
                          maxLength={15}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input
                          id="endereco"
                          value={newFuncionario.endereco}
                          onChange={(e) => setNewFuncionario(prev => ({ ...prev, endereco: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cargo">Cargo</Label>
                        <Select onValueChange={(value) => setNewFuncionario(prev => ({ ...prev, cargo: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o cargo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Gerente Geral">Gerente Geral</SelectItem>
                            <SelectItem value="Gerente de Cadastro">Gerente de Cadastro</SelectItem>
                            <SelectItem value="Financeiro">Financeiro</SelectItem>
                            <SelectItem value="Revendedor">Revendedor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="senha">Senha</Label>
                        <Input
                          id="senha"
                          type="password"
                          value={newFuncionario.senha}
                          onChange={(e) => setNewFuncionario(prev => ({ ...prev, senha: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Criando..." : "Criar Funcionário"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {funcionarios.map((funcionario) => (
                  <Card key={funcionario.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{funcionario.nome}</h3>
                            <p className="text-sm text-gray-600">{funcionario.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                {funcionario.cargo}
                              </Badge>
                              <Badge 
                                variant={funcionario.status === 'ativo' ? 'default' : 'secondary'}
                                className={funcionario.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                              >
                                {funcionario.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {funcionario.link_indicacao && (
                            <Button variant="outline" size="sm">
                              <LinkIcon className="w-4 h-4 mr-1" />
                              Link
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Usuários Tab */}
            <TabsContent value="usuarios" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Usuários</h2>
                <p className="text-gray-600">Lista de todos os usuários cadastrados</p>
              </div>

              <div className="grid gap-4">
                {usuarios.map((usuario) => (
                  <Card key={usuario.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{usuario.nome}</h3>
                            <p className="text-sm text-gray-600">{usuario.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                                {usuario.tipo_plano}
                              </Badge>
                              <Badge 
                                variant={usuario.status === 'ativo' ? 'default' : 'secondary'}
                                className={usuario.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                              >
                                {usuario.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Relatórios Tab */}
            <TabsContent value="relatorios" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Relatórios</h2>
                <p className="text-gray-600">Relatórios e estatísticas do sistema</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Usuários por Plano</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Individual', 'Familiar', 'Fit', 'Empresarial'].map(plano => {
                        const count = usuarios.filter(u => u.tipo_plano === plano).length
                        return (
                          <div key={plano} className="flex items-center justify-between">
                            <span className="text-gray-700">{plano}</span>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Funcionários por Cargo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Gerente Geral', 'Gerente de Cadastro', 'Financeiro', 'Revendedor'].map(cargo => {
                        const count = funcionarios.filter(f => f.cargo === cargo).length
                        return (
                          <div key={cargo} className="flex items-center justify-between">
                            <span className="text-gray-700">{cargo}</span>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Financeiro Tab */}
            <TabsContent value="financeiro" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Financeiro</h2>
                <p className="text-gray-600">Controle financeiro e transações</p>
              </div>

              <div className="grid gap-4">
                {transacoes.map((transacao) => (
                  <Card key={transacao.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            R$ {transacao.valor.toFixed(2)}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {transacao.usuarios?.nome || 'Usuário não encontrado'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(transacao.data).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <Badge 
                          variant={transacao.status_pagamento === 'pago' ? 'default' : 'secondary'}
                          className={
                            transacao.status_pagamento === 'pago' 
                              ? 'bg-green-100 text-green-800' 
                              : transacao.status_pagamento === 'pendente'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }
                        >
                          {transacao.status_pagamento}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Configurações Tab */}
            <TabsContent value="configuracoes" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Configurações</h2>
                <p className="text-gray-600">Configurações gerais do sistema</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Comissão de Revenda</CardTitle>
                  <CardDescription>
                    Defina a porcentagem de comissão para revendedores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="number"
                      placeholder="10"
                      defaultValue={configuracoes?.comissao_revenda || 10}
                      className="w-32"
                      onBlur={(e) => {
                        const valor = parseFloat(e.target.value)
                        if (valor && valor !== configuracoes?.comissao_revenda) {
                          handleUpdateComissao(valor)
                        }
                      }}
                    />
                    <span className="text-gray-600">%</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}