import React, { useState, useMemo, useEffect } from "react";
import { Music4, Plus, Phone, Check, X, Users, CalendarDays, Wallet, Trash2, Pencil, Clock, Globe, Bell } from "lucide-react";

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

const LANGS = [
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "ku", label: "Kurdî", dir: "ltr" },
  { code: "de", label: "Deutsch", dir: "ltr" },
  { code: "en", label: "English", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
];

const INSTRUMENT_KEYS = ["piano", "guitar", "oud", "violin", "drums"];

const DAY_NAMES = {
  ar: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
  ku: ["Yekşem", "Duşem", "Sêşem", "Çarşem", "Pêncşem", "În", "Şemî"],
  de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  es: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
};
const MONTH_NAMES = {
  ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
  ku: ["Rêbendan", "Sibat", "Adar", "Nîsan", "Gulan", "Hezîran", "Tîrmeh", "Tebax", "Îlon", "Cotmeh", "Mijdar", "Berfanbar"],
  de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
};

const INSTRUMENT_LABELS = {
  ar: { piano: "بيانو", guitar: "غيتار", oud: "عود", violin: "كمان", drums: "درامز" },
  ku: { piano: "Piyano", guitar: "Gîtar", oud: "Ûd", violin: "Vîolîn", drums: "Def" },
  de: { piano: "Klavier", guitar: "Gitarre", oud: "Oud", violin: "Violine", drums: "Schlagzeug" },
  en: { piano: "Piano", guitar: "Guitar", oud: "Oud", violin: "Violin", drums: "Drums" },
  es: { piano: "Piano", guitar: "Guitarra", oud: "Laúd", violin: "Violín", drums: "Batería" },
};

