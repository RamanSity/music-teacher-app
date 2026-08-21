import React, { useState, useEffect } from "react";
import { Music4, Globe, Clock } from "lucide-react";
import { supabase } from "./supabaseClient";
import { TOKENS, FONT_IMPORT, LANGS, STR, INSTRUMENT_LABELS, parseDate, formatDate } from "./shared";

export default function StudentView({ token, lang, setLang }) {
  const t = STR[lang];
  const dir = LANGS.find((l) => l.code === lang).dir;
  const [status, setStatus] = useState("loading");
  const [name, setName] = useState("");
  const [instrument, setInstrument] = useState("");
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_student_schedule", { p_token: token });
      if (error || !data || data.length === 0) { setStatus("notfound"); return; }
      setName(data[0].student_name);
      setInstrument(data[0].instrument);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const upcoming = data
        .filter((r) => r.lesson_date && parseDate(r.lesson_date) >= today)
        .sort((a, b) => (a.lesson_date + a.lesson_time).localeCompare(b.lesson_date + b.lesson_time));
      setLessons(upcoming);
      setStatus("ready");
    })();
  }, [token]);

  return (
    <div dir={dir} className="min-h-screen w-full" style={{ background: TOKENS.bg, fontFamily: "Tajawal" }}>
      <style>{FONT_IMPORT}</style>
      <header className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl p-2.5" style={{ background: TOKENS.ink }}><Music4 size={22} color={TOKENS.gold} /></div>
          <div className="text-lg font-extrabold" style={{ color: TOKENS.ink }}>{t.brand}</div>
        </div>
        <div className="flex items-center gap-1 rounded-full px-2 py-1.5" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}>
          <Globe size={14} color={TOKENS.inkSoft} />
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="text-xs font-bold outline-none bg-transparent" style={{ color: TOKENS.ink }}>
            {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
        </div>
      </header>

      <main className="px-5 pb-16">
        {status === "loading" && <div className="text-center py-16" style={{ color: TOKENS.inkSoft }}>{t.loading}</div>}
        {status === "notfound" && <div className="text-center py-16" style={{ color: TOKENS.rust }}>{t.studentViewNotFound}</div>}
        {status === "ready" && (
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl p-5" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}>
              <div className="text-xl font-extrabold" style={{ color: TOKENS.ink, fontFamily: "Markazi Text" }}>{name}</div>
              <div className="text-sm" style={{ color: TOKENS.inkSoft }}>{INSTRUMENT_LABELS[lang][instrument] || instrument}</div>
            </div>
            <div className="flex items-center gap-2 px-1">
              <Clock size={16} color={TOKENS.gold} />
              <span className="font-bold text-sm" style={{ color: TOKENS.ink }}>{t.studentViewSub}</span>
            </div>
            {lessons.length === 0 ? (
              <div className="text-center py-10 rounded-2xl" style={{ background: TOKENS.surface, color: TOKENS.inkSoft }}>{t.studentViewNoLessons}</div>
            ) : (
              <div className="flex flex-col gap-2">
                {lessons.map((l, i) => (
                  <div key={i} className="flex items-center justify-between rounded-2xl px-4 py-3" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}>
                    <span className="font-bold text-sm" style={{ color: TOKENS.ink }}>{formatDate(parseDate(l.lesson_date), lang)}</span>
                    <span className="text-sm" style={{ color: TOKENS.gold }}>{l.lesson_time.slice(0, 5)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
