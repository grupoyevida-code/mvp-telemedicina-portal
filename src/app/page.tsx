import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Users, Zap, ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              YE VIDA
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Cadastrar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Sua saúde em
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {" "}primeiro lugar
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Conecte-se com profissionais de saúde qualificados através da nossa plataforma de telemedicina. 
            Cuidado médico de qualidade, quando e onde você precisar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-4">
                Começar Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/plans">
              <Button size="lg" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
                Ver Planos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Planos para Toda Família</h2>
            <p className="text-xl text-gray-600">Escolha o plano ideal para suas necessidades</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Plano Individual */}
            <Card className="border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-blue-600">Individual</CardTitle>
                <CardDescription>Perfeito para você</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">R$ 49</div>
                <div className="text-gray-600 mb-4">/mês</div>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>✓ Consultas ilimitadas</li>
                  <li>✓ Receitas digitais</li>
                  <li>✓ Suporte 24/7</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>

            {/* Plano Familiar */}
            <Card className="border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-green-600">Familiar</CardTitle>
                <CardDescription>Para toda família</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">R$ 129</div>
                <div className="text-gray-600 mb-4">/mês</div>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>✓ Até 6 dependentes</li>
                  <li>✓ Consultas ilimitadas</li>
                  <li>✓ Pediatria incluída</li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>

            {/* Plano Fit */}
            <Card className="border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-blue-600">Fit</CardTitle>
                <CardDescription>Foco em bem-estar</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">R$ 79</div>
                <div className="text-gray-600 mb-4">/mês</div>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>✓ Nutricionista</li>
                  <li>✓ Personal trainer</li>
                  <li>✓ Acompanhamento fitness</li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>

            {/* Plano Empresarial */}
            <Card className="border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-gray-700">Empresarial</CardTitle>
                <CardDescription>Para sua empresa</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">Sob</div>
                <div className="text-gray-600 mb-4">consulta</div>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>✓ Planos customizados</li>
                  <li>✓ Gestão de funcionários</li>
                  <li>✓ Relatórios detalhados</li>
                </ul>
                <Button className="w-full bg-gray-700 hover:bg-gray-800">
                  Solicitar Orçamento
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Por que escolher YE VIDA?</h2>
            <p className="text-xl text-gray-600">Tecnologia e cuidado humano em perfeita harmonia</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Segurança Total</h3>
              <p className="text-gray-600">Seus dados médicos protegidos com criptografia de ponta e conformidade com LGPD.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cuidado Humanizado</h3>
              <p className="text-gray-600">Profissionais qualificados e experientes prontos para cuidar da sua saúde.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapidez e Praticidade</h3>
              <p className="text-gray-600">Consultas em minutos, receitas digitais e acompanhamento contínuo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">YE VIDA</span>
              </div>
              <p className="text-gray-400">Cuidando da sua saúde com tecnologia e humanização.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Planos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Individual</li>
                <li>Familiar</li>
                <li>Fit</li>
                <li>Empresarial</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Central de Ajuda</li>
                <li>Fale Conosco</li>
                <li>Termos de Uso</li>
                <li>Privacidade</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>(11) 9999-9999</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contato@yevida.com.br</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 YE VIDA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}