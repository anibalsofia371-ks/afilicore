import { Leaf } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Comunidad", href: "#comunidad" },
  { label: "Eventos", href: "#eventos" },
  { label: "Directiva", href: "#directiva" },
  { label: "Contacto", href: "#contacto" },
];

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container flex items-center justify-between py-4">
        <a href="#inicio" className="flex items-center gap-2 group">
          <span className="h-9 w-9 rounded-full bg-forest text-cream flex items-center justify-center shadow-soft group-hover:rotate-12 transition-transform">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-display text-2xl tracking-tight text-forest-deep">afilicore</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/70 hover:text-forest-deep transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
