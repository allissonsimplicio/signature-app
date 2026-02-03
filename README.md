# AtlasSign

Frontend da plataforma de assinatura digital AtlasSign.

## 🚀 Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** TanStack Query
- **Forms:** React Hook Form + Zod
- **Auth:** JWT + OAuth (Google)
- **Theme:** Dark mode nativo
- **Deploy:** Vercel

## 📁 Estrutura

```
signature-app/
├── docs/                     # Documentação
│   ├── PLAN.md              # Plano de desenvolvimento
│   └── DECISIONS.md         # Decisões de produto
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── auth/            # Páginas de autenticação
│   │   ├── dashboard/       # Área logada
│   │   ├── pricing/         # Planos e preços
│   │   ├── terms/           # Termos de uso
│   │   └── privacy/         # Política de privacidade
│   ├── components/          # Componentes React
│   │   ├── layout/          # Header, Footer, etc
│   │   └── ui/              # shadcn/ui components
│   ├── lib/                 # Utilitários
│   ├── hooks/               # Custom hooks
│   └── contexts/            # React contexts
├── public/                  # Assets estáticos
└── package.json
```

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar em dev
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## 🔗 Links

- **API:** https://sign.protonjudi.com
- **Swagger:** https://sign.protonjudi.com/api/docs
- **Produção:** sign.protonjudi.com (TBD)

## 📋 Status

- [x] Setup inicial (Next.js + Tailwind + shadcn)
- [x] Layout (Header, Footer)
- [x] Landing page (Home)
- [x] Dark mode
- [x] Termos de uso
- [x] Política de privacidade
- [ ] Autenticação (login, register)
- [ ] OAuth Google
- [ ] Dashboard
- [ ] Envelopes CRUD
- [ ] Pricing page completa
- [ ] API tokens
- [ ] Deploy

## 📄 Licença

Proprietário - Todos os direitos reservados.
