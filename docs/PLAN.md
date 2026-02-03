# AtlasSign - Plano de Desenvolvimento

## 📋 Visão Geral

Frontend da API de Assinatura Digital da Atlas.
**Nome:** AtlasSign
**Domínio:** sign.protonjudi.com
- **Home:** Landing page institucional
- **Dashboard:** Área do usuário para gerenciar assinaturas
- **Docs:** Documentação da API e SDK
- **Legal:** Termos de uso e política de privacidade

---

## 🏗️ Stack Proposta

| Componente | Tecnologia | Justificativa |
|------------|------------|---------------|
| Framework | **Next.js 14** (App Router) | SSR, API routes, Vercel native |
| UI | **Tailwind CSS** + **shadcn/ui** | Consistente com lgpd-flow |
| State | **TanStack Query** | Cache, mutations, otimista |
| Forms | **React Hook Form** + **Zod** | Validação type-safe |
| Auth | **JWT** (via API) | Consistente com backend |
| Analytics | **Vercel Analytics** | Gratuito, GDPR compliant |

---

## 📁 Estrutura de Páginas

```
/                           # Home - Landing page
├── /login                  # Login
├── /register               # Cadastro
├── /forgot-password        # Recuperar senha
├── /verify-email           # Verificar email
│
├── /dashboard              # Dashboard principal
│   ├── /envelopes          # Lista de envelopes
│   ├── /envelopes/[id]     # Detalhes do envelope
│   ├── /envelopes/new      # Criar envelope
│   ├── /templates          # Templates de documento
│   ├── /api-tokens         # Gerenciar API tokens
│   ├── /settings           # Configurações da conta
│   └── /organization       # Configurações da organização
│
├── /sign/[token]           # Página de assinatura (pública)
├── /verify/[hash]          # Verificação de documento (pública)
│
├── /docs                   # Documentação
│   ├── /api                # API Reference
│   ├── /sdk                # SDK Guide
│   └── /webhooks           # Webhooks
│
├── /pricing                # Planos e preços
├── /terms                  # Termos de uso
├── /privacy                # Política de privacidade
└── /contact                # Contato
```

---

## 🎨 Design System

### Cores (sugestão)
```css
--primary: #2563eb;      /* Blue 600 - Confiança */
--secondary: #0f172a;    /* Slate 900 - Profissional */
--accent: #10b981;       /* Emerald 500 - Sucesso */
--warning: #f59e0b;      /* Amber 500 */
--error: #ef4444;        /* Red 500 */
```

### Componentes Base (shadcn/ui)
- Button, Input, Select, Checkbox
- Card, Dialog, Sheet, Drawer
- Table, DataTable com paginação
- Toast, Alert, Badge
- Tabs, Accordion
- Form com validação

---

## 📄 Páginas Detalhadas

### Home (Landing Page)
- Hero section com CTA
- Features/benefícios
- Como funciona (3 steps)
- Integrações (SDK, API)
- Testimonials/cases
- Pricing preview
- CTA final

### Dashboard
- Overview (stats)
- Envelopes recentes
- Ações rápidas
- Notificações

### Envelopes
- Lista com filtros
- Status visual (draft, running, completed)
- Ações (ver, editar, cancelar)
- Bulk actions

### Criar Envelope
- Wizard multi-step:
  1. Info básica (nome, deadline)
  2. Upload documentos
  3. Adicionar signatários
  4. Configurar campos
  5. Revisar e ativar

### API Tokens
- Lista de tokens
- Criar novo token
- Revogar token
- Mostrar token apenas 1x

### Termos de Uso
- Estrutura legal completa
- Versão e data
- Sumário navegável

### Política de Privacidade
- LGPD compliant
- Dados coletados
- Uso dos dados
- Direitos do titular
- Contato DPO

---

## 🔐 Autenticação

### Fluxos
1. **Login** - Email + senha → JWT
2. **Register** - Criar conta → Email verification
3. **Forgot Password** - Reset via email
4. **OAuth** (futuro) - Google, Microsoft

### Proteção de Rotas
- Middleware Next.js para /dashboard/*
- Refresh token automático
- Redirect para login se expirado

---

## 📊 Features por Fase

### Fase 1 - MVP (2-3 semanas)
- [ ] Setup Next.js + Tailwind + shadcn
- [ ] Home page básica
- [ ] Login/Register/Forgot
- [ ] Dashboard básico
- [ ] Lista de envelopes
- [ ] Criar envelope simples
- [ ] API tokens
- [ ] Termos e Privacidade

### Fase 2 - Melhorias (2 semanas)
- [ ] Wizard de criação completo
- [ ] Upload de documentos
- [ ] Preview de PDF
- [ ] Configuração de campos visuais
- [ ] Templates de documento

### Fase 3 - Polish (1 semana)
- [ ] Página de documentação
- [ ] Pricing page
- [ ] SEO otimização
- [ ] Analytics
- [ ] Performance tuning

### Fase 4 - Avançado (futuro)
- [ ] OAuth integrations
- [ ] Dark mode
- [ ] i18n (PT/EN)
- [ ] Notificações push
- [ ] Mobile responsive avançado

---

## 💰 Monetização (sugestão)

### Planos
| Plano | Envelopes/mês | Usuários | Preço |
|-------|---------------|----------|-------|
| Free | 5 | 1 | R$ 0 |
| Starter | 50 | 3 | R$ 49 |
| Pro | 200 | 10 | R$ 149 |
| Enterprise | Ilimitado | Ilimitado | Sob consulta |

### Features por plano
- **Free:** Assinatura básica, email notifications
- **Starter:** Templates, SMS notifications, API access
- **Pro:** Webhooks, custom branding, priority support
- **Enterprise:** SLA, dedicated support, on-premise option

---

## ⏱️ Estimativa de Tempo

| Fase | Duração | Entregável |
|------|---------|------------|
| Setup + Estrutura | 2 dias | Projeto configurado |
| Auth + Layout | 3 dias | Login funcionando |
| Dashboard + Envelopes | 5 dias | CRUD completo |
| Legal Pages | 2 dias | Termos + Privacidade |
| Polish + Deploy | 3 dias | Produção |
| **Total MVP** | **~15 dias** | |

---

## 🚀 Deploy

- **Vercel** - Deploy automático via GitHub
- **Domínio:** app.protonjudi.com
- **Preview:** Automático por PR

---

## ❓ Decisões Pendentes

1. **Nome do produto?** 
   - ProtonSign? AtlasSign? SignFlow?

2. **Domínio do app?**
   - app.protonjudi.com
   - sign.protonjudi.com/app
   - outro?

3. **Planos de pricing são prioridade?**
   - Implementar agora ou depois?
   - Integração com pagamento (Stripe)?

4. **OAuth logo no MVP?**
   - Google/Microsoft login?

5. **Dark mode no MVP?**
   - Ou deixar para depois?

6. **Idiomas?**
   - Só PT-BR?
   - PT-BR + EN desde o início?
