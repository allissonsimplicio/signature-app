"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  FileText,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Send,
  Trash2,
  Calendar,
  Mail,
  User,
  Eye,
  MoreHorizontal,
  AlertCircle,
  RefreshCw,
  Loader2,
  ExternalLink,
} from "lucide-react"
import api from "@/lib/api"

interface Signer {
  id: string
  name: string
  email: string
  status: "PENDING" | "SIGNED" | "REJECTED"
  signedAt?: string
  signingOrder: number
}

interface Document {
  id: string
  name: string
  fileSize: number
  pageCount: number
  status: "DRAFT" | "RUNNING" | "COMPLETED"
}

interface Envelope {
  id: string
  name: string
  description?: string
  status: "DRAFT" | "RUNNING" | "COMPLETED" | "CANCELED"
  deadline?: string
  createdAt: string
  activatedAt?: string
  completedAt?: string
  documents: Document[]
  signers: Signer[]
}

const statusConfig = {
  DRAFT: { label: "Rascunho", color: "bg-muted text-muted-foreground", icon: FileText },
  RUNNING: { label: "Em andamento", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", icon: Clock },
  COMPLETED: { label: "Concluído", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", icon: CheckCircle },
  CANCELED: { label: "Cancelado", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", icon: XCircle },
}

const signerStatusConfig = {
  PENDING: { label: "Pendente", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  SIGNED: { label: "Assinado", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  REJECTED: { label: "Recusado", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
}

// Mock data
const mockEnvelope: Envelope = {
  id: "1",
  name: "Contrato de Prestação de Serviços",
  description: "Contrato mensal de consultoria em tecnologia",
  status: "RUNNING",
  deadline: "2026-02-10T23:59:59Z",
  createdAt: "2026-02-03T10:00:00Z",
  activatedAt: "2026-02-03T10:05:00Z",
  documents: [
    {
      id: "doc1",
      name: "Contrato_Prestacao_Servicos_2026.pdf",
      fileSize: 245000,
      pageCount: 5,
      status: "RUNNING",
    },
  ],
  signers: [
    {
      id: "signer1",
      name: "João Silva",
      email: "joao.silva@empresa.com",
      status: "SIGNED",
      signedAt: "2026-02-03T14:30:00Z",
      signingOrder: 1,
    },
    {
      id: "signer2",
      name: "Maria Santos",
      email: "maria.santos@cliente.com",
      status: "PENDING",
      signingOrder: 2,
    },
  ],
}

export default function EnvelopeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isActivating, setIsActivating] = useState(false)
  const [isCanceling, setIsCanceling] = useState(false)

  const { data: envelope, isLoading } = useQuery({
    queryKey: ["envelope", params.id],
    queryFn: async () => {
      // const { data } = await api.get(`/envelopes/${params.id}`)
      // return data as Envelope
      
      return new Promise<Envelope>((resolve) => {
        setTimeout(() => resolve(mockEnvelope), 500)
      })
    },
  })

  const activateMutation = useMutation({
    mutationFn: async () => {
      // await api.post(`/envelopes/${params.id}/activate`)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["envelope", params.id] })
    },
  })

  const cancelMutation = useMutation({
    mutationFn: async () => {
      // await api.post(`/envelopes/${params.id}/cancel`)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["envelope", params.id] })
    },
  })

  const resendMutation = useMutation({
    mutationFn: async (signerId: string) => {
      // await api.post(`/signers/${signerId}/resend-notification`)
      await new Promise((resolve) => setTimeout(resolve, 500))
    },
  })

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!envelope) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold mb-2">Envelope não encontrado</h2>
        <Button asChild>
          <Link href="/dashboard/envelopes">Voltar para envelopes</Link>
        </Button>
      </div>
    )
  }

  const StatusIcon = statusConfig[envelope.status].icon
  const signedCount = envelope.signers.filter((s) => s.status === "SIGNED").length
  const progress = (signedCount / envelope.signers.length) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/envelopes">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{envelope.name}</h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[envelope.status].color}`}
              >
                {statusConfig[envelope.status].label}
              </span>
            </div>
            {envelope.description && (
              <p className="text-muted-foreground mt-1">{envelope.description}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {envelope.status === "DRAFT" && (
            <Button
              onClick={() => activateMutation.mutate()}
              disabled={activateMutation.isPending}
            >
              {activateMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Ativar e Enviar
            </Button>
          )}
          {envelope.status === "COMPLETED" && (
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Baixar Documentos
            </Button>
          )}
          {(envelope.status === "DRAFT" || envelope.status === "RUNNING") && (
            <Button
              variant="outline"
              onClick={() => cancelMutation.mutate()}
              disabled={cancelMutation.isPending}
            >
              {cancelMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="mr-2 h-4 w-4" />
              )}
              Cancelar
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Documentos</p>
                <p className="text-2xl font-bold">{envelope.documents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Assinaturas</p>
                <p className="text-2xl font-bold">
                  {signedCount}/{envelope.signers.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {envelope.deadline ? "Prazo" : "Criado em"}
                </p>
                <p className="text-lg font-bold">
                  {formatDate(envelope.deadline || envelope.createdAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      {envelope.status === "RUNNING" && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Signers */}
      <Card>
        <CardHeader>
          <CardTitle>Signatários</CardTitle>
          <CardDescription>
            Pessoas que precisam assinar este documento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {envelope.signers.map((signer, index) => (
              <div
                key={signer.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                    {signer.signingOrder}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{signer.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${signerStatusConfig[signer.status].color}`}
                      >
                        {signerStatusConfig[signer.status].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {signer.email}
                    </div>
                    {signer.signedAt && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Assinado em {formatDateTime(signer.signedAt)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {signer.status === "PENDING" && envelope.status === "RUNNING" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resendMutation.mutate(signer.id)}
                      disabled={resendMutation.isPending}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reenviar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos</CardTitle>
          <CardDescription>
            Arquivos incluídos neste envelope
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {envelope.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(doc.fileSize)} • {doc.pageCount} páginas
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline/History */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico</CardTitle>
          <CardDescription>
            Atividades e eventos deste envelope
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {envelope.completedAt && (
              <div className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Envelope concluído</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDateTime(envelope.completedAt)}
                  </p>
                </div>
              </div>
            )}
            
            {envelope.signers
              .filter((s) => s.signedAt)
              .sort((a, b) => new Date(b.signedAt!).getTime() - new Date(a.signedAt!).getTime())
              .map((signer) => (
                <div key={signer.id} className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{signer.name} assinou</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDateTime(signer.signedAt!)}
                    </p>
                  </div>
                </div>
              ))}

            {envelope.activatedAt && (
              <div className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Send className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Envelope ativado</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDateTime(envelope.activatedAt)}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Envelope criado</p>
                <p className="text-sm text-muted-foreground">
                  {formatDateTime(envelope.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
