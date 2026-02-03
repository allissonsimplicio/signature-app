"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Users,
  Settings,
  Check,
  Upload,
  Plus,
  Trash2,
  Loader2,
  Calendar,
  Mail,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import api from "@/lib/api"

const steps = [
  { id: 1, name: "Informações", icon: FileText },
  { id: 2, name: "Documentos", icon: Upload },
  { id: 3, name: "Signatários", icon: Users },
  { id: 4, name: "Revisar", icon: Check },
]

const envelopeSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  description: z.string().optional(),
  deadline: z.string().optional(),
})

type EnvelopeForm = z.infer<typeof envelopeSchema>

interface Signer {
  id: string
  name: string
  email: string
  order: number
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
}

export default function NewEnvelopePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [signers, setSigners] = useState<Signer[]>([
    { id: "1", name: "", email: "", order: 1 },
  ])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EnvelopeForm>({
    resolver: zodResolver(envelopeSchema),
  })

  const formData = watch()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files
    if (uploadedFiles) {
      const newFiles: UploadedFile[] = Array.from(uploadedFiles).map((file, index) => ({
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
      }))
      setFiles([...files, ...newFiles])
    }
  }

  const removeFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id))
  }

  const addSigner = () => {
    setSigners([
      ...signers,
      { id: `signer-${Date.now()}`, name: "", email: "", order: signers.length + 1 },
    ])
  }

  const removeSigner = (id: string) => {
    if (signers.length > 1) {
      setSigners(signers.filter((s) => s.id !== id))
    }
  }

  const updateSigner = (id: string, field: keyof Signer, value: string) => {
    setSigners(
      signers.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    )
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.name.length >= 3
      case 2:
        return files.length > 0
      case 3:
        return signers.every((s) => s.name && s.email)
      default:
        return true
    }
  }

  const onSubmit = async (data: EnvelopeForm) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual API call
      console.log("Creating envelope:", { ...data, files, signers })
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      router.push("/dashboard/envelopes")
    } catch (error) {
      console.error("Error creating envelope:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/envelopes">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Novo Envelope</h1>
          <p className="text-muted-foreground">
            Crie um novo documento para assinatura
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : currentStep > step.id
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <step.icon className="h-4 w-4" />
                <span className="text-sm font-medium hidden sm:inline">{step.name}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-8 h-0.5 mx-1",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle>Informações do Envelope</CardTitle>
                <CardDescription>
                  Defina o nome e detalhes básicos do envelope
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do envelope *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Contrato de Prestação de Serviços"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição (opcional)</Label>
                  <Input
                    id="description"
                    placeholder="Breve descrição do documento"
                    {...register("description")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Prazo para assinatura (opcional)</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="deadline"
                      type="date"
                      className="pl-10"
                      {...register("deadline")}
                    />
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {/* Step 2: Documents */}
          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle>Documentos</CardTitle>
                <CardDescription>
                  Faça upload dos documentos que precisam ser assinados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <span className="text-lg font-medium">
                      Clique para fazer upload
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ou arraste e solte seus arquivos aqui
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX (máx. 50MB)
                    </span>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    <Label>Arquivos selecionados</Label>
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </>
          )}

          {/* Step 3: Signers */}
          {currentStep === 3 && (
            <>
              <CardHeader>
                <CardTitle>Signatários</CardTitle>
                <CardDescription>
                  Adicione as pessoas que precisam assinar o documento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {signers.map((signer, index) => (
                  <div key={signer.id} className="p-4 rounded-lg border space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Signatário {index + 1}
                      </span>
                      {signers.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSigner(signer.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Nome completo *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Nome do signatário"
                            className="pl-10"
                            value={signer.name}
                            onChange={(e) =>
                              updateSigner(signer.id, "name", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="email@exemplo.com"
                            className="pl-10"
                            value={signer.email}
                            onChange={(e) =>
                              updateSigner(signer.id, "email", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={addSigner}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar signatário
                </Button>
              </CardContent>
            </>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <>
              <CardHeader>
                <CardTitle>Revisar e Enviar</CardTitle>
                <CardDescription>
                  Confira as informações antes de enviar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Envelope Info */}
                <div className="space-y-2">
                  <h3 className="font-medium">Informações do Envelope</h3>
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <p>
                      <span className="text-muted-foreground">Nome:</span>{" "}
                      {formData.name}
                    </p>
                    {formData.description && (
                      <p>
                        <span className="text-muted-foreground">Descrição:</span>{" "}
                        {formData.description}
                      </p>
                    )}
                    {formData.deadline && (
                      <p>
                        <span className="text-muted-foreground">Prazo:</span>{" "}
                        {new Date(formData.deadline).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Documents */}
                <div className="space-y-2">
                  <h3 className="font-medium">Documentos ({files.length})</h3>
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>{file.name}</span>
                        <span className="text-muted-foreground text-sm">
                          ({formatFileSize(file.size)})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signers */}
                <div className="space-y-2">
                  <h3 className="font-medium">Signatários ({signers.length})</h3>
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    {signers.map((signer, index) => (
                      <div key={signer.id} className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                          {index + 1}
                        </span>
                        <span>{signer.name}</span>
                        <span className="text-muted-foreground">
                          ({signer.email})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between p-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>

            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
              >
                Próximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Criar e Enviar
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
