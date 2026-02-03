"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Key,
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react"
import api from "@/lib/api"

interface ApiToken {
  id: string
  name: string
  token?: string // Only shown once on creation
  lastUsedAt: string | null
  expiresAt: string | null
  isActive: boolean
  createdAt: string
}

// Mock data
const mockTokens: ApiToken[] = [
  {
    id: "1",
    name: "Produção - CRM",
    lastUsedAt: "2026-02-03T10:30:00Z",
    expiresAt: null,
    isActive: true,
    createdAt: "2026-01-15T09:00:00Z",
  },
  {
    id: "2",
    name: "Desenvolvimento",
    lastUsedAt: "2026-02-01T14:00:00Z",
    expiresAt: "2026-03-01T00:00:00Z",
    isActive: true,
    createdAt: "2026-01-20T11:00:00Z",
  },
  {
    id: "3",
    name: "Testes - CI/CD",
    lastUsedAt: null,
    expiresAt: null,
    isActive: false,
    createdAt: "2026-01-10T08:00:00Z",
  },
]

export default function ApiTokensPage() {
  const queryClient = useQueryClient()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTokenName, setNewTokenName] = useState("")
  const [newTokenExpiry, setNewTokenExpiry] = useState("")
  const [createdToken, setCreatedToken] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Fetch tokens
  const { data: tokens, isLoading } = useQuery({
    queryKey: ["api-tokens"],
    queryFn: async () => {
      // const { data } = await api.get("/api-tokens")
      // return data as ApiToken[]
      
      // Mock
      return new Promise<ApiToken[]>((resolve) => {
        setTimeout(() => resolve(mockTokens), 500)
      })
    },
  })

  // Create token mutation
  const createMutation = useMutation({
    mutationFn: async (data: { name: string; expiresAt?: string }) => {
      // const response = await api.post("/api-tokens", data)
      // return response.data
      
      // Mock
      return new Promise<{ id: string; token: string }>((resolve) => {
        setTimeout(() => {
          resolve({
            id: `token-${Date.now()}`,
            token: `sig_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
          })
        }, 500)
      })
    },
    onSuccess: (data) => {
      setCreatedToken(data.token)
      queryClient.invalidateQueries({ queryKey: ["api-tokens"] })
    },
  })

  // Revoke token mutation
  const revokeMutation = useMutation({
    mutationFn: async (id: string) => {
      // await api.post(`/api-tokens/${id}/revoke`)
      
      // Mock
      return new Promise<void>((resolve) => {
        setTimeout(resolve, 500)
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-tokens"] })
    },
  })

  // Delete token mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // await api.delete(`/api-tokens/${id}`)
      
      // Mock
      return new Promise<void>((resolve) => {
        setTimeout(resolve, 500)
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-tokens"] })
    },
  })

  const handleCreate = () => {
    if (newTokenName.trim()) {
      createMutation.mutate({
        name: newTokenName,
        expiresAt: newTokenExpiry || undefined,
      })
    }
  }

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

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
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const closeModal = () => {
    setShowCreateModal(false)
    setNewTokenName("")
    setNewTokenExpiry("")
    setCreatedToken(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">API Tokens</h1>
          <p className="text-muted-foreground">
            Gerencie tokens de acesso para integrações via API
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Criar Token
        </Button>
      </div>

      {/* Info Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Key className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Como usar a API</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Use o token no header de autenticação das suas requisições:
              </p>
              <div className="mt-2 p-3 rounded-lg bg-muted font-mono text-sm">
                Authorization: Bearer {"<seu_token>"}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Documentação completa em{" "}
                <a
                  href="https://sign.protonjudi.com/api/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  sign.protonjudi.com/api/docs
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tokens List */}
      <Card>
        <CardHeader>
          <CardTitle>Seus Tokens</CardTitle>
          <CardDescription>
            Tokens ativos para acesso à API
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : tokens?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Key className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum token criado</h3>
              <p className="text-muted-foreground mb-4">
                Crie um token para começar a usar a API
              </p>
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Criar primeiro token
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {tokens?.map((token) => (
                <div
                  key={token.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        token.isActive ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      <Key
                        className={`h-5 w-5 ${
                          token.isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{token.name}</span>
                        {!token.isActive && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                            Revogado
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Criado em {formatDate(token.createdAt)}
                        </span>
                        {token.lastUsedAt && (
                          <span>
                            Último uso: {formatDateTime(token.lastUsedAt)}
                          </span>
                        )}
                        {token.expiresAt && (
                          <span>
                            Expira em {formatDate(token.expiresAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:shrink-0">
                    {token.isActive && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => revokeMutation.mutate(token.id)}
                        disabled={revokeMutation.isPending}
                      >
                        Revogar
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMutation.mutate(token.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          <Card className="relative z-10 w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {createdToken ? "Token Criado!" : "Criar Novo Token"}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={closeModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                {createdToken
                  ? "Copie o token agora. Ele não será exibido novamente."
                  : "Defina um nome para identificar este token"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {createdToken ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    <span className="text-sm">Token criado com sucesso!</span>
                  </div>

                  <div className="space-y-2">
                    <Label>Seu token</Label>
                    <div className="flex gap-2">
                      <Input
                        value={createdToken}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopy(createdToken, "new")}
                      >
                        {copiedId === "new" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Guarde este token em um local seguro. Por motivos de segurança,
                      ele não poderá ser visualizado novamente.
                    </span>
                  </div>

                  <Button className="w-full" onClick={closeModal}>
                    Entendi, fechar
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="token-name">Nome do token *</Label>
                    <Input
                      id="token-name"
                      placeholder="Ex: Produção - CRM"
                      value={newTokenName}
                      onChange={(e) => setNewTokenName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="token-expiry">
                      Data de expiração (opcional)
                    </Label>
                    <Input
                      id="token-expiry"
                      type="date"
                      value={newTokenExpiry}
                      onChange={(e) => setNewTokenExpiry(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Deixe em branco para um token sem expiração
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={closeModal}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={handleCreate}
                      disabled={!newTokenName.trim() || createMutation.isPending}
                    >
                      {createMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Criando...
                        </>
                      ) : (
                        "Criar Token"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
