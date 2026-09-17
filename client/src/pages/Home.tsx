import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, Check, ChevronDown, Copy, Heart, Menu, Search, ShoppingBag, SlidersHorizontal, Sparkles, Star, X,
} from "lucide-react";

type Product = {
  id: number; name: string; category: string; price: number; oldPrice?: number; color: string; image: string; badge?: string; rating: number;
};

const products: Product[] = [
  { id: 1, name: "قميص الكتان الهادئ", category: "نساء", price: 289, oldPrice: 349, color: "عاجي", image: "wardrobe-look-1.jpg", badge: "الأكثر مبيعًا", rating: 4.9 },
  { id: 2, name: "بدلة البرغندي العصرية", category: "نساء", price: 649, oldPrice: 790, color: "برغندي", image: "wardrobe-look-2.jpg", badge: "خصم 18%", rating: 4.8 },
  { id: 3, name: "كارديغان الخريف", category: "نساء", price: 329, color: "برتقالي محروق", image: "wardrobe-look-3.jpg", badge: "وصل حديثًا", rating: 4.7 },
  { id: 4, name: "تيشيرت القطن العضوي", category: "رجال", price: 159, oldPrice: 199, color: "أبيض", image: "wardrobe-look-1.jpg", badge: "عرض الأسبوع", rating: 4.6 },
  { id: 5, name: "جاكيت يومي خفيف", category: "رجال", price: 449, color: "رمادي دافئ", image: "wardrobe-look-2.jpg", rating: 4.8 },
  { id: 6, name: "طقم يوم الجمعة", category: "وصل حديثًا", price: 499, color: "طبيعي", image: "wardrobe-look-3.jpg", badge: "جديد", rating: 4.9 },
];

const categories = ["الكل", "نساء", "رجال", "وصل حديثًا", "العروض"];

function Logo() {
  return <a className="wardrobe-logo" href="#top" aria-label="خزانة للموضة"><span className="logo-symbol">خ</span><span>خزانة<small>WARDROBE</small></span></a>;
}

