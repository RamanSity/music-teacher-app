import React, { useState } from "react";
import { Music4, Globe } from "lucide-react";
import { supabase } from "./supabaseClient";
import { TOKENS, FONT_IMPORT, LANGS, STR } from "./shared";

export default function AuthScreen({ lang, setLang }) {
  const t = STR[lang];
  const dir = LANGS.find((l) => l.code === lang).dir;
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(""); setNotice(""); setLoading(true);
    try {
      if (mode === "signin") {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      } else {
        const { error: err } = await supabase.auth.signUp({ email, password });
        if (err) throw err;
        setNotice(t.checkEmail);
      }
    } catch (err) {
      setError(err.message || t.genericError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir={dir} className="min-h-screen w-full flex items-center justify-center p-4" style={{ background: TOKENS.bg, fontFamily: "Tajawal" }}>
      <style>{FONT_IMPORT}</style>
      <div className="absolute top-5 right-5 rtl:left-5 rtl:right-auto">
        <div className="flex items-center gap-1 rounded-full px-2 py-1.5" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}>
          <Globe size={14} color={TOKENS.inkSoft} />
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="text-xs font-bold outline-none bg-transparent" style={{ color: TOKENS.ink }}>
            {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
        </div>
      </div>

      <div className="w-full max-w-sm rounded-3xl p-7" style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.line}` }}>
        <div className="flex flex-col items-center mb-6">
          <div className="rounded-2xl p-3 mb-3" style={{ background: TOKENS.ink }}>
            <Music4 size={26} color={TOKENS.gold} />
          </div>
          <div className="text-xl font-extrabold" style={{ color: TOKENS.ink, fontFamily: "Markazi Text" }}>{t.authWelcome}</div>
          <div className="text-xs" style={{ color: TOKENS.inkSoft }}>{t.authSub}</div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs" style={{ color: TOKENS.inkSoft }}>{t.emailLabel}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr"
              className="w-full mt-1 rounded-xl px-3 py-2 outline-none" style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }} />
          </div>
          <div>
            <label className="text-xs" style={{ color: TOKENS.inkSoft }}>{t.passwordLabel}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} dir="ltr"
              className="w-full mt-1 rounded-xl px-3 py-2 outline-none" style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.line}`, color: TOKENS.ink }} />
          </div>

          {error && <div className="text-xs rounded-lg px-3 py-2" style={{ background: TOKENS.rust + "22", color: TOKENS.rust }}>{error}</div>}
          {notice && <div className="text-xs rounded-lg px-3 py-2" style={{ background: TOKENS.sage + "22", color: TOKENS.sage }}>{notice}</div>}

          <button onClick={submit} disabled={loading} className="rounded-xl py-2.5 font-bold" style={{ background: TOKENS.gold, color: TOKENS.surface, opacity: loading ? 0.6 : 1 }}>
            {loading ? t.loading : mode === "signin" ? t.signInBtn : t.signUpBtn}
          </button>

          <button onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); setNotice(""); }} className="text-xs font-bold" style={{ color: TOKENS.gold }}>
            {mode === "signin" ? t.switchToSignUp : t.switchToSignIn}
          </button>
        </div>
      </div>
    </div>
  );
}
