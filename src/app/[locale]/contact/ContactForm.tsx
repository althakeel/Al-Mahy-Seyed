"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { translations, Locale } from "@/lib/translations";
import { countries, DEFAULT_COUNTRY, type Country } from "@/lib/countries";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({
  lang,
  variant = "dark",
  hideHeader = false,
}: {
  lang: Locale;
  variant?: "dark" | "light";
  hideHeader?: boolean;
}) {
  const t = translations[lang];
  const isAr = lang === "ar";
  const light = variant === "light";

  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [topicOpen, setTopicOpen] = useState(false);
  const topicRef = useRef<HTMLDivElement>(null);

  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryRef = useRef<HTMLDivElement>(null);

  const filteredCountries = useMemo(() => {
    const q = countrySearch.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dial.includes(q) || c.iso2.toLowerCase().includes(q)
    );
  }, [countrySearch]);

  const copy = {
    topicLabel: isAr ? "الموضوع" : "Topic",
    topics: isAr
      ? ["استشارة", "مراجعة قضية", "خدمات الشركات", "دعم التقاضي", "أخرى"]
      : ["Consultation", "Case review", "Corporate services", "Litigation support", "Other"],
    replyNote: isAr ? "سنرد عليك خلال يوم عمل واحد." : "We'll get back within one business day.",
    confidential: isAr
      ? "بالإرسال، أنت تؤكد صحة البيانات. نحافظ على سرية معلوماتك."
      : "By submitting, you confirm the details are correct. We keep your information confidential.",
    sending: isAr ? "جارٍ الإرسال..." : "Sending...",
    success: isAr
      ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا."
      : "Your message has been sent! We'll be in touch soon.",
    errorGeneric: isAr
      ? "تعذّر إرسال رسالتك. يرجى المحاولة مرة أخرى."
      : "We couldn't send your message. Please try again.",
  };

  const [topic, setTopic] = useState(copy.topics[0]);

  const inputClass = light
    ? "w-full rounded-lg border border-[#160A0A]/15 bg-[#f7f4f1] px-4 py-3 text-[#160A0A] placeholder:text-[#160A0A]/40 outline-none transition focus:border-[#B38D42] focus:bg-white"
    : "w-full rounded-lg border border-[#B38D42]/20 bg-[#100B0B]/60 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-[#B38D42] focus:bg-[#100B0B]/80 focus:ring-1 focus:ring-[#B38D42]/25";

  const labelClass = light
    ? "space-y-1.5 text-sm font-medium text-[#3f3832]"
    : "space-y-1.5 text-sm font-medium text-white/80";

  const selectBtnClass = light
    ? "cursor-pointer border-[#160A0A]/15 bg-[#f7f4f1] text-[#160A0A] hover:bg-white"
    : "cursor-pointer border-[#B38D42]/20 bg-[#100B0B]/60 text-white hover:bg-[#100B0B]/80";

  const menuClass = light
    ? "border-[#160A0A]/10 bg-white shadow-xl"
    : "border-[#B38D42]/20 bg-[#100B0B] shadow-2xl shadow-black/50";

  const menuItemIdle = light
    ? "cursor-pointer text-[#3f3832] hover:bg-[#f7f4f1]"
    : "cursor-pointer text-white/80 hover:bg-white/5";

  const menuItemActive = light
    ? "cursor-pointer bg-[#B38D42]/10 text-[#160A0A]"
    : "cursor-pointer bg-[#B38D42]/15 text-white";

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (topicRef.current && !topicRef.current.contains(e.target as Node)) {
        setTopicOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const rawNumber = String(data.get("phoneNumber") || "").trim();
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: rawNumber ? `${country.dial} ${rawNumber}` : "",
      topic: String(data.get("topic") || ""),
      message: String(data.get("message") || ""),
    };

    setStatus("sending");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json?.success) {
        setStatus("success");
        setFeedback(copy.success);
        form.reset();
        setTopic(copy.topics[0]);
        setCountry(DEFAULT_COUNTRY);
      } else {
        setStatus("error");
        setFeedback(json?.message || copy.errorGeneric);
      }
    } catch {
      setStatus("error");
      setFeedback(copy.errorGeneric);
    }
  }

  return (
    <div
      className={
        hideHeader
          ? ""
          : light
            ? "rounded-2xl border border-[#160A0A]/10 bg-white p-7 sm:p-8"
            : "rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-8"
      }
    >
      {!hideHeader ? (
        <div className="mb-6">
          <h2 className={`text-xl font-semibold ${light ? "text-[#160A0A]" : "text-white"}`}>
            {t.sendMessage}
          </h2>
          <p className={`mt-1.5 text-sm ${light ? "text-[#6b625a]" : "text-white/60"}`}>
            {copy.replyNote}
          </p>
        </div>
      ) : null}

      <form className="grid grid-cols-1 gap-5 md:grid-cols-2" onSubmit={handleSubmit} aria-label="Contact form">
        <label className={labelClass}>
          {t.formName}
          <input type="text" name="name" placeholder={t.formNamePlaceholder} className={inputClass} required />
        </label>
        <label className={labelClass}>
          {t.formEmail}
          <input type="email" name="email" placeholder={t.formEmailPlaceholder} className={inputClass} required />
        </label>
        <div className={labelClass}>
          <span>{t.formPhone}</span>
          <div className={`flex gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
            <div className="relative" ref={countryRef}>
              <button
                type="button"
                onClick={() => setCountryOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={countryOpen}
                className={`flex h-full items-center gap-1.5 rounded-lg border px-3 py-3 outline-none transition ${selectBtnClass} ${
                  countryOpen ? (light ? "border-[#B38D42]" : "border-[#B38D42]") : ""
                }`}
              >
                <span className="text-sm">{country.dial}</span>
                <svg
                  viewBox="0 0 24 24"
                  className={`h-3.5 w-3.5 flex-none transition-transform ${countryOpen ? "rotate-180" : ""} ${
                    light ? "text-[#160A0A]/45" : "text-white/50"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {countryOpen && (
                <div className={`absolute z-30 mt-2 w-72 max-w-[80vw] overflow-hidden rounded-lg border ${menuClass}`}>
                  <div className="p-2">
                    <input
                      type="text"
                      autoFocus
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      placeholder={isAr ? "ابحث عن دولة..." : "Search country..."}
                      className={
                        light
                          ? "w-full rounded-md border border-[#160A0A]/15 bg-[#f7f4f1] px-3 py-2 text-sm text-[#160A0A] outline-none focus:border-[#B38D42]"
                          : "w-full rounded-md border border-[#B38D42]/20 bg-[#100B0B]/60 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#B38D42]"
                      }
                    />
                  </div>
                  <ul role="listbox" className="max-h-60 overflow-y-auto p-1 pt-0">
                    {filteredCountries.map((c) => {
                      const active = c.iso2 === country.iso2;
                      return (
                        <li key={c.iso2} role="option" aria-selected={active}>
                          <button
                            type="button"
                            onClick={() => {
                              setCountry(c);
                              setCountryOpen(false);
                              setCountrySearch("");
                            }}
                            className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition ${
                              active ? menuItemActive : menuItemIdle
                            }`}
                          >
                            <span className="flex-1 truncate">{c.name}</span>
                            <span className={light ? "text-[#160A0A]/45" : "text-white/50"}>{c.dial}</span>
                          </button>
                        </li>
                      );
                    })}
                    {filteredCountries.length === 0 && (
                      <li className={`px-3 py-3 text-center text-sm ${light ? "text-[#160A0A]/40" : "text-white/40"}`}>
                        {isAr ? "لا توجد نتائج" : "No results"}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <input
              type="tel"
              name="phoneNumber"
              placeholder="50 123 4567"
              className={`${inputClass} flex-1`}
            />
          </div>
        </div>
        <div className={labelClass}>
          <span>{copy.topicLabel}</span>
          <input type="hidden" name="topic" value={topic} />
          <div className="relative" ref={topicRef}>
            <button
              type="button"
              onClick={() => setTopicOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={topicOpen}
              className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 outline-none transition ${selectBtnClass} ${
                isAr ? 'flex-row-reverse text-right' : 'text-left'
              } ${topicOpen ? 'border-[#B38D42]' : ''}`}
            >
              <span>{topic}</span>
              <svg
                viewBox="0 0 24 24"
                className={`h-4 w-4 flex-none transition-transform ${topicOpen ? "rotate-180" : ""} ${
                  light ? "text-[#160A0A]/45" : "text-white/50"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {topicOpen && (
              <ul role="listbox" className={`absolute z-20 mt-2 w-full overflow-hidden rounded-lg border p-1 ${menuClass}`}>
                {copy.topics.map((option) => {
                  const active = option === topic;
                  return (
                    <li key={option} role="option" aria-selected={active}>
                      <button
                        type="button"
                        onClick={() => {
                          setTopic(option);
                          setTopicOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition ${
                          active ? menuItemActive : menuItemIdle
                        }`}
                      >
                        {option}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <label className={`${labelClass} md:col-span-2`}>
          {t.formMessage}
          <textarea
            name="message"
            rows={5}
            placeholder={t.formMessagePlaceholder}
            className={`${inputClass} resize-none`}
            required
          />
        </label>

        {feedback && (
          <div
            role="status"
            className={`md:col-span-2 rounded-xl px-4 py-3 text-sm ring-1 ${
              status === "success"
                ? light
                  ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
                  : "bg-emerald-500/15 text-emerald-100 ring-emerald-500/40"
                : light
                  ? "bg-[#B38D42]/10 text-[#8f6b2f] ring-[#B38D42]/25"
                  : "bg-[#B38D42]/15 text-[#E8D5A8] ring-[#B38D42]/40"
            }`}
          >
            {feedback}
          </div>
        )}

        <div className={`flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between ${isAr ? 'md:flex-row-reverse' : ''}`}>
          <p className={`max-w-xs text-xs leading-relaxed ${light ? "text-[#6b625a]" : "text-white/50"} ${isAr ? 'md:text-right' : ''}`}>
            {copy.confidential}
          </p>
          <button
            type="submit"
            disabled={status === "sending"}
            className={`inline-flex h-[52px] cursor-pointer items-center justify-center gap-2 rounded-md px-7 text-[12px] font-semibold uppercase tracking-[0.14em] transition disabled:cursor-not-allowed disabled:opacity-60 ${
              light
                ? "bg-[#B38D42] text-white hover:bg-[#9A7635]"
                : "hero-btn-glow-solid bg-[#B38D42] text-white hover:border-[#9A7635] hover:bg-[#9A7635]"
            }`}
          >
            {status === "sending" ? copy.sending : t.formSubmit}
            {status !== "sending" && (
              <svg className={`h-3.5 w-3.5 ${isAr ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
