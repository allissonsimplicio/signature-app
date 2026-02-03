"use client"

import Link from "next/link"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  XCircle,
  Users,
  Calendar,
  ArrowUpDown,
} from "lucide-react"
import api from "@/lib/api"

interface Envelope {
  id: string
  name: string
  description?: string
  status: "DRAFT" | "RUNNING" | "COMPLETED" | "CANCELED"
  signersCount: number
  signedCount: number
  documentsCount: number
  createdAt: string
  deadline?: string
}

const statusConfig = {
  DRAFT: { label: "Rascunho", color: "bg-muted text-muted-foreground" },
  RUNNING: { label: "Em andamento", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  COMPLETED: { label: "Concluído", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  CANCELED: { label: "Cancelado", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
}

// Mock data for development
const mockEnvelopes: Envelope[] = [
  {
    id: "1",
    name: "Contrato de Prestação de Serviços",
    description: "Contrato mensal de consultoria",
    status: "RUNNING",
    signersCount: 2,
    signedCount: 1,
    documentsCount: 1,
    createdAt: "2026-02-03T10:00:00Z",
    deadline: "2026-02-10T23:59:59Z",
  },
  {
    id: "2",
    name: "Termo de Confidencialidade",
    status: "COMPLETED",
    signersCount: 1,
    signedCount: 1,
    documentsCount: 1,
    createdAt: "2026-02-02T15:30:00Z",
  },
  {
    id: "3",
    name: "Proposta Comercial - Cliente ABC",
    description: "Proposta para projeto de desenvolvimento",
    status: "RUNNING",
    signersCount: 3,
    signedCount: 0,
    documentsCount: 2,
    createdAt: "2026-02-01T09:00:00Z",
    deadline: "2026-02-15T23:59:59Z",
  },
  {
    id: "4",
    name: "Aditivo Contratual",
    status: "DRAFT",
    signersCount: 2,
    signedCount: 0,
    documentsCount: 1,
    createdAt: "2026-01-28T14:00:00Z",
  },
  {
    id: "5",
    name: "Contrato de Trabalho - João Silva",
    status: "CANCELED",
    signersCount: 2,
    signedCount: 1,
    documentsCount: 1,
    createdAt: "2026-01-25T11:00:00Z",
  },
]

export default function EnvelopesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  // TODO: Replace with actual API call
  const { data: envelopes, isLoading } = useQuery({
    queryKey: ["envelopes", search, statusFilter],
    queryFn: async () => {
      // const { data } = await api.get("/envelopes", { params: { search, status: statusFilter } })
      // return data.data as Envelope[]
      
      // Mock implementation
      return new Promise<Envelope[]>((resolve) => {
        setTimeout(() => {
          let filtered = mockEnvelopes
          if (search) {
            filtered = filtered.filter((e) =>
              e.name.toLowerCase().includes(search.toLowerCase())
            )
          }
          if (statusFilter) {
            filtered = filtered.filter((e) => e.status === statusFilter)
          }
          resolve(filtered)
        }, 500)
      })
    },
  })

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Envelopes</h1>
          <p className="text-muted-foreground">
            Gerencie seus documentos e assinaturas
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/envelopes/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Envelope
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar envelopes..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(null)}
              >
                Todos
              </Button>
              <Button
                variant={statusFilter === "RUNNING" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("RUNNING")}
              >
                Em andamento
              </Button>
              <Button
                variant={statusFilter === "COMPLETED" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("COMPLETED")}
              >
                Concluídos
              </Button>
              <Button
                variant={statusFilter === "DRAFT" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("DRAFT")}
              >
                Rascunhos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Envelopes List */}
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : envelopes?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum envelope encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {search || statusFilter
                  ? "Tente ajustar os filtros de busca"
                  : "Comece criando seu primeiro envelope"}
              </p>
              {!search && !statusFilter && (
                <Button asChild>
                  <Link href="/dashboard/envelopes/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Criar envelope
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Table Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground">
                <div className="col-span-5">Nome</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Assinaturas</div>
                <div className="col-span-2">Data</div>
                <div className="col-span-1"></div>
              </div>

              {/* Envelope Items */}
              {envelopes?.map((envelope) => (
                <div
                  key={envelope.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  {/* Name */}
                  <div className="md:col-span-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/dashboard/envelopes/${envelope.id}`}
                        className="font-medium hover:underline block truncate"
                      >
                        {envelope.name}
                      </Link>
                      {envelope.description && (
                        <p className="text-sm text-muted-foreground truncate">
                          {envelope.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="md:col-span-2 flex items-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusConfig[envelope.status].color
                      }`}
                    >
                      {statusConfig[envelope.status].label}
                    </span>
                  </div>

                  {/* Signers */}
                  <div className="md:col-span-2 flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {envelope.signedCount}/{envelope.signersCount}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="md:col-span-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(envelope.createdAt)}
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-1 flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/envelopes/${envelope.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
