# Decisões de Produto - AtlasSign

Data: 2026-02-03
Aprovado por: Alos

---

## 🎯 Identidade

| Item | Decisão |
|------|---------|
| **Nome do Produto** | AtlasSign |
| **Domínio API** | sign.protonjudi.com |
| **Domínio App** | sign.protonjudi.com (mesmo domínio, rotas separadas) |
| **Idioma** | PT-BR (por enquanto) |

---

## 🛠️ Funcionalidades MVP

### Prioridade Alta ✅
- [x] Autenticação email/senha
- [x] OAuth com Google
- [x] Dashboard de envelopes
- [x] Criação de envelopes
- [x] Gerenciamento de API tokens
- [x] Página de pricing/planos
- [x] Dark mode
- [x] Termos de uso
- [x] Política de privacidade

### Prioridade Média (Fase 2)
- [ ] Templates de documento
- [ ] Webhooks configuration UI
- [ ] Notificações in-app
- [ ] Documentação integrada

### Futuro
- [ ] Multi-idioma (EN)
- [ ] White-label customization
- [ ] Mobile app (React Native)

---

## 💰 Modelo de Negócio

### Planos Definidos

| Plano | Envelopes/mês | Usuários | Preço |
|-------|---------------|----------|-------|
| **Free** | 5 | 1 | R$ 0 |
| **Starter** | 50 | 3 | R$ 49/mês |
| **Pro** | 200 | 10 | R$ 149/mês |
| **Enterprise** | Ilimitado | Ilimitado | Sob consulta |

### Features por Plano

**Free:**
- Assinatura eletrônica básica
- Notificação por email
- 1 template

**Starter:**
- Tudo do Free +
- Notificação SMS/WhatsApp
- 5 templates
- API access (rate limited)
- Suporte por email

**Pro:**
- Tudo do Starter +
- Templates ilimitados
- Webhooks
- Custom branding (logo)
- API full access
- Suporte prioritário

**Enterprise:**
- Tudo do Pro +
- SLA garantido
- Dedicated support
- Custom integrations
- On-premise option
- Treinamento

---

## 🎨 Design

### Tema
- **Primary:** Blue (#2563eb) - Confiança
- **Dark mode:** Incluído desde MVP
- **Design system:** shadcn/ui + Tailwind

### UX Guidelines
- Mobile-first responsive
- Feedback visual imediato
- Loading states em todas as ações
- Error handling amigável
- Acessibilidade (WCAG 2.1 AA)

---

## 🔐 Autenticação

### Métodos
1. **Email + Senha** - Padrão
2. **Google OAuth** - MVP
3. **Microsoft OAuth** - Futuro

### Segurança
- JWT com refresh tokens
- Email verification obrigatório
- Password reset via email
- Rate limiting em login
- Brute force protection

---

## 📱 Responsividade

- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+
- **Large:** 1440px+

---

## 🚀 Deploy Strategy

### Ambiente
- **Dev:** localhost:3000
- **Staging:** TBD
- **Production:** Vercel (sign.protonjudi.com)

### CI/CD
- GitHub Actions para lint/test
- Vercel auto-deploy em push
- Preview deploys em PRs

---

## 📊 Analytics & Monitoring

- Vercel Analytics (web vitals)
- Error tracking (Sentry - futuro)
- User analytics (Posthog - futuro)

---

## 📅 Timeline Estimado

| Fase | Duração | Entrega |
|------|---------|---------|
| Setup + Auth | 3-4 dias | Projeto rodando com login |
| Dashboard + Envelopes | 4-5 dias | CRUD completo |
| Pricing + Legal | 2 dias | Páginas de planos e termos |
| Dark mode + Polish | 2 dias | UI finalizada |
| Testes + Deploy | 2 dias | Produção |
| **Total** | **~15 dias** | |

---

## ✅ Aprovações

- [x] Nome: AtlasSign
- [x] Domínio: sign.protonjudi.com
- [x] Pricing: Prioridade
- [x] OAuth Google: MVP
- [x] Dark mode: MVP
- [x] Idioma: PT-BR
- [x] Dev local primeiro, deploy depois
