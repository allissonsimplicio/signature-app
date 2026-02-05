"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Building2, FolderOpen, File, MoreVertical, UserPlus, Edit, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export interface SectorTreeNode {
  id: string
  name: string
  code: string | null
  description: string | null
  level: number
  path: string | null
  isActive: boolean
  managerId: string | null
  userCount: number
  children: SectorTreeNode[]
}

interface SectorTreeProps {
  nodes: SectorTreeNode[]
  onEdit: (sector: SectorTreeNode) => void
  onAddChild: (parentId: string) => void
  onManageMembers: (sectorId: string) => void
  onDeactivate: (sector: SectorTreeNode) => void
}

interface SectorTreeItemProps {
  node: SectorTreeNode
  isLast?: boolean
  depth?: number
  parentExpanded?: boolean
  onEdit: (sector: SectorTreeNode) => void
  onAddChild: (parentId: string) => void
  onManageMembers: (sectorId: string) => void
  onDeactivate: (sector: SectorTreeNode) => void
}

function SectorTreeItem({
  node,
  isLast = false,
  depth = 0,
  parentExpanded = true,
  onEdit,
  onAddChild,
  onManageMembers,
  onDeactivate,
}: SectorTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0

  const getIcon = () => {
    if (depth === 0) return <Building2 className="h-4 w-4" />
    if (hasChildren) return <FolderOpen className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  return (
    <div className="relative">
      {/* Linha vertical conectora */}
      {depth > 0 && (
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-px bg-border",
            isLast && "h-6"
          )}
          style={{ left: `${(depth - 1) * 24 + 12}px` }}
        />
      )}

      {/* Linha horizontal conectora */}
      {depth > 0 && (
        <div
          className="absolute top-6 h-px w-3 bg-border"
          style={{ left: `${(depth - 1) * 24 + 12}px` }}
        />
      )}

      {/* Conteúdo do nó */}
      <div
        className={cn(
          "group flex items-center gap-2 py-2 px-3 rounded-md hover:bg-accent transition-colors",
          !node.isActive && "opacity-60"
        )}
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
      >
        {/* Botão expandir/colapsar */}
        {hasChildren ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <div className="w-6" />
        )}

        {/* Ícone */}
        <div className="text-muted-foreground">{getIcon()}</div>

        {/* Nome */}
        <span className="font-medium">{node.name}</span>

        {/* Código */}
        {node.code && (
          <Badge variant="secondary" className="text-xs">
            {node.code}
          </Badge>
        )}

        {/* Contagem de membros */}
        <span className="text-sm text-muted-foreground ml-auto">
          {node.userCount} {node.userCount === 1 ? "membro" : "membros"}
        </span>

        {/* Status */}
        {!node.isActive && (
          <Badge variant="destructive" className="text-xs">
            Inativo
          </Badge>
        )}

        {/* Ações (aparecem no hover) */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(node)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar setor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddChild(node.id)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Adicionar sub-setor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onManageMembers(node.id)}>
                <Users className="h-4 w-4 mr-2" />
                Gerenciar membros
              </DropdownMenuItem>
              {node.isActive && (
                <DropdownMenuItem
                  onClick={() => onDeactivate(node)}
                  className="text-destructive"
                >
                  Desativar
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filhos */}
      {hasChildren && isExpanded && (
        <div>
          {node.children.map((child, index) => (
            <SectorTreeItem
              key={child.id}
              node={child}
              isLast={index === node.children.length - 1}
              depth={depth + 1}
              parentExpanded={isExpanded}
              onEdit={onEdit}
              onAddChild={onAddChild}
              onManageMembers={onManageMembers}
              onDeactivate={onDeactivate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function SectorTree({
  nodes,
  onEdit,
  onAddChild,
  onManageMembers,
  onDeactivate,
}: SectorTreeProps) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Nenhum setor criado</h3>
        <p className="text-sm text-muted-foreground">
          Comece criando o primeiro setor da organização.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {nodes.map((node, index) => (
        <SectorTreeItem
          key={node.id}
          node={node}
          isLast={index === nodes.length - 1}
          onEdit={onEdit}
          onAddChild={onAddChild}
          onManageMembers={onManageMembers}
          onDeactivate={onDeactivate}
        />
      ))}
    </div>
  )
}
