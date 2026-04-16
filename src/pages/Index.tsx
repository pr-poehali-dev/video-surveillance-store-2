import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/e691dfc1-71e1-4241-91b3-e77c15ca401b/files/07c9ed84-c9b8-496d-8980-f9fb6b6e08c0.jpg";
const CAM_IMG = "https://cdn.poehali.dev/projects/e691dfc1-71e1-4241-91b3-e77c15ca401b/files/6dbc9198-d080-4b9e-b5d1-086c90892a99.jpg";
const HOME_IMG = "https://cdn.poehali.dev/projects/e691dfc1-71e1-4241-91b3-e77c15ca401b/files/39a2d9fb-5b2f-4cb0-a29a-998cc168439a.jpg";

type Section = "home" | "catalog" | "configurator" | "about" | "delivery" | "faq" | "contacts" | "cart";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const CATALOG = [
  { id: 1, name: "IP-камера уличная 4MP", price: 3490, tag: "ХИТ", img: CAM_IMG, desc: "Металлический корпус IP66, ИК до 30м, H.265" },
  { id: 2, name: "Купольная камера 2MP", price: 2190, tag: "", img: CAM_IMG, desc: "Для помещений, угол 110°, POE питание" },
  { id: 3, name: "Видеорегистратор 8 кан.", price: 8900, tag: "НОВИНКА", img: CAM_IMG, desc: "NVR, 8 каналов, HDD до 6TB, облако" },
  { id: 4, name: "Комплект «Дом» 4 кам.", price: 18900, tag: "АКЦИЯ", img: HOME_IMG, desc: "4 уличные камеры + регистратор + монтаж" },
  { id: 5, name: "PTZ-камера 20x зум", price: 14900, tag: "", img: CAM_IMG, desc: "Поворотная, 20x оптический зум, авто-трекинг" },
  { id: 6, name: "Комплект «Офис» 8 кам.", price: 34900, tag: "ХИТ", img: HOME_IMG, desc: "8 камер + NVR + кабели + монтаж под ключ" },
];

const FAQ_ITEMS = [
  { q: "Сколько стоит монтаж?", a: "Стоимость монтажа рассчитывается индивидуально, зависит от количества камер и сложности объекта. В среднем 500–1500 ₽ за камеру." },
  { q: "Какая гарантия на оборудование?", a: "Все оборудование поставляется с официальной гарантией 12–36 месяцев. Собственный сервисный центр." },
  { q: "Можно ли смотреть камеры с телефона?", a: "Да, все системы поддерживают просмотр со смартфона через приложение 24/7, в том числе в облаке." },
  { q: "Как долго хранится запись?", a: "Зависит от объёма HDD и количества камер. Базовая комплектация — 30 дней записи в режиме 24/7." },
  { q: "Работаете ли вы в регионах?", a: "Да, доставляем оборудование по всей России. Для монтажа уточняйте наличие партнёров в вашем городе." },
];

const STEPS = [
  { icon: "MapPin", label: "Объект", options: ["Частный дом", "Квартира", "Офис", "Склад", "Магазин", "Территория"] },
  { icon: "Camera", label: "Камеры", options: ["1–2 камеры", "3–4 камеры", "5–8 камер", "9–16 камер", "16+ камер"] },
  { icon: "Eye", label: "Задача", options: ["Периметр", "Въезд / парковка", "Внутри помещений", "Склад / касса", "Всё сразу"] },
  { icon: "Wifi", label: "Доступ", options: ["Только запись", "Просмотр онлайн", "Облачное хранение", "Мобильное приложение"] },
];

