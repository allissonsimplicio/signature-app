"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  User,
  Building,
  Mail,
  Lock,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import api from "@/lib/api"

const profileSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  newPassword: z.string().min(8, "Nova senha deve ter no mínimo 8 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"],
})

const organizationSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
})

type ProfileForm = z.infer<typeof profileSchema>
type PasswordForm = z.infer<typeof passwordSchema>
type OrganizationForm = z.infer<typeof organizationSchema>

export default function SettingsPage() {
  const { user, refreshUser } = useAuth()
  const [profileLoading, setProfileLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [orgLoading, setOrgLoading] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [orgSuccess, setOrgSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  })

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  })

  const organizationForm = useForm<OrganizationForm>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: user?.organization?.name || "",
    },
  })

  const onProfileSubmit = async (data: ProfileForm) => {
    setProfileLoading(true)
    setError(null)
    setProfileSuccess(false)

    try {
      // await api.patch("/users/me", data)
      // await refreshUser()
      
      // Mock
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setProfileSuccess(true)
      setTimeout(() => setProfileSuccess(false), 3000)
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar perfil")
    } finally {
      setProfileLoading(false)
    }
  }

  const onPasswordSubmit = async (data: PasswordForm) => {
    setPasswordLoading(true)
    setError(null)
    setPasswordSuccess(false)

    try {
      // await api.post("/auth/change-password", data)
      
      // Mock
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setPasswordSuccess(true)
      passwordForm.reset()
      setTimeout(() => setPasswordSuccess(false), 3000)
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao alterar senha")
    } finally {
      setPasswordLoading(false)
    }
  }

  const onOrganizationSubmit = async (data: OrganizationForm) => {
    setOrgLoading(true)
    setError(null)
    setOrgSuccess(false)

    try {
      // await api.patch("/organizations/me", data)
      // await refreshUser()
      
      // Mock
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setOrgSuccess(true)
      setTimeout(() => setOrgSuccess(false), 3000)
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar organização")
    } finally {
      setOrgLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais e de organização
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Perfil
          </CardTitle>
          <CardDescription>
            Suas informações pessoais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  {...profileForm.register("name")}
                />
                {profileForm.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {profileForm.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...profileForm.register("email")}
                />
                {profileForm.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {profileForm.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={profileLoading}>
                {profileLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar
                  </>
                )}
              </Button>
              {profileSuccess && (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Salvo com sucesso!
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Alterar Senha
          </CardTitle>
          <CardDescription>
            Atualize sua senha de acesso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Senha atual</Label>
              <Input
                id="currentPassword"
                type="password"
                {...passwordForm.register("currentPassword")}
              />
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-sm text-destructive">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  {...passwordForm.register("newPassword")}
                />
                {passwordForm.formState.errors.newPassword && (
                  <p className="text-sm text-destructive">
                    {passwordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...passwordForm.register("confirmPassword")}
                />
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={passwordLoading}>
                {passwordLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Alterando...
                  </>
                ) : (
                  "Alterar Senha"
                )}
              </Button>
              {passwordSuccess && (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Senha alterada!
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Organization Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Organização
          </CardTitle>
          <CardDescription>
            Configurações da sua empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={organizationForm.handleSubmit(onOrganizationSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">Nome da organização</Label>
              <Input
                id="orgName"
                {...organizationForm.register("name")}
              />
              {organizationForm.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {organizationForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plano atual</span>
                <span className="font-medium capitalize">
                  {user?.organization?.plan?.toLowerCase() || "Free"}
                </span>
              </div>
              <Button variant="link" className="p-0 h-auto" asChild>
                <a href="/pricing">Ver planos disponíveis →</a>
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={orgLoading}>
                {orgLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar
                  </>
                )}
              </Button>
              {orgSuccess && (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Salvo com sucesso!
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
          <CardDescription>
            Ações irreversíveis para sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border border-destructive/30">
            <div>
              <p className="font-medium">Excluir conta</p>
              <p className="text-sm text-muted-foreground">
                Remove permanentemente sua conta e todos os dados associados
              </p>
            </div>
            <Button variant="destructive">
              Excluir Conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
