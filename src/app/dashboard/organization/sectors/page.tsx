"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Network, List, GitBranch, Loader2, X, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import api from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { SectorTree, SectorTreeNode } from "@/components/dashboard/sector-tree"

interface OrgMember {
  id: string
  userId: string
  user: {
    id: string
    name: string
    email: string
  }
}

interface SectorMember {
  id: string
  userId: string
  sectorId: string
  isPrimary: boolean
  role: string | null
  user: {
    id: string
    name: string
    email: string
  }
}

interface SectorFormData {
  name: string
  code: string
  description: string
  parentId: string
  managerId: string
}

export default function SectorsPage() {
  const queryClient = useQueryClient()
  const [viewMode, setViewMode] = useState<"tree" | "list">("tree")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isMembersSheetOpen, setIsMembersSheetOpen] = useState(false)
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false)
  const [selectedSector, setSelectedSector] = useState<SectorTreeNode | null>(null)
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null)
  const [parentIdForNew, setParentIdForNew] = useState<string | null>(null)

  const [formData, setFormData] = useState<SectorFormData>({
    name: "",
    code: "",
    description: "",
    parentId: "",
    managerId: "",
  })

  const [newMember, setNewMember] = useState({
    userId: "",
    isPrimary: false,
    role: "",
  })

  // Queries
  const { data: treeData, isLoading: isLoadingTree } = useQuery({
    queryKey: ["sectors", "tree"],
    queryFn: () => api.get("/sectors/tree").then((r) => r.data),
  })

  const { data: orgMembers } = useQuery({
    queryKey: ["organization", "members"],
    queryFn: () => api.get("/organizations/me/members").then((r) => r.data),
  })

  const { data: sectorMembers, isLoading: isLoadingMembers } = useQuery({
    queryKey: ["sectors", selectedSectorId, "members"],
    queryFn: () => api.get(`/sectors/${selectedSectorId}/users`).then((r) => r.data),
    enabled: !!selectedSectorId && isMembersSheetOpen,
  })

  // Mutations
  const createSectorMutation = useMutation({
    mutationFn: (data: Partial<SectorFormData>) => api.post("/sectors", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] })
      toast.success("Setor criado com sucesso!")
      setIsCreateDialogOpen(false)
      resetForm()
    },
    onError: () => {
      toast.error("Erro ao criar setor")
    },
  })

  const updateSectorMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SectorFormData> }) =>
      api.patch(`/sectors/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] })
      toast.success("Setor atualizado com sucesso!")
      setIsEditDialogOpen(false)
      setSelectedSector(null)
      resetForm()
    },
    onError: () => {
      toast.error("Erro ao atualizar setor")
    },
  })

  const deleteSectorMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/sectors/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] })
      toast.success("Setor desativado com sucesso!")
      setIsDeactivateDialogOpen(false)
      setSelectedSector(null)
    },
    onError: () => {
      toast.error("Erro ao desativar setor")
    },
  })

  const addMemberMutation = useMutation({
    mutationFn: ({ sectorId, data }: { sectorId: string; data: any }) =>
      api.post(`/sectors/${sectorId}/users`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] })
      toast.success("Membro adicionado com sucesso!")
      setNewMember({ userId: "", isPrimary: false, role: "" })
    },
    onError: () => {
      toast.error("Erro ao adicionar membro")
    },
  })

  const removeMemberMutation = useMutation({
    mutationFn: ({ sectorId, userId }: { sectorId: string; userId: string }) =>
      api.delete(`/sectors/${sectorId}/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] })
      toast.success("Membro removido com sucesso!")
    },
    onError: () => {
      toast.error("Erro ao remover membro")
    },
  })

  // Handlers
  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
      parentId: "",
      managerId: "",
    })
    setParentIdForNew(null)
  }

  const handleCreateSector = () => {
    if (!formData.name.trim()) {
      toast.error("Nome é obrigatório")
      return
    }

    const payload: any = {
      name: formData.name,
    }

    if (formData.code) payload.code = formData.code
    if (formData.description) payload.description = formData.description
    if (formData.parentId) payload.parentId = formData.parentId
    if (formData.managerId) payload.managerId = formData.managerId

    createSectorMutation.mutate(payload)
  }

  const handleUpdateSector = () => {
    if (!selectedSector || !formData.name.trim()) {
      toast.error("Nome é obrigatório")
      return
    }

    const payload: any = {
      name: formData.name,
    }

    if (formData.code !== undefined) payload.code = formData.code || null
    if (formData.description !== undefined) payload.description = formData.description || null
    if (formData.parentId !== undefined) payload.parentId = formData.parentId || null
    if (formData.managerId !== undefined) payload.managerId = formData.managerId || null

    updateSectorMutation.mutate({ id: selectedSector.id, data: payload })
  }

  const handleEdit = (sector: SectorTreeNode) => {
    setSelectedSector(sector)
    setFormData({
      name: sector.name,
      code: sector.code || "",
      description: sector.description || "",
      parentId: "", // Will be set based on sector.path
      managerId: sector.managerId || "",
    })
    setIsEditDialogOpen(true)
  }

  const handleAddChild = (parentId: string) => {
    setParentIdForNew(parentId)
    setFormData({
      name: "",
      code: "",
      description: "",
      parentId: parentId,
      managerId: "",
    })
    setIsCreateDialogOpen(true)
  }

  const handleManageMembers = (sectorId: string) => {
    setSelectedSectorId(sectorId)
    setIsMembersSheetOpen(true)
  }

  const handleDeactivate = (sector: SectorTreeNode) => {
    setSelectedSector(sector)
    setIsDeactivateDialogOpen(true)
  }

  const handleAddMember = () => {
    if (!newMember.userId || !selectedSectorId) {
      toast.error("Selecione um membro")
      return
    }

    addMemberMutation.mutate({
      sectorId: selectedSectorId,
      data: {
        userId: newMember.userId,
        isPrimary: newMember.isPrimary,
        role: newMember.role || null,
      },
    })
  }

  const handleRemoveMember = (userId: string) => {
    if (!selectedSectorId) return
    removeMemberMutation.mutate({ sectorId: selectedSectorId, userId })
  }

  // Flatten tree for select options
  const flattenTree = (nodes: SectorTreeNode[], prefix = ""): Array<{ id: string; label: string }> => {
    const result: Array<{ id: string; label: string }> = []
    nodes.forEach((node) => {
      result.push({
        id: node.id,
        label: `${prefix}${node.name}${node.code ? ` [${node.code}]` : ""}`,
      })
      if (node.children && node.children.length > 0) {
        result.push(...flattenTree(node.children, prefix + "—— "))
      }
    })
    return result
  }

  const sectorOptions = treeData ? flattenTree(treeData) : []

  // Filter available members (not in sector)
  const availableMembers =
    orgMembers?.filter(
      (member: OrgMember) =>
        !sectorMembers?.some((sm: SectorMember) => sm.userId === member.userId)
    ) || []

  // Flatten tree for list view
  const flattenForList = (nodes: SectorTreeNode[]): SectorTreeNode[] => {
    const result: SectorTreeNode[] = []
    nodes.forEach((node) => {
      result.push(node)
      if (node.children && node.children.length > 0) {
        result.push(...flattenForList(node.children))
      }
    })
    return result
  }

  const flatSectors = treeData ? flattenForList(treeData) : []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Network className="h-8 w-8" />
            Setores
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie a estrutura hierárquica de setores da organização
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Setor
        </Button>
      </div>

      <Separator />

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "tree" | "list")}>
          <TabsList>
            <TabsTrigger value="tree">
              <GitBranch className="h-4 w-4 mr-2" />
              Árvore
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="h-4 w-4 mr-2" />
              Lista
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <Card>
        <CardContent className="p-6">
          {isLoadingTree ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : viewMode === "tree" ? (
            <SectorTree
              nodes={treeData || []}
              onEdit={handleEdit}
              onAddChild={handleAddChild}
              onManageMembers={handleManageMembers}
              onDeactivate={handleDeactivate}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Membros</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flatSectors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      Nenhum setor criado. Comece criando o primeiro setor da organização.
                    </TableCell>
                  </TableRow>
                ) : (
                  flatSectors.map((sector) => (
                    <TableRow key={sector.id}>
                      <TableCell className="font-medium">{sector.name}</TableCell>
                      <TableCell>
                        {sector.code && <Badge variant="secondary">{sector.code}</Badge>}
                      </TableCell>
                      <TableCell>{sector.level}</TableCell>
                      <TableCell>{sector.userCount}</TableCell>
                      <TableCell>
                        {sector.isActive ? (
                          <Badge variant="default">Ativo</Badge>
                        ) : (
                          <Badge variant="destructive">Inativo</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(sector)}
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Setor</DialogTitle>
            <DialogDescription>
              Crie um novo setor na estrutura da organização
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Diretoria Jurídica"
              />
            </div>
            <div>
              <Label htmlFor="code">Código</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Ex: JUR"
              />
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva as responsabilidades do setor"
              />
            </div>
            <div>
              <Label htmlFor="parentId">Setor Pai</Label>
              <Select
                value={formData.parentId}
                onValueChange={(value) => setFormData({ ...formData, parentId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nenhum (setor raiz)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhum (setor raiz)</SelectItem>
                  {sectorOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="managerId">Gestor</Label>
              <Select
                value={formData.managerId}
                onValueChange={(value) => setFormData({ ...formData, managerId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um gestor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhum</SelectItem>
                  {orgMembers?.map((member: OrgMember) => (
                    <SelectItem key={member.userId} value={member.userId}>
                      {member.user.name} ({member.user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreateSector}
              disabled={createSectorMutation.isPending}
            >
              {createSectorMutation.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Criar Setor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Setor</DialogTitle>
            <DialogDescription>
              Atualize as informações do setor ou mova-o na hierarquia
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nome *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-code">Código</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Descrição</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-parentId">Setor Pai</Label>
              <Select
                value={formData.parentId}
                onValueChange={(value) => setFormData({ ...formData, parentId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nenhum (setor raiz)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhum (setor raiz)</SelectItem>
                  {sectorOptions
                    .filter((opt) => opt.id !== selectedSector?.id)
                    .map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-managerId">Gestor</Label>
              <Select
                value={formData.managerId}
                onValueChange={(value) => setFormData({ ...formData, managerId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um gestor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhum</SelectItem>
                  {orgMembers?.map((member: OrgMember) => (
                    <SelectItem key={member.userId} value={member.userId}>
                      {member.user.name} ({member.user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleUpdateSector}
              disabled={updateSectorMutation.isPending}
            >
              {updateSectorMutation.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Members Sheet */}
      <Sheet open={isMembersSheetOpen} onOpenChange={setIsMembersSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Membros do Setor</SheetTitle>
            <SheetDescription>
              Gerencie os membros deste setor
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {/* Add Member */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Adicionar Membro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="new-member">Selecionar Membro</Label>
                  <Select
                    value={newMember.userId}
                    onValueChange={(value) => setNewMember({ ...newMember, userId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um membro" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMembers.map((member: OrgMember) => (
                        <SelectItem key={member.userId} value={member.userId}>
                          {member.user.name} ({member.user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="role">Cargo/Função</Label>
                  <Input
                    id="role"
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    placeholder="Ex: Analista, Coordenador"
                  />
                </div>
                <Button
                  onClick={handleAddMember}
                  disabled={addMemberMutation.isPending || !newMember.userId}
                  className="w-full"
                >
                  {addMemberMutation.isPending && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  Adicionar
                </Button>
              </CardContent>
            </Card>

            {/* Current Members */}
            <div>
              <h3 className="font-medium mb-3">Membros Atuais</h3>
              {isLoadingMembers ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : sectorMembers?.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhum membro neste setor
                </p>
              ) : (
                <div className="space-y-2">
                  {sectorMembers?.map((member: SectorMember) => (
                    <Card key={member.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium">{member.user.name}</p>
                          <p className="text-sm text-muted-foreground">{member.user.email}</p>
                          {member.role && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {member.role}
                            </Badge>
                          )}
                          {member.isPrimary && (
                            <Badge variant="default" className="mt-1 ml-1 text-xs">
                              Principal
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMember(member.userId)}
                          disabled={removeMemberMutation.isPending}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Deactivate Confirmation */}
      <AlertDialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Desativar Setor
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja desativar o setor <strong>{selectedSector?.name}</strong>?
              {selectedSector?.children && selectedSector.children.length > 0 && (
                <div className="mt-2 p-2 bg-destructive/10 rounded-md border border-destructive/20">
                  <p className="text-sm font-medium text-destructive">
                    Atenção: Este setor possui {selectedSector.children.length} sub-setor(es) ativo(s).
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedSector && deleteSectorMutation.mutate(selectedSector.id)}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleteSectorMutation.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Desativar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
