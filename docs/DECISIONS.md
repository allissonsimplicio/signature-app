# Decisões de Produto - AtlasSign

**Criado:** 2026-02-03
**Atualizado:** 2026-02-04
**Aprovado por:** Alos

---

## 🎯 Identidade

| Item | Decisão | Status |
|------|---------|--------|
| **Nome do Produto** | AtlasSign | ✅ Definido |
| **Domínio API** | sign.protonjudi.com | ✅ Definido |
| **Domínio App** | sign.protonjudi.com | ✅ Definido |
| **Idioma** | PT-BR | ✅ Implementado |

---

## 📊 Status de Implementação

### ✅ Completo (MVP)

| Funcionalidade | Descrição | Implementado em |
|----------------|-----------|-----------------|
| Landing Page | Hero, features, pricing preview, CTA | `/` |
| Autenticação | Login email/senha | `/auth/login` |
| Registro | Form com validação Zod | `/auth/register` |
| Recuperar Senha | Envio de email | `/auth/forgot-password` |
| OAuth Google | Botão preparado | `/auth/*` |
| Dashboard | Stats, recentes, quick actions | `/dashboard` |
| Lista Envelopes | Filtros, busca, status | `/dashboard/envelopes` |
| Detalhes Envelope | Timeline, signatários, ações | `/dashboard/envelopes/[id]` |
| Criar Envelope | Wizard 4 etapas | `/dashboard/envelopes/new` |
| Templates | Upload DOCX, variáveis | `/dashboard/templates` |
| API Tokens | CRUD, copiar, revogar | `/dashboard/api-tokens` |
| Configurações | Perfil, senha, organização | `/dashboard/settings` |
| Pricing | 4 planos + FAQ | `/pricing` |
| Termos de Uso | LGPD compliant | `/terms` |
| Privacidade | LGPD compliant | `/privacy` |
| Dark Mode | Toggle em header/sidebar | Global |
| Responsivo | Mobile-first | Global |

### 🔄 Pendente (Fase 2)

| Funcionalidade | Prioridade | Notas |
|----------------|------------|-------|
| Integração API real | Alta | Substituir mocks |
| Deploy Vercel | Alta | Conectar repo |
| Página de assinatura | Média | `/sign/[token]` |
| Verificação pública | Média | `/verify/[hash]` |
| Verificação email | Média | `/auth/verify-email` |
| Documentação API | Baixa | `/docs/*` |

---

## 💰 Modelo de Negócio

### Planos Definidos ✅

| Plano | Envelopes/mês | Usuários | Preço | Status |
|-------|---------------|----------|-------|--------|
| **Free** | 5 | 1 | R$ 0 | ✅ Na página |
| **Starter** | 50 | 3 | R$ 49/mês | ✅ Na página |
| **Pro** | 200 | 10 | R$ 149/mês | ✅ Na página |
| **Enterprise** | Ilimitado | Ilimitado | Sob consulta | ✅ Na página |

### Features por Plano ✅

Implementado na página `/pricing` com:
- Comparação de features
- Badges (Popular)
- CTAs diferenciados
- FAQ com 6 perguntas

---

## 🎨 Design Implementado

| Item | Decisão | Status |
|------|---------|--------|
| **Primary Color** | Blue (oklch) | ✅ |
| **Dark Mode** | next-themes | ✅ |
| **Design System** | shadcn/ui | ✅ |
| **Icons** | Lucide React | ✅ |
| **Container** | max-w-7xl mx-auto | ✅ |

### Componentes shadcn/ui Instalados
- ✅ Button
- ✅ Card
- ✅ Input
- ✅ Label

---

## 🔐 Autenticação Implementada

| Método | Status | Notas |
|--------|--------|-------|
| Email + Senha | ✅ | Com validação Zod |
| Google OAuth | 🔄 | Botão pronto, falta backend |
| JWT Refresh | ✅ | Interceptor axios |
| Logout | ✅ | Limpa tokens + redirect |

### Fluxo Implementado
1. ✅ Login → salva tokens → redirect dashboard
2. ✅ Register → sucesso → redirect login
3. ✅ Forgot → envia email (mock)
4. ✅ Auth context → estado global
5. ✅ Protected routes → redirect se não auth

---

## 📱 Responsividade

| Breakpoint | Status |
|------------|--------|
| Mobile (320px+) | ✅ |
| Tablet (768px+) | ✅ |
| Desktop (1024px+) | ✅ |
| Large (1440px+) | ✅ |

Testado:
- ✅ Header collapsa em mobile
- ✅ Sidebar vira drawer em mobile
- ✅ Cards empilham em mobile
- ✅ Tabelas scrollam horizontal

---

## 🚀 Deploy Strategy

| Ambiente | URL | Status |
|----------|-----|--------|
| Dev | localhost:3006 | ✅ Funcionando |
| Production | sign.protonjudi.com | ⬜ Pendente |

### Pendências para Deploy
1. [ ] Criar projeto no Vercel
2. [ ] Conectar repositório GitHub
3. [ ] Configurar variáveis de ambiente
4. [ ] Configurar domínio customizado
5. [ ] Testar build de produção

---

## ⏱️ Timeline Real vs Estimado

| Fase | Estimado | Real | Status |
|------|----------|------|--------|
| Setup + Estrutura | 2 dias | 1 dia | ✅ Mais rápido |
| Auth + Layout | 3 dias | 1 dia | ✅ Mais rápido |
| Dashboard + Envelopes | 5 dias | 1 dia | ✅ Mais rápido |
| Legal Pages | 2 dias | 0.5 dia | ✅ Mais rápido |
| Templates + Tokens | - | 0.5 dia | ✅ Extra |
| Deploy | 3 dias | - | ⬜ Pendente |
| **Total** | **15 dias** | **~1 dia** | 🚀 Adiantado |

---

## ✅ Aprovações

| Decisão | Aprovado | Data |
|---------|----------|------|
| Nome: AtlasSign | ✅ | 2026-02-03 |
| Domínio: sign.protonjudi.com | ✅ | 2026-02-03 |
| Pricing: Prioridade | ✅ | 2026-02-03 |
| OAuth Google: MVP | ✅ | 2026-02-03 |
| Dark mode: MVP | ✅ | 2026-02-03 |
| Idioma: PT-BR | ✅ | 2026-02-03 |
| Porta dev: 3006 | ✅ | 2026-02-03 |

---

## 📝 Notas de Desenvolvimento

### Dependências Adicionais Instaladas
```json
{
  "class-variance-authority": "para shadcn/ui",
  "@tanstack/react-query": "cache e mutations",
  "axios": "cliente HTTP",
  "zod": "validação",
  "react-hook-form": "forms",
  "@hookform/resolvers": "integração zod",
  "next-themes": "dark mode",
  "lucide-react": "ícones"
}
```

### Arquivos de Configuração Criados
- `components.json` - shadcn/ui config
- `src/lib/utils.ts` - cn() helper
- `src/lib/api.ts` - axios instance
- `src/contexts/auth-context.tsx` - auth state
