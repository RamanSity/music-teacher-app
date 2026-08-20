import React, { useState, useMemo } from "react";
import { Music4, Plus, Phone, Check, X, Users, CalendarDays, Wallet, Trash2, Pencil } from "lucide-react";

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

const initialStudents = [
  { id: 1, name: "ليلا حسن", instrument: "بيانو", day: "الإثنين", time: "16:00", phone: "+49 151 000 001", paid: true, note: "وصلت لصفحة 12، تحتاج تتمرن على السلم الكبير" },
  { id: 2, name: "روژان كمال", instrument: "غيتار", day: "الثلاثاء", time: "17:30", phone: "+49 151 000 002", paid: false, note: "بدها تحضر أغنية جديدة للحفلة" },
  { id: 3, name: "سيروان أحمد", instrument: "عود", day: "الأربعاء", time: "18:00", phone: "+49 151 000 003", paid: true, note: "" },
  { id: 4, name: "دلين عمر", instrument: "كمان", day: "الخميس", time: "16:30", phone: "+49 151 000 004", paid: false, note: "أول درس، محتاجة تشتري قوس جديد" },
];

const dayOrder = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const today = "الأربعاء";

function timeToY(time) {
  const [h, m] = time.split(":").map(Number);
  const minutesFromNine = (h - 9) * 60 + m;
  const clamped = Math.max(0, Math.min(minutesFromNine, 600));
  return 12 + (clamped / 600) * 176;
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

function AddStudentModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", instrument: INSTRUMENTS[0], day: dayOrder[1], time: "16:00", phone: "" });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "#2B2118AA" }}>
      <div className="w-full max-w-sm rounded-3xl p-6" style={{ background: TOKENS.surface, fontFamily: "Tajawal" }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold" style={{ color: TOKENS.ink }}>
            إضافة طالب جديد
          </h3>
          <button onClick={onClose} className="rounded-full p-1.5" style={{ background: TOKENS.surfaceAlt }}>
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
                اليوم
              </label>
              <select
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value })}
                className="w-full mt-1 rounded-xl px-3 py-2 outline-none"
                style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
              >
                {dayOrder.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs" style={{ color: TOKENS.inkSoft }}>
                الوقت
              </label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full mt-1 rounded-xl px-3 py-2 outline-none"
                style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
              />
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
          <button
            onClick={() => {
              if (!form.name.trim()) return;
              onAdd({ ...form, id: Date.now(), paid: false, note: "" });
              onClose();
            }}
            className="mt-2 rounded-xl py-2.5 font-bold"
            style={{ background: TOKENS.gold, color: TOKENS.surface }}
          >
            حفظ الطالب
          </button>
        </div>
      </div>
    </div>
  );
}

function EditStudentModal({ student, onClose, onSave }) {
  const [form, setForm] = useState({ ...student });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "#2B2118AA" }}>
      <div className="w-full max-w-sm rounded-3xl p-6" style={{ background: TOKENS.surface, fontFamily: "Tajawal" }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold" style={{ color: TOKENS.ink }}>
            تعديل بيانات {student.name}
          </h3>
          <button onClick={onClose} className="rounded-full p-1.5" style={{ background: TOKENS.surfaceAlt }}>
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
                اليوم
              </label>
              <select
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value })}
                className="w-full mt-1 rounded-xl px-3 py-2 outline-none"
                style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
              >
                {dayOrder.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs" style={{ color: TOKENS.inkSoft }}>
                الوقت
              </label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full mt-1 rounded-xl px-3 py-2 outline-none"
                style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}
              />
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
                dir="ltr"
              />
            </div>
          </div>
          <div>
            <label className="text-xs" style={{ color: TOKENS.inkSoft }}>
              ملاحظة الدرس
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
          <button
            onClick={() => {
              if (!form.name.trim()) return;
              onSave(form);
              onClose();
            }}
            className="mt-2 rounded-xl py-2.5 font-bold"
            style={{ background: TOKENS.gold, color: TOKENS.surface }}
          >
            حفظ التعديلات
          </button>
        </div>
      </div>
    </div>
  );
}

const STORAGE_KEY = "music-studio-students";