const STR = {
  ar: {
    brand: "أستوديو النغم", greeting: "مرحباً أ. سردار", addStudent: "طالب جديد",
    navDashboard: "لوحة القيادة", navUpcoming: "الجدول القادم", navStudents: "الطلاب",
    statStudents: "إجمالي الطلاب", statToday: "دروس اليوم", statPending: "دفعات معلقة",
    todaysLessons: "دروس اليوم", noLessonsToday: "لا يوجد دروس مجدولة اليوم — يوم راحة 🎵",
    dueAlerts: "تنبيهات الدفع القادمة", noDueAlerts: "ما في دفعات مستحقة قريباً",
    dueSoon: (n) => (n <= 0 ? "مستحق اليوم" : `مستحق خلال ${n} يوم`),
    range30: "30 يوم", range90: "90 يوم", range365: "سنة كاملة", noUpcoming: "ما في دروس مجدولة بهالمدى",
    backupDownload: "⬇️ تحميل نسخة احتياطية", backupRestore: "⬆️ استعادة نسخة",
    edit: "تعديل", lessonsCount: "موعد", markPaid: "تسجيل الدفع", paid: "تم الدفع", unpaid: "لم يُدفع",
    unpaidTitle: "الدفعات المعلقة", noUnpaid: "ولا دفعة معلقة 🎉", lastLesson: "آخر درس", overdueLessons: "درس معلق",
    noPastLessons: "ما في دروس سابقة بعد",
    formAddTitle: "إضافة طالب جديد", formEditTitle: "تعديل بيانات", saveNew: "حفظ الطالب", saveEdit: "حفظ التعديلات",
    nameLabel: "اسم الطالب", namePlaceholder: "مثال: أفين رشيد", instrumentLabel: "الآلة", phoneLabel: "رقم واتساب",
    dueDayLabel: "يوم الاستحقاق الشهري", dueDayHint: "أي يوم بالشهر يستحق فيه الطالب الدفع",
    quickAddTitle: "⚡ إضافة مواعيد متكررة بسرعة", firstLessonDate: "تاريخ أول درس", timeLabel: "الوقت",
    recurrence: "التكرار", weekly: "كل أسبوع", biweekly: "كل أسبوعين", monthly: "كل شهر", countLabel: "عدد المرات",
    generate: (n) => `توليد ${n} موعد تلقائياً`,
    slotsLabel: "مواعيد الدروس (تاريخ محدد لكل درس — أضف كم موعد ما بدك)", addSlot: "إضافة موعد آخر",
    noteLabel: "ملاحظة", notePlaceholder: "مثال: وصلنا لصفحة 12، يحتاج يتمرن على السلم الكبير",
    errName: "لازم تكتب اسم الطالب", errSlots: "لازم تحدد تاريخ ووقت لكل موعد",
    lessonWordSingle: "درس", lang: "اللغة",
  },
  ku: {
    brand: "Studyoya Awazê", greeting: "Bi xêr hatî M. Serdar", addStudent: "Xwendekarê nû",
    navDashboard: "Panela sereke", navUpcoming: "Bernameya bê", navStudents: "Xwendekar",
    statStudents: "Hemû xwendekar", statToday: "Dersên îro", statPending: "Dayîna li benda",
    todaysLessons: "Dersên îro", noLessonsToday: "Îro ders tune — roja vala 🎵",
    dueAlerts: "Bîrxistina dayînê", noDueAlerts: "Dayîneke nêzîk tune",
    dueSoon: (n) => (n <= 0 ? "Îro divê were dayîn" : `Di ${n} rojan de divê were dayîn`),
    range30: "30 roj", range90: "90 roj", range365: "Salek", noUpcoming: "Di vê maweyê de ders tune",
    backupDownload: "⬇️ Barkirina hevpelê", backupRestore: "⬆️ Vegerandina hevpelê",
    edit: "Biguherîne", lessonsCount: "randevû", markPaid: "Dayîn tomar bike", paid: "Hate dayîn", unpaid: "Nehate dayîn",
    unpaidTitle: "Dayînên li benda", noUnpaid: "Ti dayîn li benda nîne 🎉", lastLesson: "Dersa dawî", overdueLessons: "dersa li benda",
    noPastLessons: "Hîn dersek çênebûye",
    formAddTitle: "Xwendekarekî nû lê zêde bike", formEditTitle: "Guherandina agahiyên", saveNew: "Xwendekar tomar bike", saveEdit: "Guherandinan tomar bike",
    nameLabel: "Navê xwendekar", namePlaceholder: "Mînak: Evîn Reşîd", instrumentLabel: "Amûr", phoneLabel: "Hejmara WhatsApp",
    dueDayLabel: "Roja dayîna mehane", dueDayHint: "Kîjan roja mehê divê xwendekar bide",
    quickAddTitle: "⚡ Bi lez randevûyan çêke", firstLessonDate: "Roja dersa yekem", timeLabel: "Dem",
    recurrence: "Dubarekirin", weekly: "Her heftê", biweekly: "Her du heftan", monthly: "Her mehê", countLabel: "Hejmara caran",
    generate: (n) => `${n} randevû çêke`,
    slotsLabel: "Randevûyên dersan (roja rast ji bo her dersê)", addSlot: "Randevûyeke din lê zêde bike",
    noteLabel: "Not", notePlaceholder: "Mînak: gihîşt rûpela 12",
    errName: "Divê navê xwendekar binivîsî", errSlots: "Divê ji her randevûyê re roj û dem diyar bikî",
    lessonWordSingle: "ders", lang: "Ziman",
  },
  de: {
    brand: "Klangstudio", greeting: "Willkommen, Herr Serdar", addStudent: "Neuer Schüler",
    navDashboard: "Übersicht", navUpcoming: "Kommende Termine", navStudents: "Schüler",
    statStudents: "Schüler gesamt", statToday: "Stunden heute", statPending: "Ausstehende Zahlungen",
    todaysLessons: "Stunden heute", noLessonsToday: "Heute keine Stunden geplant — freier Tag 🎵",
    dueAlerts: "Anstehende Zahlungserinnerungen", noDueAlerts: "Keine baldigen Fälligkeiten",
    dueSoon: (n) => (n <= 0 ? "Heute fällig" : `In ${n} Tagen fällig`),
    range30: "30 Tage", range90: "90 Tage", range365: "Ganzes Jahr", noUpcoming: "Keine Stunden in diesem Zeitraum",
    backupDownload: "⬇️ Backup herunterladen", backupRestore: "⬆️ Backup wiederherstellen",
    edit: "Bearbeiten", lessonsCount: "Termine", markPaid: "Als bezahlt markieren", paid: "Bezahlt", unpaid: "Nicht bezahlt",
    unpaidTitle: "Ausstehende Zahlungen", noUnpaid: "Keine ausstehenden Zahlungen 🎉", lastLesson: "Letzte Stunde", overdueLessons: "offene Stunden",
    noPastLessons: "Noch keine vergangenen Stunden",
    formAddTitle: "Neuen Schüler hinzufügen", formEditTitle: "Daten bearbeiten von", saveNew: "Schüler speichern", saveEdit: "Änderungen speichern",
    nameLabel: "Name des Schülers", namePlaceholder: "z.B. Anna Schmidt", instrumentLabel: "Instrument", phoneLabel: "WhatsApp-Nummer",
    dueDayLabel: "Monatlicher Fälligkeitstag", dueDayHint: "An welchem Tag im Monat ist die Zahlung fällig",
    quickAddTitle: "⚡ Schnell wiederkehrende Termine hinzufügen", firstLessonDate: "Datum der ersten Stunde", timeLabel: "Uhrzeit",
    recurrence: "Wiederholung", weekly: "Wöchentlich", biweekly: "Alle zwei Wochen", monthly: "Monatlich", countLabel: "Anzahl",
    generate: (n) => `${n} Termine erstellen`,
    slotsLabel: "Stundentermine (festes Datum je Stunde)", addSlot: "Weiteren Termin hinzufügen",
    noteLabel: "Notiz", notePlaceholder: "z.B. Seite 12 erreicht, Tonleiter üben",
    errName: "Bitte Namen des Schülers eingeben", errSlots: "Bitte Datum und Uhrzeit für jeden Termin angeben",
    lessonWordSingle: "Stunde", lang: "Sprache",
  },
  en: {
    brand: "Melody Studio", greeting: "Welcome, Mr. Serdar", addStudent: "New Student",
    navDashboard: "Dashboard", navUpcoming: "Upcoming Schedule", navStudents: "Students",
    statStudents: "Total Students", statToday: "Today's Lessons", statPending: "Pending Payments",
    todaysLessons: "Today's Lessons", noLessonsToday: "No lessons scheduled today — day off 🎵",
    dueAlerts: "Upcoming Payment Reminders", noDueAlerts: "No payments due soon",
    dueSoon: (n) => (n <= 0 ? "Due today" : `Due in ${n} day${n === 1 ? "" : "s"}`),
    range30: "30 days", range90: "90 days", range365: "Full year", noUpcoming: "No lessons scheduled in this range",
    backupDownload: "⬇️ Download Backup", backupRestore: "⬆️ Restore Backup",
    edit: "Edit", lessonsCount: "lessons", markPaid: "Mark as Paid", paid: "Paid", unpaid: "Unpaid",
    unpaidTitle: "Pending Payments", noUnpaid: "No pending payments 🎉", lastLesson: "Last lesson", overdueLessons: "overdue lessons",
    noPastLessons: "No past lessons yet",
    formAddTitle: "Add New Student", formEditTitle: "Edit details for", saveNew: "Save Student", saveEdit: "Save Changes",
    nameLabel: "Student Name", namePlaceholder: "e.g. Anna Smith", instrumentLabel: "Instrument", phoneLabel: "WhatsApp Number",
    dueDayLabel: "Monthly Due Day", dueDayHint: "Which day of the month payment is due",
    quickAddTitle: "⚡ Quick-Add Recurring Lessons", firstLessonDate: "First Lesson Date", timeLabel: "Time",
    recurrence: "Recurrence", weekly: "Weekly", biweekly: "Every 2 weeks", monthly: "Monthly", countLabel: "Number of times",
    generate: (n) => `Generate ${n} lessons`,
    slotsLabel: "Lesson dates (specific date per lesson — add as many as you need)", addSlot: "Add Another Lesson",
    noteLabel: "Note", notePlaceholder: "e.g. Reached page 12, needs to practice the major scale",
    errName: "Please enter the student's name", errSlots: "Please set a date and time for every lesson",
    lessonWordSingle: "lesson", lang: "Language",
  },
  es: {
    brand: "Estudio Melodía", greeting: "Bienvenido, profesor Serdar", addStudent: "Nuevo Alumno",
    navDashboard: "Panel", navUpcoming: "Próximas Clases", navStudents: "Alumnos",
    statStudents: "Total de Alumnos", statToday: "Clases de Hoy", statPending: "Pagos Pendientes",
    todaysLessons: "Clases de Hoy", noLessonsToday: "No hay clases hoy — día libre 🎵",
    dueAlerts: "Recordatorios de Pago Próximos", noDueAlerts: "No hay pagos próximos",
    dueSoon: (n) => (n <= 0 ? "Vence hoy" : `Vence en ${n} día${n === 1 ? "" : "s"}`),
    range30: "30 días", range90: "90 días", range365: "Todo el año", noUpcoming: "No hay clases en este rango",
    backupDownload: "⬇️ Descargar Copia de Seguridad", backupRestore: "⬆️ Restaurar Copia",
    edit: "Editar", lessonsCount: "clases", markPaid: "Marcar como Pagado", paid: "Pagado", unpaid: "No Pagado",
    unpaidTitle: "Pagos Pendientes", noUnpaid: "No hay pagos pendientes 🎉", lastLesson: "Última clase", overdueLessons: "clases pendientes",
    noPastLessons: "Aún no hay clases pasadas",
    formAddTitle: "Añadir Nuevo Alumno", formEditTitle: "Editar datos de", saveNew: "Guardar Alumno", saveEdit: "Guardar Cambios",
    nameLabel: "Nombre del Alumno", namePlaceholder: "ej. Ana García", instrumentLabel: "Instrumento", phoneLabel: "Número de WhatsApp",
    dueDayLabel: "Día de Pago Mensual", dueDayHint: "Qué día del mes vence el pago",
    quickAddTitle: "⚡ Añadir Clases Recurrentes", firstLessonDate: "Fecha de la Primera Clase", timeLabel: "Hora",
    recurrence: "Recurrencia", weekly: "Cada semana", biweekly: "Cada 2 semanas", monthly: "Cada mes", countLabel: "Número de veces",
    generate: (n) => `Generar ${n} clases`,
    slotsLabel: "Fechas de clases (fecha específica por clase)", addSlot: "Añadir Otra Clase",
    noteLabel: "Nota", notePlaceholder: "ej. Llegó a la página 12, practicar la escala mayor",
    errName: "Por favor escribe el nombre del alumno", errSlots: "Por favor define fecha y hora para cada clase",
    lessonWordSingle: "clase", lang: "Idioma",
  },
};

