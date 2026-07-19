import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Apple,
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  Clock,
  Frown,
  MapPin,
  Quote,
  Sparkles,
  Star,
  TrendingDown,
} from 'lucide-react';
import Galaxy from './components/Galaxy';
import ShinyText from './components/ShinyText';
import FeaturesPage from './pages/Features';
import MenuPage from './pages/Menu';
import './styles.css';

/* ================================================================
   轻量 hash 路由
   #/features → 功能介绍子页
   #/pricing  → 价格方案子页
   #/menu     → 今日餐单子页
   其余所有 hash(包括空/锚点) → 首页(原 App)
   ================================================================ */
function useRoute() {
  const resolve = () => {
    const h = window.location.hash;
    if (h.startsWith('#/features')) return 'features';
    if (h.startsWith('#/menu')) return 'menu';
    return 'home';
  };
  const [route, setRoute] = useState(resolve);

  useEffect(() => {
    const onHash = () => {
      setRoute(resolve());
      // 切回首页时如果目标是有名锚点则滚动,否则置顶
      if (resolve() === 'home') {
        const id = window.location.hash.replace(/^#/, '');
        if (id && !id.startsWith('/')) {
          requestAnimationFrame(() => {
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          });
        } else {
          requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
        }
      } else {
        // 进入子页:滚到顶部
        requestAnimationFrame(() => window.scrollTo({ top: 0 }));
      }
    };
    window.addEventListener('hashchange', onHash);
    // 首次加载时滚到顶部(除非有锚点)
    if (!window.location.hash || window.location.hash.startsWith('#/')) {
      window.scrollTo({ top: 0 });
    }
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return route;
}

const meals = [
  {
    title: '烟熏三文鱼平衡碗',
    kcal: '486 kcal',
    protein: '36g 蛋白质',
    image: '/zheergan-healthy-meals/images/salmon.jpg',
  },
  {
    title: '柑香鸡肉谷物碗',
    kcal: '532 kcal',
    protein: '42g 蛋白质',
    image: '/zheergan-healthy-meals/images/chicken.jpg',
  },
  {
    title: '牛油果绿蔬蛋碗',
    kcal: '418 kcal',
    protein: '28g 蛋白质',
    image: '/zheergan-healthy-meals/images/avocado.jpg',
  },
  {
    title: '藜麦能量碗',
    kcal: '462 kcal',
    protein: '24g 蛋白质',
    image: '/zheergan-healthy-meals/images/quinoa.jpg',
  },
  {
    title: '金枪鱼波奇碗',
    kcal: '508 kcal',
    protein: '38g 蛋白质',
    image: '/zheergan-healthy-meals/images/tuna.jpg',
  },
  {
    title: '黑椒牛肉能量盘',
    kcal: '568 kcal',
    protein: '44g 蛋白质',
    image: '/zheergan-healthy-meals/images/dish-14.jpg',
  },
  {
    title: '田园时蔬沙拉',
    kcal: '320 kcal',
    protein: '18g 蛋白质',
    image: '/zheergan-healthy-meals/images/salad.jpg',
  },
];

function HomePage() {
  return (
    <main className="site-shell">
      <div className="galaxy-bg">
        <Galaxy
          density={0.8}
          glowIntensity={0.35}
          saturation={0.15}
          hueShift={110}
          starSpeed={0.4}
          speed={0.6}
          rotationSpeed={0.08}
          twinkleIntensity={0.25}
          mouseInteraction={true}
          mouseRepulsion={true}
          repulsionStrength={1.5}
          transparent={true}
        />
      </div>
      <div className="grain" aria-hidden="true" />
      {/* 全局光斑:贯穿整页,无缝流动 */}
      <div className="global-blobs" aria-hidden="true">
        <span className="s-blob s-blob-1" />
        <span className="s-blob s-blob-2" />
        <span className="s-blob s-blob-3" />
      </div>
      {/* 全局玻璃导航:sticky 贯穿全页,与子页一致 */}
      <header className="home-nav">
        <div className="home-nav-inner max-frame">
          <a className="brand" href="#top" aria-label="折耳根健康餐">
            <span className="brand-mark">
              <img src="/zheergan-healthy-meals/brand-icon.jpg" alt="折耳根" className="brand-icon-img" />
            </span>
            <span>折耳根健康餐</span>
          </a>
          <nav className="nav-links" aria-label="主导航">
            <a href="#top">首页</a>
            <a href="#/features">功能介绍</a>
            <a href="#/menu">每月餐单</a>
          </nav>
        </div>
      </header>
      <Hero />
      <PainSection />
      <AnswerSection />
      <StepsSection />
      <PricingInline />
      <TrustSection />
      <FaqSection />
      <DownloadSection />
      <Footer />
    </main>
  );
}

/* ================================================================
   MealCarousel — 三张餐卡点击切换轮播
   ================================================================ */
function MealCarousel({ meals }) {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  const getPos = (i) => {
    const diff = (i - active + meals.length) % meals.length;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === 2) return 'right-2';
    if (diff === meals.length - 1) return 'left';
    if (diff === meals.length - 2) return 'left-2';
    return 'hidden'; /* 台下的卡:藏在中心卡后面,轮到时浮出 */
  };

  const handleClick = (pos) => {
    if (pos === 'left') setActive((prev) => (prev - 1 + meals.length) % meals.length);
    if (pos === 'left-2') setActive((prev) => (prev - 2 + meals.length) % meals.length);
    if (pos === 'right') setActive((prev) => (prev + 1) % meals.length);
    if (pos === 'right-2') setActive((prev) => (prev + 2) % meals.length);
  };

  /* 自动轮播：每 3 秒向右切换 */
  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current) {
        setActive((prev) => (prev + 1) % meals.length);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [meals.length]);

  return (
    <div
      className="meal-carousel"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {meals.map((meal, i) => {
        const pos = getPos(i);
        return (
          <article
            className={`meal-card meal-card--${pos}`}
            key={meal.title}
            onClick={() => handleClick(pos)}
          >
            <img src={meal.image} alt={meal.title} />
            <div>
              <h2>{meal.title}</h2>
              <p>{meal.kcal} / {meal.protein}</p>
            </div>
          </article>
        );
      })}

    </div>
  );
}

function Hero() {
  return (
    <section className="hero section-panel panel-cream hero--liquid" aria-label="健康餐 App 首页">
      {/* 液态玻璃:流动暖色光斑,作为玻璃层背后的"折射内容" */}
      <div className="hero-blobs" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
        <span className="blob blob-4" />
      </div>
      <div className="texture" />
      <div className="hero-grid max-frame">
        <div className="hero-copy">
          <h1>
            <ShinyText text="人间烟火，" color="#2b1f14" shineColor="#c2611f" speed={3} spread={110} direction="left" />
            <ShinyText text="热乎到桌的健康餐。" color="#2b1f14" shineColor="#e88a4a" speed={3} spread={110} direction="left" className="hero-shiny-line" />
          </h1>
          <p className="hero-lede">
            输入身高、体重和减脂目标,算法 20 秒算出一周餐单。合作商家接单现做,美团骑手保温箱送到——开盖还是烫的。
          </p>

          <div className="hero-actions">
            <div className="download-btn-group">
              <a className="hero-dl-btn" href="https://vga.pps3.com/agvxz2" target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5a1.5 1.5 0 0 0 3 0V19h2v3.5a1.5 1.5 0 0 0 3 0V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.96 5.96 0 0 0 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
                Android 下载
              </a>
              <div className="download-qr-pop">
                <img src="/zheergan-healthy-meals/images/qrcode.png" alt="扫码下载" />
                <span>手机扫码下载</span>
              </div>
            </div>
            <div className="download-btn-group">
              <a className="hero-dl-btn" href="https://vga.pps3.com/agvxz2" target="_blank" rel="noreferrer">
                <Apple size={20} />
                iOS 下载
              </a>
              <div className="download-qr-pop">
                <img src="/zheergan-healthy-meals/images/qrcode.png" alt="扫码下载" />
                <span>手机扫码下载</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="菜品与应用界面展示">
          <div className="plate-orbit">
            <MealCarousel meals={meals} />
          </div>

        </div>
      </div>
    </section>
  );
}

const painPoints = [
  { icon: Frown, text: '外卖油盐超标，健身餐又难吃到坚持不下去' },
  { icon: Clock, text: '想自己做，光是“今天吃啥、怎么配”就先累了' },
  { icon: TrendingDown, text: '立志三天，第四天又点了炸鸡' },
];

function PainSection() {
  return (
    <section className="story-section story-pain section-panel panel-cream" aria-label="健康饮食的困扰">
<div className="story-inner story-pain-inner">
        <h2 className="story-pain-title">
          想吃得健康，<span>怎么就这么难？</span>
        </h2>
        <ul className="pain-list">
          {painPoints.map((point) => {
            const Icon = point.icon;
            return (
              <li className="pain-item" key={point.text}>
                <span className="pain-icon">
                  <Icon size={22} />
                </span>
                <span>{point.text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const answerVisuals = [
  {
    src: '/zheergan-healthy-meals/images/answer-nutrition.jpg',
    alt: '营养均衡的健康碗 — 蛋白质、碳水、脂肪已配平',
    caption: '营养由我们算好',
  },
  {
    src: '/zheergan-healthy-meals/images/answer-chef.jpg',
    alt: '商家主厨调味的健康餐 — 好吃才能坚持',
    caption: '味道交给主厨',
  },
  {
    src: '/zheergan-healthy-meals/images/answer-delivery.jpg',
    alt: '保温箱送到门口的健康餐 — 开盖热气扑脸',
    caption: '到手还是烫的',
  },
];

function AnswerSection() {
  return (
    <section
      className="story-section story-answer section-panel panel-cream"
      id="about"
    >
<div className="story-inner story-answer-inner"
      aria-label="折耳根健康餐是什么"
    >
        <h2 className="answer-line">
          <ShinyText text="把「吃得健康」，" color="#2b1f14" shineColor="#c2611f" speed={3} spread={120} direction="left" />
          <ShinyText
            text="变成一件你不用操心的事。"
            color="#2b1f14"
            shineColor="#e88a4a"
            speed={3}
            spread={120}
            direction="left"
            className="answer-line-2"
          />
        </h2>
        <p className="answer-lede">
          营养师配比热量,商家主厨调味,出锅 90 分钟内保温送到——开盖直接吃。
          <strong>你只管吃。</strong>
        </p>

        <div className="answer-visuals" aria-label="不用操心的三个理由">
          {answerVisuals.map((item) => (
            <figure className="answer-visual-card" key={item.caption}>
              <div className="answer-visual-img">
                <img src={item.src} alt={item.alt} loading="lazy" />
              </div>
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { no: '01', title: '设定目标', desc: '告诉我们你的身高、体重、减脂或增肌目标,以及日常活动强度。', detail: '算法用 TDEE = BMR × PAL 推你的每日总消耗。一位 65kg 轻体力活动者,BMR 约 1500 kcal,乘 PAL 1.55,每日大约需要 2325 kcal——每公斤约 35.8 kcal。这个数字,就是你所有餐单的起点。', specs: ['BMR 基于身高·体重·年龄', 'PAL 五档:1.55/1.78/2.10', '28 项过敏忌口可标记'] },
  { no: '02', title: '智能配餐', desc: '引擎根据你的 TDEE,从合作商家菜单中自动筛选匹配。', detail: '按热量匹配度 → 蛋白质达标率 → 口味吻合度 → 食材多样性四层排序。减脂者每日缺口 300–500 kcal,蛋白质按体重 × 1.6g/kg 锁定底线;每道菜上架前需营养师团队 3 轮盲测——热量达标但不好吃,照样打回。', specs: ['热量匹配度平均 94%', '蛋白质底线 1.2–2.0g/kg 自动计算', '严选商家 · 天然调味 · 拒绝工业酱料'] },
  { no: '03', title: '准时送达', desc: '商家接单后现做出餐,装入保温箱,美团骑手实时配送。', detail: '从商家出锅到你的餐桌全程保温,到手中心温度 ≥60°C。开盖即食,不用微波炉——热链配送不是冷链复热,是刚出锅的样子。', specs: ['接单现做 · 不是预制菜', '到手 ≥60°C · 开盖热气不骗人', '接入美团配送网络 · 实时追踪'] },
];

function StepsSection() {
  return (
    <section className="story-section story-steps section-panel panel-cream" aria-label="使用流程">
<div className="story-inner story-steps-inner">
        <div className="steps-head">
          <h2>三步，开启你的健康饮食</h2>
        </div>
        <ol className="steps-track">
          {steps.map((step) => (
            <li key={step.no}>
              <div className="step-card">
                <span className="step-no">{step.no}</span>
                <h3>{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
                <p className="step-detail">{step.detail}</p>
                <ul className="step-specs">
                  {step.specs.map((s) => (
                    <li key={s}><Check size={14} />{s}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const trustStats = [
  { value: 12, suffix: '万+', label: '用户正在好好吃饭' },
  { value: 300, suffix: '万+', label: '份健康餐已送达' },
  { value: 200, suffix: '+', label: '合作健康餐商家' },
  { value: 4.9, suffix: '', decimals: 1, label: 'App Store 评分' },
];

function CountUp({ value, suffix = '', decimals = 0, duration = 1600 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(value);
      return undefined;
    }

    let raf = 0;
    let startTime = 0;
    let started = false;

    const tick = (now) => {
      if (!startTime) startTime = now;
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            raf = requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  const shown = decimals > 0 ? display.toFixed(decimals) : Math.round(display);

  return (
    <strong ref={ref}>
      {shown}
      {suffix}
    </strong>
  );
}

const testimonials = [
  {
    quote: '以前减脂靠饿，现在靠吃。三个月瘦了 8 斤，还没反弹。',
    name: '林小满',
    role: '健身爱好者',
  },
  {
    quote: '上班太忙，它把「吃得健康」这件事，彻底帮我自动化了。',
    name: 'Amanda',
    role: '产品经理',
  },
  {
    quote: '给爸妈订的低盐餐，终于不用我每天操心怎么搭配了。',
    name: '老周',
    role: '程序员',
  },
];

const pricingPlans = [
  { name: '体验装', price: 228, per: '¥38/餐', spec: '3天·6餐', feats: ['算法定制3日餐单', '午晚双餐热链配送', '随时暂停·无违约金'], cta: '试3天' },
  { name: '周计划', price: 476, per: '¥34/餐', spec: '7天·14餐', feats: ['含体验装全部', '每周口味学习调优', '营养师周报', '免配送费'], cta: '最划算', hot: true },
  { name: '月计划', price: 1792, per: '¥32/餐', spec: '28天·56餐', feats: ['含周计划全部', '1对1营养师咨询', '体重体脂追踪', '优先配送时段'], cta: '深度定制' },
];

function PricingInline() {
  return (
    <section className="story-section section-panel panel-cream" aria-label="价格方案">
      <div className="story-inner" style={{ paddingBottom: '80px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', fontWeight: 680, textAlign: 'center', marginBottom: '52px' }}>
          好好吃饭，<span style={{ color: '#000' }}>其实没那么贵。</span>
        </h2>
        <div className="price-grid-inline" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px', maxWidth: '1100px', margin: '0 auto' }}>
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              style={{
                display: 'flex', flexDirection: 'column', padding: '28px 24px 24px',
                border: plan.hot ? '1px solid rgba(255,214,170,0.9)' : '1px solid rgba(255,255,255,0.68)',
                borderRadius: 'var(--r-2xl)',
                background: plan.hot
                  ? 'linear-gradient(150deg, rgba(255,231,205,0.72), rgba(255,244,226,0.4))'
                  : 'linear-gradient(150deg, rgba(255,255,255,0.55), rgba(255,255,255,0.26))',
                backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                boxShadow: plan.hot
                  ? 'inset 0 1px 0 rgba(255,255,255,0.95), 0 26px 68px rgba(194,97,31,0.2)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 22px 60px rgba(43,31,20,0.12)',
                transition: 'transform 220ms ease',
              }}
            >
              <div style={{ marginBottom: '18px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--ink-cream)' }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '14px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--ember-ink)' }}>¥</span>
                  <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 3vw, 50px)', fontWeight: 700, lineHeight: 1, color: 'var(--ink-cream)' }}>{plan.price}</strong>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <span style={{ display: 'inline-block', padding: '4px 10px', color: 'var(--ember-ink)', borderRadius: '999px', background: 'rgba(194,97,31,0.1)', fontSize: '12px', fontWeight: 700 }}>{plan.per}</span>
                  <span style={{ display: 'block', marginTop: '6px', color: 'var(--muted-cream)', fontSize: '13px' }}>{plan.spec}</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', margin: '0 0 20px', padding: '16px 0 0', borderTop: '1px solid var(--line-cream)', display: 'grid', gap: '10px' }}>
                {plan.feats.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--ink-body)', fontSize: '13.5px', lineHeight: 1.5 }}>
                    <Check size={15} style={{ flex: 'none', marginTop: '2px', color: 'var(--ember-ink)' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://vga.pps3.com/agvxz2" target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto',
                  minHeight: '46px', padding: '10px 18px', borderRadius: '999px',
                  color: plan.hot ? '#fff' : 'var(--ink-cream)',
                  border: plan.hot ? '1px solid rgba(255,255,255,0.55)' : '1px solid rgba(255,255,255,0.7)',
                  background: plan.hot
                    ? 'linear-gradient(135deg, rgba(232,138,74,0.85), rgba(194,97,31,0.9))'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.24))',
                  fontWeight: 700, fontSize: '14px', textDecoration: 'none',
                  boxShadow: plan.hot ? 'inset 0 1px 0 rgba(255,255,255,0.6), 0 16px 38px rgba(194,97,31,0.3)' : 'inset 0 1px 0 rgba(255,255,255,0.85)',
                }}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--soft-cream)', fontSize: '13px' }}>
          价格已含包装与配送 · 随时暂停,未配送餐费全额保留
        </p>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="story-section story-trust section-panel panel-cream" aria-label="为什么信任我们">
<div className="story-inner story-trust-inner">
        <div className="trust-head">
          <h2>
            凭什么<span>信任我们？</span>
          </h2>
        </div>

        <div className="trust-stats" aria-label="平台数据">
          {trustStats.map((stat) => (
            <div className="trust-stat" key={stat.label}>
              <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <ul className="testimonial-list">
          {testimonials.map((item) => (
            <li className="testimonial-card" key={item.name}>
              <Quote className="testimonial-quote-mark" size={26} />
              <p className="testimonial-text">{item.quote}</p>
              <div className="testimonial-person">
                <span className="testimonial-avatar">{item.name.slice(0, 1)}</span>
                <span className="testimonial-meta">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: '配送范围覆盖哪些城市？',
    a: '目前已覆盖上海、北京、深圳、杭州、成都的主城区，并在持续拓展。下单前 App 会根据你的收货地址自动校验能否送达。',
  },
  {
    q: '一餐大概多少钱？',
    a: '单餐价格在 32–45 元之间，按周订购更划算。你可以先订 3 天体验装，觉得合适再续，不用一次性押上整月。',
  },
  {
    q: '可以随时取消或暂停吗？',
    a: '可以。出差、休假随时在 App 里一键暂停或跳过某几天，未配送的餐费全额保留，不收违约金。',
  },
  {
    q: '食材新鲜吗？来源可靠吗？',
    a: '合作商家接单后现做出餐,保温热链直送,到手还是热的,绝不隔夜。肉蛋来自可追溯供应商,蔬菜每日直采,每一批次留样检测。',
  },
  {
    q: '有过敏原或忌口怎么办？',
    a: '在 App 里标记忌口与过敏原（海鲜、坚果、香菜等），系统会自动避开，营养师也会为你的配餐复核一遍。',
  },
  {
    q: '到手怎么加热更好吃？',
    a: '热链配送到手即食，开盖直接吃。万一凉了，大部分餐品微波 2–3 分钟即可恢复出锅口感，包装上印有针对性的复热建议；沙拉类为冷食设计，冷藏保存、开袋即食。',
  },
];

function FaqSection() {
  return (
    <section className="faq section-panel panel-cream" id="faq" aria-label="常见问题">
<div className="story-inner faq-inner">
        <div className="faq-head">
          <h2 className="faq-title">你想问的，我们先答了。</h2>
          <p className="faq-sub">关于配送、价格、食材与忌口，这里是最常被问到的六个问题。</p>
        </div>
        <ul className="faq-list">
          {faqs.map((item) => (
            <li className="faq-item" key={item.q}>
              <details>
                <summary>
                  <span className="faq-q">{item.q}</span>
                  <ChevronDown className="faq-chevron" size={20} />
                </summary>
                <p className="faq-a">{item.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DownloadSection() {
  return (
    <section className="download section-panel panel-cream" id="download" aria-label="下载健康餐 App">
<div className="download-grid max-frame">
        <div className="download-copy">
          <h2>
            把下一餐，
            <span>交给折耳根健康餐。</span>
          </h2>
          <p>
            下载 App → 填 3 个数字 → 明天中午,第一餐到。不好吃?随时停,没花完的钱全退。
          </p>

          <div className="download-actions" aria-label="应用下载链接">
            <div className="download-btn-group">
              <a className="hero-dl-btn" href="https://vga.pps3.com/agvxz2" target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5a1.5 1.5 0 0 0 3 0V19h2v3.5a1.5 1.5 0 0 0 3 0V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.96 5.96 0 0 0 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
                Android 下载
              </a>
              <div className="download-qr-pop">
                <img src="/zheergan-healthy-meals/images/qrcode.png" alt="扫码下载" />
                <span>手机扫码下载</span>
              </div>
            </div>
            <div className="download-btn-group">
              <a className="hero-dl-btn" href="https://vga.pps3.com/agvxz2" target="_blank" rel="noreferrer">
                <Apple size={20} />
                iOS 下载
              </a>
              <div className="download-qr-pop">
                <img src="/zheergan-healthy-meals/images/qrcode.png" alt="扫码下载" />
                <span>手机扫码下载</span>
              </div>
            </div>
          </div>
        </div>

        <div className="download-card" aria-label="扫码下载">
          <div className="qr-shell">
            <img src="/zheergan-healthy-meals/images/qrcode.png" alt="扫码下载折耳根健康餐 App" />
          </div>
          <div className="download-card-copy">
            <span>Scan to download</span>
            <strong>折耳根健康餐 iOS & Android</strong>
          </div>
          <div className="tiny-specs">
            <span>个性营养目标</span>
            <span>保温到手</span>
            <span>每周餐食计划</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const footerCols = [
  {
    title: '产品',
    links: [
      { label: '功能介绍', href: '#/features' },
      { label: '本周餐单', href: '#/menu' },
      { label: '价格方案', href: '#/pricing' },
      { label: '下载 App', href: '#download' },
    ],
  },
  {
    title: '公司',
    links: [
      { label: '关于我们', href: '#about' },
      { label: '品牌故事', href: '#about' },
      { label: '加入我们', href: '#top' },
      { label: '商务合作', href: '#top' },
    ],
  },
  {
    title: '支持',
    links: [
      { label: '常见问题', href: '#faq' },
      { label: '联系客服', href: '#download' },
      { label: '配送范围', href: '#faq' },
      { label: '意见反馈', href: '#faq' },
    ],
  },
];


function Footer() {
  return (
    <footer className="site-footer panel-cream" aria-label="页脚">
      <div className="footer-inner max-frame">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href="#top" aria-label="折耳根健康餐">
              <span className="brand-mark">
                <img
                  src="/zheergan-healthy-meals/brand-icon.jpg"
                  alt="折耳根"
                  className="brand-icon-img"
                />
              </span>
              <span>折耳根健康餐</span>
            </a>
            <p className="footer-mission">
              好好吃饭，也可以很轻松。
              <br />
              算法定制 · 商家现做 · 美团保温配送
            </p>
          </div>

          <nav className="footer-cols" aria-label="页脚导航">
            {footerCols.map((col) => (
              <div className="footer-col" key={col.title}>
                <h3>{col.title}</h3>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <div className="footer-cities">
            <MapPin size={15} />
            现已覆盖 上海 · 北京 · 深圳 · 杭州 · 成都
          </div>
          <div className="footer-legal">
            <span>© 2026 折耳根健康餐</span>
            <a href="#top">隐私政策</a>
            <a href="#top">服务条款</a>
            <span>沪ICP备 2026XXXXXX 号</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const route = useRoute();
  if (route === 'features') return <FeaturesPage />;
if (route === 'menu') return <MenuPage />;
  return <HomePage />;
}

createRoot(document.getElementById('root')).render(<App />);
