import heroImg from "@/assets/community-hero.jpg";
import { Header } from "@/components/Header.jsx";
import { ResidentSearch } from "@/components/ResidentSearch.jsx";
import { Calendar, Heart, Leaf, Mail, MapPin, Phone, Sprout, Users } from "lucide-react";
import { events } from "@/data/events.js";

const leaders = [
  { name: "Yenny Anibal", role: "Presidente", initials: "YA" },
  { name: "Laura Gonzalez", role: "Secretaria", initials: "LG" },
  { name: "Juan Martínez", role: "Tesorero", initials: "JM" },
  { name: "Carmen Ruiz", role: "Vocal", initials: "CR" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Vista aérea de la comunidad afilicore entre montañas verdes"
            width={1600}
            height={1024}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 via-forest-deep/60 to-background" />
        </div>

        <div className="container relative z-10 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream/15 backdrop-blur border border-cream/20 text-cream text-xs font-medium tracking-wider uppercase">
              <Sprout className="h-3 w-3" /> Comunidad afilicore
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl text-cream leading-[0.95] text-balance">
              Una comunidad fuerte no se construye con individuos perfectos, sino con <em className="text-leaf not-italic">personas que se apoyan</em>.
            </h1>
            <p className="mt-6 text-lg text-cream/85 max-w-2xl text-balance">
              El lugar para conocer a los habitantes, compartir lo que pasa en el barrio
              y mantenernos cerca como vecinos. Bienvenida a tu comunidad.
            </p>
          </div>

          {/* Search dropdown */}
          <div className="mt-10 max-w-3xl">
            <ResidentSearch />
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl">
            {[
              { n: "48", l: "Familias" },
              { n: "187", l: "Habitantes" },
              { n: "12", l: "Años unidos" },
            ].map((s) => (
              <div key={s.l} className="text-cream">
                <p className="font-display text-3xl md:text-4xl text-leaf">{s.n}</p>
                <p className="text-xs uppercase tracking-wider text-cream/70">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="comunidad" className="py-24">
        <div className="container grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-moss text-xs font-semibold uppercase tracking-widest">Sobre nosotros</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-forest-deep text-balance">
              Una comunidad construida con manos, historia y cariño.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Esta plataforma surge como un punto de encuentro para la comunidad, donde las ideas, propuestas y necesidades de los vecinos pueden convertirse en acciones concretas. Nuestro objetivo es fomentar la participación, fortalecer la comunicación y contribuir al desarrollo de una comunidad más conectada, organizada y participativa.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: Heart, t: "Solidaridad", d: "Actividades y apoyo entre vecinos." },
                { icon: Leaf, t: "Naturaleza", d: "Cuidado de áreas verdes." },
                { icon: Users, t: "Identidad", d: "Conocemos cada familia." },
                { icon: Sprout, t: "Futuro", d: "Pensamos en los niños." },
              ].map((v) => (
                <div key={v.t} className="flex gap-3">
                  <v.icon className="h-5 w-5 text-moss shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-forest-deep">{v.t}</p>
                    <p className="text-sm text-muted-foreground">{v.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-hero shadow-deep p-10 flex flex-col justify-end">
              <blockquote className="font-display text-2xl md:text-3xl text-cream leading-tight text-balance">
                "la fuerza de una comunidad esta en su gente."
              </blockquote>
              <p className="mt-4 text-leaf text-sm">— Voces de afilicore</p>
            </div>
            <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-leaf/40 blur-2xl -z-0" />
          </div>
        </div>
      </section>

      {/* EVENTOS */}
      <section id="eventos" className="py-24 bg-secondary/40">
        <div className="container">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="text-moss text-xs font-semibold uppercase tracking-widest">Calendario</span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl text-forest-deep">
                Próximas actividades
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Asambleas, faenas y celebraciones que nos mantienen unidos a lo largo del año.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((e) => (
              <div key={e.title} className="rounded-lg border border-border bg-card text-card-foreground shadow-sm p-7 hover:shadow-xl">
                <div className="flex items-center gap-3 text-moss">
                  <Calendar className="h-4 w-4" />
                  <span className="font-display text-2xl text-forest-deep tracking-tight">{e.date}</span>
                </div>
                <h3 className="mt-4 font-display text-xl text-forest-deep">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                <div className="mt-6 h-px bg-border" />
                <p className="mt-4 text-xs uppercase tracking-wider text-sage group-hover:text-moss transition-colors">
                  Salón comunitario →
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTIVA */}
      <section id="directiva" className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-moss text-xs font-semibold uppercase tracking-widest">Directiva</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-forest-deep text-balance">
              Las personas que coordinan nuestra comunidad
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((p) => (
              <div key={p.name} className="text-center group">
                <div className="aspect-square rounded-2xl bg-gradient-hero flex items-center justify-center mb-4 shadow-soft group-hover:shadow-deep transition-shadow">
                  <span className="font-display text-5xl text-leaf">{p.initials}</span>
                </div>
                <p className="font-display text-lg text-forest-deep">{p.name}</p>
                <p className="text-sm text-moss uppercase tracking-wider">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-24 bg-forest-deep text-cream">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-leaf text-xs font-semibold uppercase tracking-widest">Contacto</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-balance">
              ¿Eres vecino o quieres conocernos?
            </h2>
            <p className="mt-4 text-cream/80 leading-relaxed">
              Escríbenos para sumarte a los eventos, proponer una actividad o actualizar
              los datos de tu familia en el directorio.
            </p>
          </div>
          <div className="space-y-5">
            {[
              { icon: MapPin, t: "Salón comunitario afilicore", d: "Calle Principal, Sector barrio las brisas" },
              { icon: Phone, t: "+57 320 123 4567", d: "Lunes a viernes, 9:00 am – 6:00 pm" },
              { icon: Mail, t: "Afilicore@gmail.com", d: "Te respondemos en 24 horas" },
            ].map((c) => (
              <div key={c.t} className="flex gap-4 p-5 rounded-2xl bg-cream/5 border border-cream/10">
                <c.icon className="h-5 w-5 text-leaf shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-cream">{c.t}</p>
                  <p className="text-sm text-cream/70">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 bg-forest-deep border-t border-cream/10 text-cream/60 text-center text-sm">
        <p>© {new Date().getFullYear()} Comunidad afilicore — Hecho con cariño entre vecinos.</p>
      </footer>
    </div>
  );
};

export default Index;