let slotIdCounter = 1000;
const newSlotId = () => slotIdCounter++;

function relDate(daysFromNow) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

const initialStudents = [
  {
    id: 1, name: "ليلا حسن", instrument: "piano", phone: "+49 151 000 001", paid: true, dueDay: 5,
    note: "وصلت لصفحة 12، تحتاج تتمرن على السلم الكبير",
    slots: [
      { id: newSlotId(), date: relDate(1), time: "16:00" },
      { id: newSlotId(), date: relDate(8), time: "16:00" },
      { id: newSlotId(), date: relDate(15), time: "16:00" },
      { id: newSlotId(), date: relDate(22), time: "16:00" },
    ],
  },
  {
    id: 2, name: "روژان كمال", instrument: "guitar", phone: "+49 151 000 002", paid: false, dueDay: 3,
    note: "بدها تحضر أغنية جديدة للحفلة",
    slots: [{ id: newSlotId(), date: relDate(2), time: "17:30" }, { id: newSlotId(), date: relDate(9), time: "17:30" }],
  },
  {
    id: 3, name: "سيروان أحمد", instrument: "oud", phone: "+49 151 000 003", paid: true, dueDay: 10,
    note: "", slots: [{ id: newSlotId(), date: relDate(0), time: "18:00" }],
  },
  {
    id: 4, name: "دلين عمر", instrument: "violin", phone: "+49 151 000 004", paid: false, dueDay: 20,
    note: "أول درس، محتاجة تشتري قوس جديد", slots: [{ id: newSlotId(), date: relDate(3), time: "16:30" }],
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
function formatDate(date, lang) {
  return `${DAY_NAMES[lang][date.getDay()]}، ${date.getDate()} ${MONTH_NAMES[lang][date.getMonth()]}`;
}
function todayKey() {
  return new Date().toISOString().slice(0, 10);
}
function daysUntilDue(dueDay) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  let target = new Date(now.getFullYear(), now.getMonth(), dueDay);
  if (target < now) target = new Date(now.getFullYear(), now.getMonth() + 1, dueDay);
  return Math.round((target - now) / 86400000);
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
    <div className="flex items-center justify-center rounded-full shrink-0 font-bold" style={{ width: 40, height: 40, background: color, color: TOKENS.surface }}>
      {initial}
    </div>
  );
}
function StatCard({ icon: Icon, label, value, accent, onClick }) {
  return (
    <div onClick={onClick} className="flex items-center gap-3 rounded-2xl p-4 flex-1 min-w-[140px]" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}`, cursor: onClick ? "pointer" : "default" }}>
      <div className="rounded-full p-2.5" style={{ background: accent + "22" }}>
        <Icon size={20} color={accent} />
      </div>
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

  const updateSlot = (id, updated) => setForm({ ...form, slots: form.slots.map((sl) => (sl.id === id ? updated : sl)) });
  const removeSlot = (id) => setForm({ ...form, slots: form.slots.filter((sl) => sl.id !== id) });
  const addSlot = () => setForm({ ...form, slots: [...form.slots, { id: newSlotId(), date: relDate(7), time: "16:00" }] });
  const generateRecurring = () => {
    const base = parseDate(recurStart);
    const newSlots = [];
    for (let i = 0; i < recurCount; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i * 7 * recurWeeks);
      newSlots.push({ id: newSlotId(), date: d.toISOString().slice(0, 10), time: recurTime });
    }
    setForm({ ...form, slots: [...form.slots, ...newSlots] });
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
                  <option value={1}>{t.weekly}</option>
                  <option value={2}>{t.biweekly}</option>
                  <option value={4}>{t.monthly}</option>
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
            onClick={() => {
              if (!form.name.trim()) return setError(t.errName);
              if (form.slots.some((sl) => !sl.date || !sl.time)) return setError(t.errSlots);
              setError("");
              onSubmit(form);
            }}
            className="mt-2 rounded-xl py-2.5 font-bold"
            style={{ background: TOKENS.gold, color: TOKENS.surface }}
          >
            {initial ? t.saveEdit : t.saveNew}
          </button>
        </div>
      </div>
    </div>
  );
}

const STORAGE_KEY = "music-studio-students-v4";
const LANG_KEY = "music-studio-lang";

function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : initialStudents;
  } catch (err) {
    return initialStudents;
  }
}
function loadLang() {
  try {
    const raw = localStorage.getItem(LANG_KEY);
    return raw && STR[raw] ? raw : "ar";
  } catch (err) {
    return "ar";
  }
}

export default function MusicTeacherApp() {
  const [students, setStudents] = useState(loadStudents);
  const [lang, setLang] = useState(loadLang);
  const [tab, setTab] = useState("dashboard");
  const [showAdd, setShowAdd] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showUnpaid, setShowUnpaid] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [rangeDays, setRangeDays] = useState(30);

  const t = STR[lang];
  const dir = LANGS.find((l) => l.code === lang).dir;

  useEffect(() => {
    try { localStorage.setItem(LANG_KEY, lang); } catch (err) {}
  }, [lang]);

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
    flat.forEach((item) => {
      if (!map.has(item.date)) map.set(item.date, { date: item.date, items: [] });
      map.get(item.date).items.push(item);
    });
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
    return students
      .filter((s) => !s.paid && s.dueDay)
      .map((s) => ({ student: s, days: daysUntilDue(s.dueDay) }))
      .filter((x) => x.days <= 3)
      .sort((a, b) => a.days - b.days);
  }, [students]);

  const palette = [TOKENS.gold, TOKENS.sage, TOKENS.rust, TOKENS.goldSoft];

  const togglePaid = (id) => setStudents((s) => { const u = s.map((st) => (st.id === id ? { ...st, paid: !st.paid } : st)); persist(u); return u; });
  const removeStudent = (id) => setStudents((s) => { const u = s.filter((st) => st.id !== id); persist(u); return u; });
  const addStudent = (form) => { setStudents((s) => { const u = [...s, { ...form, id: Date.now(), paid: false }]; persist(u); return u; }); setShowAdd(false); };
  const updateStudent = (form) => { setStudents((s) => { const u = s.map((st) => (st.id === form.id ? { ...form } : st)); persist(u); return u; }); setEditingStudent(null); };

  const exportBackup = () => {
    const blob = new Blob([JSON.stringify(students, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `backup-${todayKey()}.json`; a.click();
    URL.revokeObjectURL(url);
  };
  const importBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!Array.isArray(parsed)) throw new Error("bad format");
        setStudents(parsed); persist(parsed);
      } catch (err) { setSaveError(true); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div dir={dir} className="min-h-screen w-full" style={{ background: TOKENS.bg, fontFamily: "Tajawal" }}>
      <style>{FONT_IMPORT}</style>
      {showAdd && <StudentForm t={t} lang={lang} onCancel={() => setShowAdd(false)} onSubmit={addStudent} />}
      {editingStudent && <StudentForm t={t} lang={lang} initial={editingStudent} onCancel={() => setEditingStudent(null)} onSubmit={updateStudent} />}
      {saveError && <div className="text-center text-xs py-1.5" style={{ background: TOKENS.rust, color: TOKENS.surface }}>⚠️</div>}

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
                    <div className="flex items-center gap-1 text-xs mt-1" style={{ color: TOKENS.inkSoft }} dir="ltr"><Phone size={11} />{student.phone}</div>
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
            <div className="text-xs" style={{ color: TOKENS.inkSoft }}>{t.greeting} — {formatDate(new Date(), lang)}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full px-2 py-1.5" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}>
            <Globe size={14} color={TOKENS.inkSoft} />
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="text-xs font-bold outline-none bg-transparent" style={{ color: TOKENS.ink }}>
              {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </div>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 rounded-full px-4 py-2 font-bold text-sm" style={{ background: TOKENS.gold, color: TOKENS.surface }}>
            <Plus size={16} />{t.addStudent}
          </button>
        </div>
      </header>

      <nav className="px-5 flex gap-2 mb-5 flex-wrap">
        {[
          { id: "dashboard", label: t.navDashboard, icon: CalendarDays },
          { id: "upcoming", label: t.navUpcoming, icon: Clock },
          { id: "students", label: t.navStudents, icon: Users },
        ].map((tb) => (
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
                <div className="flex items-center gap-2 mb-2">
                  <Bell size={16} color={TOKENS.rust} />
                  <span className="font-bold text-sm" style={{ color: TOKENS.rust }}>{t.dueAlerts}</span>
                </div>
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
                    <div key={"label-" + s.id} className="absolute text-xs font-bold whitespace-nowrap" style={{ top: timeToY(s.time) - 8, insetInlineEnd: `${8 + (idx % 4) * 22}%`, marginInlineEnd: 28, color: TOKENS.ink }}>
                      {s.student.name}
                      <span className="block font-normal" style={{ color: TOKENS.inkSoft }}>{s.time} · {INSTRUMENT_LABELS[lang][s.student.instrument]}</span>
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
            ) : (
              upcomingByDate.map(({ date, items }) => (
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
              ))
            )}
          </div>
        )}

        {tab === "students" && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <button onClick={exportBackup} className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}>{t.backupDownload}</button>
              <label className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold cursor-pointer" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }}>
                {t.backupRestore}
                <input type="file" accept="application/json" onChange={importBackup} className="hidden" />
              </label>
            </div>
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
