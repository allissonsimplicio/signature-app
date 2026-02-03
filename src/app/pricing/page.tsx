import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckCircle, X, Zap } from "lucide-react"

export const metadata = {
  title: "Planos e Preços - AtlasSign",
  description: "Escolha o plano ideal para sua empresa. Comece grátis e escale conforme sua necessidade.",
}

const plans = [
  {
    name: "Free",
    description: "Para começar e testar",
    price: "R$ 0",
    period: "/mês",
    highlight: false,
    cta: "Começar Grátis",
    ctaVariant: "outline" as const,
    features: [
      { name: "5 envelopes por mês", included: true },
      { name: "1 usuário", included: true },
      { name: "Notificação por email", included: true },
      { name: "1 template", included: true },
      { name: "Armazenamento 100MB", included: true },
      { name: "Suporte por email", included: true },
      { name: "Notificação SMS/WhatsApp", included: false },
      { name: "API access", included: false },
      { name: "Webhooks", included: false },
      { name: "Custom branding", included: false },
    ],
  },
  {
    name: "Starter",
    description: "Para pequenas empresas",
    price: "R$ 49",
    period: "/mês",
    highlight: false,
    cta: "Começar Teste Grátis",
    ctaVariant: "outline" as const,
    features: [
      { name: "50 envelopes por mês", included: true },
      { name: "3 usuários", included: true },
      { name: "Notificação por email", included: true },
      { name: "5 templates", included: true },
      { name: "Armazenamento 1GB", included: true },
      { name: "Suporte por email", included: true },
      { name: "Notificação SMS/WhatsApp", included: true },
      { name: "API access (rate limited)", included: true },
      { name: "Webhooks", included: false },
      { name: "Custom branding", included: false },
    ],
  },
  {
    name: "Pro",
    description: "Para times em crescimento",
    price: "R$ 149",
    period: "/mês",
    highlight: true,
    cta: "Começar Teste Grátis",
    ctaVariant: "default" as const,
    features: [
      { name: "200 envelopes por mês", included: true },
      { name: "10 usuários", included: true },
      { name: "Notificação por email", included: true },
      { name: "Templates ilimitados", included: true },
      { name: "Armazenamento 10GB", included: true },
      { name: "Suporte prioritário", included: true },
      { name: "Notificação SMS/WhatsApp", included: true },
      { name: "API access (full)", included: true },
      { name: "Webhooks", included: true },
      { name: "Custom branding (logo)", included: true },
    ],
  },
  {
    name: "Enterprise",
    description: "Para grandes organizações",
    price: "Sob consulta",
    period: "",
    highlight: false,
    cta: "Falar com Vendas",
    ctaVariant: "outline" as const,
    features: [
      { name: "Envelopes ilimitados", included: true },
      { name: "Usuários ilimitados", included: true },
      { name: "Notificação por email", included: true },
      { name: "Templates ilimitados", included: true },
      { name: "Armazenamento ilimitado", included: true },
      { name: "Suporte dedicado 24/7", included: true },
      { name: "Notificação SMS/WhatsApp", included: true },
      { name: "API access (full)", included: true },
      { name: "Webhooks", included: true },
      { name: "Custom branding (completo)", included: true },
      { name: "SLA garantido", included: true },
      { name: "On-premise option", included: true },
      { name: "Treinamento personalizado", included: true },
    ],
  },
]

const faqs = [
  {
    question: "Posso trocar de plano a qualquer momento?",
    answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor imediatamente e o valor é calculado proporcionalmente.",
  },
  {
    question: "O que acontece se eu ultrapassar o limite de envelopes?",
    answer: "Você receberá uma notificação quando estiver próximo do limite. Se ultrapassar, poderá fazer upgrade do plano ou aguardar o próximo ciclo de faturamento.",
  },
  {
    question: "Existe período de teste?",
    answer: "Sim! Todos os planos pagos incluem 14 dias de teste grátis, sem necessidade de cartão de crédito.",
  },
  {
    question: "Como funciona o cancelamento?",
    answer: "Você pode cancelar a qualquer momento através do painel. Não há multas ou taxas de cancelamento. Seu acesso continua até o fim do período pago.",
  },
  {
    question: "As assinaturas têm validade jurídica?",
    answer: "Sim! O AtlasSign utiliza tecnologia de assinatura eletrônica em conformidade com a MP 2.200-2/2001 e Lei 14.063/2020, garantindo validade jurídica para seus documentos.",
  },
  {
    question: "Vocês oferecem desconto para pagamento anual?",
    answer: "Sim! Oferecemos 20% de desconto para assinaturas anuais. Entre em contato com nosso time comercial para mais detalhes.",
  },
]

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
              Planos para todos os tamanhos
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comece grátis e escale conforme sua necessidade. Sem surpresas, sem taxas escondidas.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {plans.map((plan) => (
                <Card 
                  key={plan.name}
                  className={`relative flex flex-col ${plan.highlight ? "border-primary shadow-lg" : ""}`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                        <Zap className="h-3 w-3" />
                        Mais Popular
                      </span>
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-start gap-2">
                          {feature.included ? (
                            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? "" : "text-muted-foreground"}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={plan.ctaVariant}
                      asChild
                    >
                      <Link href={plan.name === "Enterprise" ? "/contact" : "/auth/register"}>
                        {plan.cta}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tire suas dúvidas sobre nossos planos e preços
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {faqs.map((faq) => (
                <Card key={faq.question}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Nossa equipe está pronta para ajudar você a escolher o melhor plano para sua empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/register">Começar Grátis</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Falar com Vendas</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
