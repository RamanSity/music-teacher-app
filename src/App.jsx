import React, { useState, useMemo } from "react";
import { Music4, Plus, Phone, Check, X, Users, CalendarDays, Wallet, Trash2, Pencil, Clock } from "lucide-react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Markazi+Text:wght@500;700&family=Tajawal:wght@400;500;700;800&display=swap');`;

const TOKENS = {
  bg: "#EDE4D3",
  surface: "#F8F3E8",
  surfaceAlt: "#E4D8BE",
  ink: "#2B2118",
  inkSoft: "#6B5D48",
  gold: "#A97400",
  goldSoft: "#C99A2E",
  rust: "#A8452F",
  sage: "#4F7A5B",
  line: "#C9BCA0",
};

const INSTRUMENTS = ["بيانو", "غيتار", "عود", "كمان", "درامز"];
const dayNames = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const arabicMonths = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

let slotIdCounter = 1000;
const newSlotId = () => slotIdCounter++;

// يبني تاريخ نسبي لعدد أيام معين من اليوم — يُستخدم بس لتوليد بيانات تجريبية واقعية
function relDate(daysFromNow) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

const initialStudents = [
  {
    id: 1,
    name: "ليلا حسن",
    instrument: "بيانو",
    phone: "+49 151 000 001",
    paid: true,
    note: "وصلت لصفحة 12، تحتاج تتمرن على السلم الكبير",
    slots: [
      { id: newSlotId(), date: relDate(1), time: "16:00" },
      { id: newSlotId(), date: relDate(8), time: "16:00" },
      { id: newSlotId(), date: relDate(15), time: "16:00" },
      { id: newSlotId(), date: relDate(22), time: "16:00" },
      { id: newSlotId(), date: relDate(45), time: "16:00" },
    ],
  },
  {
    id: 2,
    name: "روژان كمال",
    instrument: "غيتار",
    phone: "+49 151 000 002",
    paid: false,
    note: "بدها تحضر أغنية جديدة للحفلة",
    slots: [
      { id: newSlotId(), date: relDate(2), time: "17:30" },
      { id: newSlotId(), date: relDate(9), time: "17:30" },
    ],
  },
  {
    id: 3,
    name: "سيروان أحمد",
    instrument: "عود",
    phone: "+49 151 000 003",
    paid: true,
    note: "",
    slots: [{ id: newSlotId(), date: relDate(0), time: "18:00" }],
  },
  {
    id: 4,
    name: "دلين عمر",
    instrument: "كمان",
    phone: "+49 151 000 004",
    paid: false,
    note: "أول درس، محتاجة تشتري قوس جديد",
    slots: [{ id: newSlotId(), date: relDate(3), time: "16:30" }],
  },
];

function timeToY(time) {
  const [h, m] = time.split(":").map(Number);
  const minutesFromNine = (h - 9) * 60 + m;
  const clamped = Math.max(0, Math.min(minutesFromNine, 600));
  return 12 + (clamped / 600) * 176;
}

function parseDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function formatArabicDate(date) {
  return `${dayNames[date.getDay()]}، ${date.getDate()} ${arabicMonths[date.getMonth()]}`;
}
function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function StaffLines() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="w-full h-px" style={{ background: TOKENS.line }} />
      ))}
    </div>
  );
}

function Avatar({ name, color }) {
  const initial = name.trim()[0] || "؟";
  return (
    <div
      className="flex items-center justify-center rounded-full shrink-0 font-bold"
      style={{ width: 40, height: 40, background: color, color: TOKENS.surface, fontFamily: "Tajawal" }}
    >
      {initial}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl p-4 flex-1 min-w-[140px]"
      style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}
    >
      <div className="rounded-full p-2.5" style={{ background: accent + "22" }}>
        <Icon size={20} color={accent} />
      </div>
      <div>
        <div className="text-2xl font-extrabold" style={{ color: TOKENS.ink, fontFamily: "Markazi Text" }}>
          {value}
        </div>
        <div className="text-xs" style={{ color: TOKENS.inkSoft, fontFamily: "Tajawal" }}>
          {label}
        </div>
      </div>
    </div>
  );
}