export default function MusicTeacherApp() {
  const [students, setStudents] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [showAdd, setShowAdd] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState(false);

const STORAGE_KEY = "music-studio-students";

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

  // حفظ أي تغيير فوراً بمتصفح الجهاز نفسه
  const persist = (updated) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaveError(false);
    } catch (err) {
      setSaveError(true);
    }
  };

  const todaysLessons = useMemo(
    () => students.filter((s) => s.day === today).sort((a, b) => a.time.localeCompare(b.time)),
    [students]
  );

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
  const addStudent = (student) => {
    setStudents((s) => {
      const updated = [...s, student];
      persist(updated);
      return updated;
    });
  };
  const updateStudent = (edited) => {
    setStudents((s) => {
      const updated = s.map((st) => (st.id === edited.id ? { ...edited } : st));
      persist(updated);
      return updated;
    });
  };

  return (
    <div dir="rtl" className="min-h-screen w-full" style={{ background: TOKENS.bg, fontFamily: "Tajawal" }}>
      <style>{FONT_IMPORT}</style>
      {showAdd && <AddStudentModal onClose={() => setShowAdd(false)} onAdd={addStudent} />}
      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSave={updateStudent}
        />
      )}
      {saveError && (
        <div className="text-center text-xs py-1.5" style={{ background: TOKENS.rust, color: TOKENS.surface }}>
          تعذّر حفظ آخر تعديل — تحقق من الاتصال وحاول مجدداً
        </div>
      )}

      {/* Header */}
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
              مرحباً أ. سردار — {today}
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

      {/* Tabs */}
      <nav className="px-5 flex gap-2 mb-5">
        {[
          { id: "dashboard", label: "لوحة القيادة", icon: CalendarDays },
          { id: "week", label: "الأسبوع", icon: CalendarDays },
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
                      {s.name}
                      <span className="block font-normal" style={{ color: TOKENS.inkSoft }}>
                        {s.time} · {s.instrument}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl p-5" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}>
              <h2 className="font-extrabold mb-3" style={{ color: TOKENS.ink }}>
                تذكيرات واتساب المرسلة تلقائياً
              </h2>
              <div className="flex flex-col gap-2">
                {todaysLessons.slice(0, 3).map((s) => (
                  <div key={s.id} className="flex items-center gap-2 text-sm rounded-xl px-3 py-2" style={{ background: TOKENS.bg }}>
                    <Check size={14} color={TOKENS.sage} />
                    <span style={{ color: TOKENS.ink }}>
                      تم إرسال تذكير لـ <b>{s.name}</b> — درس الساعة {s.time}
                    </span>
                  </div>
                ))}
                {todaysLessons.length === 0 && (
                  <span className="text-sm" style={{ color: TOKENS.inkSoft }}>
                    ما في تذكيرات لليوم
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === "week" && (
          <div className="flex flex-col gap-3">
            {dayOrder.map((day) => {
              const dayLessons = students
                .filter((s) => s.day === day)
                .sort((a, b) => a.time.localeCompare(b.time));
              const isToday = day === today;
              return (
                <div
                  key={day}
                  className="rounded-2xl p-4"
                  style={{
                    background: isToday ? TOKENS.ink : TOKENS.surface,
                    border: `1px solid ${TOKENS.line}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-extrabold text-sm"
                      style={{ color: isToday ? TOKENS.gold : TOKENS.ink }}
                    >
                      {day} {isToday && "· اليوم"}
                    </span>
                    <span className="text-xs" style={{ color: isToday ? TOKENS.surfaceAlt : TOKENS.inkSoft }}>
                      {dayLessons.length} {dayLessons.length === 1 ? "درس" : "دروس"}
                    </span>
                  </div>
                  {dayLessons.length === 0 ? (
                    <div className="text-xs" style={{ color: isToday ? TOKENS.surfaceAlt : TOKENS.inkSoft }}>
                      لا يوجد دروس
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {dayLessons.map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center justify-between text-sm rounded-xl px-3 py-2"
                          style={{ background: isToday ? "#00000022" : TOKENS.bg }}
                        >
                          <span style={{ color: isToday ? TOKENS.surface : TOKENS.ink }}>
                            {s.time} — {s.name}
                          </span>
                          <span className="text-xs" style={{ color: isToday ? TOKENS.surfaceAlt : TOKENS.inkSoft }}>
                            {s.instrument}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === "students" && (
          <div className="flex flex-col gap-3">
            {dayOrder
              .flatMap((day) => students.filter((s) => s.day === day))
              .map((s, i) => (
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
                    <div className="flex items-center gap-2 text-xs mt-0.5" style={{ color: TOKENS.inkSoft }}>
                      <span>{s.instrument} · {s.day} {s.time}</span>
                      <button
                        onClick={() => setEditingStudent(s)}
                        className="flex items-center gap-1 rounded-full px-2 py-0.5"
                        style={{ background: TOKENS.bg, color: TOKENS.gold }}
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
