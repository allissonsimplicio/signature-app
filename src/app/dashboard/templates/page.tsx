"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FolderOpen,
  Plus,
  Search,
  FileText,
  MoreHorizontal,
  Trash2,
  Copy,
  Edit,
  Calendar,
  Tag,
  Upload,
  X,
  Loader2,
  CheckCircle,
} from "lucide-react"
import api from "@/lib/api"

interface Template {
  id: string
  name: string
  description?: string
  category?: string
  usageCount: number
  extractedVariables: string[]
  isConfigured: boolean
  createdAt: string
  lastUsedAt?: string
}

// Mock data
const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Contrato de Prestação de Serviços",
    description: "Modelo padrão para contratos de prestação de serviços",
    category: "Contratos",
    usageCount: 15,
    extractedVariables: ["{{CLIENTE_NOME}}", "{{CLIENTE_CPF}}", "{{VALOR}}", "{{DATA}}"],
    isConfigured: true,
    createdAt: "2026-01-15T09:00:00Z",
    lastUsedAt: "2026-02-02T14:30:00Z",
  },
  {
    id: "2",
    name: "Termo de Confidencialidade (NDA)",
    description: "Acordo de confidencialidade para parceiros e fornecedores",
    category: "Termos",
    usageCount: 8,
    extractedVariables: ["{{PARTE_NOME}}", "{{PARTE_CNPJ}}", "{{VIGENCIA}}"],
    isConfigured: true,
    createdAt: "2026-01-20T11:00:00Z",
    lastUsedAt: "2026-01-28T09:00:00Z",
  },
  {
    id: "3",
    name: "Proposta Comercial",
    description: "Template para propostas comerciais",
    category: "Comercial",
    usageCount: 3,
    extractedVariables: ["{{CLIENTE}}", "{{PROJETO}}", "{{VALOR_TOTAL}}", "{{PRAZO}}"],
    isConfigured: false,
    createdAt: "2026-02-01T16:00:00Z",
  },
]

export default function TemplatesPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState("")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadName, setUploadName] = useState("")
  const [uploadDescription, setUploadDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const { data: templates, isLoading } = useQuery({
    queryKey: ["templates", search],
    queryFn: async () => {
      // const { data } = await api.get("/document-templates", { params: { search } })
      // return data as Template[]
      
      return new Promise<Template[]>((resolve) => {
        setTimeout(() => {
          let filtered = mockTemplates
          if (search) {
            filtered = filtered.filter((t) =>
              t.name.toLowerCase().includes(search.toLowerCase())
            )
          }
          resolve(filtered)
        }, 500)
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // await api.delete(`/document-templates/${id}`)
      await new Promise((resolve) => setTimeout(resolve, 500))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] })
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadFile(file)
      if (!uploadName) {
        setUploadName(file.name.replace(/\.[^/.]+$/, ""))
      }
    }
  }

  const handleUpload = async () => {
    if (!uploadFile || !uploadName) return
    
    setIsUploading(true)
    try {
      // const formData = new FormData()
      // formData.append("file", uploadFile)
      // formData.append("name", uploadName)
      // formData.append("description", uploadDescription)
      // await api.post("/document-templates/upload-and-extract", formData)
      
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      queryClient.invalidateQueries({ queryKey: ["templates"] })
      closeUploadModal()
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const closeUploadModal = () => {
    setShowUploadModal(false)
    setUploadFile(null)
    setUploadName("")
    setUploadDescription("")
  }

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
          <h1 className="text-2xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">
            Gerencie seus modelos de documento DOCX
          </p>
        </div>
        <Button onClick={() => setShowUploadModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Template
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar templates..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : templates?.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum template encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {search
                  ? "Tente ajustar sua busca"
                  : "Faça upload do seu primeiro template DOCX"}
              </p>
              {!search && (
                <Button onClick={() => setShowUploadModal(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Criar template
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates?.map((template) => (
            <Card key={template.id} className="hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      {template.category && (
                        <div className="flex items-center gap-1 mt-1">
                          <Tag className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {template.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => deleteMutation.mutate(template.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {template.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                )}

                {/* Variables */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Variáveis ({template.extractedVariables.length})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {template.extractedVariables.slice(0, 3).map((variable) => (
                      <span
                        key={variable}
                        className="px-2 py-0.5 text-xs rounded-full bg-muted font-mono"
                      >
                        {variable}
                      </span>
                    ))}
                    {template.extractedVariables.length > 3 && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-muted">
                        +{template.extractedVariables.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status & Stats */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(template.createdAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    {!template.isConfigured && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        Configurar
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {template.usageCount} usos
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/dashboard/envelopes/new?template=${template.id}`}>
                    Usar template
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeUploadModal}
          />
          <Card className="relative z-10 w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Novo Template</CardTitle>
                <Button variant="ghost" size="icon" onClick={closeUploadModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Faça upload de um arquivo DOCX com variáveis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Upload */}
              <div className="space-y-2">
                <label
                  htmlFor="template-file"
                  className="block border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                >
                  {uploadFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="h-8 w-8 text-primary" />
                      <div className="text-left">
                        <p className="font-medium">{uploadFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="font-medium">Clique para selecionar</p>
                      <p className="text-sm text-muted-foreground">
                        Apenas arquivos .docx
                      </p>
                    </>
                  )}
                </label>
                <input
                  id="template-file"
                  type="file"
                  accept=".docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome do template *</label>
                <Input
                  placeholder="Ex: Contrato de Prestação de Serviços"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição (opcional)</label>
                <Input
                  placeholder="Breve descrição do template"
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                />
              </div>

              {/* Info */}
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <p className="font-medium mb-1">💡 Dica</p>
                <p className="text-muted-foreground">
                  Use variáveis no formato {"{{NOME_VARIAVEL}}"} no seu documento.
                  Elas serão detectadas automaticamente.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={closeUploadModal}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleUpload}
                  disabled={!uploadFile || !uploadName || isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Enviar
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
