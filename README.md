# Signature App

Frontend da API de Assinatura Digital Atlas.

## 🚀 Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** TanStack Query
- **Forms:** React Hook Form + Zod
- **Auth:** JWT via Signature API
- **Deploy:** Vercel

## 📁 Estrutura

```
signature-app/
├── docs/                  # Documentação do projeto
│   └── PLAN.md           # Plano de desenvolvimento
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Componentes React
│   ├── lib/              # Utilitários e config
│   └── styles/           # Estilos globais
├── public/               # Assets estáticos
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
- **Docs:** https://sign.protonjudi.com/api/docs
- **Produção:** https://app.protonjudi.com (TBD)

## 📋 Status

- [ ] Setup inicial
- [ ] Autenticação
- [ ] Dashboard
- [ ] Envelopes
- [ ] Legal pages
- [ ] Deploy
