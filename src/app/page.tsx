import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { 
  FileSignature, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle, 
  ArrowRight,
  FileText,
  Lock,
  Globe
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm">
                <span className="text-primary font-medium">Novo</span>
                <span className="mx-2 text-muted-foreground">|</span>
                <span className="text-muted-foreground">Assinatura PAdES ICP-Brasil</span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
                Assinatura digital{" "}
                <span className="text-primary">segura</span> e{" "}
                <span className="text-primary">juridicamente válida</span>
              </h1>
              
              <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
                Assine documentos online de qualquer lugar. Conformidade total com a legislação brasileira, 
                integração via API e SDK para sua aplicação.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/auth/register">
                    Começar Grátis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/docs">
                    Ver Documentação
                  </Link>
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                ✓ 5 documentos grátis por mês &nbsp; ✓ Sem cartão de crédito &nbsp; ✓ Cancele quando quiser
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Por que escolher o AtlasSign?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tudo que você precisa para digitalizar seus processos de assinatura de documentos.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Validade Jurídica</CardTitle>
                  <CardDescription>
                    Assinaturas com certificado digital ICP-Brasil e conformidade com a MP 2.200-2.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Rápido e Fácil</CardTitle>
                  <CardDescription>
                    Envie documentos e colete assinaturas em minutos, não dias.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader>
                  <Lock className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Segurança Total</CardTitle>
                  <CardDescription>
                    Criptografia de ponta, armazenamento seguro e trilha de auditoria completa.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader>
                  <Globe className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>API & SDK</CardTitle>
                  <CardDescription>
                    Integre assinatura digital em qualquer aplicação com nossa API REST e SDK TypeScript.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Templates</CardTitle>
                  <CardDescription>
                    Crie templates DOCX com variáveis e gere documentos automaticamente.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Multi-signatários</CardTitle>
                  <CardDescription>
                    Defina ordem de assinatura, requisitos de autenticação e muito mais.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 md:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Como funciona
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Três passos simples para assinar seus documentos digitalmente.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold">Envie o documento</h3>
                <p className="text-muted-foreground">
                  Faça upload do PDF ou use um template DOCX com suas variáveis.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold">Adicione signatários</h3>
                <p className="text-muted-foreground">
                  Defina quem precisa assinar e configure os requisitos de autenticação.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold">Colete assinaturas</h3>
                <p className="text-muted-foreground">
                  Os signatários recebem notificação e assinam online. Você acompanha tudo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Planos para todos os tamanhos
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comece grátis e escale conforme sua necessidade.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {/* Free */}
              <Card>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>Para começar</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">R$ 0</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      5 envelopes/mês
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      1 usuário
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Notificação por email
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/auth/register">Começar Grátis</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Pro */}
              <Card className="border-primary relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Popular
                  </span>
                </div>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>Para times</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">R$ 149</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      200 envelopes/mês
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      10 usuários
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      API & Webhooks
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Custom branding
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <Link href="/auth/register">Começar Teste</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise */}
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>Para grandes empresas</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">Sob consulta</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Envelopes ilimitados
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Usuários ilimitados
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      SLA garantido
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Suporte dedicado
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/contact">Falar com Vendas</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-8">
              <Link href="/pricing" className="text-primary hover:underline">
                Ver todos os planos e recursos →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Pronto para digitalizar suas assinaturas?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-lg">
              Junte-se a milhares de empresas que já confiam no AtlasSign para seus documentos.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth/register">
                Criar Conta Grátis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
