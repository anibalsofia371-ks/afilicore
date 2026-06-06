import { useState } from "react";
import { Leaf, X } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Comunidad", href: "#comunidad" },
  { label: "Eventos", href: "#eventos" },
  { label: "Directiva", href: "#directiva" },
  { label: "PQRSD", action: "open-pqrs" },
  { label: "Contacto", href: "#contacto" },
];

export const Header = () => {
  const [pqrsOpen, setPqrsOpen] = useState(false);
  const [pqrsForm, setPqrsForm] = useState({
    name: "",
    contact: "",
    type: "Petición",
    details: "",
  });
  const [pqrsStatus, setPqrsStatus] = useState(null);

  const handlePqrsChange = (field, value) => {
    setPqrsForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePqrsSubmit = (event) => {
    event.preventDefault();
    if (!pqrsForm.name.trim() || !pqrsForm.details.trim()) {
      setPqrsStatus("Por favor completa tu nombre y la descripción.");
      return;
    }
    setPqrsStatus("Tu envío de PQRSD se ha registrado correctamente.");
    setPqrsForm({ name: "", contact: "", type: "Petición", details: "" });
  };

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
          {links.map((l) =>
            l.action === "open-pqrs" ? (
              <button
                key={l.label}
                type="button"
                onClick={() => setPqrsOpen(true)}
                className="text-sm font-medium text-foreground/70 hover:text-forest-deep transition-colors"
              >
                {l.label}
              </button>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-foreground/70 hover:text-forest-deep transition-colors"
              >
                {l.label}
              </a>
            )
          )}
        </nav>
      </div>

      {pqrsOpen && (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-950/75 px-4 py-6">
          <div className="w-full max-w-2xl rounded-[32px] border border-border bg-card p-6 shadow-deep">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-moss">PQRSD</p>
                <h2 className="mt-2 font-display text-3xl text-forest-deep">Envía tu petición o sugerencia</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPqrsOpen(false);
                  setPqrsStatus(null);
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 text-forest transition hover:bg-forest/20"
                aria-label="Cerrar formulario PQRSD"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handlePqrsSubmit} className="grid gap-4">
              {pqrsStatus && (
                <div className="rounded-2xl border border-forest/20 bg-forest/10 px-4 py-3 text-sm text-forest">
                  {pqrsStatus}
                </div>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-muted-foreground">
                  <span className="block text-forest-deep font-medium">Nombre</span>
                  <input
                    value={pqrsForm.name}
                    onChange={(e) => handlePqrsChange("name", e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </label>
                <label className="space-y-2 text-sm text-muted-foreground">
                  <span className="block text-forest-deep font-medium">Contacto</span>
                  <input
                    value={pqrsForm.contact}
                    onChange={(e) => handlePqrsChange("contact", e.target.value)}
                    placeholder="Email o teléfono"
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </label>
              </div>
              <label className="space-y-2 text-sm text-muted-foreground">
                <span className="block text-forest-deep font-medium">Tipo de solicitud</span>
                <select
                  value={pqrsForm.type}
                  onChange={(e) => handlePqrsChange("type", e.target.value)}
                  className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option>Petición</option>
                  <option>Queja</option>
                  <option>Reclamo</option>
                  <option>Sugerencia</option>
                  <option>Denuncia</option>
                </select>
              </label>
              <label className="space-y-2 text-sm text-muted-foreground">
                <span className="block text-forest-deep font-medium">Describe tu caso</span>
                <textarea
                  value={pqrsForm.details}
                  onChange={(e) => handlePqrsChange("details", e.target.value)}
                  placeholder="Cuéntanos lo que necesitas..."
                  className="w-full min-h-[140px] rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition hover:bg-forest/90"
                >
                  Enviar PQRSD
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPqrsOpen(false);
                    setPqrsStatus(null);
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:bg-secondary/10"
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
