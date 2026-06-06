import { useState } from "react";
import { households as mockHouseholds } from "@/data/households.js";
import { Search, Home, Phone, Cake, Crown, Users, X } from "lucide-react";

function calcAge(birth) {
  if (!birth) return null;
  const d = new Date(birth);
  const diff = Date.now() - d.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" });
}

export const ResidentSearch = () => {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [households, setHouseholds] = useState(mockHouseholds);
  const [newResident, setNewResident] = useState({
    house_number: "",
    address: "",
    full_name: "",
    birth_date: "",
    phone: "",
    relationship: "",
    is_head: false,
    notes: "",
  });
  const [formMessage, setFormMessage] = useState(null);
  const loading = false;

  const resetForm = () => {
    setNewResident({
      house_number: "",
      address: "",
      full_name: "",
      birth_date: "",
      phone: "",
      relationship: "",
      is_head: false,
      notes: "",
    });
  };

  const handleFormChange = (field, value) => {
    setNewResident((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!newResident.full_name.trim() || !newResident.house_number.trim()) {
      setFormMessage("El nombre y la casa son obligatorios.");
      return;
    }

    const houseNumber = newResident.house_number.trim();
    const householdIndex = households.findIndex(
      (h) => h.house_number.toLowerCase() === houseNumber.toLowerCase()
    );
    const newHouseholdId = `h-${Date.now()}`;
    const newResidentId = `r-${Date.now()}`;
    const resident = {
      id: newResidentId,
      household_id: householdIndex >= 0 ? households[householdIndex].id : newHouseholdId,
      full_name: newResident.full_name.trim(),
      birth_date: newResident.birth_date || null,
      phone: newResident.phone.trim() || null,
      relationship: newResident.relationship.trim() || null,
      is_head: !!newResident.is_head,
    };

    if (householdIndex >= 0) {
      const updatedHouseholds = [...households];
      updatedHouseholds[householdIndex] = {
        ...updatedHouseholds[householdIndex],
        address: updatedHouseholds[householdIndex].address || newResident.address.trim(),
        notes: updatedHouseholds[householdIndex].notes || newResident.notes.trim() || null,
        residents: [...updatedHouseholds[householdIndex].residents, resident],
      };
      setHouseholds(updatedHouseholds);
    } else {
      const newHousehold = {
        id: newHouseholdId,
        house_number: houseNumber,
        address: newResident.address.trim() || "—",
        notes: newResident.notes.trim() || null,
        residents: [resident],
      };
      setHouseholds((current) => [...current, newHousehold]);
    }

    setFormMessage("Habitante registrado correctamente.");
    resetForm();
    setFormOpen(false);
    setOpen(true);
  };

  const q = query.trim().toLowerCase();
  const filtered = q
    ? households
        .map((h) => ({
          ...h,
          residents: h.residents.filter(
            (r) =>
              r.full_name.toLowerCase().includes(q) ||
              (r.phone ?? "").toLowerCase().includes(q) ||
              (r.relationship ?? "").toLowerCase().includes(q)
          ),
        }))
        .filter(
          (h) =>
            h.residents.length > 0 ||
            h.house_number.toLowerCase().includes(q) ||
            h.address.toLowerCase().includes(q)
        )
    : households;

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group w-full flex items-center justify-between gap-4 px-6 py-5 bg-cream border border-border rounded-2xl shadow-soft hover:shadow-deep transition-all"
      >
        <span className="flex items-center gap-3 text-forest-deep">
          <span className="h-10 w-10 rounded-full bg-forest text-cream flex items-center justify-center">
            <Search className="h-4 w-4" />
          </span>
          <span className="text-left">
            <span className="block font-display text-lg leading-tight">Directorio de habitantes</span>
            <span className="block text-xs text-muted-foreground">Busca por nombre, casa, teléfono o parentesco</span>
          </span>
        </span>
        <span className="text-sage font-medium text-sm">{open ? "Cerrar" : "Abrir"}</span>
      </button>

      <button
        onClick={() => setFormOpen((o) => !o)}
        aria-expanded={formOpen}
        className="group mt-3 w-full flex items-center justify-between gap-4 px-6 py-5 bg-cream border border-border rounded-2xl shadow-soft hover:shadow-deep transition-all"
      >
        <span className="flex items-center gap-3 text-forest-deep">
          <span className="h-10 w-10 rounded-full bg-forest text-cream flex items-center justify-center">
            <Users className="h-4 w-4" />
          </span>
          <span className="text-left">
            <span className="block font-display text-lg leading-tight">Registrar habitante</span>
            <span className="block text-xs text-muted-foreground">Añade a un vecino al directorio de la comunidad</span>
          </span>
        </span>
        <span className="text-sage font-medium text-sm">{formOpen ? "Cerrar" : "Abrir"}</span>
      </button>

      {formOpen && (
        <div className="mt-3 bg-card border border-border rounded-2xl shadow-deep p-5 md:p-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <form onSubmit={handleFormSubmit} className="grid gap-4">
            {formMessage && (
              <div className="rounded-xl border border-moss/20 bg-moss/10 px-4 py-3 text-sm text-forest-deep">
                {formMessage}
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-muted-foreground">
                <span className="block text-forest-deep font-medium">Casa</span>
                <input
                  value={newResident.house_number}
                  onChange={(e) => handleFormChange("house_number", e.target.value)}
                  placeholder="Casa 12"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </label>
              <label className="space-y-2 text-sm text-muted-foreground">
                <span className="block text-forest-deep font-medium">Dirección</span>
                <input
                  value={newResident.address}
                  onChange={(e) => handleFormChange("address", e.target.value)}
                  placeholder="Sector Norte #12"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-muted-foreground">
                <span className="block text-forest-deep font-medium">Nombre completo</span>
                <input
                  value={newResident.full_name}
                  onChange={(e) => handleFormChange("full_name", e.target.value)}
                  placeholder="María Pérez"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </label>
              <label className="space-y-2 text-sm text-muted-foreground">
                <span className="block text-forest-deep font-medium">Fecha de nacimiento</span>
                <input
                  type="date"
                  value={newResident.birth_date}
                  onChange={(e) => handleFormChange("birth_date", e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-muted-foreground">
                <span className="block text-forest-deep font-medium">Teléfono</span>
                <input
                  value={newResident.phone}
                  onChange={(e) => handleFormChange("phone", e.target.value)}
                  placeholder="+52 555 000 0000"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </label>
              <label className="space-y-2 text-sm text-muted-foreground">
                <span className="block text-forest-deep font-medium">Parentesco</span>
                <input
                  value={newResident.relationship}
                  onChange={(e) => handleFormChange("relationship", e.target.value)}
                  placeholder="Madre, Hijo, Abuela"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </label>
            </div>
            <label className="flex items-center gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={newResident.is_head}
                onChange={(e) => handleFormChange("is_head", e.target.checked)}
                className="h-4 w-4 rounded border-input text-forest focus-visible:ring-2 focus-visible:ring-ring"
              />
              <span className="text-forest-deep">Es jefe/a de familia</span>
            </label>
            <label className="space-y-2 text-sm text-muted-foreground">
              <span className="block text-forest-deep font-medium">Notas (opcional)</span>
              <textarea
                value={newResident.notes}
                onChange={(e) => handleFormChange("notes", e.target.value)}
                placeholder="Ej. vive en el segundo piso"
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-forest px-5 py-3 text-sm font-semibold text-cream transition hover:bg-forest/90"
            >
              Guardar habitante
            </button>
          </form>
        </div>
      )}

      {open && (
        <div className="mt-3 bg-card border border-border rounded-2xl shadow-deep p-5 md:p-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex gap-2 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej: María, Casa 12, +52 555..."
                className="flex h-12 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Limpiar"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <p className="text-center py-10 text-muted-foreground">Cargando directorio…</p>
          ) : filtered.length === 0 ? (
            <p className="text-center py-10 text-muted-foreground">
              Sin resultados para "<span className="text-foreground font-medium">{query}</span>"
            </p>
          ) : (
            <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-1">
              {filtered.map((h) => {
                const head = h.residents.find((r) => r.is_head);
                return (
                  <div key={h.id} className="rounded-lg border border-border bg-card text-card-foreground shadow-sm p-5 hover:border-sage transition-colors">
                    <header className="flex items-start justify-between gap-4 pb-4 border-b border-border">
                      <div>
                        <div className="flex items-center gap-2 text-forest-deep">
                          <Home className="h-4 w-4" />
                          <h3 className="font-display text-xl">{h.house_number}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{h.address}</p>
                        {h.notes && <p className="text-xs text-muted-foreground italic mt-1">{h.notes}</p>}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                          <Users className="h-3 w-3" />
                          {h.residents.length} {h.residents.length === 1 ? "habitante" : "habitantes"}
                        </span>
                        {head && (
                          <p className="text-xs text-moss mt-2 flex items-center gap-1 justify-end">
                            <Crown className="h-3 w-3" /> {head.full_name}
                          </p>
                        )}
                      </div>
                    </header>

                    <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                      {h.residents.map((r) => {
                        const age = calcAge(r.birth_date);
                        return (
                          <li
                            key={r.id}
                            className="p-3 rounded-lg bg-muted/40 border border-border/60"
                          >
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-forest-deep flex items-center gap-1.5">
                                {r.is_head && <Crown className="h-3.5 w-3.5 text-moss" />}
                                {r.full_name}
                              </p>
                              {r.relationship && (
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                  {r.relationship}
                                </span>
                              )}
                            </div>
                            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                              <p className="flex items-center gap-1.5">
                                <Cake className="h-3 w-3" />
                                {formatDate(r.birth_date)}
                                {age !== null && <span className="text-sage">· {age} años</span>}
                              </p>
                              <p className="flex items-center gap-1.5">
                                <Phone className="h-3 w-3" />
                                {r.phone ?? "Sin teléfono"}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
