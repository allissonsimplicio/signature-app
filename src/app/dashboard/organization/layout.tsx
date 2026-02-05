"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

const tabs = [
  { name: "Visão Geral", href: "/dashboard/organization" },
  { name: "Membros", href: "/dashboard/organization/members" },
  { name: "Setores", href: "/dashboard/organization/sectors" },
]

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Organização</h1>
        <p className="text-muted-foreground">
          Gerencie sua organização, membros e setores
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-muted hover:text-foreground"
                )}
              >
                {tab.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>{children}</div>
    </div>
  )
}