// صف إدخال موعد واحد: تاريخ فعلي (مو يوم أسبوعي) + وقت
function SlotRow({ slot, onChange, onRemove, canRemove }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        value={slot.date}
        onChange={(e) => onChange({ ...slot, date: e.target.value })}
        className="flex-1 rounded-xl px-2 py-2 text-sm outline-none"
        style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
      />
      <input
        type="time"
        value={slot.time}
        onChange={(e) => onChange({ ...slot, time: e.target.value })}
        className="rounded-xl px-2 py-2 text-sm outline-none"
        style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
      />
      {canRemove && (
        <button type="button" onClick={onRemove} className="shrink-0">
          <X size={16} color={TOKENS.rust} />
        </button>
      )}
    </div>
  );
}

function StudentForm({ initial, onCancel, onSubmit, submitLabel, title }) {
  const [form, setForm] = useState(
    initial || { name: "", instrument: INSTRUMENTS[0], phone: "", note: "", paid: false, slots: [{ id: newSlotId(), date: relDate(7), time: "16:00" }] }
  );
  const [error, setError] = useState("");

  const updateSlot = (id, updated) =>
    setForm({ ...form, slots: form.slots.map((sl) => (sl.id === id ? updated : sl)) });
  const removeSlot = (id) => setForm({ ...form, slots: form.slots.filter((sl) => sl.id !== id) });
  const addSlot = () => setForm({ ...form, slots: [...form.slots, { id: newSlotId(), date: relDate(7), time: "16:00" }] });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "#2B2118AA" }}>
      <div className="w-full max-w-sm rounded-3xl p-6 max-h-[90vh] overflow-y-auto" style={{ background: TOKENS.surface, fontFamily: "Tajawal" }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold" style={{ color: TOKENS.ink }}>
            {title}
          </h3>
          <button onClick={onCancel} className="rounded-full p-1.5" style={{ background: TOKENS.surfaceAlt }}>
            <X size={16} color={TOKENS.ink} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs" style={{ color: TOKENS.inkSoft }}>
              اسم الطالب
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-1 rounded-xl px-3 py-2 outline-none"
              style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
              placeholder="مثال: أفين رشيد"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs" style={{ color: TOKENS.inkSoft }}>
                الآلة
              </label>
              <select
                value={form.instrument}
                onChange={(e) => setForm({ ...form, instrument: e.target.value })}
                className="w-full mt-1 rounded-xl px-3 py-2 outline-none"
                style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
              >
                {INSTRUMENTS.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs" style={{ color: TOKENS.inkSoft }}>
                رقم واتساب
              </label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full mt-1 rounded-xl px-3 py-2 outline-none"
                style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
                placeholder="+49 151 ..."
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs" style={{ color: TOKENS.inkSoft }}>
                مواعيد الدروس (تاريخ محدد لكل درس — أضف كم موعد ما بدك)
              </label>
              <button
                type="button"
                onClick={addSlot}
                className="flex items-center gap-1 text-xs font-bold rounded-full px-2 py-1"
                style={{ background: TOKENS.gold + "22", color: TOKENS.gold }}
              >
                <Plus size={12} /> إضافة موعد آخر
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {form.slots.map((slot) => (
                <SlotRow
                  key={slot.id}
                  slot={slot}
                  onChange={(updated) => updateSlot(slot.id, updated)}
                  onRemove={() => removeSlot(slot.id)}
                  canRemove={form.slots.length > 1}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs" style={{ color: TOKENS.inkSoft }}>
              ملاحظة
            </label>
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              rows={2}
              className="w-full mt-1 rounded-xl px-3 py-2 outline-none resize-none"
              style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
              placeholder="مثال: وصلنا لصفحة 12، يحتاج يتمرن على السلم الكبير"
            />
          </div>

          {error && (
            <div className="text-xs rounded-lg px-3 py-2" style={{ background: TOKENS.rust + "22", color: TOKENS.rust }}>
              {error}
            </div>
          )}

          <button
            onClick={() => {
              if (!form.name.trim()) return setError("لازم تكتب اسم الطالب");
              if (form.slots.some((sl) => !sl.date || !sl.time)) return setError("لازم تحدد تاريخ ووقت لكل موعد");
              setError("");
              onSubmit(form);
            }}
            className="mt-2 rounded-xl py-2.5 font-bold"
            style={{ background: TOKENS.gold, color: TOKENS.surface }}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

const STORAGE_KEY = "music-studio-students-v3";

function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : initialStudents;
  } catch (err) {
    return initialStudents;
  }
}

export default function MusicTeacherApp() {
  const [students, setStudents] = useState(loadStudents);
  const [tab, setTab] = useState("dashboard");
  const [showAdd, setShowAdd] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [saveError, setSaveError] = useState(false);
  const [rangeDays, setRangeDays] = useState(30);

  const persist = (updated) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaveError(false);
    } catch (err) {
      setSaveError(true);
    }
  };

  const tKey = todayKey();

  const todaysLessons = useMemo(() => {
    const list = [];
    students.forEach((s) => (s.slots || []).forEach((slot) => {
      if (slot.date === tKey) list.push({ ...slot, student: s });
    }));
    return list.sort((a, b) => a.time.localeCompare(b.time));
  }, [students, tKey]);

  const upcomingByDate = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + rangeDays);

    const flat = [];
    students.forEach((s) => (s.slots || []).forEach((slot) => {
      const d = parseDate(slot.date);
      if (d >= start && d <= end) flat.push({ date: slot.date, time: slot.time, student: s, slot });
    }));
    flat.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

    const map = new Map();
    flat.forEach((item) => {
      if (!map.has(item.date)) map.set(item.date, { date: item.date, items: [] });
      map.get(item.date).items.push(item);
    });
    return Array.from(map.values());
  }, [students, rangeDays]);

  const unpaidCount = students.filter((s) => !s.paid).length;
  const palette = [TOKENS.gold, TOKENS.sage, TOKENS.rust, TOKENS.goldSoft];

  const togglePaid = (id) => {
    setStudents((s) => {
      const updated = s.map((st) => (st.id === id ? { ...st, paid: !st.paid } : st));
      persist(updated);
      return updated;
    });
  };
  const removeStudent = (id) => {
    setStudents((s) => {
      const updated = s.filter((st) => st.id !== id);
      persist(updated);
      return updated;
    });
  };
  const addStudent = (form) => {
    setStudents((s) => {
      const updated = [...s, { ...form, id: Date.now(), paid: false }];
      persist(updated);
      return updated;
    });
    setShowAdd(false);
  };
  const updateStudent = (form) => {
    setStudents((s) => {
      const updated = s.map((st) => (st.id === form.id ? { ...form } : st));
      persist(updated);
      return updated;
    });
    setEditingStudent(null);
  };

  return (
    <div dir="rtl" className="min-h-screen w-full" style={{ background: TOKENS.bg, fontFamily: "Tajawal" }}>
      <style>{FONT_IMPORT}</style>
      {showAdd && (
        <StudentForm
          title="إضافة طالب جديد"
          submitLabel="حفظ الطالب"
          onCancel={() => setShowAdd(false)}
          onSubmit={addStudent}
        />
      )}
      {editingStudent && (
        <StudentForm
          title={`تعديل بيانات ${editingStudent.name}`}
          submitLabel="حفظ التعديلات"
          initial={editingStudent}
          onCancel={() => setEditingStudent(null)}
          onSubmit={updateStudent}
        />
      )}
      {saveError && (
        <div className="text-center text-xs py-1.5" style={{ background: TOKENS.rust, color: TOKENS.surface }}>
          تعذّر حفظ آخر تعديل — تحقق من الاتصال وحاول مجدداً
        </div>
      )}

      <header className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl p-2.5" style={{ background: TOKENS.ink }}>
            <Music4 size={22} color={TOKENS.gold} />
          </div>
          <div>
            <div className="text-lg font-extrabold" style={{ color: TOKENS.ink }}>
              أستوديو النغم
            </div>
            <div className="text-xs" style={{ color: TOKENS.inkSoft }}>
              مرحباً أ. سردار — {formatArabicDate(new Date())}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 rounded-full px-4 py-2 font-bold text-sm"
          style={{ background: TOKENS.gold, color: TOKENS.surface }}
        >
          <Plus size={16} />
          طالب جديد
        </button>
      </header>

      <nav className="px-5 flex gap-2 mb-5 flex-wrap">
        {[
          { id: "dashboard", label: "لوحة القيادة", icon: CalendarDays },
          { id: "upcoming", label: "الجدول القادم", icon: Clock },
          { id: "students", label: "الطلاب", icon: Users },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition"
            style={{
              background: tab === t.id ? TOKENS.ink : "transparent",
              color: tab === t.id ? TOKENS.gold : TOKENS.inkSoft,
              border: `1px solid ${tab === t.id ? TOKENS.ink : TOKENS.line}`,
            }}
          >
            <t.icon size={15} />
            {t.label}
          </button>
        ))}
      </nav>

      <main className="px-5 pb-16">
        {tab === "dashboard" && (
          <div className="flex flex-col gap-5">
            <div className="flex gap-3 flex-wrap">
              <StatCard icon={Users} label="إجمالي الطلاب" value={students.length} accent={TOKENS.gold} />
              <StatCard icon={CalendarDays} label="دروس اليوم" value={todaysLessons.length} accent={TOKENS.sage} />
              <StatCard icon={Wallet} label="دفعات معلقة" value={unpaidCount} accent={TOKENS.rust} />
            </div>

            <div className="rounded-3xl p-5" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-extrabold" style={{ color: TOKENS.ink, fontFamily: "Markazi Text", fontSize: 22 }}>
                  دروس اليوم على النوتة
                </h2>
                <span className="text-xs" style={{ color: TOKENS.inkSoft }}>
                  9:00 ← 19:00
                </span>
              </div>

              {todaysLessons.length === 0 ? (
                <div className="text-center py-10" style={{ color: TOKENS.inkSoft }}>
                  لا يوجد دروس مجدولة اليوم — يوم راحة 🎵
                </div>
              ) : (
                <div className="relative" style={{ height: 200 }}>
                  <StaffLines />
                  {todaysLessons.map((s, idx) => (
                    <div
                      key={s.id}
                      className="absolute flex items-center gap-2"
                      style={{ top: timeToY(s.time) - 10, right: `${8 + (idx % 4) * 22}%` }}
                    >
                      <div
                        className="rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                        style={{ width: 22, height: 22, background: palette[idx % palette.length], color: TOKENS.surface }}
                      >
                        {s.time.slice(0, 2)}
                      </div>
                    </div>
                  ))}
                  {todaysLessons.map((s, idx) => (
                    <div
                      key={"label-" + s.id}
                      className="absolute text-xs font-bold whitespace-nowrap"
                      style={{
                        top: timeToY(s.time) - 8,
                        right: `${8 + (idx % 4) * 22}%`,
                        marginRight: 28,
                        color: TOKENS.ink,
                      }}
                    >
                      {s.student.name}
                      <span className="block font-normal" style={{ color: TOKENS.inkSoft }}>
                        {s.time} · {s.student.instrument}
                      </span>
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
              {[
                { v: 30, l: "30 يوم" },
                { v: 90, l: "90 يوم" },
                { v: 365, l: "سنة كاملة" },
              ].map((r) => (
                <button
                  key={r.v}
                  onClick={() => setRangeDays(r.v)}
                  className="rounded-full px-3 py-1.5 text-xs font-bold"
                  style={{
                    background: rangeDays === r.v ? TOKENS.gold : TOKENS.surface,
                    color: rangeDays === r.v ? TOKENS.surface : TOKENS.inkSoft,
                    border: `1px solid ${rangeDays === r.v ? TOKENS.gold : TOKENS.line}`,
                  }}
                >
                  {r.l}
                </button>
              ))}
            </div>

            {upcomingByDate.length === 0 ? (
              <div className="text-center py-10 rounded-2xl" style={{ background: TOKENS.surface, color: TOKENS.inkSoft }}>
                ما في دروس مجدولة بهالمدى
              </div>
            ) : (
              upcomingByDate.map(({ date, items }) => (
                <div key={date} className="rounded-2xl p-4" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}>
                  <div className="font-extrabold text-sm mb-2" style={{ color: TOKENS.ink }}>
                    {formatArabicDate(parseDate(date))}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {items.map((item, idx) => (
                      <div
                        key={item.student.id + "-" + item.slot.id + "-" + idx}
                        className="flex items-center justify-between text-sm rounded-xl px-3 py-2"
                        style={{ background: TOKENS.bg }}
                      >
                        <span style={{ color: TOKENS.ink }}>
                          {item.time} — {item.student.name}
                        </span>
                        <span className="text-xs" style={{ color: TOKENS.inkSoft }}>
                          {item.student.instrument}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "students" && (
          <div className="flex flex-col gap-3">
            {students.map((s, i) => (
              <div
                key={s.id}
                className="rounded-2xl p-4 flex items-start gap-3"
                style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}
              >
                <Avatar name={s.name} color={palette[i % palette.length]} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-bold" style={{ color: TOKENS.ink }}>
                      {s.name}
                    </div>
                    <button onClick={() => removeStudent(s.id)}>
                      <Trash2 size={15} color={TOKENS.inkSoft} />
                    </button>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: TOKENS.inkSoft }}>
                    {s.instrument} · {(s.slots || []).length} موعد
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {(s.slots || [])
                      .slice()
                      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
                      .slice(0, 4)
                      .map((slot) => (
                        <span
                          key={slot.id}
                          className="text-xs rounded-full px-2 py-0.5"
                          style={{ background: TOKENS.bg, color: TOKENS.ink }}
                        >
                          {parseDate(slot.date).getDate()}/{parseDate(slot.date).getMonth() + 1} · {slot.time}
                        </span>
                      ))}
                    {(s.slots || []).length > 4 && (
                      <span className="text-xs rounded-full px-2 py-0.5" style={{ background: TOKENS.bg, color: TOKENS.inkSoft }}>
                        +{s.slots.length - 4}
                      </span>
                    )}
                    <button
                      onClick={() => setEditingStudent(s)}
                      className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
                      style={{ background: TOKENS.gold + "22", color: TOKENS.gold }}
                    >
                      <Pencil size={11} />
                      تعديل
                    </button>
                  </div>
                  {s.note && (
                    <div className="text-xs mt-1.5 rounded-lg px-2 py-1" style={{ background: TOKENS.bg, color: TOKENS.inkSoft }}>
                      {s.note}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-1 text-xs" style={{ color: TOKENS.inkSoft }} dir="ltr">
                      <Phone size={12} />
                      {s.phone}
                    </div>
                    <button
                      onClick={() => togglePaid(s.id)}
                      className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
                      style={{
                        background: s.paid ? TOKENS.sage + "22" : TOKENS.rust + "22",
                        color: s.paid ? TOKENS.sage : TOKENS.rust,
                      }}
                    >
                      {s.paid ? <Check size={12} /> : <X size={12} />}
                      {s.paid ? "تم الدفع" : "لم يُدفع"}
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
