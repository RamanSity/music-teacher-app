export const TOKENS = {
  bg: "#EDE4D3", surface: "#F8F3E8", surfaceAlt: "#E4D8BE", ink: "#2B2118",
  inkSoft: "#6B5D48", gold: "#A97400", goldSoft: "#C99A2E", rust: "#A8452F",
  sage: "#4F7A5B", line: "#C9BCA0",
};

export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Markazi+Text:wght@500;700&family=Tajawal:wght@400;500;700;800&display=swap');`;

export const LANGS = [
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "ku", label: "Kurdî", dir: "ltr" },
  { code: "de", label: "Deutsch", dir: "ltr" },
  { code: "en", label: "English", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
];

export const INSTRUMENT_KEYS = ["piano", "guitar", "oud", "violin", "drums"];

export const DAY_NAMES = {
  ar: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
  ku: ["Yekşem", "Duşem", "Sêşem", "Çarşem", "Pêncşem", "În", "Şemî"],
  de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  es: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
};
export const MONTH_NAMES = {
  ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
  ku: ["Rêbendan", "Sibat", "Adar", "Nîsan", "Gulan", "Hezîran", "Tîrmeh", "Tebax", "Îlon", "Cotmeh", "Mijdar", "Berfanbar"],
  de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
};
export const INSTRUMENT_LABELS = {
  ar: { piano: "بيانو", guitar: "غيتار", oud: "عود", violin: "كمان", drums: "درامز" },
  ku: { piano: "Piyano", guitar: "Gîtar", oud: "Ûd", violin: "Vîolîn", drums: "Def" },
  de: { piano: "Klavier", guitar: "Gitarre", oud: "Oud", violin: "Violine", drums: "Schlagzeug" },
  en: { piano: "Piano", guitar: "Guitar", oud: "Oud", violin: "Violin", drums: "Drums" },
  es: { piano: "Piano", guitar: "Guitarra", oud: "Laúd", violin: "Violín", drums: "Batería" },
};

