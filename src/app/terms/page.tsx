import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Termos de Uso - AtlasSign",
  description: "Termos e condições de uso da plataforma AtlasSign.",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-2">
            Termos de Uso
          </h1>
          <p className="text-muted-foreground mb-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar a plataforma AtlasSign (&quot;Serviço&quot;), você concorda em cumprir e estar vinculado 
              a estes Termos de Uso (&quot;Termos&quot;). Se você não concordar com qualquer parte destes termos, 
              não poderá acessar o Serviço.
            </p>

            <h2>2. Descrição do Serviço</h2>
            <p>
              O AtlasSign é uma plataforma de assinatura digital que permite aos usuários:
            </p>
            <ul>
              <li>Enviar documentos para assinatura eletrônica</li>
              <li>Coletar assinaturas de múltiplos signatários</li>
              <li>Armazenar documentos assinados de forma segura</li>
              <li>Verificar a autenticidade de documentos assinados</li>
              <li>Integrar funcionalidades via API</li>
            </ul>

            <h2>3. Cadastro e Conta</h2>
            <p>
              Para utilizar o Serviço, você deve:
            </p>
            <ul>
              <li>Fornecer informações verdadeiras, precisas e completas durante o cadastro</li>
              <li>Manter suas credenciais de acesso em sigilo</li>
              <li>Notificar imediatamente qualquer uso não autorizado de sua conta</li>
              <li>Ser responsável por todas as atividades realizadas em sua conta</li>
            </ul>

            <h2>4. Uso Aceitável</h2>
            <p>
              Você concorda em não utilizar o Serviço para:
            </p>
            <ul>
              <li>Violar quaisquer leis ou regulamentos aplicáveis</li>
              <li>Transmitir conteúdo ilegal, difamatório ou prejudicial</li>
              <li>Interferir ou interromper a integridade do Serviço</li>
              <li>Tentar obter acesso não autorizado a sistemas ou dados</li>
              <li>Realizar atividades fraudulentas ou enganosas</li>
            </ul>

            <h2>5. Validade Jurídica das Assinaturas</h2>
            <p>
              O AtlasSign utiliza tecnologias de assinatura eletrônica em conformidade com:
            </p>
            <ul>
              <li>Medida Provisória nº 2.200-2/2001</li>
              <li>Lei nº 14.063/2020</li>
              <li>Regulamentações da ICP-Brasil (quando aplicável)</li>
            </ul>
            <p>
              O usuário é responsável por verificar se o tipo de assinatura utilizado é adequado 
              e juridicamente válido para seus documentos específicos.
            </p>

            <h2>6. Propriedade Intelectual</h2>
            <p>
              O Serviço e seu conteúdo original são de propriedade exclusiva da Atlas e estão 
              protegidos por leis de propriedade intelectual. Você não pode copiar, modificar, 
              distribuir ou criar obras derivadas sem autorização prévia.
            </p>

            <h2>7. Privacidade e Dados</h2>
            <p>
              O uso de suas informações pessoais é regido por nossa{" "}
              <a href="/privacy" className="text-primary hover:underline">Política de Privacidade</a>. 
              Ao usar o Serviço, você consente com a coleta e uso de informações conforme descrito 
              na Política de Privacidade.
            </p>

            <h2>8. Planos e Pagamentos</h2>
            <p>
              Alguns recursos do Serviço podem estar disponíveis mediante pagamento. 
              Ao assinar um plano pago, você concorda com:
            </p>
            <ul>
              <li>Os preços e condições de pagamento vigentes</li>
              <li>A cobrança recorrente conforme o ciclo de faturamento escolhido</li>
              <li>A política de cancelamento e reembolso</li>
            </ul>

            <h2>9. Limitação de Responsabilidade</h2>
            <p>
              O Serviço é fornecido &quot;como está&quot;, sem garantias de qualquer tipo. 
              A Atlas não será responsável por:
            </p>
            <ul>
              <li>Danos indiretos, incidentais ou consequenciais</li>
              <li>Perda de dados ou interrupção de negócios</li>
              <li>Conteúdo ou conduta de terceiros no Serviço</li>
            </ul>

            <h2>10. Modificações dos Termos</h2>
            <p>
              Reservamos o direito de modificar estes Termos a qualquer momento. 
              Notificaremos sobre mudanças significativas através do email cadastrado 
              ou aviso no Serviço. O uso continuado após as modificações constitui 
              aceitação dos novos termos.
            </p>

            <h2>11. Rescisão</h2>
            <p>
              Podemos suspender ou encerrar seu acesso ao Serviço imediatamente, 
              sem aviso prévio, por violação destes Termos. Você pode encerrar 
              sua conta a qualquer momento através das configurações da conta.
            </p>

            <h2>12. Lei Aplicável</h2>
            <p>
              Estes Termos são regidos pelas leis da República Federativa do Brasil. 
              Qualquer disputa será submetida ao foro da comarca de Fortaleza, Ceará.
            </p>

            <h2>13. Contato</h2>
            <p>
              Para questões sobre estes Termos, entre em contato conosco:
            </p>
            <ul>
              <li>Email: legal@protonjudi.com</li>
              <li>Website: protonjudi.com</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
