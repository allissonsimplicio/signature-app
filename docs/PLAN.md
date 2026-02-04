# AtlasSign - Plano de Desenvolvimento

**Última atualização:** 2026-02-04

## 📋 Visão Geral

Frontend da API de Assinatura Digital da Atlas.

| Item | Valor |
|------|-------|
| **Nome** | AtlasSign |
| **Domínio** | sign.protonjudi.com |
| **Porta Dev** | 3006 (API usa 3000) |
| **Repo** | github.com/allissonsimplicio/signature-app |

---

## 🏗️ Stack Implementada

| Componente | Tecnologia | Status |
|------------|------------|--------|
| Framework | Next.js 14 (App Router) | ✅ |
| UI | Tailwind CSS + shadcn/ui | ✅ |
| State | TanStack Query | ✅ |
| Forms | React Hook Form + Zod | ✅ |
| Auth | JWT (via API) | ✅ |
| Dark Mode | next-themes | ✅ |
| Icons | Lucide React | ✅ |

---

## 📊 Status das Páginas

### ✅ Páginas Públicas (4/4)
| Página | Rota | Status |
|--------|------|--------|
| Landing Page | `/` | ✅ Completo |
| Pricing | `/pricing` | ✅ Completo (4 planos + FAQ) |
| Termos de Uso | `/terms` | ✅ Completo (LGPD) |
| Política de Privacidade | `/privacy` | ✅ Completo (LGPD) |

### ✅ Autenticação (3/3)
| Página | Rota | Status |
|--------|------|--------|
| Login | `/auth/login` | ✅ Email + Google OAuth |
| Registro | `/auth/register` | ✅ Form + validação |
| Recuperar Senha | `/auth/forgot-password` | ✅ Completo |

### ✅ Dashboard (7/7)
| Página | Rota | Status |
|--------|------|--------|
| Overview | `/dashboard` | ✅ Stats + recentes |
| Lista Envelopes | `/dashboard/envelopes` | ✅ Filtros + busca |
| Detalhes Envelope | `/dashboard/envelopes/[id]` | ✅ Timeline + ações |
| Criar Envelope | `/dashboard/envelopes/new` | ✅ Wizard 4 etapas |
| Templates | `/dashboard/templates` | ✅ Upload + grid |
| API Tokens | `/dashboard/api-tokens` | ✅ CRUD completo |
| Configurações | `/dashboard/settings` | ✅ Perfil + senha + org |

### ⬜ Pendentes (para Fase 2)
| Página | Rota | Status |
|--------|------|--------|
| Verificar Email | `/auth/verify-email` | ⬜ Pendente |
| Página de Assinatura | `/sign/[token]` | ⬜ Pendente |
| Verificação Pública | `/verify/[hash]` | ⬜ Pendente |
| Documentação | `/docs/*` | ⬜ Pendente |
| Contato | `/contact` | ⬜ Pendente |

---

## 🎯 Funcionalidades Implementadas

### Landing Page
- ✅ Hero section com CTA
- ✅ Features/benefícios (6 cards)
- ✅ Como funciona (3 steps)
- ✅ Preview de pricing
- ✅ CTA final
- ✅ Header responsivo
- ✅ Footer com links

### Dashboard
- ✅ Sidebar navegação
- ✅ Stats cards (total, pendentes, completos, cancelados)
- ✅ Envelopes recentes
- ✅ Quick actions
- ✅ User menu com logout
- ✅ Toggle dark mode

### Envelopes
- ✅ Lista com filtros por status
- ✅ Busca por nome
- ✅ Status visual colorido
- ✅ Contagem de assinaturas
- ✅ Detalhes completos
- ✅ Timeline de atividades
- ✅ Ações (ativar, cancelar, reenviar)

### Criar Envelope (Wizard)
- ✅ Step 1: Info básica (nome, descrição, prazo)
- ✅ Step 2: Upload de documentos
- ✅ Step 3: Adicionar signatários
- ✅ Step 4: Revisar e enviar
- ✅ Progress indicator
- ✅ Validação por step

### Templates
- ✅ Grid de templates
- ✅ Upload DOCX
- ✅ Exibição de variáveis extraídas
- ✅ Categorias e tags
- ✅ Stats de uso
- ✅ Delete

### API Tokens
- ✅ Lista de tokens
- ✅ Criar com nome e expiração
- ✅ Token mostrado apenas 1x
- ✅ Copiar para clipboard
- ✅ Revogar token
- ✅ Delete token

### Configurações
- ✅ Editar perfil (nome, email)
- ✅ Alterar senha
- ✅ Configurações da organização
- ✅ Ver plano atual
- ✅ Danger zone (excluir conta)

---

## 📈 Progresso Geral

```
Páginas Implementadas: 14/19 (74%)
███████████████░░░░░ 

Funcionalidades MVP: 95%
███████████████████░
```

### Por Fase

| Fase | Planejado | Status |
|------|-----------|--------|
| Setup + Estrutura | 2 dias | ✅ Completo |
| Auth + Layout | 3 dias | ✅ Completo |
| Dashboard + Envelopes | 5 dias | ✅ Completo |
| Legal Pages | 2 dias | ✅ Completo |
| Templates + Tokens | - | ✅ Completo |
| Polish + Deploy | 3 dias | 🔄 Pendente |

---

## 🔜 Próximos Passos

### Imediato (Prioridade Alta)
1. [ ] Integrar com API real (substituir mocks)
2. [ ] Configurar variáveis de ambiente (.env)
3. [ ] Deploy no Vercel
4. [ ] Testar fluxo completo end-to-end

### Curto Prazo (Fase 2)
1. [ ] Página de assinatura pública (`/sign/[token]`)
2. [ ] Verificação de documento (`/verify/[hash]`)
3. [ ] Verificação de email
4. [ ] Notificações toast
5. [ ] Loading skeletons

### Médio Prazo
1. [ ] Documentação da API (`/docs`)
2. [ ] Preview de PDF inline
3. [ ] Drag & drop para upload
4. [ ] Webhooks configuration UI
5. [ ] Analytics (Vercel/Posthog)

---

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
cd /home/alos/signature-app
npm run dev          # http://localhost:3006

# Build
npm run build

# Lint
npm run lint

# Push para GitHub
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_ed25519_gh_auto -o IdentitiesOnly=yes" git push origin main
```

---

## 📁 Estrutura de Pastas

```
signature-app/
├── docs/
│   ├── PLAN.md              # Este arquivo
│   └── DECISIONS.md         # Decisões de produto
├── src/
│   ├── app/
│   │   ├── auth/            # Login, register, forgot
│   │   ├── dashboard/       # Área logada
│   │   ├── pricing/         # Planos
│   │   ├── terms/           # Termos
│   │   ├── privacy/         # Privacidade
│   │   ├── layout.tsx       # Layout root
│   │   ├── page.tsx         # Landing page
│   │   └── globals.css      # Estilos globais
│   ├── components/
│   │   ├── layout/          # Header, Footer, DashboardLayout
│   │   ├── ui/              # shadcn components
│   │   └── theme-provider.tsx
│   ├── contexts/
│   │   └── auth-context.tsx # Estado de autenticação
│   └── lib/
│       ├── api.ts           # Cliente axios + interceptors
│       └── utils.ts         # cn() helper
├── public/
├── package.json
└── README.md
```
