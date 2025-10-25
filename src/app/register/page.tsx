"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Mail, Lock, User, Phone, FileText, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signUp, createUsuario } from "@/lib/supabase"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    tipo_plano: "",
    password: "",
    confirmPassword: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSucess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      setIsLoading(false)
      return
    }

    if (!formData.tipo_plano) {
      setError("Selecione um plano")
      setIsLoading(false)
      return
    }

    try {
      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await signUp(
        formData.email, 
        formData.password,
        {
          nome: formData.nome,
          cpf: formData.cpf,
          telefone: formData.telefone,
          tipo_plano: formData.tipo_plano
        }
      )
      
      if (authError) {
        if (authError.message.includes('already registered')) {
          setError("Este email já está cadastrado")
        } else {
          setError("Erro ao criar conta. Tente novamente.")
        }
        setIsLoading(false)
        return
      }

      if (authData.user) {
        // Criar registro na tabela usuarios
        const { error: userError } = await createUsuario({
          nome: formData.nome,
          cpf: formData.cpf,
          email: formData.email,
          tipo_plano: formData.tipo_plano as any,
          status: 'ativo'
        })

        if (userError) {
          console.error('Erro ao criar usuário:', userError)
        }

        setSucess(true)
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-green-200 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cadastro Realizado!</h2>
            <p className="text-gray-600 mb-4">
              Sua conta foi criada com sucesso. Você será redirecionado para o login.
            </p>
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              YE VIDA
            </span>
          </Link>
          <p className="text-gray-600 mt-2">Cadastro de Cliente</p>
        </div>

        <Card className="border-blue-100 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Criar Conta</CardTitle>
            <CardDescription className="text-gray-600">
              Preencha seus dados para acessar nossos serviços de saúde
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-gray-700">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={handleChange}
                    className="pl-10 border-blue-200 focus:border-blue-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-gray-700">CPF</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="cpf"
                    name="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => {
                      const formatted = formatCPF(e.target.value)
                      setFormData(prev => ({ ...prev, cpf: formatted }))
                    }}
                    className="pl-10 border-blue-200 focus:border-blue-400"
                    maxLength={14}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 border-blue-200 focus:border-blue-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-gray-700">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="telefone"
                    name="telefone"
                    type="text"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value)
                      setFormData(prev => ({ ...prev, telefone: formatted }))
                    }}
                    className="pl-10 border-blue-200 focus:border-blue-400"
                    maxLength={15}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo_plano" className="text-gray-700">Plano Desejado</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, tipo_plano: value }))}>
                  <SelectTrigger className="border-blue-200 focus:border-blue-400">
                    <SelectValue placeholder="Selecione um plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Individual">Individual - R$ 49,90/mês</SelectItem>
                    <SelectItem value="Familiar">Familiar - R$ 129,00/mês</SelectItem>
                    <SelectItem value="Fit">Fit - R$ 79,00/mês</SelectItem>
                    <SelectItem value="Empresarial">Empresarial - Consulte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 border-blue-200 focus:border-blue-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 border-blue-200 focus:border-blue-400"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>

            <div className="text-center">
              <span className="text-gray-600">Já tem uma conta? </span>
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Faça login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}