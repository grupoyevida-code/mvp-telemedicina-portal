"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Heart, Mail, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn, supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      const { data, error: authError } = await signIn(formData.email, formData.password)
      
      if (authError) {
        setError("Email ou senha incorretos")
        setIsLoading(false)
        return
      }

      if (data.user) {
        // Verificar se é funcionário
        const { data: funcionario } = await supabase
          .from('funcionarios')
          .select('*')
          .eq('email', formData.email)
          .single()

        if (funcionario) {
          // Redirecionar baseado no cargo
          if (funcionario.cargo === 'Gerente Geral') {
            router.push("/admin")
          } else {
            router.push("/dashboard")
          }
        } else {
          // Cliente normal
          router.push("/dashboard")
        }
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.")
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              YE VIDA
            </span>
          </div>
          <p className="text-gray-600 mt-2">Sistema Administrativo</p>
        </div>

        <Card className="border-blue-100 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Acesso ao Sistema</CardTitle>
            <CardDescription className="text-gray-600">
              Entre com suas credenciais para acessar o sistema
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Lembrar de mim
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                  Esqueci minha senha
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="relative">
              <Separator className="my-4" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">ou</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-gray-600">Não tem uma conta? </span>
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Cadastre-se
              </Link>
            </div>

            {/* Demo Users */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-800 mb-2">Acesso Admin Master:</p>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Email:</strong> grupoyevida@gmail.com</p>
                <p><strong>Senha:</strong> 289982Aj@</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}