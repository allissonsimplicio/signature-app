"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  ArrowRight,
  TrendingUp,
  Users,
} from "lucide-react"

// Mock data - será substituído por dados reais da API
const stats = [
  {
    name: "Total de Envelopes",
    value: "24",
    icon: FileText,
    change: "+12%",
    changeType: "positive" as const,
  },
  {
    name: "Aguardando Assinatura",
    value: "8",
    icon: Clock,
    change: "+3",
    changeType: "neutral" as const,
  },
  {
    name: "Completados",
    value: "14",
    icon: CheckCircle,
    change: "+5",
    changeType: "positive" as const,
  },
  {
    name: "Cancelados",
    value: "2",
    icon: XCircle,
    change: "-1",
    changeType: "negative" as const,
  },
]

const recentEnvelopes = [
  {
    id: "1",
    name: "Contrato de Prestação de Serviços",
    status: "RUNNING",
    signers: 2,
    signedCount: 1,
    createdAt: "2026-02-03T10:00:00Z",
  },
  {
    id: "2",
    name: "Termo de Confidencialidade",
    status: "COMPLETED",
    signers: 1,
    signedCount: 1,
    createdAt: "2026-02-02T15:30:00Z",
  },
  {
    id: "3",
    name: "Proposta Comercial - Cliente ABC",
    status: "RUNNING",
    signers: 3,
    signedCount: 0,
    createdAt: "2026-02-01T09:00:00Z",
  },
]

const statusConfig = {
  DRAFT: { label: "Rascunho", color: "bg-muted text-muted-foreground" },
  RUNNING: { label: "Em andamento", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  COMPLETED: { label: "Concluído", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  CANCELED: { label: "Cancelado", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
}

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Olá, {user?.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            Aqui está um resumo da sua conta
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/envelopes/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Envelope
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === "positive" ? "text-green-600" :
                stat.changeType === "negative" ? "text-red-600" :
                "text-muted-foreground"
              }`}>
                {stat.change} este mês
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Envelopes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Envelopes Recentes</CardTitle>
            <CardDescription>
              Seus últimos documentos enviados para assinatura
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/envelopes">
              Ver todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentEnvelopes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Você ainda não tem nenhum envelope
              </p>
              <Button asChild>
                <Link href="/dashboard/envelopes/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Criar primeiro envelope
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentEnvelopes.map((envelope) => (
                <div
                  key={envelope.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Link
                        href={`/dashboard/envelopes/${envelope.id}`}
                        className="font-medium hover:underline"
                      >
                        {envelope.name}
                      </Link>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {envelope.signedCount}/{envelope.signers} assinaturas
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusConfig[envelope.status as keyof typeof statusConfig].color
                      }`}
                    >
                      {statusConfig[envelope.status as keyof typeof statusConfig].label}
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/envelopes/${envelope.id}`}>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/dashboard/envelopes/new">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Novo Envelope
              </CardTitle>
              <CardDescription>
                Envie um documento para assinatura
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/dashboard/templates">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Templates
              </CardTitle>
              <CardDescription>
                Gerencie seus modelos de documento
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/dashboard/api-tokens">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Integrações
              </CardTitle>
              <CardDescription>
                Configure API tokens e webhooks
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  )
}
