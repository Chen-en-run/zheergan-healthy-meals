import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import {
  Apple,
  Check,
  ChevronDown,
  Clock,
  Frown,
  Monitor,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingDown,
} from 'lucide-react';
import ShinyText from './components/ShinyText';
import RevealOnScroll from './components/RevealOnScroll';
import MenuPage from './pages/Menu';
import CompanyPage from './pages/Company';
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
    if (h.startsWith('#/menu')) return 'menu';
    if (h.startsWith('#/company')) return 'company';
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
  {
    title: '香煎鸡胸藜麦饭',
    kcal: '448 kcal',
    protein: '40g 蛋白质',
    image: '/zheergan-healthy-meals/images/dish-07.jpg',
  },
  {
    title: '泰式青咖喱虾仁',
    kcal: '392 kcal',
    protein: '32g 蛋白质',
    image: '/zheergan-healthy-meals/images/dish-08.jpg',
  },
  {
    title: '日式照烧三文鱼',
    kcal: '475 kcal',
    protein: '35g 蛋白质',
    image: '/zheergan-healthy-meals/images/dish-09.jpg',
  },
  {
    title: '番茄牛腩糙米饭',
    kcal: '542 kcal',
    protein: '38g 蛋白质',
    image: '/zheergan-healthy-meals/images/dish-10.jpg',
  },
  {
    title: '柠檬蒜香鸡腿肉',
    kcal: '498 kcal',
    protein: '42g 蛋白质',
    image: '/zheergan-healthy-meals/images/dish-11.jpg',
  },
  {
    title: '麻辣香锅素菜碗',
    kcal: '365 kcal',
    protein: '22g 蛋白质',
    image: '/zheergan-healthy-meals/images/dish-12.jpg',
  },
];

