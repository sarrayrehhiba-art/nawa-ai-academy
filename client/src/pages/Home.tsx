import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  BrainCircuit,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Copy,
  Cpu,
  Globe2,
  Layers3,
  Menu,
  Play,
  Quote,
  Sparkles,
  Star,
  Target,
  UsersRound,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";

type Course = {
  title: string;
  level: string;
  category: string;
  duration: string;
  students: string;
  accent: "mint" | "violet" | "blue";
  description: string;
};

const courses: Course[] = [
  {
    title: "هندسة الأوامر والذكاء التوليدي",
    level: "مبتدئ",
    category: "توليدي",
    duration: "4 أسابيع",
    students: "+2,400 متعلم",
    accent: "mint",
    description: "ابنِ طريقة تفكير جديدة مع النماذج التوليدية وحوّل أفكارك إلى مخرجات دقيقة.",
  },
  {
    title: "بناء وكلاء AI مستقلين",
    level: "متقدم",
    category: "وكلاء",
    duration: "8 أسابيع",
    students: "+860 متعلم",
    accent: "violet",
    description: "صمّم وكلاء أذكياء يفكرون، يخططون، وينفذون المهام ضمن أنظمة حقيقية.",
  },
  {
    title: "علوم البيانات من الصفر",
    level: "متوسط",
    category: "بيانات",
    duration: "6 أسابيع",
    students: "+1,700 متعلم",
    accent: "blue",
    description: "من البيانات الخام إلى قرارات واضحة عبر التحليل، التصور، والنمذجة العملية.",
  },
  {
    title: "الرؤية الحاسوبية التطبيقية",
    level: "متوسط",
    category: "رؤية",
    duration: "7 أسابيع",
    students: "+920 متعلم",
    accent: "violet",
    description: "درّب نماذج ترى العالم وتفهمه، من الصور الطبية إلى المنتجات الذكية.",
  },
  {
    title: "AI للقيادات وصنّاع القرار",
    level: "مبتدئ",
    category: "أعمال",
    duration: "3 أسابيع",
    students: "+1,200 متعلم",
    accent: "mint",
    description: "خارطة عملية لتبنّي الذكاء الاصطناعي وبناء فرق ومنتجات أكثر تأثيرًا.",
  },
  {
    title: "هندسة نماذج اللغة الكبيرة",
    level: "متقدم",
    category: "نماذج",
    duration: "10 أسابيع",
    students: "+430 متعلم",
    accent: "blue",
    description: "تعمّق في بنية النماذج، الضبط، التقييم، وتحسين الأداء على نطاق واسع.",
  },
];

