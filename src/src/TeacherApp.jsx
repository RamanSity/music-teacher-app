import React, { useState, useMemo, useEffect } from "react";
import { Music4, Plus, Phone, Check, X, Users, CalendarDays, Wallet, Trash2, Pencil, Clock, Globe, Bell, LogOut, Link2 } from "lucide-react";
import { supabase } from "./supabaseClient";
import {
  TOKENS, FONT_IMPORT, LANGS, STR, INSTRUMENT_KEYS, INSTRUMENT_LABELS,
  parseDate, formatDate, todayKey, daysUntilDue, timeToY,
} from "./shared";

let slotIdCounter = 1;
const newSlotId = () => "new-" + slotIdCounter++;
function relDate(daysFromNow) {
  const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

function StaffLines() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none">
      {[0, 1, 2, 3, 4].map((i) => <div key={i} className="w-full h-px" style={{ background: TOKENS.line }} />)}
    </div>
  );
}
function Avatar({ name, color }) {
  return <div className="flex items-center justify-center rounded-full shrink-0 font-bold" style={{ width: 40, height: 40, background: color, color: TOKENS.surface }}>{name.trim()[0] || "؟"}</div>;
}
function StatCard({ icon: Icon, label, value, accent, onClick }) {
  return (
    <div onClick={onClick} className="flex items-center gap-3 rounded-2xl p-4 flex-1 min-w-[140px]" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}`, cursor: onClick ? "pointer" : "default" }}>
      <div className="rounded-full p-2.5" style={{ background: accent + "22" }}><Icon size={20} color={accent} /></div>
      <div>
        <div className="text-2xl font-extrabold" style={{ color: TOKENS.ink, fontFamily: "Markazi Text" }}>{value}</div>
        <div className="text-xs" style={{ color: TOKENS.inkSoft }}>{label}</div>
      </div>
    </div>
  );
}
function SlotRow({ slot, onChange, onRemove, canRemove }) {
  return (
    <div className="flex items-center gap-2">
      <input type="date" value={slot.date} onChange={(e) => onChange({ ...slot, date: e.target.value })} className="flex-1 rounded-xl px-2 py-2 text-sm outline-none" style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }} />
      <input type="time" value={slot.time} onChange={(e) => onChange({ ...slot, time: e.target.value })} className="rounded-xl px-2 py-2 text-sm outline-none" style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }} />
      {canRemove && <button type="button" onClick={onRemove} className="shrink-0"><X size={16} color={TOKENS.rust} /></button>}
    </div>
  );
}

function StudentForm({ initial, onCancel, onSubmit, t, lang }) {
  const [form, setForm] = useState(initial || { name: "", instrument: INSTRUMENT_KEYS[0], phone: "", note: "", paid: false, dueDay: 1, slots: [{ id: newSlotId(), date: relDate(7), time: "16:00" }] });
  const [error, setError] = useState("");
  const [recurStart, setRecurStart] = useState(relDate(7));
  const [recurTime, setRecurTime] = useState("16:00");
  const [recurCount, setRecurCount] = useState(8);
  const [recurWeeks, setRecurWeeks] = useState(1);
  const [saving, setSaving] = useState(false);

  const updateSlot = (id, u) => setForm({ ...form, slots: form.slots.map((sl) => (sl.id === id ? u : sl)) });
  const removeSlot = (id) => setForm({ ...form, slots: form.slots.filter((sl) => sl.id !== id) });
  const addSlot = () => setForm({ ...form, slots: [...form.slots, { id: newSlotId(), date: relDate(7), time: "16:00" }] });
  const generateRecurring = () => {
    const base = parseDate(recurStart);
    const ns = [];
    for (let i = 0; i < recurCount; i++) {
      const d = new Date(base); d.setDate(base.getDate() + i * 7 * recurWeeks);
      ns.push({ id: newSlotId(), date: d.toISOString().slice(0, 10), time: recurTime });
    }
    setForm({ ...form, slots: [...form.slots, ...ns] });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "#2B2118AA" }}>
      <div className="w-full max-w-sm rounded-3xl p-6 max-h-[90vh] overflow-y-auto" style={{ background: TOKENS.surface }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold" style={{ color: TOKENS.ink }}>{initial ? `${t.formEditTitle} ${initial.name}` : t.formAddTitle}</h3>
          <button onClick={onCancel} className="rounded-full p-1.5" style={{ background: TOKENS.surfaceAlt }}><X size={16} color={TOKENS.ink} /></button>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs" style={{ color: TOKENS.inkSoft }}>{t.nameLabel}</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full mt-1 rounded-xl px-3 py-2 outline-none" style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }} placeholder={t.namePlaceholder} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs" style={{ color: TOKENS.inkSoft }}>{t.instrumentLabel}</label>
              <select value={form.instrument} onChange={(e) => setForm({ ...form, instrument: e.target.value })} className="w-full mt-1 rounded-xl px-3 py-2 outline-none" style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}>
                {INSTRUMENT_KEYS.map((k) => <option key={k} value={k}>{INSTRUMENT_LABELS[lang][k]}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs" style={{ color: TOKENS.inkSoft }}>{t.phoneLabel}</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full mt-1 rounded-xl px-3 py-2 outline-none" style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }} placeholder="+49 151 ..." dir="ltr" />
            </div>
          </div>
          <div>
            <label className="text-xs" style={{ color: TOKENS.inkSoft }}>{t.dueDayLabel}</label>
            <input type="number" min={1} max={31} value={form.dueDay} onChange={(e) => setForm({ ...form, dueDay: Math.max(1, Math.min(31, Number(e.target.value))) })} className="w-full mt-1 rounded-xl px-3 py-2 outline-none" style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }} />
            <div className="text-[10px] mt-0.5" style={{ color: TOKENS.inkSoft }}>{t.dueDayHint}</div>
          </div>
          <div className="rounded-2xl p-3" style={{ background: TOKENS.surfaceAlt }}>
            <div className="text-xs font-bold mb-2" style={{ color: TOKENS.ink }}>{t.quickAddTitle}</div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="text-[10px]" style={{ color: TOKENS.inkSoft }}>{t.firstLessonDate}</label>
                <input type="date" value={recurStart} onChange={(e) => setRecurStart(e.target.value)} className="w-full mt-0.5 rounded-lg px-2 py-1.5 text-sm outline-none" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }} />
              </div>
              <div>
                <label className="text-[10px]" style={{ color: TOKENS.inkSoft }}>{t.timeLabel}</label>
                <input type="time" value={recurTime} onChange={(e) => setRecurTime(e.target.value)} className="w-full mt-0.5 rounded-lg px-2 py-1.5 text-sm outline-none" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }} />
              </div>
              <div>
                <label className="text-[10px]" style={{ color: TOKENS.inkSoft }}>{t.recurrence}</label>
                <select value={recurWeeks} onChange={(e) => setRecurWeeks(Number(e.target.value))} className="w-full mt-0.5 rounded-lg px-2 py-1.5 text-sm outline-none" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}>
                  <option value={1}>{t.weekly}</option><option value={2}>{t.biweekly}</option><option value={4}>{t.monthly}</option>
                </select>
              </div>
              <div>
                <label className="text-[10px]" style={{ color: TOKENS.inkSoft }}>{t.countLabel}</label>
                <input type="number" min={1} max={52} value={recurCount} onChange={(e) => setRecurCount(Math.max(1, Math.min(52, Number(e.target.value))))} className="w-full mt-0.5 rounded-lg px-2 py-1.5 text-sm outline-none" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }} />
              </div>
            </div>
            <button type="button" onClick={generateRecurring} className="w-full rounded-lg py-1.5 text-xs font-bold" style={{ background: TOKENS.gold, color: TOKENS.surface }}>{t.generate(recurCount)}</button>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs" style={{ color: TOKENS.inkSoft }}>{t.slotsLabel}</label>
              <button type="button" onClick={addSlot} className="flex items-center gap-1 text-xs font-bold rounded-full px-2 py-1" style={{ background: TOKENS.gold + "22", color: TOKENS.gold }}><Plus size={12} /> {t.addSlot}</button>
            </div>
            <div className="flex flex-col gap-2">
              {form.slots.map((slot) => <SlotRow key={slot.id} slot={slot} onChange={(u) => updateSlot(slot.id, u)} onRemove={() => removeSlot(slot.id)} canRemove={form.slots.length > 1} />)}
            </div>
          </div>
          <div>
            <label className="text-xs" style={{ color: TOKENS.inkSoft }}>{t.noteLabel}</label>
            <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={2} className="w-full mt-1 rounded-xl px-3 py-2 outline-none resize-none" style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }} placeholder={t.notePlaceholder} />
          </div>
          {error && <div className="text-xs rounded-lg px-3 py-2" style={{ background: TOKENS.rust + "22", color: TOKENS.rust }}>{error}</div>}
          <button
            disabled={saving}
            onClick={async () => {
              if (!form.name.trim()) return setError(t.errName);
              if (form.slots.some((sl) => !sl.date || !sl.time)) return setError(t.errSlots);
              setError(""); setSaving(true);
              await onSubmit(form);
              setSaving(false);
            }}
            className="mt-2 rounded-xl py-2.5 font-bold" style={{ background: TOKENS.gold, color: TOKENS.surface, opacity: saving ? 0.6 : 1 }}
          >
            {initial ? t.saveEdit : t.saveNew}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TeacherApp({ session, lang, setLang }) {
  const [students, setStudents] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [showAdd, setShowAdd] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showUnpaid, setShowUnpaid] = useState(false);
  const [rangeDays, setRangeDays] = useState(30);
  const [copiedId, setCopiedId] = useState(null);

  const t = STR[lang];
  const dir = LANGS.find((l) => l.code === lang).dir;

  const loadStudents = async () => {
    const { data, error } = await supabase.from("students").select("*, lessons(*)").order("created_at");
    if (error || !data) return;
    setStudents(data.map((s) => ({
      ...s, dueDay: s.due_day,
      slots: (s.lessons || []).map((l) => ({ id: l.id, date: l.lesson_date, time: l.lesson_time })),
    })));
  };

  useEffect(() => { loadStudents(); }, []);

  const tKey = todayKey();
  const todaysLessons = useMemo(() => {
    const list = [];
    students.forEach((s) => (s.slots || []).forEach((slot) => { if (slot.date === tKey) list.push({ ...slot, student: s }); }));
    return list.sort((a, b) => a.time.localeCompare(b.time));
  }, [students, tKey]);

  const upcomingByDate = useMemo(() => {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const end = new Date(start); end.setDate(start.getDate() + rangeDays);
    const flat = [];
    students.forEach((s) => (s.slots || []).forEach((slot) => {
      const d = parseDate(slot.date);
      if (d >= start && d <= end) flat.push({ date: slot.date, time: slot.time, student: s, slot });
    }));
    flat.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    const map = new Map();
    flat.forEach((item) => { if (!map.has(item.date)) map.set(item.date, { date: item.date, items: [] }); map.get(item.date).items.push(item); });
    return Array.from(map.values());
  }, [students, rangeDays]);

  const unpaidCount = students.filter((s) => !s.paid).length;
  const unpaidDetails = useMemo(() => {
    return students.filter((s) => !s.paid).map((s) => {
      const pastSlots = (s.slots || []).filter((sl) => sl.date <= tKey).sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
      return { student: s, lastLessonDate: pastSlots[0] ? pastSlots[0].date : null, overdueLessons: pastSlots.length };
    }).sort((a, b) => (a.lastLessonDate || "9999").localeCompare(b.lastLessonDate || "9999"));
  }, [students, tKey]);

  const dueAlerts = useMemo(() => {
    return students.filter((s) => !s.paid && s.dueDay).map((s) => ({ student: s, days: daysUntilDue(s.dueDay) })).filter((x) => x.days <= 3).sort((a, b) => a.days - b.days);
  }, [students]);

  const palette = [TOKENS.gold, TOKENS.sage, TOKENS.rust, TOKENS.goldSoft];

  const togglePaid = async (id) => {
    const st = students.find((s) => s.id === id);
    await supabase.from("students").update({ paid: !st.paid }).eq("id", id);
    loadStudents();
  };
  const removeStudent = async (id) => {
    await supabase.from("students").delete().eq("id", id);
    loadStudents();
  };
  const addStudent = async (form) => {
    const { data: newStudent, error } = await supabase.from("students").insert({
      teacher_id: session.user.id, name: form.name, instrument: form.instrument,
      phone: form.phone, note: form.note, due_day: form.dueDay, paid: false,
    }).select().single();
    if (error || !newStudent) return;
    const rows = form.slots.map((sl) => ({ student_id: newStudent.id, lesson_date: sl.date, lesson_time: sl.time }));
    if (rows.length) await supabase.from("lessons").insert(rows);
    setShowAdd(false);
    loadStudents();
  };
  const updateStudent = async (form) => {
    await supabase.from("students").update({
      name: form.name, instrument: form.instrument, phone: form.phone, note: form.note, due_day: form.dueDay,
    }).eq("id", form.id);
    await supabase.from("lessons").delete().eq("student_id", form.id);
    const rows = form.slots.map((sl) => ({ student_id: form.id, lesson_date: sl.date, lesson_time: sl.time }));
    if (rows.length) await supabase.from("lessons").insert(rows);
    setEditingStudent(null);
    loadStudents();
  };

  const exportBackup = () => {
    const blob = new Blob([JSON.stringify(students, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `backup-${tKey}.json`; a.click();
    URL.revokeObjectURL(url);
  };
  const copyStudentLink = (student) => {
    const link = `${window.location.origin}${window.location.pathname}?student=${student.access_token}`;
    navigator.clipboard.writeText(link);
    setCopiedId(student.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div dir={dir} className="min-h-screen w-full" style={{ background: TOKENS.bg, fontFamily: "Tajawal" }}>
      <style>{FONT_IMPORT}</style>
      {showAdd && <StudentForm t={t} lang={lang} onCancel={() => setShowAdd(false)} onSubmit={addStudent} />}
      {editingStudent && <StudentForm t={t} lang={lang} initial={editingStudent} onCancel={() => setEditingStudent(null)} onSubmit={updateStudent} />}

      {showUnpaid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "#2B2118AA" }}>
          <div className="w-full max-w-sm rounded-3xl p-6 max-h-[85vh] overflow-y-auto" style={{ background: TOKENS.surface }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: TOKENS.ink }}>{t.unpaidTitle} ({unpaidDetails.length})</h3>
              <button onClick={() => setShowUnpaid(false)} className="rounded-full p-1.5" style={{ background: TOKENS.surfaceAlt }}><X size={16} color={TOKENS.ink} /></button>
            </div>
            {unpaidDetails.length === 0 ? (
              <div className="text-center py-8 text-sm" style={{ color: TOKENS.inkSoft }}>{t.noUnpaid}</div>
            ) : (
              <div className="flex flex-col gap-2">
                {unpaidDetails.map(({ student, lastLessonDate, overdueLessons }) => (
                  <div key={student.id} className="rounded-2xl p-3" style={{ background: TOKENS.bg }}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm" style={{ color: TOKENS.ink }}>{student.name}</span>
                      <button onClick={() => togglePaid(student.id)} className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: TOKENS.sage + "22", color: TOKENS.sage }}><Check size={11} />{t.markPaid}</button>
                    </div>
                    <div className="text-xs mt-1" style={{ color: TOKENS.inkSoft }}>
                      {lastLessonDate ? `${t.lastLesson}: ${formatDate(parseDate(lastLessonDate), lang)} · ${overdueLessons} ${t.overdueLessons}` : t.noPastLessons}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <header className="px-5 pt-6 pb-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl p-2.5" style={{ background: TOKENS.ink }}><Music4 size={22} color={TOKENS.gold} /></div>
          <div>
            <div className="text-lg font-extrabold" style={{ color: TOKENS.ink }}>{t.brand}</div>
            <div className="text-xs" style={{ color: TOKENS.inkSoft }}>{t.greeting} {session.user.email} — {formatDate(new Date(), lang)}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full px-2 py-1.5" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}>
            <Globe size={14} color={TOKENS.inkSoft} />
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="text-xs font-bold outline-none bg-transparent" style={{ color: TOKENS.ink }}>
              {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </div>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 rounded-full px-4 py-2 font-bold text-sm" style={{ background: TOKENS.gold, color: TOKENS.surface }}><Plus size={16} />{t.addStudent}</button>
          <button onClick={() => supabase.auth.signOut()} className="rounded-full p-2" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }} title={t.signOut}><LogOut size={16} color={TOKENS.inkSoft} /></button>
        </div>
      </header>

      <nav className="px-5 flex gap-2 mb-5 flex-wrap">
        {[{ id: "dashboard", label: t.navDashboard, icon: CalendarDays }, { id: "upcoming", label: t.navUpcoming, icon: Clock }, { id: "students", label: t.navStudents, icon: Users }].map((tb) => (
          <button key={tb.id} onClick={() => setTab(tb.id)} className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition" style={{ background: tab === tb.id ? TOKENS.ink : "transparent", color: tab === tb.id ? TOKENS.gold : TOKENS.inkSoft, border: `1px solid ${tab === tb.id ? TOKENS.ink : TOKENS.line}` }}>
            <tb.icon size={15} />{tb.label}
          </button>
        ))}
      </nav>

      <main className="px-5 pb-16">
        {tab === "dashboard" && (
          <div className="flex flex-col gap-5">
            <div className="flex gap-3 flex-wrap">
              <StatCard icon={Users} label={t.statStudents} value={students.length} accent={TOKENS.gold} />
              <StatCard icon={CalendarDays} label={t.statToday} value={todaysLessons.length} accent={TOKENS.sage} />
              <StatCard icon={Wallet} label={t.statPending} value={unpaidCount} accent={TOKENS.rust} onClick={() => setShowUnpaid(true)} />
            </div>
            {dueAlerts.length > 0 && (
              <div className="rounded-3xl p-4" style={{ background: TOKENS.rust + "15", border: `1px solid ${TOKENS.rust}55` }}>
                <div className="flex items-center gap-2 mb-2"><Bell size={16} color={TOKENS.rust} /><span className="font-bold text-sm" style={{ color: TOKENS.rust }}>{t.dueAlerts}</span></div>
                <div className="flex flex-col gap-1.5">
                  {dueAlerts.map(({ student, days }) => (
                    <div key={student.id} className="flex items-center justify-between text-sm rounded-xl px-3 py-2" style={{ background: TOKENS.surface }}>
                      <span style={{ color: TOKENS.ink }}>{student.name}</span>
                      <span className="text-xs font-bold" style={{ color: TOKENS.rust }}>{t.dueSoon(days)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="rounded-3xl p-5" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-extrabold" style={{ color: TOKENS.ink, fontFamily: "Markazi Text", fontSize: 22 }}>{t.todaysLessons}</h2>
                <span className="text-xs" style={{ color: TOKENS.inkSoft }}>9:00 → 19:00</span>
              </div>
              {todaysLessons.length === 0 ? (
                <div className="text-center py-10" style={{ color: TOKENS.inkSoft }}>{t.noLessonsToday}</div>
              ) : (
                <div className="relative" style={{ height: 200 }}>
                  <StaffLines />
                  {todaysLessons.map((s, idx) => (
                    <div key={s.id} className="absolute flex items-center gap-2" style={{ top: timeToY(s.time) - 10, insetInlineEnd: `${8 + (idx % 4) * 22}%` }}>
                      <div className="rounded-full flex items-center justify-center font-bold text-xs shrink-0" style={{ width: 22, height: 22, background: palette[idx % palette.length], color: TOKENS.surface }}>{s.time.slice(0, 2)}</div>
                    </div>
                  ))}
                  {todaysLessons.map((s, idx) => (
                    <div key={"l-" + s.id} className="absolute text-xs font-bold whitespace-nowrap" style={{ top: timeToY(s.time) - 8, insetInlineEnd: `${8 + (idx % 4) * 22}%`, marginInlineEnd: 28, color: TOKENS.ink }}>
                      {s.student.name}<span className="block font-normal" style={{ color: TOKENS.inkSoft }}>{s.time} · {INSTRUMENT_LABELS[lang][s.student.instrument]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "upcoming" && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              {[{ v: 30, l: t.range30 }, { v: 90, l: t.range90 }, { v: 365, l: t.range365 }].map((r) => (
                <button key={r.v} onClick={() => setRangeDays(r.v)} className="rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: rangeDays === r.v ? TOKENS.gold : TOKENS.surface, color: rangeDays === r.v ? TOKENS.surface : TOKENS.inkSoft, border: `1px solid ${rangeDays === r.v ? TOKENS.gold : TOKENS.line}` }}>{r.l}</button>
              ))}
            </div>
            {upcomingByDate.length === 0 ? (
              <div className="text-center py-10 rounded-2xl" style={{ background: TOKENS.surface, color: TOKENS.inkSoft }}>{t.noUpcoming}</div>
            ) : upcomingByDate.map(({ date, items }) => (
              <div key={date} className="rounded-2xl p-4" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}>
                <div className="font-extrabold text-sm mb-2" style={{ color: TOKENS.ink }}>{formatDate(parseDate(date), lang)}</div>
                <div className="flex flex-col gap-1.5">
                  {items.map((item, idx) => (
                    <div key={item.student.id + "-" + item.slot.id + "-" + idx} className="flex items-center justify-between text-sm rounded-xl px-3 py-2" style={{ background: TOKENS.bg }}>
                      <span style={{ color: TOKENS.ink }}>{item.time} — {item.student.name}</span>
                      <span className="text-xs" style={{ color: TOKENS.inkSoft }}>{INSTRUMENT_LABELS[lang][item.student.instrument]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "students" && (
          <div className="flex flex-col gap-3">
            <button onClick={exportBackup} className="flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}>{t.backupDownload}</button>
            {students.map((s, i) => (
              <div key={s.id} className="rounded-2xl p-4 flex items-start gap-3" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}>
                <Avatar name={s.name} color={palette[i % palette.length]} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-bold" style={{ color: TOKENS.ink }}>{s.name}</div>
                    <button onClick={() => removeStudent(s.id)}><Trash2 size={15} color={TOKENS.inkSoft} /></button>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: TOKENS.inkSoft }}>{INSTRUMENT_LABELS[lang][s.instrument]} · {(s.slots || []).length} {t.lessonsCount}</div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {(s.slots || []).slice().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).slice(0, 4).map((slot) => (
                      <span key={slot.id} className="text-xs rounded-full px-2 py-0.5" style={{ background: TOKENS.bg, color: TOKENS.ink }}>{parseDate(slot.date).getDate()}/{parseDate(slot.date).getMonth() + 1} · {slot.time}</span>
                    ))}
                    {(s.slots || []).length > 4 && <span className="text-xs rounded-full px-2 py-0.5" style={{ background: TOKENS.bg, color: TOKENS.inkSoft }}>+{s.slots.length - 4}</span>}
                    <button onClick={() => setEditingStudent(s)} className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs" style={{ background: TOKENS.gold + "22", color: TOKENS.gold }}><Pencil size={11} />{t.edit}</button>
                    <button onClick={() => copyStudentLink(s)} className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs" style={{ background: TOKENS.sage + "22", color: TOKENS.sage }}>
                      <Link2 size={11} />{copiedId === s.id ? t.linkCopied : t.copyLink}
                    </button>
                  </div>
                  {s.note && <div className="text-xs mt-1.5 rounded-lg px-2 py-1" style={{ background: TOKENS.bg, color: TOKENS.inkSoft }}>{s.note}</div>}
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-1 text-xs" style={{ color: TOKENS.inkSoft }} dir="ltr"><Phone size={12} />{s.phone}</div>
                    <button onClick={() => togglePaid(s.id)} className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold" style={{ background: s.paid ? TOKENS.sage + "22" : TOKENS.rust + "22", color: s.paid ? TOKENS.sage : TOKENS.rust }}>
                      {s.paid ? <Check size={12} /> : <X size={12} />}{s.paid ? t.paid : t.unpaid}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
