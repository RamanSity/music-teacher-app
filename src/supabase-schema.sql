-- ============================================================
-- مخطط قاعدة بيانات أستوديو النغم (نسخة آمنة)
-- شغّل هذا الملف كامل داخل Supabase: من القائمة الجانبية اختر
-- "SQL Editor" ثم "New query"، الصق هذا الملف كامل ودوس RUN
-- ============================================================

create table students (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references auth.users(id) not null,
  name text not null,
  instrument text not null,
  phone text,
  note text,
  paid boolean default false,
  due_day int,
  access_token text unique not null default encode(gen_random_bytes(12), 'hex'),
  created_at timestamptz default now()
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade not null,
  lesson_date date not null,
  lesson_time time not null
);

alter table students enable row level security;
alter table lessons enable row level security;

-- المعلم المسجل دخوله يشوف ويعدّل طلابه هو بس (ولا حدا غيره، ولا حتى بدون تسجيل دخول)
create policy "teacher_manage_own_students"
  on students for all
  using (auth.uid() = teacher_id)
  with check (auth.uid() = teacher_id);

create policy "teacher_manage_own_lessons"
  on lessons for all
  using (exists (select 1 from students where students.id = lessons.student_id and students.teacher_id = auth.uid()))
  with check (exists (select 1 from students where students.id = lessons.student_id and students.teacher_id = auth.uid()));

-- دالة آمنة: تاخذ رمز الرابط الخاص وتُرجع بس اسم الطالب وآلته ومواعيده
-- (بدون رقم هاتف، بدون ملاحظات، بدون حالة دفع، وبدون أي وصول لطلاب آخرين)
create or replace function get_student_schedule(p_token text)
returns table (student_name text, instrument text, lesson_date date, lesson_time time)
language sql
security definer
set search_path = public
as $$
  select s.name, s.instrument, l.lesson_date, l.lesson_time
  from students s
  left join lessons l on l.student_id = s.id
  where s.access_token = p_token
  order by l.lesson_date nulls last, l.lesson_time nulls last;
$$;

grant execute on function get_student_schedule(text) to anon;
