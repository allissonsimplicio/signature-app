import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Política de Privacidade - AtlasSign",
  description: "Política de privacidade e proteção de dados da plataforma AtlasSign.",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-2">
            Política de Privacidade
          </h1>
          <p className="text-muted-foreground mb-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="lead">
              A Atlas (&quot;nós&quot;, &quot;nosso&quot;) opera a plataforma AtlasSign. 
              Esta página informa sobre nossas políticas relativas à coleta, uso e divulgação 
              de dados pessoais quando você usa nosso Serviço, em conformidade com a Lei Geral 
              de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>

            <h2>1. Controlador dos Dados</h2>
            <p>
              A Atlas é a controladora dos dados pessoais coletados através da plataforma AtlasSign.
            </p>
            <ul>
              <li><strong>Razão Social:</strong> Atlas Tecnologia LTDA</li>
              <li><strong>Email do DPO:</strong> dpo@protonjudi.com</li>
              <li><strong>Endereço:</strong> Fortaleza, CE - Brasil</li>
            </ul>

            <h2>2. Dados que Coletamos</h2>
            
            <h3>2.1 Dados fornecidos diretamente por você:</h3>
            <ul>
              <li><strong>Dados de cadastro:</strong> nome, email, telefone, CPF/CNPJ</li>
              <li><strong>Dados de pagamento:</strong> informações de cartão de crédito (processadas por terceiros)</li>
              <li><strong>Documentos:</strong> arquivos enviados para assinatura</li>
              <li><strong>Assinaturas:</strong> imagens de assinatura, dados biométricos (quando aplicável)</li>
            </ul>

            <h3>2.2 Dados coletados automaticamente:</h3>
            <ul>
              <li><strong>Dados de uso:</strong> páginas visitadas, ações realizadas</li>
              <li><strong>Dados técnicos:</strong> endereço IP, tipo de navegador, dispositivo</li>
              <li><strong>Geolocalização:</strong> localização aproximada (quando autorizado)</li>
              <li><strong>Cookies:</strong> identificadores de sessão e preferências</li>
            </ul>

            <h2>3. Finalidades do Tratamento</h2>
            <p>Utilizamos seus dados pessoais para:</p>
            <ul>
              <li>Fornecer e manter o Serviço</li>
              <li>Processar assinaturas e verificar identidade</li>
              <li>Enviar notificações sobre documentos</li>
              <li>Processar pagamentos e faturamento</li>
              <li>Fornecer suporte ao cliente</li>
              <li>Melhorar nossos serviços</li>
              <li>Cumprir obrigações legais</li>
              <li>Detectar e prevenir fraudes</li>
            </ul>

            <h2>4. Base Legal para o Tratamento</h2>
            <p>O tratamento dos seus dados pessoais é fundamentado nas seguintes bases legais:</p>
            <ul>
              <li><strong>Execução de contrato:</strong> necessário para prestar o Serviço contratado</li>
              <li><strong>Consentimento:</strong> para comunicações de marketing e cookies não essenciais</li>
              <li><strong>Obrigação legal:</strong> para cumprimento de legislação aplicável</li>
              <li><strong>Legítimo interesse:</strong> para melhorias no Serviço e segurança</li>
            </ul>

            <h2>5. Compartilhamento de Dados</h2>
            <p>Podemos compartilhar seus dados com:</p>
            <ul>
              <li><strong>Signatários:</strong> informações necessárias para o processo de assinatura</li>
              <li><strong>Processadores de pagamento:</strong> para processar transações</li>
              <li><strong>Provedores de infraestrutura:</strong> armazenamento em nuvem e CDN</li>
              <li><strong>Autoridades:</strong> quando exigido por lei ou ordem judicial</li>
            </ul>
            <p>
              Não vendemos seus dados pessoais a terceiros para fins de marketing.
            </p>

            <h2>6. Transferência Internacional</h2>
            <p>
              Seus dados podem ser transferidos e processados em servidores localizados fora do Brasil. 
              Quando isso ocorrer, garantimos que:
            </p>
            <ul>
              <li>O país de destino oferece nível adequado de proteção de dados, ou</li>
              <li>Utilizamos cláusulas contratuais padrão aprovadas pela ANPD</li>
            </ul>

            <h2>7. Retenção de Dados</h2>
            <p>Retemos seus dados pessoais pelo tempo necessário para:</p>
            <ul>
              <li>Prestar o Serviço enquanto sua conta estiver ativa</li>
              <li>Cumprir obrigações legais (mínimo 5 anos para documentos fiscais)</li>
              <li>Resolver disputas e fazer cumprir nossos acordos</li>
            </ul>
            <p>
              Documentos assinados são retidos por no mínimo 10 anos para garantir 
              verificabilidade jurídica.
            </p>

            <h2>8. Seus Direitos (LGPD Art. 18)</h2>
            <p>Você tem direito a:</p>
            <ul>
              <li><strong>Confirmação:</strong> saber se tratamos seus dados</li>
              <li><strong>Acesso:</strong> obter cópia dos seus dados</li>
              <li><strong>Correção:</strong> corrigir dados incompletos ou incorretos</li>
              <li><strong>Anonimização:</strong> solicitar anonimização de dados desnecessários</li>
              <li><strong>Portabilidade:</strong> receber seus dados em formato estruturado</li>
              <li><strong>Eliminação:</strong> solicitar exclusão de dados (com ressalvas legais)</li>
              <li><strong>Informação:</strong> saber com quem compartilhamos seus dados</li>
              <li><strong>Revogação:</strong> retirar consentimento a qualquer momento</li>
              <li><strong>Oposição:</strong> se opor ao tratamento com base em legítimo interesse</li>
            </ul>
            <p>
              Para exercer seus direitos, entre em contato através do email: <strong>dpo@protonjudi.com</strong>
            </p>

            <h2>9. Segurança dos Dados</h2>
            <p>Implementamos medidas técnicas e organizacionais para proteger seus dados:</p>
            <ul>
              <li>Criptografia em trânsito (TLS 1.3) e em repouso (AES-256)</li>
              <li>Controle de acesso baseado em função</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backups regulares e plano de recuperação</li>
              <li>Treinamento de funcionários em proteção de dados</li>
            </ul>

            <h2>10. Cookies</h2>
            <p>Utilizamos cookies para:</p>
            <ul>
              <li><strong>Essenciais:</strong> funcionamento básico do site</li>
              <li><strong>Funcionais:</strong> lembrar suas preferências</li>
              <li><strong>Analíticos:</strong> entender como você usa o Serviço</li>
            </ul>
            <p>
              Você pode gerenciar cookies nas configurações do seu navegador. 
              Desabilitar cookies essenciais pode afetar o funcionamento do Serviço.
            </p>

            <h2>11. Menores de Idade</h2>
            <p>
              O Serviço não é direcionado a menores de 18 anos. Não coletamos 
              intencionalmente dados de menores. Se tomarmos conhecimento de que 
              coletamos dados de um menor, tomaremos medidas para excluí-los.
            </p>

            <h2>12. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política periodicamente. Notificaremos sobre 
              mudanças significativas através do email cadastrado ou aviso no Serviço. 
              Recomendamos revisar esta página regularmente.
            </p>

            <h2>13. Contato e Reclamações</h2>
            <p>
              Para dúvidas sobre esta Política ou exercer seus direitos:
            </p>
            <ul>
              <li><strong>DPO:</strong> dpo@protonjudi.com</li>
              <li><strong>Suporte:</strong> contato@protonjudi.com</li>
            </ul>
            <p>
              Você também pode apresentar reclamação à Autoridade Nacional de 
              Proteção de Dados (ANPD) através do site: <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">www.gov.br/anpd</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
