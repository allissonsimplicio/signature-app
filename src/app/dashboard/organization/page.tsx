"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  FileText,
  Network,
  HardDrive,
  Settings,
  UserPlus,
  FolderPlus,
} from "lucide-react"

interface OrganizationStats {
  id: string
  name: string
  slug: string
  plan: string
  isActive: boolean
  maxUsers: number
  maxEnvelopes: number | null
  currentUsers: number
  currentMonthEnvelopes: number
  storageUsed: number
  sectorsCount: number
}

export default function OrganizationPage() {
  const router = useRouter()

  const { data: org, isLoading } = useQuery<OrganizationStats>({
    queryKey: ["organization"],
    queryFn: () => api.get("/organizations/me").then((r) => r.data),
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <Card>
          <CardHeader>
            <div className="h-8 w-64 bg-muted animate-pulse rounded" />
            <div className="h-4 w-32 bg-muted animate-pulse rounded mt-2" />
          </CardHeader>
        </Card>

        {/* Stats Skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
                <div className="h-3 w-32 bg-muted animate-pulse rounded mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!org) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">
            Não foi possível carregar os dados da organização.
          </p>
        </CardContent>
      </Card>
    )
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
  }

  const stats = [
    {
      title: "Usuários Ativos",
      value: org.currentUsers,
      max: org.maxUsers,
      icon: Users,
      description: `${org.currentUsers} de ${org.maxUsers} usuários`,
    },
    {
      title: "Envelopes do Mês",
      value: org.currentMonthEnvelopes,
      max: org.maxEnvelopes,
      icon: FileText,
      description:
        org.maxEnvelopes !== null
          ? `${org.currentMonthEnvelopes} de ${org.maxEnvelopes} envelopes`
          : `${org.currentMonthEnvelopes} envelopes enviados`,
    },
    {
      title: "Setores",
      value: org.sectorsCount,
      icon: Network,
      description: `${org.sectorsCount} ${
        org.sectorsCount === 1 ? "setor ativo" : "setores ativos"
      }`,
    },
    {
      title: "Armazenamento",
      value: formatBytes(org.storageUsed),
      icon: HardDrive,
      description: `${formatBytes(org.storageUsed)} utilizados`,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Organization Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{org.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={org.isActive ? "default" : "secondary"}>
                  {org.isActive ? "Ativo" : "Inativo"}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  Plano {org.plan.toLowerCase()}
                </Badge>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard/settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {typeof stat.value === "number" ? stat.value : stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button
            variant="default"
            onClick={() => router.push("/dashboard/organization/members")}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Gerenciar Membros
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/organization/sectors")}
          >
            <FolderPlus className="h-4 w-4 mr-2" />
            Gerenciar Setores
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/settings")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