const filterOptions = ["الكل", "مبتدئ", "متوسط", "متقدم"];

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="نواة للذكاء الاصطناعي">
      <span className="brand-mark"><span /></span>
      <span className="brand-word">نواة<span>AI</span></span>
    </a>
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return <div className="section-kicker"><span className="kicker-dot" />{children}</div>;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const visibleCourses = useMemo(
    () => activeFilter === "الكل" ? courses : courses.filter((course) => course.level === activeFilter),
    [activeFilter],
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  };

  return (
    <main dir="rtl" id="top">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="site-header">
        <div className="nav-wrap">
          <Logo />
          <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="التنقل الرئيسي">
            <button onClick={() => scrollTo("programs")}>البرامج</button>
            <button onClick={() => scrollTo("method")}>منهجنا</button>
            <button onClick={() => scrollTo("stories")}>قصص النجاح</button>
            <button onClick={() => scrollTo("about")}>لماذا نواة؟</button>
          </nav>
          <div className="nav-actions">
            <button className="login-link" onClick={() => showNotice("مساحة الدخول ستتوفر قريبًا")}>تسجيل الدخول</button>
            <button className="nav-cta" onClick={() => setEnrollOpen(true)}>ابدأ رحلتك <ArrowLeft size={16} /></button>
          </div>
          <button className="mobile-toggle" aria-label="فتح القائمة" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <section className="hero section-shell">
        <div className="hero-copy reveal">
          <div className="eyebrow"><span className="pulse-dot" /> أكاديمية المستقبل الرقمي</div>
          <h1>تعلّم الذكاء<br /><em>بشكل مختلف.</em></h1>
          <p className="hero-lead">نصنع لك عقلية جديدة، أدوات أقوى، ومستقبلًا لا ينتظر أحدًا. تعلّم الذكاء الاصطناعي من التجربة إلى الإتقان.</p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => scrollTo("programs")}>استكشف البرامج <ArrowLeft size={18} /></button>
            <button className="play-btn" onClick={() => showNotice("الفيديو التعريفي قادم قريبًا")}><span><Play size={14} fill="currentColor" /></span> شاهد كيف نعمل</button>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack"><span>س</span><span>ل</span><span>م</span><span>+</span></div>
            <div><strong>+8,000</strong><small>متعلم يطوّر مستقبله معنا</small></div>
          </div>
        </div>
        <div className="hero-art reveal reveal-delay-2">
          <div className="art-grid" />
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" />
          <img src="/manus-storage/nawa-neural-orb_33835ee0.png" alt="كرة شبكية مضيئة ترمز للذكاء الاصطناعي" />
          <div className="floating-chip chip-top"><Sparkles size={15} /><span>إبداع بلا حدود</span></div>
          <div className="floating-chip chip-bottom"><span className="mini-bars"><i /><i /><i /><i /></span><span>نمو متسارع</span><b>+84%</b></div>
          <div className="art-caption"><span>01</span><span>Neural<br />Thinking</span></div>
        </div>
        <div className="scroll-cue"><span>اسحب للاستكشاف</span><div><i /></div></div>
      </section>

      <section className="trust-strip reveal">
        <div className="section-shell trust-inner">
          <span className="trust-label">يثق بنا صُنّاع التغيير في</span>
          <div className="trust-logos"><span>سِراج</span><span className="logo-italic">rawafed</span><span className="logo-mono">NEXA</span><span>مِداد</span><span className="logo-italic">orbit</span></div>
        </div>
      </section>

      <section className="programs-section section-shell" id="programs">
        <div className="section-heading reveal">
          <div><SectionKicker>مساحتك للنمو</SectionKicker><h2>مسارات تصنع<br /><span>الفرق الحقيقي.</span></h2></div>
          <p>ليست دورات مسجلة فحسب. إنها تجربة تعلّم مصمّمة لتضع المعرفة بين يديك، ثم تدفعك لتستخدمها.</p>
        </div>
        <div className="filter-row reveal"><span>تصفّح حسب المستوى</span><div>{filterOptions.map((filter) => <button key={filter} className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div></div>
        <div className="course-grid">
          {visibleCourses.map((course, index) => (
            <article className={`course-card ${course.accent} reveal`} style={{ transitionDelay: `${index * 60}ms` }} key={course.title}>
              <div className="course-top"><span className="course-icon">{course.category === "بيانات" ? <Layers3 size={20} /> : course.category === "رؤية" ? <Target size={20} /> : course.category === "أعمال" ? <Globe2 size={20} /> : course.category === "نماذج" ? <Cpu size={20} /> : course.category === "وكلاء" ? <BrainCircuit size={20} /> : <WandSparkles size={20} />}</span><span className="course-level">{course.level}</span></div>
              <h3>{course.title}</h3><p>{course.description}</p>
              <div className="course-meta"><span><Clock3 size={14} /> {course.duration}</span><span><UsersRound size={14} /> {course.students}</span></div>
              <button className="card-arrow" aria-label={`استكشف دورة ${course.title}`} onClick={() => setEnrollOpen(true)}><ArrowUpLeft size={18} /></button>
            </article>
          ))}
        </div>
        <div className="center-link reveal"><button onClick={() => { setActiveFilter("الكل"); showNotice("تم عرض جميع البرامج") }}>عرض كل البرامج <ArrowLeft size={16} /></button></div>
      </section>

      <section className="manifesto-section" id="about">
        <div className="section-shell manifesto-grid">
          <div className="manifesto-visual reveal"><div className="manifesto-ring ring-1" /><div className="manifesto-ring ring-2" /><div className="manifesto-ring ring-3" /><div className="manifesto-core"><span>ن</span></div><div className="manifesto-note note-a">فكرة</div><div className="manifesto-note note-b">تجربة</div><div className="manifesto-note note-c">أثر</div></div>
          <div className="manifesto-copy reveal reveal-delay-1"><SectionKicker>ما الذي يجعلنا مختلفين؟</SectionKicker><h2>لا نعلّمك<br /><span>أن تواكب.</span><br />نعلّمك أن تقود.</h2><p>في نواة، نؤمن أن الذكاء الاصطناعي ليس مجرد مهارة تقنية. إنه طريقة جديدة لرؤية الاحتمالات، وصناعة قيمة حقيقية، وترك أثر لا يُنسى.</p><button className="text-btn" onClick={() => scrollTo("method")}>اكتشف فلسفتنا <ArrowLeft size={17} /></button></div>
        </div>
      </section>

      <section className="method-section section-shell" id="method">
        <div className="section-heading compact reveal"><div><SectionKicker>تجربة نواة</SectionKicker><h2>تعلّم يتحرّك<br /><span>معك، لا أمامك.</span></h2></div><p>من أول سؤال إلى أول إنجاز، صمّمنا كل تفصيلة لتبقيك في حالة فضول مستمر.</p></div>
        <div className="method-grid">
          <div className="method-card featured reveal"><span className="method-number">01</span><div className="method-icon"><Code2 size={24} /></div><h3>تعلّم بالممارسة</h3><p>كل مفهوم يتحول إلى تجربة. وكل تجربة تقودك إلى مشروع حقيقي يمكنك أن تفخر به.</p><div className="method-line" /></div>
          <div className="method-card reveal reveal-delay-1"><span className="method-number">02</span><div className="method-icon"><Zap size={24} /></div><h3>إيقاع يناسبك</h3><p>مسارات مرنة، جلسات قصيرة، وتحديات تبقي التعلم جزءًا من يومك.</p><div className="method-line" /></div>
          <div className="method-card reveal reveal-delay-2"><span className="method-number">03</span><div className="method-icon"><Copy size={24} /></div><h3>مجتمع من الطموحين</h3><p>لا تتعلم وحدك. شارك، ناقش، وابنِ علاقات مع أشخاص يفكرون مثلك.</p><div className="method-line" /></div>
        </div>
      </section>

      <section className="stories-section section-shell" id="stories">
        <div className="story-head reveal"><SectionKicker>أصوات من الرحلة</SectionKicker><div className="story-controls"><button onClick={() => showNotice("جاري تحميل القصة التالية")} aria-label="القصة التالية"><ArrowLeft size={18} /></button><span>01 <i /> 04</span><button onClick={() => showNotice("جاري تحميل القصة السابقة")} aria-label="القصة السابقة"><ArrowLeft size={18} className="flip-icon" /></button></div></div>
        <div className="story-card reveal"><div className="quote-mark"><Quote size={30} fill="currentColor" /></div><blockquote>“كنت أبحث عن دورة، لكنني وجدت مجتمعًا كاملًا أعاد تعريف علاقتي بالتقنية. اليوم، أبني حلول AI لم أكن أتخيلها قبل 6 أشهر.”</blockquote><div className="story-person"><div className="person-avatar">ن</div><div><strong>نوف العتيبي</strong><span>مؤسسة منتج تقني · خريجة مسار الوكلاء</span></div><div className="rating"><Star size={15} fill="currentColor" /> 5.0</div></div></div>
      </section>

      <section className="cta-section section-shell reveal">
        <div className="cta-glow" /><div className="cta-content"><span className="cta-overline">خطوتك الأولى تبدأ الآن</span><h2>جاهز تبني<br /><em>نسختك القادمة؟</em></h2><p>انضم إلى مجتمع من يختارون أن يصنعوا المستقبل بدلًا من انتظاره.</p><button className="primary-btn light" onClick={() => setEnrollOpen(true)}>ابدأ مجانًا <ArrowLeft size={18} /></button></div><div className="cta-orbit orbit-x" /><div className="cta-orbit orbit-y" /></section>

      <footer className="site-footer"><div className="section-shell footer-grid"><div><Logo /><p>نحوّل الفضول إلى قدرة،<br />والقدرة إلى أثر.</p></div><div className="footer-links"><div><strong>استكشف</strong><button onClick={() => scrollTo("programs")}>البرامج</button><button onClick={() => scrollTo("method")}>منهجنا</button><button onClick={() => scrollTo("stories")}>قصص النجاح</button></div><div><strong>تواصل</strong><button onClick={() => showNotice("سنكون سعداء بسماعك")}>hello@nawa.ai</button><button onClick={() => showNotice("تابعنا قريبًا")}>لينكدإن</button><button onClick={() => showNotice("تابعنا قريبًا")}>إنستغرام</button></div></div></div><div className="section-shell footer-bottom"><span>© 2026 نواة AI. صُمّم بشغف للمستقبل.</span><span>الخصوصية <i /> الشروط</span></div></footer>

      {notice && <div className="notice" role="status"><Check size={17} /> {notice}</div>}
      {enrollOpen && <div className="modal-backdrop" role="presentation" onClick={() => setEnrollOpen(false)}><div className="enroll-modal" role="dialog" aria-modal="true" aria-labelledby="enroll-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setEnrollOpen(false)} aria-label="إغلاق"><X size={18} /></button><div className="modal-symbol"><Sparkles size={22} /></div><SectionKicker>بداية ذكية</SectionKicker><h2 id="enroll-title">ابدأ من حيث أنت.</h2><p>اترك بريدك وسنرسل لك خريطة البداية المناسبة لمستواك، مجانًا.</p><label>البريد الإلكتروني<input type="email" placeholder="you@example.com" /></label><button className="primary-btn modal-submit" onClick={() => { setEnrollOpen(false); showNotice("تم تسجيل اهتمامك — سنلتقي قريبًا") }}>أرسل لي الخريطة <ArrowLeft size={17} /></button><small>لا رسائل مزعجة. فقط أفكار تستحق وقتك.</small></div></div>}
    </main>
  );
}

export default Home;
