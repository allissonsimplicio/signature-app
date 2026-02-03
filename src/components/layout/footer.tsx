import Link from "next/link"
import { FileSignature } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <FileSignature className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">AtlasSign</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Assinatura digital segura e juridicamente válida para sua empresa.
            </p>
          </div>

          {/* Produto */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                  Planos e Preços
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                  Documentação
                </Link>
              </li>
              <li>
                <Link href="/docs/api" className="text-muted-foreground hover:text-foreground">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/docs/sdk" className="text-muted-foreground hover:text-foreground">
                  SDK
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-muted-foreground hover:text-foreground">
                  Segurança
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:contato@protonjudi.com" className="text-muted-foreground hover:text-foreground">
                  contato@protonjudi.com
                </a>
              </li>
              <li>
                <a href="https://protonjudi.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  protonjudi.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Atlas. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Feito com 💙 no Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
