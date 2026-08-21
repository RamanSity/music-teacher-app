import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import AuthScreen from "./AuthScreen";
import TeacherApp from "./TeacherApp";
import StudentView from "./StudentView";
import { TOKENS, FONT_IMPORT, STR } from "./shared";

const LANG_KEY = "music-studio-lang";
function loadLang() {
  try { const raw = localStorage.getItem(LANG_KEY); return raw && STR[raw] ? raw : "ar"; }
  catch (err) { return "ar"; }
}

export default function App() {
  const [lang, setLangState] = useState(loadLang);
  const [session, setSession] = useState(undefined); // undefined = loading, null = logged out
  const studentToken = new URLSearchParams(window.location.search).get("student");

  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch (err) {}
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  if (studentToken) {
    return <StudentView token={studentToken} lang={lang} setLang={setLang} />;
  }

  if (session === undefined) {
    return (
      <div dir="rtl" className="min-h-screen w-full flex items-center justify-center" style={{ background: TOKENS.bg, fontFamily: "Tajawal" }}>
        <style>{FONT_IMPORT}</style>
        <span style={{ color: TOKENS.inkSoft }}>...</span>
      </div>
    );
  }

  if (!session) {
    return <AuthScreen lang={lang} setLang={setLang} />;
  }

  return <TeacherApp session={session} lang={lang} setLang={setLang} />;
}