export const STR = {
  ar: {
    brand: "أستوديو النغم", greeting: "مرحباً", addStudent: "طالب جديد",
    navDashboard: "لوحة القيادة", navUpcoming: "الجدول القادم", navStudents: "الطلاب",
    statStudents: "إجمالي الطلاب", statToday: "دروس اليوم", statPending: "دفعات معلقة",
    todaysLessons: "دروس اليوم", noLessonsToday: "لا يوجد دروس مجدولة اليوم — يوم راحة 🎵",
    dueAlerts: "تنبيهات الدفع القادمة", dueSoon: (n) => (n <= 0 ? "مستحق اليوم" : `مستحق خلال ${n} يوم`),
    range30: "30 يوم", range90: "90 يوم", range365: "سنة كاملة", noUpcoming: "ما في دروس مجدولة بهالمدى",
    backupDownload: "⬇️ تحميل نسخة احتياطية",
    edit: "تعديل", lessonsCount: "موعد", markPaid: "تسجيل الدفع", paid: "تم الدفع", unpaid: "لم يُدفع",
    unpaidTitle: "الدفعات المعلقة", noUnpaid: "ولا دفعة معلقة 🎉", lastLesson: "آخر درس", overdueLessons: "درس معلق",
    noPastLessons: "ما في دروس سابقة بعد",
    formAddTitle: "إضافة طالب جديد", formEditTitle: "تعديل بيانات", saveNew: "حفظ الطالب", saveEdit: "حفظ التعديلات",
    nameLabel: "اسم الطالب", namePlaceholder: "مثال: أفين رشيد", instrumentLabel: "الآلة", phoneLabel: "رقم واتساب",
    dueDayLabel: "يوم الاستحقاق الشهري", dueDayHint: "أي يوم بالشهر يستحق فيه الطالب الدفع",
    quickAddTitle: "⚡ إضافة مواعيد متكررة بسرعة", firstLessonDate: "تاريخ أول درس", timeLabel: "الوقت",
    recurrence: "التكرار", weekly: "كل أسبوع", biweekly: "كل أسبوعين", monthly: "كل شهر", countLabel: "عدد المرات",
    generate: (n) => `توليد ${n} موعد تلقائياً`,
    slotsLabel: "مواعيد الدروس", addSlot: "إضافة موعد آخر",
    noteLabel: "ملاحظة", notePlaceholder: "مثال: وصلنا لصفحة 12",
    errName: "لازم تكتب اسم الطالب", errSlots: "لازم تحدد تاريخ ووقت لكل موعد",
    lang: "اللغة", copyLink: "نسخ رابط الطالب", linkCopied: "تم النسخ ✓",
    signIn: "تسجيل الدخول", signUp: "إنشاء حساب", emailLabel: "الإيميل", passwordLabel: "كلمة السر",
    signInBtn: "دخول", signUpBtn: "إنشاء الحساب", switchToSignUp: "ما عندك حساب؟ سجل واحد جديد",
    switchToSignIn: "عندك حساب أصلاً؟ سجل دخول", signOut: "تسجيل خروج", checkEmail: "تحقق من إيميلك لتفعيل الحساب قبل ما تسجل دخول",
    authWelcome: "أستوديو النغم", authSub: "لوحة تحكم المعلم",
    loading: "جاري التحميل...", genericError: "صار خطأ، حاول مرة ثانية",
    studentViewTitle: "جدول دروسك", studentViewSub: "مواعيدك القادمة", studentViewNoLessons: "ما في مواعيد مسجلة",
    studentViewNotFound: "الرابط غير صحيح أو منتهي",
  },
  ku: {
    brand: "Studyoya Awazê", greeting: "Bi xêr hatî", addStudent: "Xwendekarê nû",
    navDashboard: "Panela sereke", navUpcoming: "Bernameya bê", navStudents: "Xwendekar",
    statStudents: "Hemû xwendekar", statToday: "Dersên îro", statPending: "Dayîna li benda",
    todaysLessons: "Dersên îro", noLessonsToday: "Îro ders tune 🎵",
    dueAlerts: "Bîrxistina dayînê", dueSoon: (n) => (n <= 0 ? "Îro" : `Di ${n} rojan de`),
    range30: "30 roj", range90: "90 roj", range365: "Salek", noUpcoming: "Ders tune",
    backupDownload: "⬇️ Barkirin",
    edit: "Biguherîne", lessonsCount: "randevû", markPaid: "Dayîn tomar bike", paid: "Hate dayîn", unpaid: "Nehate dayîn",
    unpaidTitle: "Dayînên li benda", noUnpaid: "Ti dayîn li benda nîne 🎉", lastLesson: "Dersa dawî", overdueLessons: "dersa li benda",
    noPastLessons: "Hîn dersek çênebûye",
    formAddTitle: "Xwendekarekî nû lê zêde bike", formEditTitle: "Guherandin", saveNew: "Tomar bike", saveEdit: "Tomar bike",
    nameLabel: "Nav", namePlaceholder: "Mînak: Evîn", instrumentLabel: "Amûr", phoneLabel: "WhatsApp",
    dueDayLabel: "Roja dayînê", dueDayHint: "Roja mehê",
    quickAddTitle: "⚡ Randevûyan çêke", firstLessonDate: "Roja yekem", timeLabel: "Dem",
    recurrence: "Dubare", weekly: "Her heftê", biweekly: "Her du heftan", monthly: "Her mehê", countLabel: "Hejmar",
    generate: (n) => `${n} randevû çêke`,
    slotsLabel: "Randevû", addSlot: "Zêde bike",
    noteLabel: "Not", notePlaceholder: "Mînak: r. 12",
    errName: "Navî binivîsî", errSlots: "Roj û dem diyar bike",
    lang: "Ziman", copyLink: "Girêdanê kopî bike", linkCopied: "Hate kopîkirin ✓",
    signIn: "Têketin", signUp: "Hesabekî nû", emailLabel: "E-peyam", passwordLabel: "Şîfre",
    signInBtn: "Têkeve", signUpBtn: "Hesab çêke", switchToSignUp: "Hesabê te tune? Çêke",
    switchToSignIn: "Hesabê te heye? Têkeve", signOut: "Derkeve", checkEmail: "E-peyama xwe kontrol bike",
    authWelcome: "Studyoya Awazê", authSub: "Panela mamoste",
    loading: "Bardibe...", genericError: "Çewtî çêbû",
    studentViewTitle: "Bernameya te", studentViewSub: "Randevûyên te", studentViewNoLessons: "Randevû tune",
    studentViewNotFound: "Girêdan ne rast e",
  },
  de: {
    brand: "Klangstudio", greeting: "Willkommen", addStudent: "Neuer Schüler",
    navDashboard: "Übersicht", navUpcoming: "Kommende Termine", navStudents: "Schüler",
    statStudents: "Schüler gesamt", statToday: "Stunden heute", statPending: "Ausstehende Zahlungen",
    todaysLessons: "Stunden heute", noLessonsToday: "Heute keine Stunden — freier Tag 🎵",
    dueAlerts: "Anstehende Zahlungserinnerungen", dueSoon: (n) => (n <= 0 ? "Heute fällig" : `In ${n} Tagen fällig`),
    range30: "30 Tage", range90: "90 Tage", range365: "Ganzes Jahr", noUpcoming: "Keine Stunden",
    backupDownload: "⬇️ Backup herunterladen",
    edit: "Bearbeiten", lessonsCount: "Termine", markPaid: "Als bezahlt markieren", paid: "Bezahlt", unpaid: "Nicht bezahlt",
    unpaidTitle: "Ausstehende Zahlungen", noUnpaid: "Keine ausstehenden Zahlungen 🎉", lastLesson: "Letzte Stunde", overdueLessons: "offene Stunden",
    noPastLessons: "Noch keine Stunden",
    formAddTitle: "Neuen Schüler hinzufügen", formEditTitle: "Bearbeiten", saveNew: "Speichern", saveEdit: "Speichern",
    nameLabel: "Name", namePlaceholder: "z.B. Anna Schmidt", instrumentLabel: "Instrument", phoneLabel: "WhatsApp-Nummer",
    dueDayLabel: "Fälligkeitstag", dueDayHint: "Tag im Monat",
    quickAddTitle: "⚡ Wiederkehrende Termine", firstLessonDate: "Erstes Datum", timeLabel: "Uhrzeit",
    recurrence: "Wiederholung", weekly: "Wöchentlich", biweekly: "Alle 2 Wochen", monthly: "Monatlich", countLabel: "Anzahl",
    generate: (n) => `${n} Termine erstellen`,
    slotsLabel: "Termine", addSlot: "Weiteren Termin hinzufügen",
    noteLabel: "Notiz", notePlaceholder: "z.B. Seite 12",
    errName: "Bitte Namen eingeben", errSlots: "Bitte Datum und Uhrzeit angeben",
    lang: "Sprache", copyLink: "Link kopieren", linkCopied: "Kopiert ✓",
    signIn: "Anmelden", signUp: "Konto erstellen", emailLabel: "E-Mail", passwordLabel: "Passwort",
    signInBtn: "Einloggen", signUpBtn: "Konto erstellen", switchToSignUp: "Kein Konto? Registrieren",
    switchToSignIn: "Schon ein Konto? Anmelden", signOut: "Abmelden", checkEmail: "Bitte E-Mail zur Bestätigung prüfen",
    authWelcome: "Klangstudio", authSub: "Lehrer-Dashboard",
    loading: "Lädt...", genericError: "Ein Fehler ist aufgetreten",
    studentViewTitle: "Dein Stundenplan", studentViewSub: "Deine kommenden Termine", studentViewNoLessons: "Keine Termine",
    studentViewNotFound: "Ungültiger Link",
  },
  en: {
    brand: "Melody Studio", greeting: "Welcome", addStudent: "New Student",
    navDashboard: "Dashboard", navUpcoming: "Upcoming Schedule", navStudents: "Students",
    statStudents: "Total Students", statToday: "Today's Lessons", statPending: "Pending Payments",
    todaysLessons: "Today's Lessons", noLessonsToday: "No lessons today — day off 🎵",
    dueAlerts: "Upcoming Payment Reminders", dueSoon: (n) => (n <= 0 ? "Due today" : `Due in ${n} day${n === 1 ? "" : "s"}`),
    range30: "30 days", range90: "90 days", range365: "Full year", noUpcoming: "No lessons in this range",
    backupDownload: "⬇️ Download Backup",
    edit: "Edit", lessonsCount: "lessons", markPaid: "Mark as Paid", paid: "Paid", unpaid: "Unpaid",
    unpaidTitle: "Pending Payments", noUnpaid: "No pending payments 🎉", lastLesson: "Last lesson", overdueLessons: "overdue lessons",
    noPastLessons: "No past lessons yet",
    formAddTitle: "Add New Student", formEditTitle: "Edit", saveNew: "Save", saveEdit: "Save Changes",
    nameLabel: "Student Name", namePlaceholder: "e.g. Anna Smith", instrumentLabel: "Instrument", phoneLabel: "WhatsApp Number",
    dueDayLabel: "Monthly Due Day", dueDayHint: "Day of the month",
    quickAddTitle: "⚡ Quick-Add Recurring Lessons", firstLessonDate: "First Lesson Date", timeLabel: "Time",
    recurrence: "Recurrence", weekly: "Weekly", biweekly: "Every 2 weeks", monthly: "Monthly", countLabel: "Number of times",
    generate: (n) => `Generate ${n} lessons`,
    slotsLabel: "Lesson dates", addSlot: "Add Another Lesson",
    noteLabel: "Note", notePlaceholder: "e.g. Reached page 12",
    errName: "Please enter the student's name", errSlots: "Please set date and time for every lesson",
    lang: "Language", copyLink: "Copy Student Link", linkCopied: "Copied ✓",
    signIn: "Sign In", signUp: "Sign Up", emailLabel: "Email", passwordLabel: "Password",
    signInBtn: "Sign In", signUpBtn: "Create Account", switchToSignUp: "No account? Sign up",
    switchToSignIn: "Already have an account? Sign in", signOut: "Sign Out", checkEmail: "Check your email to confirm your account",
    authWelcome: "Melody Studio", authSub: "Teacher Dashboard",
    loading: "Loading...", genericError: "Something went wrong",
    studentViewTitle: "Your Schedule", studentViewSub: "Your upcoming lessons", studentViewNoLessons: "No lessons scheduled",
    studentViewNotFound: "Invalid or expired link",
  },
  es: {
    brand: "Estudio Melodía", greeting: "Bienvenido", addStudent: "Nuevo Alumno",
    navDashboard: "Panel", navUpcoming: "Próximas Clases", navStudents: "Alumnos",
    statStudents: "Total de Alumnos", statToday: "Clases de Hoy", statPending: "Pagos Pendientes",
    todaysLessons: "Clases de Hoy", noLessonsToday: "No hay clases hoy 🎵",
    dueAlerts: "Recordatorios de Pago", dueSoon: (n) => (n <= 0 ? "Vence hoy" : `Vence en ${n} día${n === 1 ? "" : "s"}`),
    range30: "30 días", range90: "90 días", range365: "Todo el año", noUpcoming: "No hay clases",
    backupDownload: "⬇️ Descargar Copia",
    edit: "Editar", lessonsCount: "clases", markPaid: "Marcar como Pagado", paid: "Pagado", unpaid: "No Pagado",
    unpaidTitle: "Pagos Pendientes", noUnpaid: "No hay pagos pendientes 🎉", lastLesson: "Última clase", overdueLessons: "clases pendientes",
    noPastLessons: "Aún no hay clases",
    formAddTitle: "Añadir Alumno", formEditTitle: "Editar", saveNew: "Guardar", saveEdit: "Guardar Cambios",
    nameLabel: "Nombre", namePlaceholder: "ej. Ana García", instrumentLabel: "Instrumento", phoneLabel: "Número de WhatsApp",
    dueDayLabel: "Día de Pago Mensual", dueDayHint: "Día del mes",
    quickAddTitle: "⚡ Añadir Clases Recurrentes", firstLessonDate: "Primera Fecha", timeLabel: "Hora",
    recurrence: "Recurrencia", weekly: "Cada semana", biweekly: "Cada 2 semanas", monthly: "Cada mes", countLabel: "Número",
    generate: (n) => `Generar ${n} clases`,
    slotsLabel: "Fechas de clases", addSlot: "Añadir Otra Clase",
    noteLabel: "Nota", notePlaceholder: "ej. página 12",
    errName: "Escribe el nombre", errSlots: "Define fecha y hora",
    lang: "Idioma", copyLink: "Copiar Enlace", linkCopied: "Copiado ✓",
    signIn: "Iniciar Sesión", signUp: "Crear Cuenta", emailLabel: "Correo", passwordLabel: "Contraseña",
    signInBtn: "Entrar", signUpBtn: "Crear Cuenta", switchToSignUp: "¿Sin cuenta? Regístrate",
    switchToSignIn: "¿Ya tienes cuenta? Entra", signOut: "Cerrar Sesión", checkEmail: "Revisa tu correo para confirmar",
    authWelcome: "Estudio Melodía", authSub: "Panel del Profesor",
    loading: "Cargando...", genericError: "Ocurrió un error",
    studentViewTitle: "Tu Horario", studentViewSub: "Tus próximas clases", studentViewNoLessons: "No hay clases",
    studentViewNotFound: "Enlace inválido",
  },
};

export function parseDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}
export function formatDate(date, lang) {
  return `${DAY_NAMES[lang][date.getDay()]}، ${date.getDate()} ${MONTH_NAMES[lang][date.getMonth()]}`;
}
export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}
export function daysUntilDue(dueDay) {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  let target = new Date(now.getFullYear(), now.getMonth(), dueDay);
  if (target < now) target = new Date(now.getFullYear(), now.getMonth() + 1, dueDay);
  return Math.round((target - now) / 86400000);
}
export function timeToY(time) {
  const [h, m] = time.split(":").map(Number);
  const minutesFromNine = (h - 9) * 60 + m;
  const clamped = Math.max(0, Math.min(minutesFromNine, 600));
  return 12 + (clamped / 600) * 176;
}
