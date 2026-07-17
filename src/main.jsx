import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Apple,
  ArrowDown,
  ArrowDownRight,
  ArrowUp,
  ChefHat,
  ChevronDown,
  Clock,
  Frown,
  Heart,
  HeartPulse,
  HelpCircle,
  MapPin,
  QrCode,
  Quote,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  Truck,
} from 'lucide-react';
import StarBorder from './components/StarBorder';
import Galaxy from './components/Galaxy';
import ShinyText from './components/ShinyText';
import ElectricBorder from './components/ElectricBorder';
import FeaturesPage from './pages/Features';
import PricingPage from './pages/Pricing';
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
    if (h.startsWith('#/pricing')) return 'pricing';
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
          // 等 React 渲染完再滚
          requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          });
        } else {
          requestAnimationFrame(() => window.scrollTo({ top: 0 }));
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
    protein: '36g protein',
    image:
      '/zheergan-healthy-meals/images/salmon.jpg',
  },
  {
    title: '柑香鸡肉谷物碗',
    kcal: '532 kcal',
    protein: '42g protein',
    image:
      '/zheergan-healthy-meals/images/chicken.jpg',
  },
  {
    title: '牛油果绿蔬蛋碗',
    kcal: '418 kcal',
    protein: '28g protein',
    image:
      '/zheergan-healthy-meals/images/avocado.jpg',
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
      <Hero />
      <PainSection />
      <AnswerSection />
      <StepsSection />
      <TrustSection />
      <BeliefSection />
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
    return 'left';
  };

  const handleClick = (pos) => {
    if (pos === 'left') setActive((prev) => (prev - 1 + meals.length) % meals.length);
    if (pos === 'right') setActive((prev) => (prev + 1) % meals.length);
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
      <header className="nav max-frame">
        <a className="brand" href="#top" aria-label="折耳根健康餐">
          <span className="brand-mark">
            <img src="/zheergan-healthy-meals/brand-icon.jpg" alt="折耳根" className="brand-icon-img" />
          </span>
          <span>折耳根健康餐</span>
        </a>
        <nav className="nav-links" aria-label="主导航">
          <a href="#/features">功能介绍</a>
          <a href="#/pricing">价格方案</a>
          <a href="#/menu">今日餐单</a>
          <a href="#download">下载 App</a>
        </nav>
      </header>

      <div className="hero-grid max-frame">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={16} />
            折耳根健康餐 App
          </div>
          <h1>
            <ShinyText text="人间烟火，" color="#15180f" shineColor="#c0592c" speed={3} spread={110} direction="left" />
            <ShinyText text="热乎到桌的健康餐。" color="#15180f" shineColor="#3f7d4e" speed={3} spread={110} direction="left" className="hero-shiny-line" />
          </h1>
          <p className="hero-lede">
            折耳根健康餐是一款面向城市日常的健康餐配送 App。把热量、蛋白质、口味偏好和配送节奏整合起来，让每一天的健康饮食更稳定、更省心，也更有食欲。
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#download">
              下载体验
              <ArrowDownRight size={18} />
            </a>
            <a className="secondary-button" href="#/menu">
              浏览本周餐单
            </a>
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
      <div className="story-pain-veil" />
      <div className="story-pain-bg">
        <img
          src="/zheergan-healthy-meals/images/pain-struggle.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </div>
      <div className="story-inner story-pain-inner">
        <span className="section-kicker">
          <HeartPulse size={16} />
          我们太懂那种感觉
        </span>
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
    alt: '主厨调味的健康餐 — 好吃才能坚持',
    caption: '味道交给主厨',
  },
  {
    src: '/zheergan-healthy-meals/images/answer-delivery.jpg',
    alt: '新鲜准时送达的健康餐 — 到手还是热的',
    caption: '新鲜准时送到',
  },
];

