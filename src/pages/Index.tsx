import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const tools = [
  "Midjourney", "Kling", "Sora", "Veo 3", "Gemini 3",
  "NanoBanana", "ChatGPT", "ComfyUI", "Photoshop", "CapCut", "Grok",
];

const initialGalleryItems = [
  { id: 1, label: "Ковры" },
  { id: 2, label: "Косметика" },
  { id: 3, label: "Колготки" },
  { id: 4, label: "Кампейн обуви и сумки" },
  { id: 5, label: "Стоматология" },
  { id: 6, label: "Аксессуары для собак" },
];

const initialMusicProjects = [
  { name: "WildNasty", genre: "Рэп / Трэп", desc: "Дерзкая энергия и авторский звук", url: "", emoji: "🌿" },
  { name: "KikiMara", genre: "Фолк / Электроника", desc: "Слияние архаичных мотивов и электронного звука", url: "", emoji: "🌙" },
  { name: "SimpleEnglish", genre: "Альтернативный рок 2000-х", desc: "Экспериментальный проект — обучение английскому через песни", url: "", emoji: "✦" },
];

const stats = [
  { value: "50+", label: "Проектов" },
  { value: "4+", label: "Года в AI" },
  { value: "3", label: "Музыкальных AI проекта" },
];

const aboutPoints = [
  "Разрабатывала карточки товаров для магазинов на Etsy.",
  "Создавала визуал и видео для сайтов в нишах косметики, одежды, ковров и мебели.",
  "В компании Blockchain Sports разрабатывала раскадровку и анимации для мультфильма «Полесские были», а также короткометражные ролики для литературной премии в Дубае в 2025 году.",
  "Являюсь руководителем курса по нарративному дизайну и сценаристике видеоигр в онлайн-школе OTUS, где провожу специальную лекцию по основам использования нейросетей.",
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Index() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);

  // Hero photo
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhotoSrc(URL.createObjectURL(file));
  };

  // Gallery: up to 10 photos per project
  const [galleryPhotos, setGalleryPhotos] = useState<string[][]>(
    initialGalleryItems.map(() => [])
  );
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeProject === null) return;
    const files = Array.from(e.target.files || []);
    setGalleryPhotos(prev => {
      const updated = [...prev];
      const existing = updated[activeProject];
      const remaining = 10 - existing.length;
      const newUrls = files.slice(0, remaining).map(f => URL.createObjectURL(f));
      updated[activeProject] = [...existing, ...newUrls];
      return updated;
    });
    e.target.value = "";
  };

  const removeGalleryPhoto = (projIdx: number, photoIdx: number) => {
    setGalleryPhotos(prev => {
      const updated = [...prev];
      updated[projIdx] = updated[projIdx].filter((_, i) => i !== photoIdx);
      return updated;
    });
  };

  // Music covers + editable links
  const [musicCovers, setMusicCovers] = useState<(string | null)[]>([null, null, null]);
  const [musicUrls, setMusicUrls] = useState(initialMusicProjects.map(p => p.url));
  const [editingUrl, setEditingUrl] = useState<number | null>(null);
  const [urlDraft, setUrlDraft] = useState("");
  const coverInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleCoverUpload = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const updated = [...musicCovers];
      updated[idx] = URL.createObjectURL(file);
      setMusicCovers(updated);
    }
  };

  const navLinks = [
    { label: "Обо мне", href: "#about" },
    { label: "Инструменты", href: "#tools" },
    { label: "Галерея", href: "#gallery" },
    { label: "Музыка", href: "#music" },
    { label: "Контакты", href: "#contacts" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#f9f6f2", fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAV — тёмный для hero */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(18,14,30,0.75)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm tracking-[0.2em] uppercase font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
            DR
          </span>
          <p className="hidden md:block text-xs tracking-[0.25em] uppercase absolute left-1/2 -translate-x-1/2"
            style={{ color: "rgba(255,255,255,0.45)" }}>
            AI Content Creator · с 2022 года
          </p>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-sm tracking-wide"
                style={{ color: "rgba(255,255,255,0.6)" }}>
                {l.label}
              </a>
            ))}
          </div>
          <a href="#contacts"
            className="hidden md:block px-5 py-2 text-sm font-medium tracking-wide transition-all"
            style={{ background: "#d946a8", color: "#fff", borderRadius: "999px" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#c4389a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#d946a8")}>
            Написать
          </a>
          <button className="md:hidden" style={{ color: "rgba(255,255,255,0.7)" }} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 py-4 flex flex-col gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(18,14,30,0.97)" }}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="text-sm tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO — тёмный полноэкранный */}
      <section id="about" className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          minHeight: "100vh",
          background: "radial-gradient(ellipse at 60% 40%, #2d1a4a 0%, #1a1028 45%, #0e0a1c 100%)",
          paddingTop: "80px",
        }}>

        {/* фоновое свечение */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(180,60,200,0.18) 0%, transparent 70%)"
        }} />

        <div className="relative z-10 px-6 max-w-5xl mx-auto w-full">
          <p className="text-xs tracking-[0.3em] uppercase mb-8"
            style={{ color: "rgba(255,255,255,0.4)", opacity: 0, animation: "fade-in 0.7s ease-out 0.1s forwards" }}>
            AI Content Creator · с 2022 года
          </p>

          <h1 style={{
            fontFamily: "'Cormorant', serif",
            fontWeight: 400,
            lineHeight: 0.88,
            fontSize: "clamp(4.5rem, 14vw, 13rem)",
            opacity: 0,
            animation: "fade-up 0.9s ease-out 0.2s forwards",
          }}>
            <span style={{ color: "#d98ae8", display: "block" }}>Дарья</span>
            <span style={{ color: "rgba(255,255,255,0.92)", display: "block" }}>Римарович</span>
          </h1>

          <p className="mx-auto mt-10 mb-10 text-lg md:text-xl leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.75)",
              maxWidth: "640px",
              opacity: 0,
              animation: "fade-up 0.8s ease-out 0.45s forwards",
            }}>
            Создаю визуальные миры с помощью нейросетей —<br className="hidden md:block" />
            от анимации и иллюстраций до нарративного дизайна
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap"
            style={{ opacity: 0, animation: "fade-up 0.8s ease-out 0.6s forwards" }}>
            <a href="#gallery"
              className="px-8 py-3.5 text-sm font-medium tracking-wide transition-all"
              style={{ background: "#d946a8", color: "#fff", borderRadius: "999px" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#c4389a")}
              onMouseLeave={e => (e.currentTarget.style.background = "#d946a8")}>
              Смотреть работы
            </a>
            <a href="#experience"
              className="px-8 py-3.5 text-sm font-medium tracking-wide transition-all"
              style={{ background: "rgba(255,255,255,0.12)", color: "#fff", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.18)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}>
              Обо мне
            </a>
          </div>

          {/* Статистика */}
          <div className="mt-20 grid grid-cols-3 gap-0 max-w-xl mx-auto"
            style={{ opacity: 0, animation: "fade-up 0.8s ease-out 0.75s forwards", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            {stats.map((s, i) => (
              <div key={i} className="pt-6 pb-2 text-center"
                style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
                <p style={{ fontFamily: "'Cormorant', serif", fontSize: "2.5rem", color: "#d98ae8", lineHeight: 1 }}>{s.value}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* стрелка вниз */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ color: "rgba(255,255,255,0.25)", animation: "fade-in 1s ease-out 1.2s forwards", opacity: 0 }}>
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{ borderTop: "1px solid #e8e2d9" }} /></div>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16">
          <div className="reveal">
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#9b9390" }}>Опыт</p>
            <h2 className="text-4xl md:text-5xl leading-tight"
              style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, color: "#2a2320" }}>
              Чем<br /><em>занимаюсь</em>
            </h2>
          </div>
          <ul className="reveal space-y-0" style={{ transitionDelay: "0.1s" }}>
            {aboutPoints.map((point, i) => (
              <li key={i} className="flex gap-4 py-6 text-sm leading-relaxed"
                style={{ borderBottom: "1px solid #e8e2d9", color: "#6b6360" }}>
                <span className="shrink-0 text-xs tracking-widest pt-0.5" style={{ color: "#b8b2ac" }}>0{i + 1}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{ borderTop: "1px solid #e8e2d9" }} /></div>

      {/* TOOLS */}
      <section id="tools" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#9b9390" }}>01 — Инструменты</p>
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, color: "#2a2320" }}>
            Рабочий<br /><em>арсенал</em>
          </h2>
        </div>
        <div className="reveal flex flex-wrap gap-3 mb-8" style={{ transitionDelay: "0.1s" }}>
          {tools.map((tool) => (
            <span key={tool} className="tool-tag px-5 py-2.5 text-sm tracking-wide cursor-default" style={{ color: "#2a2320" }}>
              {tool}
            </span>
          ))}
        </div>
        <div className="reveal p-6" style={{ border: "1px solid #e8e2d9", background: "#f4f0ec", transitionDelay: "0.2s" }}>
          <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#9b9390" }}>Основной агрегатор</p>
          <p className="text-lg mb-3" style={{ fontFamily: "'Cormorant', serif", color: "#2a2320" }}>Higgsfield</p>
          <p className="text-sm leading-relaxed" style={{ color: "#6b6360" }}>
            В своей работе сейчас чаще всего использую именно Higgsfield — этот агрегатор объединяет ключевые ИИ-инструменты
            в едином рабочем пространстве и позволяет эффективно выстраивать весь производственный процесс.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{ borderTop: "1px solid #e8e2d9" }} /></div>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#9b9390" }}>02 — Галерея</p>
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, color: "#2a2320" }}>
            Избранные<br /><em>проекты</em>
          </h2>
        </div>

        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleGalleryUpload}
        />

        <div className="space-y-10">
          {initialGalleryItems.map((item, projIdx) => {
            const photos = galleryPhotos[projIdx];
            const canAdd = photos.length < 10;
            return (
              <div key={item.id} className="reveal" style={{ transitionDelay: `${projIdx * 0.05}s` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs tracking-widest" style={{ color: "#b8b2ac" }}>0{projIdx + 1}</span>
                    <h3 className="text-lg" style={{ fontFamily: "'Cormorant', serif", color: "#2a2320" }}>{item.label}</h3>
                    <span className="text-xs" style={{ color: "#b8b2ac" }}>{photos.length}/10</span>
                  </div>
                  {canAdd && (
                    <button
                      onClick={() => { setActiveProject(projIdx); setTimeout(() => galleryInputRef.current?.click(), 50); }}
                      className="flex items-center gap-2 text-xs tracking-wide transition-colors px-4 py-2"
                      style={{ border: "1px solid #e8e2d9", color: "#6b6360" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#2a2320"; (e.currentTarget as HTMLElement).style.color = "#2a2320"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e8e2d9"; (e.currentTarget as HTMLElement).style.color = "#6b6360"; }}>
                      <Icon name="Plus" size={13} />
                      Добавить фото
                    </button>
                  )}
                </div>

                {photos.length === 0 ? (
                  <div
                    className="h-36 flex items-center justify-center cursor-pointer group transition-colors"
                    style={{ background: "#f0ece7", border: "1px dashed #d4cec7" }}
                    onClick={() => { setActiveProject(projIdx); setTimeout(() => galleryInputRef.current?.click(), 50); }}>
                    <div className="flex flex-col items-center gap-2" style={{ color: "#b8b2ac" }}>
                      <Icon name="ImagePlus" size={22} />
                      <p className="text-xs tracking-[0.15em] uppercase">Добавить до 10 фото</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {photos.map((src, photoIdx) => (
                      <div key={photoIdx} className="relative group aspect-square overflow-hidden"
                        style={{ background: "#ede8e2" }}>
                        <img src={src} alt="" className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeGalleryPhoto(projIdx, photoIdx)}
                          className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-6 h-6"
                          style={{ background: "rgba(42,35,32,0.75)", color: "#f9f6f2", borderRadius: "50%" }}>
                          <Icon name="X" size={11} />
                        </button>
                      </div>
                    ))}
                    {canAdd && (
                      <div
                        className="aspect-square flex items-center justify-center cursor-pointer transition-colors"
                        style={{ background: "#f0ece7", border: "1px dashed #d4cec7" }}
                        onClick={() => { setActiveProject(projIdx); setTimeout(() => galleryInputRef.current?.click(), 50); }}>
                        <Icon name="Plus" size={18} style={{ color: "#c8c2bc" }} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{ borderTop: "1px solid #e8e2d9" }} /></div>

      {/* MUSIC */}
      <section id="music" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#9b9390" }}>03 — Музыка</p>
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, color: "#2a2320" }}>
            Музыкальные<br /><em>проекты</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {initialMusicProjects.map((p, i) => (
            <div key={p.name} className="reveal flex flex-col" style={{ border: "1px solid #e8e2d9", transitionDelay: `${i * 0.1}s` }}>

              {/* Обложка — уменьшенная */}
              <div
                className="aspect-square relative group cursor-pointer overflow-hidden"
                style={{ background: "#ede8e2", maxHeight: "200px" }}
                onClick={() => coverInputRefs[i].current?.click()}>
                {musicCovers[i] ? (
                  <img src={musicCovers[i]!} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ color: "#b8b2ac" }}>
                    <span className="text-3xl">{p.emoji}</span>
                    <p className="text-[10px] tracking-[0.15em] uppercase mt-1">Добавить обложку</p>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(42,35,32,0.4)" }}>
                  <div className="flex flex-col items-center gap-1.5" style={{ color: "#f9f6f2" }}>
                    <Icon name="ImagePlus" size={20} />
                    <p className="text-xs tracking-wide">{musicCovers[i] ? "Изменить" : "Загрузить"}</p>
                  </div>
                </div>
                <input ref={coverInputRefs[i]} type="file" accept="image/*" className="hidden"
                  onChange={(e) => handleCoverUpload(i, e)} />
              </div>

              {/* Инфо */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div>
                  <p className="text-xl" style={{ fontFamily: "'Cormorant', serif", color: "#2a2320" }}>{p.name}</p>
                  <p className="text-[10px] tracking-[0.18em] uppercase mt-1" style={{ color: "#9b9390" }}>{p.genre}</p>
                </div>
                <p className="text-xs leading-relaxed flex-1" style={{ color: "#6b6360" }}>{p.desc}</p>

                {/* Редактируемая ссылка */}
                <div className="pt-3" style={{ borderTop: "1px solid #e8e2d9" }}>
                  {editingUrl === i ? (
                    <div className="flex gap-2 items-center">
                      <input
                        autoFocus
                        value={urlDraft}
                        onChange={e => setUrlDraft(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === "Enter") {
                            const updated = [...musicUrls];
                            updated[i] = urlDraft;
                            setMusicUrls(updated);
                            setEditingUrl(null);
                          }
                          if (e.key === "Escape") setEditingUrl(null);
                        }}
                        placeholder="Ссылка на Яндекс Музыку..."
                        className="flex-1 text-xs px-2 py-1.5 outline-none"
                        style={{ border: "1px solid #d4cec7", color: "#2a2320", background: "#faf8f5" }}
                      />
                      <button
                        onClick={() => {
                          const updated = [...musicUrls];
                          updated[i] = urlDraft;
                          setMusicUrls(updated);
                          setEditingUrl(null);
                        }}
                        className="text-xs px-3 py-1.5 transition-colors"
                        style={{ background: "#2a2320", color: "#f9f6f2" }}>
                        ОК
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      {musicUrls[i] ? (
                        <a href={musicUrls[i]} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs tracking-wide transition-colors"
                          style={{ color: "#9b9390" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#2a2320")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#9b9390")}>
                          <Icon name="Music" size={12} />
                          <span>Яндекс Музыка</span>
                          <Icon name="ArrowUpRight" size={12} />
                        </a>
                      ) : (
                        <span className="text-xs" style={{ color: "#c8c2bc" }}>Ссылка не добавлена</span>
                      )}
                      <button
                        onClick={() => { setEditingUrl(i); setUrlDraft(musicUrls[i]); }}
                        className="text-xs transition-colors flex items-center gap-1"
                        style={{ color: "#b8b2ac" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#2a2320")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#b8b2ac")}>
                        <Icon name="Pencil" size={11} />
                        {musicUrls[i] ? "Изменить" : "Добавить"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div style={{ borderTop: "1px solid #e8e2d9" }} /></div>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#9b9390" }}>04 — Контакты</p>
            <h2 className="text-4xl md:text-5xl leading-tight"
              style={{ fontFamily: "'Cormorant', serif", fontWeight: 400, color: "#2a2320" }}>
              Готова к<br /><em>новым проектам</em>
            </h2>
          </div>
          <div className="reveal space-y-5" style={{ transitionDelay: "0.15s" }}>
            {[
              { href: "mailto:daryarimarovich@gmail.com", icon: "Mail" as const, label: "Email", value: "daryarimarovich@gmail.com" },
              { href: "https://t.me/darya_rymar", icon: "Send" as const, label: "Telegram", value: "@darya_rymar" },
            ].map((c) => (
              <a key={c.href} href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 group transition-all"
                style={{ border: "1px solid #e8e2d9" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#2a2320"; (e.currentTarget as HTMLElement).style.borderColor = "#2a2320"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "#e8e2d9"; }}>
                <Icon name={c.icon} size={18} style={{ color: "#9b9390" }} />
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
            © 2025 Дарья Римарович — AI Content Creator
          </p>
          <p className="text-xs tracking-[0.15em] uppercase" style={{ color: "#b8b2ac" }}>
            Visual · Animation · Narrative Design
          </p>
        </div>
      </footer>

    </div>
  );
}