function HomePage() {
  const [navHidden, setNavHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const hero = document.querySelector('.hero');
      const boundary = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
      setNavHidden(y > boundary);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* IntersectionObserver：检测当前可见模块，高亮副导航按钮 */
  useEffect(() => {
    const ids = ['pain', 'answer', 'steps', 'pricing', 'trust', 'faq'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="site-shell">
      <div className="grain" aria-hidden="true" />
      {/* 全局光斑:贯穿整页,无缝流动 */}
      <div className="global-blobs" aria-hidden="true">
        <span className="s-blob s-blob-1" />
        <span className="s-blob s-blob-2" />
        <span className="s-blob s-blob-3" />
      </div>
      {/* 全局玻璃导航:sticky 贯穿全页,与子页一致 */}
      <header className={`home-nav${navHidden ? ' is-hidden' : ''}`}>
        <div className="home-nav-inner max-frame">
          <a className="brand" href="#top" aria-label="折耳根健康餐">
            <span className="home-nav-brand-text"><i>Ergen</i> 折耳根健康餐</span>
          </a>
          <nav className="nav-links" aria-label="主导航">
            <a href="#top">首页</a>
            <a href="#/company">公司简介</a>
            <div className="nav-dropdown">
              <span className="nav-dropdown-trigger">
                下载中心 <ChevronDown size={14} />
              </span>
              <div className="nav-dropdown-panel">
                <a className="nav-dropdown-item" href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk" target="_blank" rel="noreferrer">
                  <span className="ndi-default">
                    <img src="/zheergan-healthy-meals/images/icon-win.svg" alt="Windows" style={{width:32,height:32}} />
                    <span>Windows</span>
                  </span>
                  <span className="ndi-hover">
                    <span className="ndi-dl-circle">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                    </span>
                    <span>下载 Windows 版</span>
                  </span>
                </a>
                <a className="nav-dropdown-item" href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk" target="_blank" rel="noreferrer">
                  <span className="ndi-default">
                    <img src="/zheergan-healthy-meals/images/icon-apple.svg" alt="Mac OS" style={{width:32,height:32}} />
                    <span>Mac OS</span>
                  </span>
                  <span className="ndi-hover">
                    <span className="ndi-dl-circle">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                    </span>
                    <span>下载 Mac OS 版</span>
                  </span>
                </a>
                <span className="nav-dropdown-item nav-dropdown-item--qr">
                  <span className="ndi-default">
                    <img src="/zheergan-healthy-meals/images/icon-phone.svg" alt="手机" style={{width:32,height:32}} />
                    <span>手机</span>
                  </span>
                  <span className="ndi-hover">
                    <img src="/zheergan-healthy-meals/images/qrcode.png" alt="扫码下载" className="ndi-qr-img" />
                    <span>扫码下载 手机版</span>
                  </span>
                </span>
                <span className="nav-dropdown-item nav-dropdown-item--qr">
                  <span className="ndi-default">
                    <img src="/zheergan-healthy-meals/images/icon-tablet.svg" alt="平板" style={{width:32,height:32}} />
                    <span>平板</span>
                  </span>
                  <span className="ndi-hover">
                    <img src="/zheergan-healthy-meals/images/qrcode.png" alt="扫码下载" className="ndi-qr-img" />
                    <span>扫码下载 平板版</span>
                  </span>
                </span>
              </div>
            </div>
            <a href="#/menu">每月餐单</a>
          </nav>
        </div>
      </header>
      {/* 副导航栏：主导航隐藏时冒出，覆盖除 Hero 和下载外的 6 个模块 */}
      <nav className={`sub-nav${navHidden ? ' is-visible' : ''}`} aria-label="页面模块导航">
        <div className="sub-nav-inner">
          {[
            { id: 'pain', label: '饮食痛点' },
            { id: 'answer', label: '智能省心' },
            { id: 'steps', label: '定制热送' },
            { id: 'pricing', label: '价格方案' },
            { id: 'trust', label: '口碑见证' },
            { id: 'faq', label: '常见问题' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'is-active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(item.id);
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk"
            className="sub-nav-dl"
            target="_blank"
            rel="noreferrer"
          >
            下载 App
            <img src="/zheergan-healthy-meals/images/icon-download.svg" alt="" className="sub-nav-dl-icon" />
          </a>
        </div>
      </nav>
      <HotChainHero />
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
   MealCarousel — 鼠标长按拖拽滑动 + 点击切换轮播
   拖拽时每张卡片的位置/缩放/透明度实时插值，松手吸附到最近卡片
   ================================================================ */
const DRAG_THRESHOLD = 0.35; /* 归一化拖拽超过 0.35 格触发切屏 */

/* 每张卡与"虚拟中心"的槽位距离 → 视觉属性 (7 卡位) */
const SLOT_DEFS = {
  '-3': { off: -0.82, scale: 0.42, opacity: 0.08, zIndex: 0 },  /* left-3 */
  '-2': { off: -0.58, scale: 0.56, opacity: 0.18, zIndex: 1 },  /* left-2 */
  '-1': { off: -0.30, scale: 0.76, opacity: 0.42, zIndex: 2 },  /* left   */
  '0':  { off:  0,    scale: 1.00, opacity: 1.00, zIndex: 3 },  /* center */
  '1':  { off:  0.30, scale: 0.76, opacity: 0.42, zIndex: 2 },  /* right  */
  '2':  { off:  0.58, scale: 0.56, opacity: 0.18, zIndex: 1 },  /* right-2*/
  '3':  { off:  0.82, scale: 0.42, opacity: 0.08, zIndex: 0 },  /* right-3*/
};

/* 在相邻槽位之间线性插值 */
function lerpSlot(slot) {
  const lo = Math.floor(slot);
  const a = SLOT_DEFS[String(Math.max(-3, Math.min(3, lo)))] || SLOT_DEFS['0'];
  const b = SLOT_DEFS[String(Math.max(-3, Math.min(3, lo + 1)))] || SLOT_DEFS['3'];
  const f = slot - lo; /* 小数部分 */
  return {
    off:     a.off     + (b.off     - a.off)     * f,
    scale:   a.scale   + (b.scale   - a.scale)   * f,
    opacity: a.opacity + (b.opacity - a.opacity) * f,
    zIndex:  f < 0.5 ? a.zIndex : b.zIndex,
  };
}

function MealCarousel({ meals }) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const paused = useRef(false);
  const draggingRef = useRef(false);
  const activeRef = useRef(0);
  const carouselRef = useRef(null);
  const dragState = useRef({ startX: 0, moved: false, cardW: 280, t: 0 });

  /* 同步 ref，供事件回调 & interval 读取最新值 */
  useEffect(() => { draggingRef.current = dragging; }, [dragging]);
  useEffect(() => { activeRef.current = active; }, [active]);

  /* 纯函数：计算卡片槽位，不依赖组件闭包 */
  const calcSlot = (i, act, len) => {
    let diff = ((i - act) % len + len) % len;
    if (diff > len / 2) diff -= len;
    return diff;
  };

  /* 直接 DOM 操作：拖拽时用 !important 设样式，React 重渲染无法覆盖 */
  const applyCardsDOM = (act, t) => {
    const cards = carouselRef.current?.querySelectorAll('.meal-card');
    if (!cards) return;
    const len = meals.length;
    cards.forEach((card, i) => {
      const slot = calcSlot(i, act, len);
      const effective = slot + t;
      const vis = lerpSlot(effective);
      const isHidden = Math.abs(effective) > 3.4;
      card.style.setProperty('left', `${50 + vis.off * 100}%`, 'important');
      card.style.setProperty('transform', `translateX(-50%) scale(${vis.scale})`, 'important');
      card.style.setProperty('opacity', vis.opacity, 'important');
      card.style.setProperty('z-index', vis.zIndex, 'important');
      card.style.setProperty('pointer-events', isHidden ? 'none' : 'auto', 'important');
    });
  };

  /* 用槽位值覆写 DOM 样式（不带 !important），与 React 提交一致，无缝交接 */
  const commitCardsDOM = (act) => {
    const cards = carouselRef.current?.querySelectorAll('.meal-card');
    if (!cards) return;
    const len = meals.length;
    cards.forEach((card, i) => {
      const slot = calcSlot(i, act, len);
      const vis = SLOT_DEFS[String(slot)] || SLOT_DEFS['0'];
      const isHidden = Math.abs(slot) > 3;
      card.style.left = `${50 + vis.off * 100}%`;
      card.style.transform = `translateX(-50%) scale(${vis.scale})`;
      card.style.opacity = vis.opacity;
      card.style.zIndex = vis.zIndex;
      card.style.pointerEvents = isHidden ? 'none' : 'auto';
    });
  };

  const getSlot = (i) => calcSlot(i, active, meals.length);

  const handleClick = (i) => {
    if (dragState.current.moved) { dragState.current.moved = false; return; }
    const slot = getSlot(i);
    if (slot === -1)       setActive((p) => (p - 1 + meals.length) % meals.length);
    else if (slot === -2)  setActive((p) => (p - 2 + meals.length) % meals.length);
    else if (slot === -3)  setActive((p) => (p - 3 + meals.length) % meals.length);
    else if (slot ===  1)  setActive((p) => (p + 1) % meals.length);
    else if (slot ===  2)  setActive((p) => (p + 2) % meals.length);
    else if (slot ===  3)  setActive((p) => (p + 3) % meals.length);
  };

  /* ---- 拖拽事件 ---- */
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const measure = () => {
      const card = el.querySelector('.meal-card');
      if (card) dragState.current.cardW = card.getBoundingClientRect().width || 280;
    };
    measure();
    window.addEventListener('resize', measure);

    const onDown = (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      measure();
      dragState.current.startX = e.clientX;
      dragState.current.moved = false;
      dragState.current.t = 0;
      setDragging(true);
    };

    const onMove = (e) => {
      if (!dragState.current.startX && dragState.current.startX !== 0) return;
      const dx = e.clientX - dragState.current.startX;
      if (Math.abs(dx) > 5) dragState.current.moved = true;
      const t = Math.max(-1, Math.min(1, dx / dragState.current.cardW));
      dragState.current.t = t;
      /* 直接操作 DOM，零延迟跟手 */
      applyCardsDOM(activeRef.current, t);
    };

    const onUp = () => {
      const t = dragState.current.t;
      const crossed = dragState.current.moved && Math.abs(t) > DRAG_THRESHOLD;
      const nextActive = crossed
        ? (activeRef.current + (t > 0 ? -1 : 1) + meals.length) % meals.length
        : activeRef.current;
      /* flushSync：React 同步提交后，覆写槽位值（无 !important），无缝交接 */
      flushSync(() => {
        if (crossed) setActive(nextActive);
        setDragging(false);
      });
      commitCardsDOM(nextActive);
      dragState.current.startX = 0;
    };

    /* Touch */
    const onTouchStart = (e) => {
      measure();
      dragState.current.startX = e.touches[0].clientX;
      dragState.current.moved = false;
      dragState.current.t = 0;
      setDragging(true);
    };
    const onTouchMove = (e) => {
      if (!dragState.current.startX && dragState.current.startX !== 0) return;
      const dx = e.touches[0].clientX - dragState.current.startX;
      if (Math.abs(dx) > 5) dragState.current.moved = true;
      const t = Math.max(-1, Math.min(1, dx / dragState.current.cardW));
      dragState.current.t = t;
      applyCardsDOM(activeRef.current, t);
    };
    const onTouchEnd = () => {
      const t = dragState.current.t;
      const crossed = dragState.current.moved && Math.abs(t) > DRAG_THRESHOLD;
      const nextActive = crossed
        ? (activeRef.current + (t > 0 ? -1 : 1) + meals.length) % meals.length
        : activeRef.current;
      flushSync(() => {
        if (crossed) setActive(nextActive);
        setDragging(false);
      });
      commitCardsDOM(nextActive);
      dragState.current.startX = 0;
    };

    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('resize', measure);
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      el.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [meals.length]);

  /* 自动轮播：每 3 秒向右切换（拖拽中暂停） */
  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current && !draggingRef.current) {
        setActive((prev) => (prev + 1) % meals.length);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [meals.length]);

  return (
    <div
      className={`meal-carousel${dragging ? ' is-dragging' : ''}`}
      ref={carouselRef}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {meals.map((meal, i) => {
        const slot = getSlot(i);
        const vis = SLOT_DEFS[String(slot)] || SLOT_DEFS['0'];
        const isHidden = Math.abs(slot) > 3;

        return (
          <article
            className={`meal-card meal-card--${slotToPos(slot)}`}
            key={meal.title}
            style={{
              left: `${50 + vis.off * 100}%`,
              transform: `translateX(-50%) scale(${vis.scale})`,
              opacity: vis.opacity,
              zIndex: vis.zIndex,
              pointerEvents: isHidden ? 'none' : 'auto',
            }}
            onClick={() => handleClick(i)}
          >
            <img src={meal.image} alt={meal.title} draggable="false" />
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

/* slot 数字 → CSS 类名 */
function slotToPos(s) {
  if (s ===  0) return 'center';
  if (s ===  1) return 'right';
  if (s ===  2) return 'right-2';
  if (s ===  3) return 'right-3';
  if (s === -1) return 'left';
  if (s === -2) return 'left-2';
  if (s === -3) return 'left-3';
  return 'hidden';
}

/* ================================================================
   HotChainHero — 热链鲜送 AI 智能搭配 Hero
   左右分栏：左侧品牌宣传 + 右侧 AI 聊天演示
   ================================================================ */
/* 聊天对话序列：一问一答，逐条冒出 */
const chatSequence = [
  {
    role: 'user',
    text: '哎，最近感觉又胖了，想控制饮食但又不知道吃啥。你有啥推荐的健康餐吗？',
  },
  {
    role: 'agent',
    text: <>当然有呀！😊 不过为了给你更精准的推荐，我先确认几个小细节哈：你这次的主要目标是<strong>减脂</strong>，还是<strong>增肌</strong>，或者是单纯想吃得清淡点？另外，有没有特别不爱吃或者过敏的食物呀？</>,
  },
  {
    role: 'user',
    text: '主要是减脂吧，尤其是肚子上的肉。我不爱吃香菜，海鲜过敏，其他的都能接受。',
  },
  {
    role: 'agent',
    label: '分析',
    text: <>收到！减脂的话，咱们核心思路是<strong>"高蛋白+高膳食纤维+低GI碳水"</strong>，这样饱腹感强还不容易饿。避开香菜和海鲜，那我们可以用鸡胸肉、牛肉来替代海鲜的蛋白质。<br/><br/>针对你的需求，我首推 <strong>「香煎黑椒鸡胸套餐」</strong>：<br/>🍚 主食：糙米饭（低GI，抗饿）<br/>🍗 蛋白质：香煎鸡胸肉（高蛋白低脂肪，黑椒调味）<br/>🥦 膳食纤维：清炒西蓝花 + 圣女果<br/><br/>这个组合热量大概只有<strong>450大卡</strong>左右，很适合晚餐吃。你觉得这个安排怎么样？</>,
  },
  {
    role: 'user',
    text: '听起来不错！不过鸡胸肉吃多了会不会柴？中午我想吃点口感好一点的，有啥推荐吗？',
  },
  {
    role: 'agent',
    label: '推荐',
    text: <>哈哈，问到点子上了！鸡胸肉确实容易柴，但用<strong>"低温慢煎"</strong>或者<strong>"嫩肉粉"</strong>提前处理就会好很多。如果中午想吃口感好点的，<strong>「照烧风味龙利鱼/巴沙鱼套餐」</strong>（无刺鱼柳，口感非常嫩滑）或者 <strong>「蒜香柠檬手撕鸡套餐」</strong> 都很棒。<br/><br/>特别是手撕鸡，因为撕成条状，比整块肉更好入味，加上柠檬汁会非常清爽开胃。主食可以换成紫薯泥，口感像甜品一样绵密，减肥也没负担。<br/><br/>另外，本月人气最高的 <strong>「烟熏三文鱼平衡碗」</strong> 也值得一试 👇<br/><span className="chat-meal-card"><img src="/zheergan-healthy-meals/images/salmon.jpg" alt="烟熏三文鱼平衡碗" /><span className="chat-meal-info"><strong>烟熏三文鱼平衡碗</strong><span>486 kcal · 36g 蛋白质</span></span></span><br/>中午这顿可以适当多加一点碳水，下午工作更有劲儿。需要我帮你把这几款加入你的本周备选清单吗？</>,
  },
];

function HotChainHero() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [phase, setPhase] = useState('chat'); /* chat → entry → detail */
  const msgEndRef = useRef(null);

  useEffect(() => {
    if (visibleCount >= chatSequence.length) return;

    const current = chatSequence[visibleCount];
    const rawText = typeof current.text === 'string'
      ? current.text
      : (current.text?.props?.children || '').toString();
    const textLen = rawText.length || 60;
    const delay = current.role === 'agent'
      ? Math.min(2800, Math.max(1400, textLen * 22))
      : Math.min(1800, Math.max(900, textLen * 18));

    setTyping(true);
    const timer = setTimeout(() => {
      setTyping(false);
      setVisibleCount((c) => c + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [visibleCount]);

  /* 全部消息播完后 → 展示入口 → 跳转详情 */
  useEffect(() => {
    if (visibleCount < chatSequence.length) return;
    const t1 = setTimeout(() => setPhase('entry'), 1800);
    const t2 = setTimeout(() => setPhase('detail'), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visibleCount]);

  /* 新消息冒出后滚动到底部 */
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleCount, typing]);

  return (
    <section className="hotchain-hero section-panel panel-cream" aria-label="热链鲜送 AI 健康餐">
      {/* 背景光斑 */}
      <div className="hc-bg-blobs" aria-hidden="true">
        <span className="hc-blob hc-blob--1" />
        <span className="hc-blob hc-blob--2" />
        <span className="hc-blob hc-blob--3" />
      </div>
      <div className="hotchain-grid max-frame">
        {/* ========== 左栏：品牌宣传区 ========== */}
        <div className="hotchain-left">
          {/* 主标题 */}
          <h1 className="hotchain-title">
            <span className="hotchain-title-main">
              热链健康餐
            </span>
            <span className="hotchain-title-sub">
              <span className="hc-grad-agent">Agent</span>
              <span className="hc-grad-text">智能配送</span>
            </span>
          </h1>

          {/* 副标题 */}
          <p className="hotchain-desc">
            每一餐由 AI 为你量身定制营养方案，热链恒温配送到家。新鲜出锅 → 智能保温箱 → 70°C 准时送达，让健康饮食零负担。
          </p>

          {/* 按钮：照搬原 Hero 的下载按钮 */}
          <div className="hero-actions">
            <div className="download-btn-group">
              <a className="hero-dl-btn" href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk" target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5a1.5 1.5 0 0 0 3 0V19h2v3.5a1.5 1.5 0 0 0 3 0V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.96 5.96 0 0 0 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
                Android 下载
              </a>
              <div className="download-qr-pop">
                <img src="/zheergan-healthy-meals/images/qrcode.png" alt="扫码下载" />
                <span>手机扫码下载</span>
              </div>
            </div>
            <div className="download-btn-group">
              <a className="hero-dl-btn" href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk" target="_blank" rel="noreferrer">
                <img src="/zheergan-healthy-meals/images/icon-apple.svg" alt="" style={{width:20,height:20,filter:'brightness(0) invert(1)'}} />
                iOS 下载
              </a>
              <div className="download-qr-pop">
                <img src="/zheergan-healthy-meals/images/qrcode.png" alt="扫码下载" />
                <span>手机扫码下载</span>
              </div>
            </div>
          </div>

          {/* 底部卖点 */}
          <div className="hotchain-sells">
            <div className="hotchain-sell-item">
              <Check size={16} />
              <span>有机认证食材</span>
            </div>
            <div className="hotchain-sell-item">
              <Check size={16} />
              <span>营养师团队审核</span>
            </div>
            <div className="hotchain-sell-item">
              <Check size={16} />
              <span>30min 极速热达</span>
            </div>
          </div>
        </div>

        {/* ========== 右栏：AI 聊天演示区 ========== */}
        <div className="hotchain-right">
          <div className={`chat-card${phase === 'detail' ? ' chat-card--detail' : ''}`}>
            {/* 顶部信息栏 */}
            <div className="chat-topbar">
              {phase === 'detail' ? (
                <>
                  <button className="chat-back-btn" aria-label="返回">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <span className="chat-name">食谱详情</span>
                </>
              ) : (
                <>
                  <div className="chat-avatar">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="20" height="13" rx="3" />
                      <path d="M6 10h3" />
                      <path d="M6 14h5" />
                      <circle cx="16" cy="13" r="2" />
                      <path d="M16 9v1" />
                    </svg>
                  </div>
                  <div className="chat-topbar-info">
                    <span className="chat-name">Nova · 健康管家</span>
                    <span className="chat-status">
                      <span className="chat-status-dot" />
                      在线 · 随时为你服务
                    </span>
                  </div>
                </>
              )}
            </div>

            {phase === 'detail' ? (
              /* ===== 食谱详情页 ===== */
              <div className="detail-view">
                {/* 大图 */}
                <div className="detail-hero">
                  <img src="/zheergan-healthy-meals/images/salmon.jpg" alt="烟熏三文鱼平衡碗" />
                  <span className="detail-tag">热链配送 · 70°C 恒温直达</span>
                </div>

                {/* 基本信息 */}
                <div className="detail-body">
                  <h3 className="detail-title">烟熏三文鱼平衡碗</h3>
                  <div className="detail-nutrition">
                    <span className="detail-nutri-item"><strong>486</strong> kcal</span>
                    <span className="detail-nutri-sep">·</span>
                    <span className="detail-nutri-item"><strong>36g</strong> 蛋白质</span>
                    <span className="detail-nutri-sep">·</span>
                    <span className="detail-nutri-item"><strong>28g</strong> 碳水</span>
                    <span className="detail-nutri-sep">·</span>
                    <span className="detail-nutri-item"><strong>18g</strong> 脂肪</span>
                  </div>

                  {/* 规格选择 */}
                  <div className="detail-section">
                    <span className="detail-section-label">规格选择</span>
                    <div className="detail-specs">
                      <label className="detail-spec is-active">
                        <span className="detail-spec-radio" />
                        <span className="detail-spec-info">
                          <strong>标准份</strong>
                          <span>默认规格</span>
                        </span>
                      </label>
                      <label className="detail-spec">
                        <span className="detail-spec-radio" />
                        <span className="detail-spec-info">
                          <strong>大份</strong>
                          <span className="detail-spec-extra">+¥18</span>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* 数量 */}
                  <div className="detail-section">
                    <span className="detail-section-label">数量</span>
                    <div className="detail-qty">
                      <button className="detail-qty-btn">−</button>
                      <span className="detail-qty-val">1</span>
                      <button className="detail-qty-btn">+</button>
                    </div>
                  </div>

                  {/* 底部下单栏 */}
                  <div className="detail-bottom">
                    <div className="detail-price">
                      <span className="detail-price-label">合计</span>
                      <span className="detail-price-num">¥48<span>.00</span></span>
                    </div>
                    <button className="detail-order-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      立即下单
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* 聊天记录 — 逐条动画冒出 */}
                <div className="chat-messages">
                  {chatSequence.slice(0, visibleCount).map((msg, i) => (
                    <div
                      key={i}
                      className={`chat-msg ${msg.role === 'user' ? 'chat-msg--user' : 'chat-msg--ai'} chat-msg--pop`}
                    >
                      {msg.label && (
                        <span className={`chat-msg-label ${msg.label === '分析' ? 'chat-msg-label--ai' : 'chat-msg-label--rec'}`}>
                          {msg.label}
                        </span>
                      )}
                      <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble--user' : 'chat-bubble--ai'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* 正在输入指示器 */}
                  {typing && visibleCount < chatSequence.length && chatSequence[visibleCount].role === 'agent' && (
                    <div className="chat-msg chat-msg--ai chat-msg--pop">
                      <div className="chat-typing">
                        <span className="chat-typing-dot" />
                        <span className="chat-typing-dot" />
                        <span className="chat-typing-dot" />
                      </div>
                    </div>
                  )}

                  {typing && visibleCount < chatSequence.length && chatSequence[visibleCount].role === 'user' && (
                    <div className="chat-msg chat-msg--user chat-msg--pop">
                      <div className="chat-typing chat-typing--user">
                        <span className="chat-typing-dot" />
                        <span className="chat-typing-dot" />
                        <span className="chat-typing-dot" />
                      </div>
                    </div>
                  )}

                  {/* 查看食谱详情入口 */}
                  {phase === 'entry' && (
                    <div className="chat-msg chat-msg--ai chat-msg--pop">
                      <div className="chat-bubble chat-bubble--entry">
                        <span className="chat-entry-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                          </svg>
                        </span>
                        <span className="chat-entry-text">
                          <strong>查看食谱详情</strong>
                          <span>规格选择 · 立即下单</span>
                        </span>
                        <svg className="chat-entry-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  )}

                  <div ref={msgEndRef} />
                </div>

                {/* 底部输入栏 */}
                <div className="chat-input-bar">
                  <div className="chat-input-field">
                    <span className="chat-input-placeholder">告诉 Agent 你的需求...</span>
                  </div>
                  <button className="chat-send-btn" aria-label="发送">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
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
            <ShinyText text="美味低脂的健康餐" color="#2b1f14" shineColor="#c2611f" speed={3} spread={110} direction="left" />
          </h1>
          <p className="hero-lede">
            算法按你的身体数据定制餐单，合作餐厅每日现炒，热链保温送到
          </p>
        </div>

        <FoodBanner />

        <div className="hero-actions">
          <div className="download-btn-group">
            <a className="hero-dl-btn" href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk" target="_blank" rel="noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5a1.5 1.5 0 0 0 3 0V19h2v3.5a1.5 1.5 0 0 0 3 0V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.96 5.96 0 0 0 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
              Android 下载
            </a>
            <div className="download-qr-pop">
              <img src="/zheergan-healthy-meals/images/qrcode.png" alt="扫码下载" />
              <span>手机扫码下载</span>
            </div>
          </div>
          <div className="download-btn-group">
            <a className="hero-dl-btn" href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk" target="_blank" rel="noreferrer">
              <img src="/zheergan-healthy-meals/images/icon-apple.svg" alt="" style={{width:20,height:20,filter:'brightness(0) invert(1)'}} />
              iOS 下载
            </a>
            <div className="download-qr-pop">
              <img src="/zheergan-healthy-meals/images/qrcode.png" alt="扫码下载" />
              <span>手机扫码下载</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ================================================================
   FoodBanner — Hero 内的健康轻食产品展示轮播
   4 张宽幅食物图，毛玻璃标签，底部指示点，自动轮播
   ================================================================ */

const foodSlides = [
  { src: '/zheergan-healthy-meals/images/food/1.png', tag: '低卡轻食 · 营养均衡' },
  { src: '/zheergan-healthy-meals/images/food/2.png', tag: '鲜蔬蛋白 · 元气满满' },
  { src: '/zheergan-healthy-meals/images/food/3.png', tag: '高蛋白餐 · 增肌优选' },
  { src: '/zheergan-healthy-meals/images/food/4.png', tag: '抗氧化碗 · 活力一天' },
];

function FoodBanner() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current) {
        setActive((p) => (p + 1) % foodSlides.length);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="food-banner"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <div className="food-banner-stage">
        {foodSlides.map((slide, i) => (
          <div
            key={i}
            className={`food-banner-slide${i === active ? ' is-active' : ''}`}
          >
            <img src={slide.src} alt={slide.tag} loading="eager" />
            <span className="food-banner-tag">{slide.tag}</span>
          </div>
        ))}
      </div>
      <div className="food-banner-dots">
        {foodSlides.map((_, i) => (
          <button
            key={i}
            className={`food-banner-dot${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`第 ${i + 1} 张`}
          />
        ))}
      </div>
    </div>
  );
}

const painPoints = [
  { keyword: '外卖难吃', tag: '饮食困境', desc: '外卖油盐超标不卫生，普通健身餐又难吃到坚持不下去', image: '/zheergan-healthy-meals/images/pain-chicken.png' },
  { keyword: '做饭头疼', tag: '时间成本', desc: '想自己做，光是”今天要弄些什么菜吃”就头疼', image: '/zheergan-healthy-meals/images/pain-headache.png' },
  { keyword: '越减越肥', tag: '恶性循环', desc: '每次下定决心，最后吃炸鸡这类外卖吃完后又怕长胖', image: '/zheergan-healthy-meals/images/pain-friedchicken.png' },
];

function PainSplit() {
  const [activeImg, setActiveImg] = useState(0);
  const [direction, setDirection] = useState(1); /* 1=向下转入, -1=向上转出 */

  const switchTo = (i) => {
    setDirection(i > activeImg ? 1 : -1);
    setActiveImg(i);
  };

  return (
    <div className="pain-split">
      <div className="pain-split-left">
        <div className="pain-split-stage">
          {painPoints.map((point, i) => (
            <div
              key={point.keyword}
              className={`pain-split-slide${i === activeImg ? ' is-active' : ''}${direction > 0 ? ' slide-down' : ' slide-up'}`}
            >
              <img src={point.image} alt={point.desc} loading="eager" />
              <span className="pain-split-tag">{point.tag}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pain-split-right">
        {painPoints.map((point, i) => (
          <div
            key={point.keyword}
            className={`pain-split-row${i === activeImg ? ' is-active' : ''}`}
            onMouseEnter={() => switchTo(i)}
          >
            <span className="pain-split-kw">{point.keyword}</span>
            <span className="pain-split-desc">{point.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PainSection() {
  return (
    <section className="story-section story-pain section-panel panel-cream" id="pain" aria-label="健康饮食的困扰">
<div className="story-inner story-pain-inner">
        <h2 className="story-pain-title">
          想吃健康，<span>太难</span>
        </h2>
        <p className="story-pain-sub">你不是一个人——每个减脂人都卡在这一关</p>
        <PainSplit />
      </div>
    </section>
  );
}

const foodCards = [
  { name: '金汤酸菜鱼', tag: '新鲜蔬果', sub: '新鲜菜地采摘', image: '/zheergan-healthy-meals/images/food-7.png' },
  { name: '青花椒鸡胸肉', tag: '新鲜蔬果', sub: '新鲜菜地采摘', image: '/zheergan-healthy-meals/images/food-8.png' },
  { name: '番茄牛腩煲', tag: '新鲜蔬果', sub: '新鲜菜地采摘', image: '/zheergan-healthy-meals/images/food-9.png' },
  { name: '黑椒牛肉粒', tag: '新鲜蔬果', sub: '新鲜菜地采摘', image: '/zheergan-healthy-meals/images/food-10.png' },
  { name: '虾仁芦笋', tag: '新鲜肉类', sub: '新鲜屠宰场宰杀', image: '/zheergan-healthy-meals/images/food-5.png' },
  { name: '菌菇时蔬碗', tag: '新鲜肉类', sub: '新鲜屠宰场宰杀', image: '/zheergan-healthy-meals/images/food-12.png' },
  { name: '藜麦鸡腿肉', tag: '新鲜肉类', sub: '新鲜屠宰场宰杀', image: '/zheergan-healthy-meals/images/food-13.png' },
  { name: '金枪鱼波奇饭', tag: '新鲜肉类', sub: '新鲜屠宰场宰杀', image: '/zheergan-healthy-meals/images/food-14.png' },
];

const answerVisuals_old = [
  {
    src: '/zheergan-healthy-meals/images/answer-nutrition.jpg',
    alt: '营养均衡的健康碗 — 蛋白质、碳水、脂肪已配平',
    caption: '算法替你算好热量',
  },
  {
    src: '/zheergan-healthy-meals/images/answer-chef.jpg',
    alt: '商家主厨调味的健康餐 — 好吃才能坚持',
    caption: '主厨替你管好味道',
  },
  {
    src: '/zheergan-healthy-meals/images/answer-delivery.jpg',
    alt: '保温箱送到门口的健康餐 — 开盖热气扑脸',
    caption: '骑手替你保温送到',
  },
];

function AnswerSection() {
  const scrollRef = useRef(null);
  const paused = useRef(false);

  /* 自动轮播：4 秒滑动一次 */
  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current && scrollRef.current) {
        const el = scrollRef.current;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const cw = el.querySelector('.food-card')?.offsetWidth || 280;
          el.scrollBy({ left: cw + 8, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const cardW = scrollRef.current.querySelector('.food-card')?.offsetWidth || 280;
      const gap = 8;
      scrollRef.current.scrollBy({ left: dir * (cardW + gap), behavior: 'smooth' });
    }
  };

  return (
    <section
      className="story-section story-answer section-panel panel-cream"
      id="answer"
    >
<div className="story-inner story-answer-inner"
      aria-label="折耳根健康餐是什么"
    >
        <RevealOnScroll variant="fadeIn" amount={0.1}>
          <h2 className="answer-line">
            <ShinyText text="饮食健康，放心交给我们" color="#2b1f14" shineColor="#c2611f" speed={3} spread={120} direction="left" />
          </h2>
        </RevealOnScroll>
        <RevealOnScroll variant="fadeIn" delay={0.1} amount={0.1}>
          <p className="answer-lede">
            食材新鲜直采，源头可查；餐厅接单现做，锅气到家。每一口都放心
          </p>
        </RevealOnScroll>

        <div className="food-card-stage">
          <div
            className="food-card-track"
            ref={scrollRef}
            onMouseEnter={() => { paused.current = true; }}
            onMouseLeave={() => { paused.current = false; }}
          >
            {foodCards.map((card) => (
              <article key={card.name} className="food-card">
                <div className="food-card-img">
                  <img src={card.image} alt={card.name} loading="lazy" draggable="false" />
                </div>
                <div className="food-card-info">
                  <h3>{card.tag}</h3>
                  {card.sub && <p>{card.sub}</p>}
                </div>
              </article>
            ))}
          </div>
          <div className="food-card-arrows">
            <button className="food-card-arrow" onClick={() => scroll(-1)} aria-label="上一张">
              <ChevronDown size={52} style={{ transform: 'rotate(90deg)' }} />
            </button>
            <button className="food-card-arrow" onClick={() => scroll(1)} aria-label="下一张">
              <ChevronDown size={52} style={{ transform: 'rotate(-90deg)' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { no: '01', title: '设定你的身体档案', desc: '输入身高、体重、目标（减脂/增肌/维持）和日常活动强度，算法用 TDEE 公式算出你的每日总消耗——这个数字就是你所有餐单的起点。', image: '/zheergan-healthy-meals/images/step-body2.png', imageAlt: '在 App 中设置营养目标的界面示意' },
  { no: '02', title: '智能配餐引擎', desc: '拿到你的 TDEE 后，引擎按「热量匹配度 → 蛋白质达标率 → 口味吻合度 → 食材多样性」四层优先级排序，平均热量匹配度 94%，蛋白质底线自动锁定。', image: '/zheergan-healthy-meals/images/step-tdee2.png', imageAlt: '智能配餐引擎生成每周餐单' },
  { no: '03', title: '商家现做 + 热链配送', desc: '严选本地健康餐商家接单现做，3 轮盲测品控，出锅装入保温箱，美团骑手配送，到手中心温度 ≥60°C——开盖即食，不用微波复热。', image: '/zheergan-healthy-meals/images/step-delivery2.png', imageAlt: '美团骑手配送保温热链健康餐' },
];

function StepsSection() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <section className="story-section story-steps section-panel panel-cream" id="steps" aria-label="使用流程">
<div className="story-inner story-steps-inner">
        <div className="steps-head">
          <h2>开启你的健康饮食</h2>
          <p className="steps-sub">输入你的身体数据，吃到让你回味无穷的健康餐</p>
        </div>
        <div className="steps-split">
          <div className="steps-split-left">
            {steps.map((step, i) => (
              <div
                key={step.no}
                className={`steps-item${i === activeStep ? ' is-active' : ''}`}
                onMouseEnter={() => setActiveStep(i)}
              >
                <span className="steps-item-no">{step.no}</span>
                <div className="steps-item-text">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="steps-split-right">
            <div className="steps-stage">
              {steps.map((step, i) => (
                <div key={step.no} className={`steps-slide${i === activeStep ? ' is-active' : ''}`}>
                  <img src={step.image} alt={step.imageAlt} loading="lazy" />
                </div>
              ))}
            </div>
            <div className="steps-dots">
              {steps.map((_, i) => (
                <button
                  key={i}
                  className={`steps-dot${i === activeStep ? ' is-active' : ''}`}
                  onClick={() => setActiveStep(i)}
                  aria-label={`第 ${i + 1} 步`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const trustStats = [
  { value: 12, suffix: '万+', label: '正在使用我们的app', desc: '来自全国各地的真实用户，每天都在用折耳根吃上热乎的健康餐' },
  { value: 300, suffix: '万+', label: '份健康餐已送达', desc: '从第一份到第三百万份，每一份都是现炒现送、到手还是烫的' },
  { value: 200, suffix: '+', label: '合作健康餐商家', desc: '每一家入驻商家都经过实地考察与用户评分双重筛选' },
  { value: 94, suffix: '%', label: '热量匹配度', desc: '算法按你的身体数据配餐，热量精准匹配，蛋白质达标率自动锁定' },
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
  { name: '体验装', price: 228, per: '¥38/餐', spec: '3天·6餐', feats: ['算法定制3日餐单', '午晚双餐热链配送', '忌口与过敏原标记', '随时暂停·无违约金'], cta: '试3天' },
  { name: '周计划', price: 476, per: '¥34/餐', spec: '7天·14餐', feats: ['含体验装全部', '每周口味学习调优', '营养师周报', '免配送费'], cta: '最划算', hot: true },
  { name: '月计划', price: 1792, per: '¥32/餐', spec: '28天·56餐', feats: ['含周计划全部', '1对1营养师咨询', '体重体脂追踪', '优先配送时段'], cta: '深度定制' },
];

function PricingInline() {
  return (
    <section className="story-section section-panel panel-cream" id="pricing" aria-label="价格方案">
      <div className="story-inner" style={{ paddingBottom: '80px', width: 'min(1320px, calc(100% - 40px))' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', fontWeight: 680, textAlign: 'center', marginBottom: '12px' }}>
          美味健康餐，真不贵
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--muted-cream)', fontSize: 'var(--fs-lede)', marginBottom: '52px', lineHeight: 1.6 }}>
          一顿外卖的钱，吃到算法定制、餐厅现炒的专属健康餐
        </p>
        <div className="price-grid-inline" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px', margin: '0 auto' }}>
          {pricingPlans.map((plan, i) => (
            <RevealOnScroll key={plan.name} delay={i * 0.12} amount={0.1} variant="scaleIn">
              <article
              style={{
                display: 'flex', flexDirection: 'column', padding: '40px 60px 38px',
                border: '1px solid rgba(43,31,20,0.06)',
                borderRadius: 'var(--r-2xl)',
                background: '#ffffff',
                boxShadow: plan.hot
                  ? '0 26px 68px rgba(194,97,31,0.16)'
                  : '0 18px 48px rgba(43,31,20,0.06)',
                transition: 'transform 220ms ease',
              }}
            >
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: 'var(--ink-cream)' }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '18px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--ink-cream)' }}>¥</span>
                  <strong style={{ fontSize: 'clamp(50px, 4vw, 66px)', fontWeight: 700, lineHeight: 1, color: 'var(--ink-cream)' }}>{plan.price}</strong>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <span style={{ display: 'inline-block', padding: '6px 14px', color: 'var(--ink-cream)', borderRadius: '999px', background: 'rgba(43,31,20,0.06)', fontSize: '14px', fontWeight: 700 }}>{plan.per}</span>
                  <span style={{ display: 'block', marginTop: '10px', color: 'var(--muted-cream)', fontSize: '15px' }}>{plan.spec}</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', margin: '0 0 28px', padding: '20px 0 0', borderTop: '1px solid var(--line-cream)', display: 'grid', gap: '14px' }}>
                {plan.feats.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--ink-body)', fontSize: '16px', lineHeight: 1.5 }}>
                    <Check size={17} style={{ flex: 'none', marginTop: '2px', color: 'var(--ink-cream)' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk" target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto',
                  minHeight: '54px', padding: '14px 26px', borderRadius: '999px',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.55)',
                  background: 'linear-gradient(135deg, rgba(232,138,74,0.85), rgba(194,97,31,0.9))',
                  fontWeight: 700, fontSize: '16px', textDecoration: 'none',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 16px 38px rgba(194,97,31,0.3)',
                }}
              >
                {plan.cta}
              </a>
            </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="story-section story-trust section-panel panel-cream" id="trust" aria-label="为什么信任我们">
<div className="story-inner story-trust-inner">
        <div className="trust-head">
          <h2>
            真实口碑，<span>官方认证</span>
          </h2>
          <p className="trust-sub">每一个数字背后，都是用户对我们的认可</p>
        </div>

        <div className="trust-strip" aria-label="平台数据">
          {trustStats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <span className="trust-strip-divider" />}
              <div className="trust-strip-item">
                <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                <span className="trust-strip-label">{stat.label}</span>
                <span className="trust-strip-desc">{stat.desc}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

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
  {
    q: '餐单是固定的还是我能自己挑？',
    a: '算法按你的身体数据自动生成一周餐单后，你可以在 App 里对任意一餐进行手动替换——不想吃鱼就换成鸡肉，不爱沙拉就换个热菜，完全灵活。',
  },
  {
    q: '能看到每餐的热量和营养成分吗？',
    a: '当然能。每份餐都标注了热量、蛋白质、碳水和脂肪含量，App 里还能按天查看三大营养素占比，比你自己做笔记还清楚。',
  },
];

function FaqSection() {
  return (
    <section className="faq section-panel panel-cream" id="faq" aria-label="常见问题">
<div className="story-inner faq-inner">
        <div className="faq-head">
          <h2 className="faq-title">关于我们，你大概想知道这些</h2>
          <p className="faq-sub">关于配送、价格、食材、餐单与营养成分，这里回答了你能想到的</p>
        </div>
        <ul className="faq-list">
          {faqs.map((item, i) => (
            <RevealOnScroll key={item.q} delay={i * 0.08} amount={0.08} variant="fadeIn">
              <li className="faq-item">
                <div className="faq-item-inner">
                  <div className="faq-q-row">
                    <span className="faq-q">{item.q}</span>
                    <ChevronDown className="faq-chevron" size={20} />
                  </div>
                  <span className="faq-a">{item.a}</span>
                </div>
            </li>
            </RevealOnScroll>
          ))}
        </ul>
      </div>
    </section>
  );
}

const downloadPlatforms = [
  { img: '/zheergan-healthy-meals/images/icon-win.svg', label: 'Windows', dl: '点击下载 Windows 版' },
  { img: '/zheergan-healthy-meals/images/icon-apple.svg', label: 'Mac OS', dl: '点击下载 Mac 版' },
  { img: '/zheergan-healthy-meals/images/icon-phone.svg', label: '手机', qr: '/zheergan-healthy-meals/images/qrcode-dl.png' },
  { img: '/zheergan-healthy-meals/images/icon-tablet.svg', label: '平板', qr: '/zheergan-healthy-meals/images/qrcode-dl.png' },
];

function DownloadSection() {
  return (
    <section className="download section-panel panel-cream" id="download" aria-label="下载百度网盘">
      <div className="download-baidu-inner max-frame">
        <RevealOnScroll variant="fadeUp" amount={0.1}>
          <h2 className="download-baidu-title">下载折耳根健康餐</h2>
        </RevealOnScroll>

        <div className="download-platforms" aria-label="支持的平台">
          {downloadPlatforms.map((p, i) => (
            <RevealOnScroll key={p.label} delay={i * 0.08} amount={0.1} variant="popUp">
              <div className={`platform-card${p.dl ? ' platform-card--dl' : ''}${p.qr ? ' platform-card--qr' : ''}`}>
                {p.dl && (
                  <div className="platform-dl-hint">
                    <div className="dl-circle">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                    </div>
                    <span className="dl-text">{p.dl}</span>
                  </div>
                )}
                {p.qr && (
                  <div className="platform-qr-hint">
                    <img src={p.qr} alt={`${p.label} 扫码下载`} className="qr-hint-img" />
                    <span className="qr-hint-text">扫码下载 {p.label} 版</span>
                  </div>
                )}
                <div className="platform-icon">
                  {p.img ? (
                    <img src={p.img} alt={p.label} style={{ width: 48, height: 48 }} />
                  ) : (
                    <p.Icon size={48} color="#888" strokeWidth={1.8} />
                  )}
                </div>
                <span className="platform-label">{p.label}</span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* footerCols removed */

const _oldFooterCols = [
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
      <div className="footer-new">
        {/* 上层:链接区 */}
        <div className="footer-new-links">
          <a href="javascript:void(0)">商务合作</a>
          <span className="footer-new-sep">|</span>
          <a href="javascript:void(0)">隐私政策</a>
          <span className="footer-new-sep">|</span>
          <a href="javascript:void(0)">服务协议</a>
          <span className="footer-new-sep">|</span>
          <a href="javascript:void(0)">权利声明</a>
          <span className="footer-new-sep">|</span>
          <a href="javascript:void(0)">版本更新</a>
          <span className="footer-new-sep">|</span>
          <a href="javascript:void(0)">帮助中心</a>
          <span className="footer-new-sep">|</span>
          <a href="javascript:void(0)">版权投诉</a>
          <span className="footer-new-sep">|</span>
          <a href="javascript:void(0)">备案信息</a>
        </div>
        {/* 下层:版权区 */}
        <div className="footer-new-copy">
          <span>京公网安备 11000002002061号</span>
          <span>京ICP备2020042663号</span>
          <span>京网文[2026]2102-100号</span>
          <span>©2026 Ergen 折耳根健康餐</span>
          <a href="javascript:void(0)">证照信息 ›</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const route = useRoute();
  if (route === 'menu') return <MenuPage />;
  if (route === 'company') return <CompanyPage />;
  return <HomePage />;
}

createRoot(document.getElementById('root')).render(<App />);
