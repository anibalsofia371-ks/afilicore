
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users see their own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Households
CREATE TABLE public.households (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  house_number TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view households" ON public.households FOR SELECT USING (true);
CREATE POLICY "Admins insert households" ON public.households FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update households" ON public.households FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete households" ON public.households FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Residents
CREATE TABLE public.residents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  birth_date DATE,
  phone TEXT,
  relationship TEXT,
  is_head BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.residents ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_residents_household ON public.residents(household_id);
CREATE INDEX idx_residents_name ON public.residents(full_name);

CREATE POLICY "Public can view residents" ON public.residents FOR SELECT USING (true);
CREATE POLICY "Admins insert residents" ON public.residents FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update residents" ON public.residents FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete residents" ON public.residents FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_households_updated BEFORE UPDATE ON public.households
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_residents_updated BEFORE UPDATE ON public.residents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Seed data de ejemplo
INSERT INTO public.households (id, house_number, address, notes) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Casa 12', 'Calle Principal #12, Sector Norte', 'Esquina con tienda'),
  ('22222222-2222-2222-2222-222222222222', 'Casa 25', 'Avenida Los Pinos #25', NULL),
  ('33333333-3333-3333-3333-333333333333', 'Casa 7',  'Callejón Las Flores #7', 'Frente a la iglesia');

INSERT INTO public.residents (household_id, full_name, birth_date, phone, relationship, is_head) VALUES
  ('11111111-1111-1111-1111-111111111111', 'María González Pérez', '1975-03-12', '+52 555 123 4567', 'Madre', true),
  ('11111111-1111-1111-1111-111111111111', 'Luis González Pérez', '2005-08-22', NULL, 'Hijo', false),
  ('11111111-1111-1111-1111-111111111111', 'Ana González Pérez', '2010-11-04', NULL, 'Hija', false),
  ('22222222-2222-2222-2222-222222222222', 'Roberto Hernández Cruz', '1968-01-30', '+52 555 987 6543', 'Padre', true),
  ('22222222-2222-2222-2222-222222222222', 'Carmen Ruiz de Hernández', '1972-06-18', '+52 555 444 2211', 'Madre', false),
  ('33333333-3333-3333-3333-333333333333', 'Juan Martínez López', '1982-09-09', '+52 555 222 3344', 'Padre', true),
  ('33333333-3333-3333-3333-333333333333', 'Sofía Martínez Vega', '2015-04-17', NULL, 'Hija', false);
