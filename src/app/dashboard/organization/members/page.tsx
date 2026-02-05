"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, MoreHorizontal, Shield, Trash2, Users } from "lucide-react"
import { toast } from "sonner"

interface Member {
  id: string
  name: string
  email: string
  role: "OWNER" | "ADMIN" | "MEMBER"
  createdAt: string
  sectors?: Array<{ id: string; name: string }>
}

interface CreateMemberData {
  name: string
  email: string
  password: string
  role: "ADMIN" | "MEMBER"
}

export default function MembersPage() {
  const queryClient = useQueryClient()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null)
  const [memberToUpdateRole, setMemberToUpdateRole] = useState<Member | null>(
    null
  )
  const [newRole, setNewRole] = useState<"ADMIN" | "MEMBER">("MEMBER")

  const [formData, setFormData] = useState<CreateMemberData>({
    name: "",
    email: "",
    password: "",
    role: "MEMBER",
  })

  // Query para listar membros
  const { data: members, isLoading } = useQuery<Member[]>({
    queryKey: ["organization", "members"],
    queryFn: () => api.get("/organizations/me/members").then((r) => r.data),
  })

  // Mutation para criar membro
  const createMemberMutation = useMutation({
    mutationFn: (data: CreateMemberData) =>
      api.post("/organizations/me/members", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization", "members"] })
      queryClient.invalidateQueries({ queryKey: ["organization"] })
      setIsCreateDialogOpen(false)
      setFormData({ name: "", email: "", password: "", role: "MEMBER" })
      toast.success("Membro adicionado com sucesso!")
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao adicionar membro"
      )
    },
  })

  // Mutation para atualizar role
  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      api.patch(`/organizations/me/members/${id}/role`, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization", "members"] })
      setMemberToUpdateRole(null)
      toast.success("Função atualizada com sucesso!")
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao atualizar função"
      )
    },
  })

  // Mutation para remover membro
  const deleteMemberMutation = useMutation({
    mutationFn: (id: string) =>
      api.delete(`/organizations/me/members/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization", "members"] })
      queryClient.invalidateQueries({ queryKey: ["organization"] })
      setMemberToDelete(null)
      toast.success("Membro removido com sucesso!")
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erro ao remover membro"
      )
    },
  })

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault()
    createMemberMutation.mutate(formData)
  }

  const handleUpdateRole = () => {
    if (memberToUpdateRole) {
      updateRoleMutation.mutate({
        id: memberToUpdateRole.id,
        role: newRole,
      })
    }
  }

  const handleDeleteMember = () => {
    if (memberToDelete) {
      deleteMemberMutation.mutate(memberToDelete.id)
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "OWNER":
        return "default"
      case "ADMIN":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "OWNER":
        return "Proprietário"
      case "ADMIN":
        return "Administrador"
      default:
        return "Membro"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 w-48 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Membros da Organização
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {members?.length || 0}{" "}
                {members?.length === 1 ? "membro" : "membros"}
              </p>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Membro
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Members Table */}
      <Card>
        <CardContent className="p-0">
          {!members || members.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Nenhum membro encontrado
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Adicione membros para colaborar na organização
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Membro
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Membro</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Setores</TableHead>
                    <TableHead>Data de Entrada</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {member.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {member.email}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(member.role)}>
                          {getRoleLabel(member.role)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {member.sectors && member.sectors.length > 0
                          ? member.sectors.map((s) => s.name).join(", ")
                          : "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(member.createdAt)}
                      </TableCell>
                      <TableCell>
                        {member.role !== "OWNER" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setMemberToUpdateRole(member)
                                  setNewRole(
                                    member.role === "ADMIN" ? "MEMBER" : "ADMIN"
                                  )
                                }}
                              >
                                <Shield className="h-4 w-4 mr-2" />
                                Alterar Função
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => setMemberToDelete(member)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remover
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Member Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Membro</DialogTitle>
            <DialogDescription>
              Preencha os dados para adicionar um novo membro à organização.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateMember}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: "ADMIN" | "MEMBER") =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MEMBER">Membro</SelectItem>
                    <SelectItem value="ADMIN">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                disabled={createMemberMutation.isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={createMemberMutation.isPending}>
                {createMemberMutation.isPending
                  ? "Adicionando..."
                  : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Update Role Dialog */}
      <AlertDialog
        open={!!memberToUpdateRole}
        onOpenChange={() => setMemberToUpdateRole(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alterar Função do Membro</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja alterar a função de{" "}
              <strong>{memberToUpdateRole?.name}</strong> para{" "}
              <strong>{getRoleLabel(newRole)}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={updateRoleMutation.isPending}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUpdateRole}
              disabled={updateRoleMutation.isPending}
            >
              {updateRoleMutation.isPending ? "Alterando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Member Dialog */}
      <AlertDialog
        open={!!memberToDelete}
        onOpenChange={() => setMemberToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Membro</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover{" "}
              <strong>{memberToDelete?.name}</strong> da organização? Esta ação
              não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMemberMutation.isPending}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMember}
              disabled={deleteMemberMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMemberMutation.isPending ? "Removendo..." : "Remover"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