export default function Home() {
  const [category, setCategory] = useState("الكل");
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState<number[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  const [toast, setToast] = useState("");
  const [remaining, setRemaining] = useState({ days: 2, hours: 14, minutes: 36, seconds: 52 });
  const [videoMuted, setVideoMuted] = useState(true);

  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2400); };
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining((time) => {
      const total = ((time.days * 24 + time.hours) * 60 + time.minutes) * 60 + time.seconds - 1;
      if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return { days: Math.floor(total / 86400), hours: Math.floor((total % 86400) / 3600), minutes: Math.floor((total % 3600) / 60), seconds: total % 60 };
    }), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const addToCart = (product: Product) => { setCart((items) => [...items, product]); setCartOpen(true); notify("تمت إضافة القطعة إلى حقيبتك"); };
  const toggleLike = (id: number) => setLiked((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "الكل" || (category === "العروض" ? Boolean(product.oldPrice) : category === "وصل حديثًا" ? Boolean(product.badge === "وصل حديثًا" || product.badge === "جديد") : product.category === category);
    return matchesCategory && `${product.name} ${product.color}`.includes(query.trim());
  }), [category, query]);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const base = import.meta.env.BASE_URL;

  return <main className="shop" id="top" dir="rtl">
    <div className="topbar"><div>شحن مجاني للطلبات فوق ٣٥٠ ر.س</div><div className="topbar-links"><span>تتبع طلبك</span><span>المساعدة</span><span>العربية <ChevronDown size={13} /></span></div></div>
    <header className="shop-header">
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="القائمة">{menuOpen ? <X /> : <Menu />}</button>
      <Logo />
      <nav className={menuOpen ? "shop-nav open" : "shop-nav"}>
        <a href="#new" onClick={() => setMenuOpen(false)}>وصل حديثًا</a><a href="#shop" onClick={() => setMenuOpen(false)}>تسوقي</a><a href="#shop" onClick={() => setMenuOpen(false)}>تسوقي للرجال</a><a href="#story" onClick={() => setMenuOpen(false)}>قصتنا</a><a className="sale-link" href="#shop" onClick={() => { setCategory("العروض"); setMenuOpen(false); }}>العروض</a>
      </nav>
      <div className="header-actions"><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحثي عن قطعتك..." /></label><button className="icon-btn" onClick={() => notify("المفضلة: " + liked.length + " قطعة")} aria-label="المفضلة"><Heart size={19} fill={liked.length ? "currentColor" : "none"} /></button><button className="bag-btn" onClick={() => setCartOpen(true)} aria-label="حقيبة التسوق"><ShoppingBag size={20} /><b>{cart.length}</b></button></div>
    </header>

    <section className="fashion-hero">
      <video className="hero-video" autoPlay muted={videoMuted} loop playsInline poster={`${base}wardrobe-hero.jpg`} aria-label="إعلان ترويجي لموقع الملابس الذكي"><source src={`${base}smart-clothing-promo.mp4`} type="video/mp4" /></video>
      <img src={`${base}wardrobe-hero.jpg`} alt="إطلالة خريفية من مجموعة خزانة" />
      <div className="hero-shade" /><div className="hero-copy"><span className="eyebrow"><Sparkles size={15} /> مجموعة الخريف ٢٠٢٦</span><h1>قطعة واحدة،<br /><em>إطلالة كاملة.</em></h1><p>نختار لك ملابس تعيش معك أكثر، وتقول الكثير عن ذوقك.</p><a className="button cream" href="#shop">اكتشفي المجموعة <ArrowLeft size={17} /></a></div><button className="video-toggle" onClick={() => setVideoMuted(!videoMuted)} aria-label={videoMuted ? "تشغيل الصوت" : "كتم الصوت"}>{videoMuted ? "تشغيل الصوت" : "كتم الصوت"}</button><div className="hero-note">01 / 03<br /><span>ملابس مصمّمة<br />للحياة اليومية</span></div>
    </section>

    <section className="promise-row"><div><strong>خامات تحبها بشرتك</strong><span>أقمشة مختارة بعناية</span></div><div><strong>توصيل سريع</strong><span>لجميع مدن المملكة</span></div><div><strong>إرجاع سهل</strong><span>خلال ١٤ يومًا</span></div><div><strong>دفع آمن</strong><span>خيارات دفع متعددة</span></div></section>

    <section className="promo-banner" id="offers"><div className="promo-copy"><span className="eyebrow"><Sparkles size={15} /> عرض موسمي محدود</span><h2>خصم ٢٥٪ على<br /><em>اختيارات الخريف.</em></h2><p>استخدمي كود <strong>KHZANA25</strong> عند الدفع واحصلي على خصمك قبل انتهاء الوقت.</p><button className="button cream" onClick={() => { navigator.clipboard?.writeText("KHZANA25"); notify("تم نسخ كود الخصم KHZANA25"); }}>انسخي الكود <Copy size={16} /></button><a href="#shop" className="promo-link">تسوقي العرض <ArrowLeft size={15} /></a></div><div className="countdown-wrap"><span>ينتهي العرض خلال</span><div className="countdown"><div><b>{String(remaining.days).padStart(2, "0")}</b><small>يوم</small></div><i>:</i><div><b>{String(remaining.hours).padStart(2, "0")}</b><small>ساعة</small></div><i>:</i><div><b>{String(remaining.minutes).padStart(2, "0")}</b><small>دقيقة</small></div><i>:</i><div><b>{String(remaining.seconds).padStart(2, "0")}</b><small>ثانية</small></div></div><div className="promo-stamp">٢٥٪<small>خصم</small></div></div></section>

    <section className="shop-section" id="shop"><div className="section-intro"><div><span className="eyebrow dark">تسوقي حسب ذوقك</span><h2>اختيارات <em>هذا الموسم</em></h2></div><button className="filter-button" onClick={() => notify("الفلاتر المتقدمة ستكون متاحة قريبًا")}><SlidersHorizontal size={17} /> تصفية وترتيب</button></div><div className="category-tabs">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="product-grid" id="new">{visibleProducts.map((product) => <article className="product-card" key={product.id}><div className="product-image"><img src={`${base}${product.image}`} alt={product.name} /><span className="product-badge">{product.badge || "مختار لك"}</span><button className={liked.includes(product.id) ? "like active" : "like"} onClick={() => toggleLike(product.id)} aria-label="إضافة للمفضلة"><Heart size={18} fill={liked.includes(product.id) ? "currentColor" : "none"} /></button><button className="quick-add" onClick={() => addToCart(product)}>أضيفي للحقيبة <ArrowLeft size={15} /></button></div><div className="product-details"><div><h3>{product.name}</h3><span>{product.color}</span></div><div className="rating"><Star size={13} fill="currentColor" /> {product.rating}</div></div><div className="price-row"><strong>{product.price} ر.س</strong>{product.oldPrice && <del>{product.oldPrice} ر.س</del>}</div></article>)}</div>{visibleProducts.length === 0 && <div className="empty-state">لم نجد قطعة بهذا الاسم. جربي كلمة أخرى.</div>}</section>

    <section className="campaign" id="story"><div><span className="eyebrow">فلسفة خزانة</span><h2>نؤمن أن الأناقة<br /><em>تبدأ من الراحة.</em></h2><p>كل قطعة نصممها تحمل وعدًا: جودة تلاحظينها من أول لمسة، وقصة تحبين ارتداءها كل يوم.</p><button className="button dark-button" onClick={() => notify("قريبًا: تعرفي على قصة كل قطعة")}>اكتشفي قصتنا <ArrowLeft size={17} /></button></div><div className="campaign-orbit"><span>صنع بحب</span><span>يلائم يومك</span><span>يبقى معك</span><div className="orbit-circle">خ</div></div></section>

    <section className="newsletter"><div><span className="eyebrow dark">كوني أول من يعرف</span><h2>رسالة صغيرة،<br /><em>إلهام كبير.</em></h2></div><form onSubmit={(event) => { event.preventDefault(); notify(newsletter ? "أهلًا بك في مجتمع خزانة" : "اكتبي بريدك أولًا"); }}><input value={newsletter} onChange={(event) => setNewsletter(event.target.value)} type="email" placeholder="بريدك الإلكتروني" /><button className="button dark-button">انضمي الآن <ArrowLeft size={16} /></button><small>لا رسائل مزعجة. فقط إطلالات جميلة وعروض حصرية.</small></form></section>

    <footer className="shop-footer"><Logo /><div><strong>تسوقي</strong><a href="#shop">كل القطع</a><a href="#shop">النساء</a><a href="#shop">الرجال</a></div><div><strong>مساعدتك</strong><button onClick={() => notify("تواصلي معنا على hello@khzana.sa")}>تواصلي معنا</button><button onClick={() => notify("دليل المقاسات قادم")}>دليل المقاسات</button><button onClick={() => notify("سياسة الإرجاع قادم")}>الإرجاع والاستبدال</button></div><div className="footer-end"><span>© ٢٠٢٦ خزانة. كل الحقوق محفوظة.</span><span>صنع في السعودية بحب.</span></div></footer>

    {cartOpen && <div className="drawer-layer" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-head"><h2>حقيبتك <span>({cart.length})</span></h2><button onClick={() => setCartOpen(false)} aria-label="إغلاق"><X /></button></div>{cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={38} /><p>حقيبتك تنتظر أول قطعة جميلة.</p><button className="button dark-button" onClick={() => setCartOpen(false)}>تابعي التسوق</button></div> : <><div className="cart-items">{cart.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><img src={`${base}${item.image}`} alt="" /><div><strong>{item.name}</strong><span>{item.color}</span><b>{item.price} ر.س</b></div><button onClick={() => setCart((items) => items.filter((_, itemIndex) => itemIndex !== index))}><X size={16} /></button></div>)}</div><div className="cart-bottom"><div><span>المجموع</span><strong>{total} ر.س</strong></div><button className="button dark-button" onClick={() => notify("الدفع الإلكتروني سيتوفر قريبًا")}>إتمام الطلب <ArrowLeft size={17} /></button></div></>}</aside></div>}
    {toast && <div className="toast"><Check size={16} /> {toast}</div>}
  </main>;
}