const NAV_LABELS: Record<string, string> = {
  home: "Главная", catalog: "Каталог", configurator: "Конфигуратор",
  about: "О нас", delivery: "Доставка", faq: "FAQ", contacts: "Контакты"
};

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [configStep, setConfigStep] = useState(0);
  const [configChoices, setConfigChoices] = useState<string[]>([]);
  const [configDone, setConfigDone] = useState(false);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (item: typeof CATALOG[0]) => {
    setCart(prev => {
      const found = prev.find(c => c.id === item.id);
      if (found) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(c => c.id !== id));

  const handleConfigChoice = (choice: string) => {
    const next = [...configChoices];
    next[configStep] = choice;
    setConfigChoices(next);
    if (configStep < STEPS.length - 1) {
      setConfigStep(configStep + 1);
    } else {
      setConfigDone(true);
    }
  };

  const resetConfig = () => {
    setConfigStep(0);
    setConfigChoices([]);
    setConfigDone(false);
  };

  const nav = (s: Section) => {
    setSection(s);
    setMobileMenu(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }}>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(10,13,20,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => nav("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ border: "1px solid var(--neon)", boxShadow: "0 0 10px rgba(0,212,255,0.3)" }}>
              <Icon name="Camera" size={16} className="text-[var(--neon)]" />
            </div>
            <span className="text-xl font-semibold tracking-widest uppercase" style={{ fontFamily: "'Oswald', sans-serif", color: "var(--neon)", textShadow: "0 0 10px rgba(0,212,255,0.6)" }}>
              ВидеоПрофи
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {(["home","catalog","configurator","about","delivery","faq","contacts"] as Section[]).map(s => (
              <button key={s} onClick={() => nav(s)}
                className="px-3 py-1.5 text-sm rounded transition-all"
                style={{
                  fontFamily: "'Golos Text', sans-serif",
                  color: section === s ? "var(--neon)" : "rgba(255,255,255,0.55)",
                  background: section === s ? "rgba(0,212,255,0.1)" : "transparent",
                }}>
                {NAV_LABELS[s]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => nav("cart")} className="relative p-2 transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
              <Icon name="ShoppingCart" size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center" style={{ background: "var(--neon)", color: "#0a0d14", boxShadow: "0 0 10px rgba(0,212,255,0.5)" }}>
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2" style={{ color: "rgba(255,255,255,0.6)" }}>
              <Icon name={mobileMenu ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden px-4 py-3 flex flex-col gap-1" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(10,13,20,0.95)" }}>
            {(["home","catalog","configurator","about","delivery","faq","contacts"] as Section[]).map(s => (
              <button key={s} onClick={() => nav(s)} className="text-left px-3 py-2 text-sm transition-colors" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Golos Text', sans-serif" }}>
                {NAV_LABELS[s]}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">

        {/* ══════ HOME ══════ */}
        {section === "home" && (
          <div>
            {/* Hero */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
              <div className="absolute inset-0">
                <img src={HERO_IMG} alt="hero" className="w-full h-full object-cover" style={{ opacity: 0.2 }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsl(220,20%,6%) 40%, rgba(10,13,20,0.5) 80%, transparent)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(220,20%,6%) 0%, transparent 40%)" }} />
              </div>
              <div className="absolute top-1/3 right-8 w-px h-64" style={{ background: "linear-gradient(to bottom, transparent, var(--neon), transparent)", opacity: 0.4 }} />

              <div className="relative max-w-7xl mx-auto px-4 py-24">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full" style={{ background: "var(--neon)", boxShadow: "0 0 8px var(--neon)", animation: "pulseDot 2s infinite" }} />
                    <span className="text-sm tracking-[0.3em] uppercase" style={{ color: "var(--neon)", fontFamily: "'Golos Text', sans-serif" }}>Системы безопасности</span>
                  </div>

                  <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 700, lineHeight: 1, textTransform: "uppercase", marginBottom: "1.5rem" }}>
                    Видео<span style={{ color: "var(--neon)", textShadow: "0 0 20px rgba(0,212,255,0.5)" }}>наблюдение</span><br />под ключ
                  </h1>

                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "2.5rem", fontFamily: "'Golos Text', sans-serif" }}>
                    Профессиональные системы видеонаблюдения для дома, офиса и бизнеса. Монтаж, настройка, гарантия — всё включено.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => nav("configurator")}
                      className="px-8 py-3.5 rounded font-semibold text-base tracking-widest uppercase transition-all"
                      style={{ fontFamily: "'Oswald', sans-serif", background: "var(--neon)", color: "#0a0d14", boxShadow: "0 0 25px rgba(0,212,255,0.5)" }}>
                      Подобрать систему
                    </button>
                    <button onClick={() => nav("catalog")}
                      className="px-8 py-3.5 rounded font-semibold text-base tracking-widest uppercase transition-all"
                      style={{ fontFamily: "'Oswald', sans-serif", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>
                      Каталог
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }} className="py-10">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { n: "1200+", l: "Объектов под охраной" },
                  { n: "10 лет", l: "Опыт на рынке" },
                  { n: "24/7", l: "Техническая поддержка" },
                  { n: "5 лет", l: "Гарантия монтажа" },
                ].map(({ n, l }) => (
                  <div key={n} className="text-center">
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2.5rem", fontWeight: 700, color: "var(--neon)", textShadow: "0 0 15px rgba(0,212,255,0.4)" }}>{n}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }}>{l}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why us */}
            <section className="max-w-7xl mx-auto px-4 py-20">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-8 h-px" style={{ background: "var(--neon)" }} />
                <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Почему выбирают нас</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { icon: "Shield", title: "Официальные поставщики", text: "Работаем только с сертифицированным оборудованием ведущих мировых брендов" },
                  { icon: "Zap", title: "Быстрый монтаж", text: "Устанавливаем систему за 1 день. Никаких долгих согласований и ожиданий" },
                  { icon: "Headphones", title: "Поддержка 24/7", text: "Круглосуточная техподдержка, выезд мастера в течение 2 часов" },
                  { icon: "Cloud", title: "Облачное хранение", text: "Видеоархив в облаке — просматривайте запись с любого устройства" },
                  { icon: "Wrench", title: "Гарантия 5 лет", text: "5 лет на монтажные работы и 3 года на оборудование" },
                  { icon: "Calculator", title: "Бесплатный расчёт", text: "Выезд инженера и расчёт стоимости системы совершенно бесплатно" },
                ].map(({ icon, title, text }) => (
                  <div key={title} className="rounded p-6 transition-all group"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}>
                    <div className="w-10 h-10 rounded flex items-center justify-center mb-4"
                      style={{ border: "1px solid var(--neon)", boxShadow: "0 0 8px rgba(0,212,255,0.2)" }}>
                      <Icon name={icon} size={18} className="text-[var(--neon)]" />
                    </div>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.4rem", letterSpacing: "0.03em" }}>{title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.6 }}>{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 pb-20">
              <div className="relative rounded overflow-hidden">
                <img src={HOME_IMG} alt="cta" className="w-full h-64 object-cover" style={{ opacity: 0.3 }} />
                <div className="absolute inset-0 flex items-center px-8 md:px-16" style={{ background: "linear-gradient(to right, hsl(220,20%,6%) 30%, rgba(0,212,255,0.08))" }}>
                  <div>
                    <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.75rem" }}>
                      Не знаете с чего начать?
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>Пройдите конфигуратор — подберём систему за 2 минуты</p>
                    <button onClick={() => nav("configurator")}
                      className="px-6 py-3 rounded font-semibold tracking-widest uppercase transition-all"
                      style={{ fontFamily: "'Oswald', sans-serif", background: "var(--neon)", color: "#0a0d14", boxShadow: "0 0 20px rgba(0,212,255,0.4)" }}>
                      Запустить конфигуратор →
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ══════ CATALOG ══════ */}
        {section === "catalog" && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-px" style={{ background: "var(--neon)" }} />
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2.5rem", fontWeight: 600, textTransform: "uppercase" }}>Каталог</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATALOG.map(item => (
                <div key={item.id} className="rounded overflow-hidden transition-all group"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ opacity: 0.65 }} />
                    {item.tag && (
                      <span className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded tracking-widest"
                        style={{ fontFamily: "'Oswald', sans-serif", background: "var(--neon)", color: "#0a0d14" }}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.3rem" }}>{item.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", marginBottom: "1rem" }}>{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--neon)", textShadow: "0 0 10px rgba(0,212,255,0.4)" }}>
                        {item.price.toLocaleString()} ₽
                      </span>
                      <button onClick={() => addToCart(item)}
                        className="px-4 py-2 rounded font-semibold text-sm flex items-center gap-2 transition-all"
                        style={{ fontFamily: "'Oswald', sans-serif", background: "var(--neon)", color: "#0a0d14", boxShadow: "0 0 15px rgba(0,212,255,0.3)" }}>
                        <Icon name="ShoppingCart" size={14} />
                        В корзину
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════ CONFIGURATOR ══════ */}
        {section === "configurator" && (
          <div className="max-w-3xl mx-auto px-4 py-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px" style={{ background: "var(--neon)" }} />
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2.5rem", fontWeight: 600, textTransform: "uppercase" }}>Конфигуратор</h2>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: "2.5rem" }}>Ответьте на несколько вопросов — подберём оптимальный комплект</p>

            {!configDone ? (
              <>
                {/* Progress steps */}
                <div className="flex items-center gap-2 mb-10">
                  {STEPS.map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                        style={{
                          fontFamily: "'Oswald', sans-serif",
                          border: i <= configStep ? "1px solid var(--neon)" : "1px solid rgba(255,255,255,0.15)",
                          background: i < configStep ? "var(--neon)" : "transparent",
                          color: i < configStep ? "#0a0d14" : i === configStep ? "var(--neon)" : "rgba(255,255,255,0.3)",
                        }}>
                        {i < configStep ? <Icon name="Check" size={12} /> : i + 1}
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="w-8 h-px" style={{ background: i < configStep ? "var(--neon)" : "rgba(255,255,255,0.1)" }} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="rounded p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center gap-3 mb-6">
                    <Icon name={STEPS[configStep].icon} size={24} className="text-[var(--neon)]" />
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem", fontWeight: 600 }}>
                      {["Тип объекта", "Количество камер", "Основная задача", "Тип доступа"][configStep]}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {STEPS[configStep].options.map(opt => (
                      <button key={opt} onClick={() => handleConfigChoice(opt)}
                        className="p-4 rounded text-left transition-all"
                        style={{
                          border: configChoices[configStep] === opt ? "1px solid var(--neon)" : "1px solid rgba(255,255,255,0.1)",
                          background: configChoices[configStep] === opt ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.02)",
                          color: configChoices[configStep] === opt ? "var(--neon)" : "rgba(255,255,255,0.65)",
                          fontFamily: "'Golos Text', sans-serif",
                          fontSize: "0.9rem",
                        }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {configStep > 0 && (
                  <button onClick={() => setConfigStep(configStep - 1)}
                    className="mt-4 flex items-center gap-2 text-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Golos Text', sans-serif" }}>
                    <Icon name="ArrowLeft" size={14} />
                    Назад
                  </button>
                )}
              </>
            ) : (
              <div className="rounded p-8 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ border: "1px solid var(--neon)", boxShadow: "0 0 20px rgba(0,212,255,0.3)" }}>
                  <Icon name="CheckCircle" size={32} className="text-[var(--neon)]" />
                </div>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2rem", fontWeight: 700, color: "var(--neon)", textShadow: "0 0 15px rgba(0,212,255,0.4)", marginBottom: "1rem" }}>
                  Комплект подобран!
                </h3>
                <div className="rounded p-4 mb-5 text-left" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {STEPS.map((s, i) => (
                    <div key={i} className="flex justify-between py-2" style={{ borderBottom: i < STEPS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>{s.label}</span>
                      <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.85rem", fontWeight: 500 }}>{configChoices[i]}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded p-4 mb-6" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }}>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "0.25rem" }}>Рекомендованный комплект</div>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.8rem", fontWeight: 700, color: "var(--neon)", textShadow: "0 0 10px rgba(0,212,255,0.4)" }}>от 18 900 ₽</div>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem" }}>Включая монтаж и настройку</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={() => nav("contacts")}
                    className="px-6 py-3 rounded font-semibold tracking-widest uppercase"
                    style={{ fontFamily: "'Oswald', sans-serif", background: "var(--neon)", color: "#0a0d14", boxShadow: "0 0 20px rgba(0,212,255,0.4)" }}>
                    Получить расчёт
                  </button>
                  <button onClick={resetConfig}
                    className="px-6 py-3 rounded font-semibold tracking-widest uppercase transition-all"
                    style={{ fontFamily: "'Oswald', sans-serif", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}>
                    Начать заново
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════ ABOUT ══════ */}
        {section === "about" && (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-px" style={{ background: "var(--neon)" }} />
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2.5rem", fontWeight: 600, textTransform: "uppercase" }}>О компании</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem", fontFamily: "'Golos Text', sans-serif" }}>
                  <span style={{ color: "var(--neon)", fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem" }}>ВидеоПрофи</span> — профессиональный интегратор систем безопасности с 2014 года. Мы проектируем, поставляем и монтируем системы видеонаблюдения любой сложности.
                </p>
                <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "1.5rem", fontFamily: "'Golos Text', sans-serif" }}>
                  За 10 лет работы мы защитили более 1200 объектов: частные дома, торговые центры, промышленные предприятия, банки и государственные учреждения.
                </p>
                <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontFamily: "'Golos Text', sans-serif" }}>
                  Собственный инженерный отдел, сервисный центр и склад в Москве позволяют нам работать быстро и надёжно.
                </p>
              </div>
              <div className="relative rounded overflow-hidden">
                <img src={HERO_IMG} alt="about" className="w-full h-72 object-cover" style={{ opacity: 0.45 }} />
                <div className="absolute inset-0 rounded" style={{ border: "1px solid rgba(0,212,255,0.2)" }} />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "Award", title: "Лицензии", text: "Лицензия ФСБ, СРО, все необходимые разрешения для монтажа систем безопасности" },
                { icon: "Users", title: "Команда", text: "35 сертифицированных инженеров и монтажников в штате компании" },
                { icon: "Globe", title: "Партнёры", text: "Официальный партнёр Hikvision, Dahua, Axis, Bosch и других мировых лидеров" },
              ].map(({ icon, title, text }) => (
                <div key={title} className="rounded p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <Icon name={icon} size={24} className="text-[var(--neon)] mb-3" />
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.4rem" }}>{title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.6 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════ DELIVERY ══════ */}
        {section === "delivery" && (
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-px" style={{ background: "var(--neon)" }} />
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2.5rem", fontWeight: 600, textTransform: "uppercase" }}>Доставка</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5 mb-10">
              {[
                { icon: "Truck", title: "Курьерская доставка", desc: "По Москве и МО — 1 день, стоимость 500 ₽ (бесплатно от 10 000 ₽)" },
                { icon: "Package", title: "СДЭК / Почта России", desc: "По всей России 2–7 дней в зависимости от региона" },
                { icon: "Store", title: "Самовывоз", desc: "Бесплатно со склада в Москве, ул. Складочная 3, пн–пт 9:00–18:00" },
                { icon: "Wrench", title: "Выезд с монтажом", desc: "Инженер привозит оборудование и сразу устанавливает систему" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="rounded p-6 flex gap-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="w-10 h-10 rounded flex items-center justify-center shrink-0" style={{ border: "1px solid var(--neon)", boxShadow: "0 0 8px rgba(0,212,255,0.2)" }}>
                    <Icon name={icon} size={18} className="text-[var(--neon)]" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.3rem" }}>{title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: "2px solid var(--neon)" }}>
              <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.75rem" }}>Важно знать</h3>
              <ul className="space-y-2">
                {["Весь товар проходит контроль качества перед отправкой", "Упаковка — фирменная, с амортизацией и влагозащитой", "Гарантия сохраняется при любом способе доставки", "Оплата при получении или онлайн"].map(t => (
                  <li key={t} className="flex items-start gap-2" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
                    <Icon name="ChevronRight" size={14} className="text-[var(--neon)] mt-0.5 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ══════ FAQ ══════ */}
        {section === "faq" && (
          <div className="max-w-3xl mx-auto px-4 py-16">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-px" style={{ background: "var(--neon)" }} />
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2.5rem", fontWeight: 600, textTransform: "uppercase" }}>Частые вопросы</h2>
            </div>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="rounded overflow-hidden transition-all"
                  style={{ background: "rgba(255,255,255,0.03)", border: openFaq === i ? "1px solid rgba(0,212,255,0.3)" : "1px solid rgba(255,255,255,0.07)" }}>
                  <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.9)", paddingRight: "1rem" }}>{item.q}</span>
                    <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18}
                      style={{ color: openFaq === i ? "var(--neon)" : "rgba(255,255,255,0.35)", flexShrink: 0 }} />
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 1.25rem 1.25rem", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.7, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1rem" }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════ CONTACTS ══════ */}
        {section === "contacts" && (
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-px" style={{ background: "var(--neon)" }} />
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2.5rem", fontWeight: 600, textTransform: "uppercase" }}>Контакты</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (495) 000-00-00" },
                  { icon: "Mail", label: "Email", val: "info@securevision.ru" },
                  { icon: "MapPin", label: "Адрес", val: "Москва, ул. Складочная, 3" },
                  { icon: "Clock", label: "Режим работы", val: "Пн–Пт 9:00–19:00, Сб 10:00–16:00" },
                ].map(({ icon, label, val }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded flex items-center justify-center shrink-0" style={{ border: "1px solid var(--neon)", boxShadow: "0 0 8px rgba(0,212,255,0.2)" }}>
                      <Icon name={icon} size={16} className="text-[var(--neon)]" />
                    </div>
                    <div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", marginBottom: "0.15rem" }}>{label}</div>
                      <div style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", fontWeight: 600, marginBottom: "1.25rem" }}>Оставить заявку</h3>
                <div className="space-y-3">
                  {["text|Ваше имя", "tel|Телефон"].map(f => {
                    const [type, ph] = f.split("|");
                    return (
                      <input key={ph} type={type} placeholder={ph}
                        className="w-full px-4 py-3 rounded text-sm outline-none transition-colors"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }} />
                    );
                  })}
                  <textarea rows={3} placeholder="Опишите задачу" className="w-full px-4 py-3 rounded text-sm outline-none transition-colors resize-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }} />
                  <button className="w-full py-3 rounded font-semibold tracking-widest uppercase transition-all"
                    style={{ fontFamily: "'Oswald', sans-serif", background: "var(--neon)", color: "#0a0d14", boxShadow: "0 0 20px rgba(0,212,255,0.4)" }}>
                    Отправить заявку
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════ CART ══════ */}
        {section === "cart" && (
          <div className="max-w-3xl mx-auto px-4 py-16">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-px" style={{ background: "var(--neon)" }} />
              <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2.5rem", fontWeight: 600, textTransform: "uppercase" }}>Корзина</h2>
            </div>
            {cart.length === 0 ? (
              <div className="rounded p-16 text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <Icon name="ShoppingCart" size={48} style={{ color: "rgba(255,255,255,0.15)", margin: "0 auto 1rem" }} />
                <p style={{ color: "rgba(255,255,255,0.35)", marginBottom: "1.5rem" }}>Корзина пуста</p>
                <button onClick={() => nav("catalog")}
                  className="px-6 py-3 rounded font-semibold tracking-widest uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif", background: "var(--neon)", color: "#0a0d14" }}>
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-8">
                  {cart.map(item => (
                    <div key={item.id} className="rounded p-4 flex items-center justify-between gap-4"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div className="flex-1">
                        <div style={{ fontFamily: "'Golos Text', sans-serif", fontWeight: 500, marginBottom: "0.2rem" }}>{item.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}>{item.price.toLocaleString()} ₽ × {item.qty}</div>
                      </div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--neon)" }}>
                        {(item.price * item.qty).toLocaleString()} ₽
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="transition-colors" style={{ color: "rgba(255,255,255,0.25)" }}>
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="rounded p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderTop: "2px solid var(--neon)" }}>
                  <div className="flex justify-between items-center mb-5">
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>Итого:</span>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "2rem", fontWeight: 700, color: "var(--neon)", textShadow: "0 0 10px rgba(0,212,255,0.4)" }}>
                      {totalPrice.toLocaleString()} ₽
                    </span>
                  </div>
                  <button onClick={() => nav("contacts")}
                    className="w-full py-3.5 rounded font-semibold tracking-widest uppercase text-lg transition-all"
                    style={{ fontFamily: "'Oswald', sans-serif", background: "var(--neon)", color: "#0a0d14", boxShadow: "0 0 25px rgba(0,212,255,0.5)" }}>
                    Оформить заказ
                  </button>
                </div>
              </>
            )}
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "2.5rem" }}>
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ border: "1px solid var(--neon)" }}>
              <Icon name="Camera" size={12} className="text-[var(--neon)]" />
            </div>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>ВидеоПрофи</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {(["home","catalog","configurator","delivery","faq","contacts"] as Section[]).map(s => (
              <button key={s} onClick={() => nav(s)} style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", transition: "color 0.2s" }}
                onMouseOver={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                onMouseOut={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}>
                {NAV_LABELS[s]}
              </button>
            ))}
          </div>
          <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>© 2024 ВидеоПрофи</div>
        </div>
      </footer>
    </div>
  );
}