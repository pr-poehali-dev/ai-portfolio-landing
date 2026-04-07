import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/2c4c3d85-6d15-4014-b8c0-85a83486252a/files/06887e0c-4464-41fd-bcbd-62d2f9aa0465.jpg";

const tools = [
  "Midjourney",
  "Kling",
  "Sora",
  "Veo 3",
  "Gemini 3",
  "NanoBanana",
  "ChatGPT",
  "ComfyUI",
];

const galleryItems = [
  { id: 1, label: "Карточки товаров — Etsy" },
  { id: 2, label: "Blockchain Sports — анимации" },
  { id: 3, label: "Мультфильм «Полесские были»" },
  { id: 4, label: "Визуал для косметики" },
  { id: 5, label: "Спортивная одежда" },
  { id: 6, label: "Ковры и мебель" },
];

const musicProjects = [
  { name: "WildNasty", desc: "Музыкальный проект", url: "https://music.yandex.ru", emoji: "🌿" },
  { name: "KikiMara", desc: "Музыкальный проект", url: "https://music.yandex.ru", emoji: "🌙" },
  { name: "SimpleEnglish", desc: "Музыкальный проект", url: "https://music.yandex.ru", emoji: "✦" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Index() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Обо мне", href: "#about" },
    { label: "Инструменты", href: "#tools" },
    { label: "Галерея", href: "#gallery" },
    { label: "Музыка", href: "#music" },
    { label: "Контакты", href: "#contacts" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#f9f6f2", fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAV */}
      <nav style={{ background: "rgba(249,246,242,0.92)", borderBottom: "1px solid #e8e2d9" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm tracking-[0.15em] uppercase font-medium" style={{ color: "#2a2320" }}>
            Дарья Римарович
          </span>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}
                className="nav-link text-sm tracking-wide"
                style={{ color: "#6b6360" }}>
                {l.label}
              </a>
            ))}
          </div>
          <button className="md:hidden" style={{ color: "#2a2320" }} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ borderTop: "1px solid #e8e2d9" }}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="text-sm tracking-wide" style={{ color: "#2a2320" }}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase mb-6 animate-fade-in"
              style={{ color: "#9b9390", animationDelay: "0.1s", opacity: 0, animation: "fade-in 0.7s ease-out 0.1s forwards" }}>
              AI Content Creator · с 2022 года
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl leading-none mb-8"
              style={{
                fontFamily: "'Cormorant', serif", fontWeight: 400, color: "#2a2320",
                opacity: 0, animation: "fade-up 0.8s ease-out 0.2s forwards"
              }}>
              Дарья<br /><em>Римарович</em>
            </h1>
            <p className="text-lg leading-relaxed mb-10 max-w-md"
              style={{
                color: "#6b6360",
                opacity: 0, animation: "fade-up 0.8s ease-out 0.4s forwards"
              }}>
              Создаю визуальные миры с помощью искусственного интеллекта.
              Более 80 проектов в сфере брендинга, анимации и нарративного дизайна.
            </p>
            <div className="flex gap-4" style={{ opacity: 0, animation: "fade-up 0.8s ease-out 0.55s forwards" }}>
              <a href="#gallery"
                className="px-7 py-3 text-sm tracking-wide transition-colors"
                style={{ background: "#2a2320", color: "#f9f6f2" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#3d3530")}
                onMouseLeave={e => (e.currentTarget.style.background = "#2a2320")}>
                Смотреть работы
              </a>
              <a href="#contacts"
                className="px-7 py-3 text-sm tracking-wide transition-all"
                style={{ border: "1px solid #2a2320", color: "#2a2320" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#2a2320"; e.currentTarget.style.color = "#f9f6f2"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2a2320"; }}>
                Связаться
              </a>
            </div>
          </div>
          <div className="relative" style={{ opacity: 0, animation: "fade-in 0.9s ease-out 0.3s forwards" }}>
            <div className="aspect-[4/5] overflow-hidden" style={{ background: "#ede8e2" }}>
              <img src={HERO_IMAGE} alt="Дарья Римарович" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 px-5 py-3" style={{ background: "#f9f6f2", border: "1px solid #e8e2d9" }}>
              <p className="text-xs tracking-wide mb-0.5" style={{ color: "#9b9390" }}>Проектов</p>
              <p className="text-2xl" style={{ fontFamily: "'Cormorant', serif", color: "#2a2320" }}>80+</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{ borderTop: "1px solid #e8e2d9" }} /></div>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16">
          <div className="reveal">
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#9b9390" }}>01 — Обо мне</p>
            <h2 className="text-4xl md:text-5xl leading-tight"
              style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, color: "#2a2320" }}>
              Путь в мире<br /><em>нейросетей</em>
            </h2>
          </div>
          <div className="reveal space-y-8" style={{ transitionDelay: "0.15s" }}>
            {[
              {
                label: "2022 — настоящее",
                text: "Работаю в сфере ИИ-генерации с 2022 года. За это время реализовала более 80 проектов — от карточек товаров до полноценной анимации и нарративного дизайна."
              },
              {
                label: "Etsy & E-commerce",
                text: "Разрабатывала карточки товаров для трёх магазинов на Etsy. Визуал для сайтов в нишах косметики, спортивной одежды, ковров и мебели."
              },
              {
                label: "Blockchain Sports",
                text: "В компании Blockchain Sports разрабатывала раскадровку и анимации для мультфильма «Полесские были»."
              },
              {
                label: "2023 — Публикации",
                text: "Активно публиковала свои ИИ-работы в журналах, популяризируя нейросетевое творчество в профессиональной среде."
              },
              {
                label: "Преподавание — OTUS",
                text: "Руководитель курса по нарративному дизайну и сценаристике видеоигр в онлайн-школе OTUS. Провожу специальную лекцию по основам использования нейросетей. Основная рабочая платформа — Higgsfield."
              },
            ].map((item, i) => (
              <div key={i} className={i < 4 ? "pb-8" : ""} style={i < 4 ? { borderBottom: "1px solid #e8e2d9" } : {}}>
                <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#9b9390" }}>{item.label}</p>
                <p className="leading-relaxed" style={{ color: i === 0 ? "#2a2320" : "#6b6360", fontSize: i === 0 ? "1.125rem" : "1rem" }}
                  dangerouslySetInnerHTML={{ __html: item.text.replace(/80/g, "<strong>80</strong>").replace(/OTUS/g, "<strong>OTUS</strong>").replace(/Higgsfield/g, "<strong>Higgsfield</strong>").replace(/«Полесские были»/g, "<em>«Полесские были»</em>") }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{ borderTop: "1px solid #e8e2d9" }} /></div>

      {/* TOOLS */}
      <section id="tools" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#9b9390" }}>02 — Инструменты</p>
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, color: "#2a2320" }}>
            Рабочий<br /><em>арсенал</em>
          </h2>
        </div>
        <div className="reveal flex flex-wrap gap-3" style={{ transitionDelay: "0.1s" }}>
          {tools.map((tool) => (
            <span key={tool} className="tool-tag px-5 py-2.5 text-sm tracking-wide cursor-default" style={{ color: "#2a2320" }}>
              {tool}
            </span>
          ))}
        </div>
        <div className="reveal mt-10 p-6" style={{ border: "1px solid #e8e2d9", background: "#f4f0ec", transitionDelay: "0.2s" }}>
          <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#9b9390" }}>Агрегатор</p>
          <p className="text-lg" style={{ fontFamily: "'Cormorant', serif", color: "#2a2320" }}>
            Higgsfield — основная платформа для управления рабочим процессом и объединения ИИ-инструментов
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{ borderTop: "1px solid #e8e2d9" }} /></div>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#9b9390" }}>03 — Галерея</p>
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, color: "#2a2320" }}>
            Избранные<br /><em>проекты</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <div key={item.id} className="gallery-card reveal aspect-square flex items-end cursor-pointer"
              style={{ background: "#ede8e2", transitionDelay: `${i * 0.07}s` }}>
              <div className="w-full p-4" style={{ background: "linear-gradient(to top, rgba(42,35,32,0.65), transparent)" }}>
                <p className="text-xs tracking-wide" style={{ color: "#f9f6f2" }}>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal mt-8 text-center" style={{ transitionDelay: "0.3s" }}>
          <p className="text-sm" style={{ color: "#9b9390" }}>
            Загрузите свои работы — ячейки готовы к наполнению
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{ borderTop: "1px solid #e8e2d9" }} /></div>

      {/* MUSIC */}
      <section id="music" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#9b9390" }}>04 — Музыка</p>
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, color: "#2a2320" }}>
            Музыкальные<br /><em>проекты</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {musicProjects.map((p, i) => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
              className="music-card reveal p-8 flex flex-col gap-4 group"
              style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="text-3xl">{p.emoji}</span>
              <div>
                <p className="text-xl" style={{ fontFamily: "'Cormorant', serif", color: "#2a2320" }}>{p.name}</p>
                <p className="music-label text-xs tracking-wide mt-1" style={{ color: "#9b9390" }}>{p.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-xs mt-auto" style={{ color: "#9b9390" }}>
                <Icon name="Music" size={13} />
                <span>Яндекс Музыка</span>
                <Icon name="ArrowUpRight" size={13} />
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{ borderTop: "1px solid #e8e2d9" }} /></div>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#9b9390" }}>05 — Контакты</p>
            <h2 className="text-4xl md:text-5xl leading-tight"
              style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, color: "#2a2320" }}>
              Готова к<br /><em>новым проектам</em>
            </h2>
          </div>
          <div className="reveal space-y-5" style={{ transitionDelay: "0.15s" }}>
            {[
              {
                href: "mailto:daryarimarovich@gmail.com",
                icon: "Mail" as const,
                label: "Email",
                value: "daryarimarovich@gmail.com",
              },
              {
                href: "https://t.me/darya_rymar",
                icon: "Send" as const,
                label: "Telegram",
                value: "@darya_rymar",
              },
            ].map((c) => (
              <a key={c.href} href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 group transition-all"
                style={{ border: "1px solid #e8e2d9" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#2a2320"; (e.currentTarget as HTMLElement).style.borderColor = "#2a2320"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "#e8e2d9"; }}>
                <Icon name={c.icon} size={18} className="transition-colors" style={{ color: "#9b9390" }} />
                <div>
                  <p className="text-xs tracking-wide mb-0.5" style={{ color: "#9b9390" }}>{c.label}</p>
                  <p className="text-sm" style={{ color: "#2a2320" }}>{c.value}</p>
                </div>
                <Icon name="ArrowUpRight" size={16} className="ml-auto" style={{ color: "#9b9390" }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ borderTop: "1px solid #e8e2d9" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-wide" style={{ color: "#9b9390" }}>
            © 2024 Дарья Римарович — AI Content Creator
          </p>
          <p className="text-xs tracking-[0.15em] uppercase" style={{ color: "#b8b2ac" }}>
            Visual · Animation · Narrative Design
          </p>
        </div>
      </footer>

    </div>
  );
}
