-- ========================================
-- SERTEC - CONFIGURACIÓN COMPLETA DE BASE DE DATOS
-- Ejecuta este script en el SQL Editor de Supabase
-- ========================================

-- 0. TABLA PROJECTS
-- Guarda los proyectos de la galería fotográfica y de videos
create table if not exists projects (
  id bigint primary key generated always as identity,
  src text not null,
  alt text not null,
  type text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar Row Level Security y permitir todo acceso ya que la app confía en frontend
alter table projects enable row level security;
create policy "Público general puede gestionar proyectos"
  on projects for all
  using (true)
  with check (true);

-- 1. TABLA BLOG POSTS
-- Guarda todos los artículos del blog generados con IA
create table if not exists blog_posts (
  id bigint primary key generated always as identity,
  title text not null,
  date text not null,
  read_time text not null,
  excerpt text not null,
  content text not null,
  image text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Índice para búsquedas más rápidas por fecha
create index if not exists blog_posts_created_at_idx on blog_posts(created_at desc);

-- Habilitar Row Level Security (Seguridad)
alter table blog_posts enable row level security;

-- Política: Todo el mundo puede LEER los posts
create policy "Público puede ver posts"
  on blog_posts for select
  using (true);

-- Política: Solo admins autenticados pueden CREAR posts
create policy "Admins pueden crear posts"
  on blog_posts for insert
  with check (true);

-- Política: Solo admins autenticados pueden ACTUALIZAR posts
create policy "Admins pueden actualizar posts"
  on blog_posts for update
  using (true);

-- Política: Solo admins autenticados pueden ELIMINAR posts
create policy "Admins pueden eliminar posts"
  on blog_posts for delete
  using (true);


-- 2. TABLA CONTACT SUBMISSIONS
-- Guarda todos los mensajes del formulario de contacto
create table if not exists contact_submissions (
  id bigint primary key generated always as identity,
  name text not null,
  surname text not null,
  email text not null,
  message text not null,
  status text default 'pending' check (status in ('pending', 'read', 'replied', 'archived')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  ip_address text,
  user_agent text
);

-- Índice para búsquedas por estado y fecha
create index if not exists contact_submissions_status_idx on contact_submissions(status);
create index if not exists contact_submissions_created_at_idx on contact_submissions(created_at desc);
create index if not exists contact_submissions_email_idx on contact_submissions(email);

-- Habilitar Row Level Security
alter table contact_submissions enable row level security;

-- Política: Cualquiera puede ENVIAR un mensaje (INSERT)
create policy "Cualquiera puede enviar formulario"
  on contact_submissions for insert
  with check (true);

-- Política: Solo admins pueden VER los mensajes
create policy "Solo admins pueden ver mensajes"
  on contact_submissions for select
  using (auth.role() = 'authenticated');

-- Política: Solo admins pueden ACTUALIZAR el estado
create policy "Solo admins pueden actualizar estado"
  on contact_submissions for update
  using (auth.role() = 'authenticated');

-- Política: Solo admins pueden ELIMINAR mensajes
create policy "Solo admins pueden eliminar mensajes"
  on contact_submissions for delete
  using (auth.role() = 'authenticated');


-- 3. FUNCIÓN PARA ACTUALIZAR EL CAMPO updated_at AUTOMÁTICAMENTE
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger para actualizar automáticamente updated_at en blog_posts
create trigger set_updated_at
  before update on blog_posts
  for each row
  execute function handle_updated_at();


-- 4. VISTA PARA ESTADÍSTICAS DEL PANEL ADMIN (OPCIONAL PERO ÚTIL)
create or replace view admin_stats as
select
  (select count(*) from blog_posts) as total_posts,
  (select count(*) from contact_submissions) as total_submissions,
  (select count(*) from contact_submissions where status = 'pending') as pending_submissions,
  (select count(*) from contact_submissions where created_at > now() - interval '7 days') as submissions_this_week;

-- Permitir que admins vean las estadísticas
grant select on admin_stats to authenticated;


-- ========================================
-- FIN DE LA CONFIGURACIÓN
-- ========================================
-- Para verificar que todo se creó correctamente, ejecuta:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
