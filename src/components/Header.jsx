import { useState } from "react";
import { Leaf, X } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Comunidad", href: "#comunidad" },
  { label: "Eventos", href: "#eventos" },
  { label: "Directiva", href: "#directiva" },
  { label: "Noticias", action: "open-news" },
  { label: "PQRSD", action: "open-pqrs" },
  { label: "Contacto", href: "#contacto" },
];

export const Header = () => {
  const [pqrsOpen, setPqrsOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [pqrsForm, setPqrsForm] = useState({
    name: "",
    contact: "",
    type: "Petición",
    details: "",
  });
  const [pqrsStatus, setPqrsStatus] = useState(null);

  const newsItems = [
    {
      title: "Subsidios del gobierno",
      description:
        "Verifica si tu hogar es beneficiario de los apoyos recientes. Si tu familia sale favorecida, recibirás información oficial sobre cómo cobrarlo.",
      badge: "Ayuda",
      beneficiaries: [
        "Lucía Pérez",
        "Carlos Gómez",
        "Ana Martínez",
        "Luis Torres",
      ],
    },
    {
      title: "Datos importantes de la comunidad",
      description:
        "Somos 8 familias y 20 habitantes unidos. Mantente informado sobre eventos, servicios y oportunidades de apoyo social.",
      badge: "Comunidad",
    },
  ];

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
          {links.map((l) => {
            const isActive = activeLink === l.label;

            if (l.action === "open-pqrs") {
              return (
                <button
                  key={l.label}
                  type="button"
                  onClick={() => {
                    setPqrsOpen(true);
                    setActiveLink(l.label);
                  }}
                  className="group relative inline-flex items-center px-1 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-forest-deep"
                >
                  <span className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-forest-deep transition-all duration-200 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                  <span className={isActive ? "text-forest-deep" : ""}>{l.label}</span>
                </button>
              );
            }

            if (l.action === "open-news") {
              return (
                <button
                  key={l.label}
                  type="button"
                  onClick={() => {
                    setNewsOpen(true);
                    setActiveLink(l.label);
                  }}
                  className="group relative inline-flex items-center px-1 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-forest-deep"
                >
                  <span className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-forest-deep transition-all duration-200 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                  <span className={isActive ? "text-forest-deep" : ""}>{l.label}</span>
                </button>
              );
            }

            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setActiveLink(l.label)}
                className="group relative inline-flex items-center px-1 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-forest-deep"
              >
                <span className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-forest-deep transition-all duration-200 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                <span className={isActive ? "text-forest-deep" : ""}>{l.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {newsOpen && (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-950/80 px-4 py-6">
          <div className="w-full max-w-3xl rounded-[32px] border border-border bg-card p-6 shadow-deep">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-moss">Noticias</p>
                <h2 className="mt-2 font-display text-3xl text-forest-deep">Actualización de apoyo y comunidad</h2>
              </div>
              <button
                type="button"
                onClick={() => setNewsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 text-forest transition hover:bg-forest/20"
                aria-label="Cerrar noticias"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4">
              {newsItems.map((item) => (
                <article key={item.title} className="rounded-3xl border border-border bg-background/80 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-forest-deep">{item.title}</h3>
                    <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold uppercase text-forest">
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  {item.beneficiaries && (
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p className="font-medium text-forest-deep">Personas beneficiadas</p>
                      <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-foreground">
                        {item.beneficiaries.map((name) => (
                          <li key={name} className="rounded-2xl bg-background/80 px-3 py-2 border border-border">
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {pqrsOpen && (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-950/75 px-4 py-6">
          <div className="w-full max-w-2xl rounded-[32px] border border-border bg-card p-6 shadow-deep">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-3xl text-forest-deep">PQRSD</h2>
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
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
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
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition hover:bg-forest/90"
                >
                  Enviar PQRSD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