function AnswerSection() {
  return (
    <section
      className="story-section story-answer section-panel panel-cream"
      id="about"
      aria-label="折耳根健康餐是什么"
    >
      <div className="story-inner story-answer-inner">
        <span className="section-kicker">
          <Sparkles size={16} />
          所以，有了折耳根健康餐
        </span>
        <h2 className="answer-line">
          <ShinyText text="把「吃得健康」，" color="#15180f" shineColor="#c0592c" speed={3} spread={120} direction="left" />
          <ShinyText
            text="变成一件你不用操心的事。"
            color="#15180f"
            shineColor="#3f7d4e"
            speed={3}
            spread={120}
            direction="left"
            className="answer-line-2"
          />
        </h2>
        <p className="answer-lede">
          营养师配比、主厨调味，按你的热量目标算好每一餐，新鲜现做、当天送达。
          <strong>你只管吃，剩下的交给我们。</strong>
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
  { no: '01', icon: Target, title: '设定目标', desc: '告诉我们你的口味、热量目标和用餐时间' },
  { no: '02', icon: ChefHat, title: '智能配餐', desc: '营养师 + 算法为你搭好整周餐单' },
  { no: '03', icon: Truck, title: '准时送达', desc: '新鲜现做，当天送到你手边' },
];

function StepsSection() {
  return (
    <section className="story-section story-steps section-panel panel-cream" aria-label="使用流程">
      <div className="story-inner story-steps-inner">
        <div className="steps-head">
          <span className="section-kicker">
            <ScanLine size={16} />
            简单三步
          </span>
          <h2>三步，开启你的健康饮食</h2>
        </div>
        <ol className="steps-track">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <li key={step.no}>
                <ElectricBorder
                  color="#d5ff66"
                  speed={0.8}
                  chaos={0.08}
                  borderRadius={20}
                  className="step-border"
                >
                  <div className="step-card">
                    <span className="step-no">{step.no}</span>
                    <span className="step-icon">
                      <Icon size={26} />
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </ElectricBorder>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

const trustStats = [
  { value: 12, suffix: '万+', label: '用户正在好好吃饭' },
  { value: 300, suffix: '万+', label: '份健康餐已送达' },
  { value: 20, suffix: '+', label: '营养师 & 主厨团队' },
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

function TrustSection() {
  return (
    <section className="story-section story-trust section-panel panel-cream" aria-label="为什么信任我们">
      <div className="story-inner story-trust-inner">
        <div className="trust-head">
          <span className="section-kicker">
            <ShieldCheck size={16} />
            为什么值得托付
          </span>
          <h2>
            把餐交给我们，<span>你在信任什么？</span>
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

function BeliefSection() {
  return (
    <section className="story-section story-belief section-panel panel-cream" aria-label="我们的信念">
      <div className="story-belief-glow" />
      <div className="story-inner story-belief-inner">
        <div className="belief-grid">
          {/* ── 左侧：信念文案 ── */}
          <div className="belief-copy">
            <span className="section-kicker">
              <Heart size={16} />
              我们为什么做这件事
            </span>
            <p className="belief-pre">说到底，我们只想帮你做到一件事——</p>
            <h2 className="belief-line">
              <ShinyText text="好好吃饭，" color="#15180f" shineColor="#c0592c" speed={3} spread={120} direction="left" />
              <ShinyText
                text="也可以很轻松。"
                color="#15180f"
                shineColor="#3f7d4e"
                speed={3}
                spread={120}
                direction="left"
                className="belief-line-2"
              />
            </h2>

            <p className="belief-creed-intro">我们相信 ——</p>
            <ul className="belief-creed">
              <li>健康，不必是一场靠意志硬扛的苦行</li>
              <li>好好吃饭，不该再抢走你本就不够用的精力</li>
              <li>被认真对待的每一餐，都值得</li>
            </ul>

            <p className="belief-sub">少一点纠结，多一点踏实。你的下一餐，就从这里开始。</p>
            <p className="belief-sign">—— 折耳根团队 · 20 位营养师与主厨，替你把关每一餐</p>

            <a className="belief-cue" href="#download">
              现在就开始
              <ArrowDown size={16} />
            </a>
          </div>

          {/* ── 右侧：品牌视觉 + 数据证明卡 ── */}
          <div className="belief-visual">
            <img
              src="/zheergan-healthy-meals/images/belief-lifestyle.jpg"
              alt="在自然光下轻松享受健康餐的美好时刻"
              loading="lazy"
            />
            <div className="belief-proof-card">
              <div className="proof-card-head">
                <Target size={17} />
                <span>智能配餐引擎</span>
              </div>
              <strong className="proof-card-stat">94%</strong>
              <span className="proof-card-label">热量目标匹配度</span>
              <div className="proof-card-bar">
                <div className="proof-card-fill" />
              </div>
              <p className="proof-card-note">算法根据你的身体数据，精准配平每一餐</p>
            </div>
          </div>
        </div>
      </div>
      <img
        className="belief-watermark"
        src="/zheergan-healthy-meals/brand-icon.jpg"
        alt=""
        aria-hidden="true"
      />
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
    a: '当日现做、当日冷链直送，绝不隔夜。肉蛋来自可追溯供应商，蔬菜每日直采，每一批次留样检测。',
  },
  {
    q: '有过敏原或忌口怎么办？',
    a: '在 App 里标记忌口与过敏原（海鲜、坚果、香菜等），系统会自动避开，营养师也会为你的配餐复核一遍。',
  },
  {
    q: '到手怎么加热更好吃？',
    a: '大部分餐品微波 2–3 分钟即可，包装上印有针对性的复热建议；沙拉类冷藏保存、开袋即食。',
  },
];

function FaqSection() {
  return (
    <section className="faq section-panel panel-cream" id="faq" aria-label="常见问题">
      <div className="story-inner faq-inner">
        <div className="faq-head">
          <span className="section-kicker">
            <HelpCircle size={16} />
            还有些小顾虑？
          </span>
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
      <div className="download-bg" />
      <div className="download-grid max-frame">
        <div className="download-copy">
          <span className="section-kicker">
            <ScanLine size={16} />
            开始你的第一周健康餐
          </span>
          <h2>
            把下一餐，
            <span>交给折耳根健康餐。</span>
          </h2>
          <p>
            下载 App，设置你的口味、目标和用餐时间。折耳根健康餐会生成每周餐食计划，并把新鲜、克制、好吃的健康餐准时送到你身边。
          </p>

          <div className="download-actions" aria-label="应用下载链接">
            <StarBorder as="a" className="store-button" color="#d5ff66" speed="6s" href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer">
              <Apple size={22} />
              <span>
                Download on
                <strong>App Store</strong>
              </span>
            </StarBorder>
            <StarBorder as="a" className="store-button" color="#d5ff66" speed="6s" href="https://play.google.com/store" target="_blank" rel="noreferrer">
              <span className="play-icon">▶</span>
              <span>
                Get it on
                <strong>Google Play</strong>
              </span>
            </StarBorder>
          </div>
        </div>

        <div className="download-card" aria-label="扫码下载">
          <div className="qr-shell">
            <QrCode size={126} strokeWidth={1.4} />
          </div>
          <div className="download-card-copy">
            <span>Scan to download</span>
            <strong>折耳根健康餐 iOS & Android</strong>
          </div>
          <div className="tiny-specs">
            <span>个性营养目标</span>
            <span>新鲜配送</span>
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

const footerSocials = ['微信公众号', '微博', '小红书', '抖音'];

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
              把每一餐，交给认真对待它的人。
            </p>
            <div className="footer-social" aria-label="关注我们">
              {footerSocials.map((s) => (
                <span className="footer-social-pill" key={s}>
                  {s}
                </span>
              ))}
            </div>
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
          <a className="footer-top-link" href="#top">
            回到顶部
            <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const route = useRoute();
  if (route === 'features') return <FeaturesPage />;
  if (route === 'pricing') return <PricingPage />;
  if (route === 'menu') return <MenuPage />;
  return <HomePage />;
}

createRoot(document.getElementById('root')).render(<App />);
