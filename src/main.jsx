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
  Star,
  TrendingDown,
  Activity,
  CalendarDays,
  ClipboardList,
  MessageSquareText,
  RefreshCw,
  ShieldAlert,
} from 'lucide-react';
import ShinyText from './components/ShinyText';
import SplitText from './components/SplitText';
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
    const ids = ['pain', 'answer', 'agent', 'steps', 'pricing', 'trust', 'faq'];
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
            { id: 'answer', label: '新鲜食材' },
            { id: 'agent', label: 'AI 管家' },
            { id: 'steps', label: '定制送餐' },
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
      <AgentSection />
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
              <h2><SplitText>{meal.title}</SplitText></h2>
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
/* ── 模拟用户身体数据（模块顶层，chatSequence 引用）─────────── */
const USER_PROFILE = {
  gender: '女',
  birth: '2000-05',
  height: 165,
  weight: 65,
  pal: 1.55,
};
const userAge = new Date().getFullYear() - 2000;
const userBMR = USER_PROFILE.gender === '男'
  ? 10 * USER_PROFILE.weight + 6.25 * USER_PROFILE.height - 5 * userAge + 5
  : 10 * USER_PROFILE.weight + 6.25 * USER_PROFILE.height - 5 * userAge - 161;
const userTEE = Math.round(userBMR * USER_PROFILE.pal);
const calcWeight = (kcal, days) => {
  const delta = ((kcal - userTEE) * days) / 7700;
  const abs = Math.abs(delta).toFixed(2);
  return delta >= 0 ? `增 ${abs} kg` : `减 ${abs} kg`;
};

/* 聊天对话序列：一问一答，逐条冒出 */
const chatSequence = [
  {
    role: 'agent',
    text: '你好！先了解一下你的身体情况，方便精准推荐。告诉我这几项就行：\n\n性别、出生年月、身高（cm）、体重（kg）、身体活动水平',
  },
  {
    role: 'user',
    text: `性别：${USER_PROFILE.gender}\n出生年月：${USER_PROFILE.birth}\n身高：${USER_PROFILE.height}cm\n体重：${USER_PROFILE.weight}kg\n身体活动水平：轻体力活动`,
  },
  {
    role: 'agent',
    text: <>收到。根据你的数据：BMI 约 {(USER_PROFILE.weight / Math.pow(USER_PROFILE.height/100, 2)).toFixed(1)}（正常范围），合理体重区间 {(18.5 * Math.pow(USER_PROFILE.height/100, 2)).toFixed(0)}–{(24 * Math.pow(USER_PROFILE.height/100, 2)).toFixed(0)} kg，每日总消耗量约 {userTEE} kcal。</>,
  },
  {
    role: 'user',
    text: '最近感觉胖了，你有什么推荐的健康餐吗？',
  },
  {
    role: 'agent',
    text: <>为你推荐折耳根的三档定制餐：<br/><br/>1. <strong>体验装</strong>：¥228 起，约 ¥38/餐，AI 定制 3 日餐单，午晚双餐热链配送，随时暂停无违约金。<br/>2. <strong>周计划</strong>：¥476，约 ¥34/餐，含体验装全部功能，每周口味学习调优，免配送费，最划算。<br/>3. <strong>月计划</strong>：¥1792，约 ¥32/餐，含 1 对 1 营养师咨询、体重体脂追踪、优先配送时段。<br/><br/>下方为您推荐一款健康餐，点击可查看详情。</>,
  },
  {
    role: 'cards',
  },
  {
    role: 'user',
    text: '我想要一款口感好的',
  },
  {
    role: 'agent',
    text: <>放心，折耳根主打<strong>美味第一</strong>——不是水煮鸡胸，也不是草沙拉，而是<strong>锅气十足、荤素搭配</strong>的家常好味道。<br/><br/>合作餐厅每日<strong>现炒热送</strong>，到手中心温度 ≥60℃，开盖即食、口口有锅气；每周还会根据你的口味反馈学习调优，越吃越合胃。<br/><br/>你是想先花 ¥228 试三天，还是直接上最划算的周计划？<br/>下方为您推荐一款健康餐，点击可查看详情。</>,
  },
  {
    role: 'cards-30',
  },
];

function HotChainHero() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [phase, setPhase] = useState('chat'); /* chat → entry → detail */
  const [detailOpen, setDetailOpen] = useState(false);
  const [openDay, setOpenDay] = useState(null);
  const [detailPlan, setDetailPlan] = useState('30'); /* '1' | '7' | '30' */
  const [selectedEnergy, setSelectedEnergy] = useState(null);
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const ENERGY_DATA = {
    '7': {
      days: 7,
      options: [
        { kcal: 1500, label: '1500 千卡', priceNum: '476', priceDec: '', unit: '¥34.0', meals: { breakfast: ['燕麦蓝莓碗·小','全麦三明治·半','紫薯牛奶羹','杂粮粥','酸奶水果杯·小'], lunch: ['香煎鸡胸糙米饭·小','黑椒牛肉意面·减半','清蒸鲈鱼藜麦·小','番茄牛腩饭·半碗','凉拌鸡丝荞麦面·小'], dinner: ['白灼虾时蔬·小','豆腐蔬菜汤','南瓜鸡胸沙拉·小','菌菇瘦肉粥·半碗','蒸蛋羹西兰花·小'] } },
        { kcal: 1900, label: '1900 千卡', priceNum: '536', priceDec: '', unit: '¥38.3', meals: { breakfast: ['燕麦蓝莓碗','全麦三明治','紫薯牛奶羹','杂粮粥配鸡蛋','酸奶水果杯'], lunch: ['香煎鸡胸糙米饭','黑椒牛肉意面','清蒸鲈鱼配藜麦','番茄牛腩饭','凉拌鸡丝荞麦面'], dinner: ['白灼虾配时蔬','豆腐蔬菜汤','南瓜鸡胸肉沙拉','菌菇瘦肉粥','蒸蛋羹配西兰花'] } },
        { kcal: 2300, label: '2300 千卡', priceNum: '596', priceDec: '', unit: '¥42.6', meals: { breakfast: ['燕麦蓝莓碗·大','全麦三明治·加倍','紫薯牛奶羹·大','杂粮粥配双蛋','酸奶水果杯·大'], lunch: ['香煎鸡胸糙米饭·大','黑椒牛肉意面·加量','清蒸鲈鱼藜麦·大','番茄牛腩饭·加量','凉拌鸡丝荞麦面·大'], dinner: ['白灼虾配时蔬·大','豆腐蔬菜汤·大','南瓜鸡胸肉沙拉·大','菌菇瘦肉粥·大','蒸蛋羹配双西兰花'] } },
      ],
    },
    '30': {
      days: 30,
      options: [
        { kcal: 1500, label: '1500 千卡', priceNum: '1792', priceDec: '', unit: '¥32.0', meals: { breakfast: ['燕麦蓝莓碗·小','全麦三明治·半','紫薯牛奶羹','杂粮粥','酸奶水果杯·小'], lunch: ['香煎鸡胸糙米饭·小','黑椒牛肉意面·减半','清蒸鲈鱼藜麦·小','番茄牛腩饭·半碗','凉拌鸡丝荞麦面·小'], dinner: ['白灼虾时蔬·小','豆腐蔬菜汤','南瓜鸡胸沙拉·小','菌菇瘦肉粥·半碗','蒸蛋羹西兰花·小'] } },
        { kcal: 1900, label: '1900 千卡', priceNum: '1972', priceDec: '', unit: '¥35.2', meals: { breakfast: ['燕麦蓝莓碗','全麦三明治','紫薯牛奶羹','杂粮粥配鸡蛋','酸奶水果杯'], lunch: ['香煎鸡胸糙米饭','黑椒牛肉意面','清蒸鲈鱼配藜麦','番茄牛腩饭','凉拌鸡丝荞麦面'], dinner: ['白灼虾配时蔬','豆腐蔬菜汤','南瓜鸡胸肉沙拉','菌菇瘦肉粥','蒸蛋羹配西兰花'] } },
        { kcal: 2300, label: '2300 千卡', priceNum: '2172', priceDec: '', unit: '¥38.8', meals: { breakfast: ['燕麦蓝莓碗·大','全麦三明治·加倍','紫薯牛奶羹·大','杂粮粥配双蛋','酸奶水果杯·大'], lunch: ['香煎鸡胸糙米饭·大','黑椒牛肉意面·加量','清蒸鲈鱼藜麦·大','番茄牛腩饭·加量','凉拌鸡丝荞麦面·大'], dinner: ['白灼虾配时蔬·大','豆腐蔬菜汤·大','南瓜鸡胸肉沙拉·大','菌菇瘦肉粥·大','蒸蛋羹配双西兰花'] } },
      ],
    },
  };

  const activeEnergyData = ENERGY_DATA[detailPlan] || ENERGY_DATA['30'];
  const planDays = activeEnergyData.days;
  const allKcals = activeEnergyData.options.map(o => o.kcal);
  const minKcal = Math.min(...allKcals);
  const maxKcal = Math.max(...allKcals);

  // 推荐：热量值最接近用户 TEE 的规格
  const recommendedOption = activeEnergyData.options.reduce((best, o) =>
    Math.abs(o.kcal - userTEE) < Math.abs(best.kcal - userTEE) ? o : best
  );

  const currentEnergy = selectedEnergy || recommendedOption.kcal;
  const energyOption = activeEnergyData.options.find(o => o.kcal === currentEnergy) || recommendedOption;
  const weightChange = calcWeight(energyOption.kcal, planDays);

  // 为每个规格生成评估描述
  const getAssessment = (kcal) => {
    const diff = kcal - userTEE;
    const absDiff = Math.abs(diff);
    if (diff < 0) {
      return absDiff > 600
        ? `较大热量缺口（每日约 ${absDiff} kcal），适合追求较快减重的群体。`
        : `温和热量缺口（每日约 ${absDiff} kcal），兼顾减重与饱腹感，适合稳定减脂。`;
    } else if (diff > 100) {
      return `轻微热量盈余（每日约 +${diff} kcal），配合抗阻训练可促进肌肉增长，适合偏瘦用户增重塑形。`;
    }
    return `热量接近维持水平（每日仅差 ${absDiff} kcal），维持当前体重，均衡饮食不易反弹。`;
  };

  // 三个套餐的详情数据
  const PLANS = {
    '1': {
      title: '体验装',
      sub: '¥228 起 · AI 定制 3 日餐单',
      hero: '/zheergan-healthy-meals/images/food-7.png',
      days: 3,
      price: '¥228', priceNum: '228', priceDec: '',
      unit: '¥38.0',
      cycle: '3 天',
      suit: '想低成本体验的新用户',
      taboo: '忌口/过敏可标记；如对特定坚果或海鲜过敏请咨询营养师。',
      desc: '¥228 起，约 ¥38/餐，3 天 6 餐。AI 定制 3 日餐单，午晚双餐热链配送，忌口/过敏标记，随时暂停无违约金。',
    },
    '7': {
      title: '周计划',
      sub: '最划算 · 每周口味学习调优',
      hero: '/zheergan-healthy-meals/images/food-8.png',
      days: 7,
      price: '¥476', priceNum: '476', priceDec: '',
      unit: '¥34.0',
      cycle: '7 天',
      suit: '追求高性价比的多数人',
      taboo: '忌口/过敏可标记；如对特定坚果或海鲜过敏请咨询营养师。',
      desc: '¥476，约 ¥34/餐，7 天 14 餐。含体验装全部功能，每周口味学习调优，营养师周报，免配送费。',
    },
    '30': {
      title: '月计划',
      sub: '深度定制 · 1 对 1 营养师咨询',
      hero: '/zheergan-healthy-meals/images/food-9.png',
      days: 28,
      price: '¥1792', priceNum: '1792', priceDec: '',
      unit: '¥32.0',
      cycle: '28 天',
      suit: '追求长期体重管理者',
      taboo: '忌口/过敏可标记；如对特定坚果或海鲜过敏请咨询营养师。',
      desc: '¥1792，约 ¥32/餐，28 天 56 餐。含周计划全部，1 对 1 营养师咨询，体重体脂追踪，优先配送时段。',
    },
  };
  const plan = PLANS[detailPlan] || PLANS['30'];
  const chatScrollRef = useRef(null);
  const sectionRef = useRef(null);
  const inViewRef = useRef(true); /* 用户当前是否正看着这张卡片 */

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

  /* 新消息冒出后缓慢滚到最新,不带动整页 */
  useEffect(() => {
    if (!inViewRef.current) return;
    const el = chatScrollRef.current;
    if (!el) return;
    const target = el.scrollHeight;
    const start = el.scrollTop;
    const distance = target - start;
    if (distance <= 0) return;
    const duration = 900; // 慢速滚动时长
    let startTime = null;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const t = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      el.scrollTop = start + distance * eased;
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visibleCount, typing]);

  /* 跟踪 Hero 是否在视口:离开视口(用户在别的模块)后,后续不再自动滚回卡片 */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => { inViewRef.current = entry.isIntersecting; },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* 全部消息播完后 → 展示入口 → 跳转详情 */
  useEffect(() => {
    if (visibleCount < chatSequence.length) return;
    const t1 = setTimeout(() => setPhase('entry'), 1800);
    const t2 = setTimeout(() => setPhase('detail'), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visibleCount]);

  return (
    <section ref={sectionRef} className="hotchain-hero section-panel panel-cream" aria-label="热链鲜送 AI 健康餐">
      {/* 背景光斑 */}
      <div className="hc-bg-blobs" aria-hidden="true">
        <span className="hc-blob hc-blob--1" />
        <span className="hc-blob hc-blob--2" />
        <span className="hc-blob hc-blob--3" />
      </div>
      <div className="hotchain-grid max-frame">
        {/* ========== 左栏：品牌宣传区 ========== */}
        <RevealOnScroll variant="fadeUp" amount={0.1} className="hotchain-left">
          {/* 主标题 */}
          <h1 className="hotchain-title">
            <span className="hotchain-title-main">
              <SplitText>折耳根健康餐</SplitText>
            </span>
            <span className="hotchain-title-sub">
              <SplitText charClassName="hc-grad-text">好吃！健康！不贵！</SplitText>
            </span>
          </h1>

          {/* 副标题 */}
          <p className="hotchain-desc">
            AI 为你量身定制营养方案，合作餐厅每日现炒，70℃热链恒温配送到家。新鲜出锅 → 智能保温 → 准时送达，让健康饮食零负担、零厨艺、零纠结。
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
              <span>35min 极速热达</span>
            </div>
            <div className="hotchain-sell-item">
              <Check size={16} />
              <span>到手≥60℃免加热</span>
            </div>
          </div>
        </RevealOnScroll>

        {/* ========== 右栏：AI 聊天演示区 ========== */}
        <div className="hotchain-right">
          <RevealOnScroll variant="fadeIn" amount={0.1} className="chat-card-shell">
          <div className={`chat-card${phase === 'detail' ? ' chat-card--detail' : ''}`}>
            {/* 顶部信息栏 */}
            <div className="chat-topbar">
              {phase === 'detail' ? (
                <>
                  <span className="chat-name">食谱详情</span>
                </>
              ) : (
                <>
                  <div className="chat-topbar-info chat-topbar-info--center">
                    <span className="chat-name">折耳根小助手</span>
                    <span className="chat-status">
                      <span className="chat-status-dot" />
                      在线 · 随时为你服务
                    </span>
                  </div>
                </>
              )}
            </div>

            {phase === 'detail' ? (
              /* ===== 月计划 详情页 ===== */
              <div className="detail-view">
                <button
                  className="chat-back-btn chat-back-btn--overlay"
                  onClick={() => setPhase('chat')}
                  aria-label="返回"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <div
                  className="detail-hero detail-hero--premium"
                  ref={heroRef}
                  onMouseMove={(e) => {
                    if (!heroRef.current) return;
                    const rect = heroRef.current.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 ~ 1
                    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
                    setHeroTilt({ x: y * 6, y: x * -6 });
                  }}
                  onMouseLeave={() => setHeroTilt({ x: 0, y: 0 })}
                  style={{ transform: `perspective(600px) rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg)`, transition: heroTilt.x === 0 ? 'transform 0.4s ease-out' : 'none' }}
                >
                  <img src={plan.hero} alt={plan.title} />
                  <span className="detail-tag">热链配送 · 70°C 恒温直达</span>
                </div>

                <div className="detail-body">
                  <div className="detail-header">
                    <h3 className="detail-title"><SplitText>{plan.title}</SplitText></h3>
                    <p className="detail-subtitle">{plan.sub}</p>
                  </div>

                  {/* 周期/详情折叠 */}
                  <div className="detail-accordion">
                    <button
                      className={`detail-accordion-trigger ${detailOpen ? 'is-open' : ''}`}
                      onClick={() => setDetailOpen(v => !v)}
                    >
                      <span>周期/详情</span>
                      <ChevronDown size={16} />
                    </button>
                    {detailOpen && (
                      <div className="detail-accordion-content">
                        <p>{plan.desc}</p>
                        <ul>
                          <li>周期：{plan.cycle}</li>
                          <li>服务：{detailPlan === '30' ? '营养师 1 对 1 咨询' : '标准食谱配送'}</li>
                          <li>目标：{detailPlan === '30' ? '长期体重管理 / 1 对 1 营养师咨询' : detailPlan === '7' ? '高性价比 / 每周口味调优' : '低成本体验服务流程'}</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* 阿折评估 */}
                  <div className="detail-assessment">
                    <div className="detail-section-label">阿折评估</div>
                    <div className="detail-assessment-card">
                      <div className="detail-assessment-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="22 12 16 18 10 12 2 6" />
                        </svg>
                      </div>
                      <div className="detail-assessment-main">
                        <p>为您选用 <strong>{energyOption.kcal} 千卡</strong> 规格</p>
                        <p>预计体重 <strong className="detail-assessment-highlight">{weightChange}</strong></p>
                      </div>
                      <p className="detail-assessment-desc">
                        根据你的身体数据与目标，该方案能有效在维持代谢的同时实现合理热量管理。
                      </p>
                      <button className="detail-assessment-report">
                        详细评估报告
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* 能量规格 */}
                  <div className="detail-energy">
                    <div className="detail-section-label">能量规格</div>
                    <div className="detail-energy-card">
                      <strong>能量（单选）</strong>
                      <p>建议选择 <strong>{recommendedOption.kcal} 千卡</strong> 规格，不低于 <strong>{minKcal} 千卡</strong>，不高于 <strong>{maxKcal} 千卡</strong>。</p>
                      <div className="detail-energy-options">
                        {activeEnergyData.options.map((opt) => (
                          <label
                            key={opt.kcal}
                            className={`detail-energy-option${currentEnergy === opt.kcal ? ' is-active' : ''}`}
                            onClick={() => setSelectedEnergy(opt.kcal)}
                          >
                            <input type="radio" name="energy-spec" value={opt.kcal} checked={currentEnergy === opt.kcal} readOnly />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 每日餐单 */}
                  <div className="detail-days">
                    <div className="detail-section-label">每日餐单</div>
                    <div className="detail-days-list">
                      {Array.from({ length: plan.days }, (_, i) => i + 1).map((day) => {
                        const isOpen = openDay === day;
                        const meals = {
                          breakfast: energyOption.meals.breakfast[day % energyOption.meals.breakfast.length],
                          lunch: energyOption.meals.lunch[day % energyOption.meals.lunch.length],
                          dinner: energyOption.meals.dinner[day % energyOption.meals.dinner.length],
                        };
                        return (
                          <div key={day} className={`detail-day ${isOpen ? 'is-open' : ''}`}>
                            <button
                              className="detail-day-trigger"
                              onClick={() => setOpenDay(isOpen ? null : day)}
                            >
                              <span>第 {day} 天</span>
                              <ChevronDown size={15} />
                            </button>
                            {isOpen && (
                              <div className="detail-day-content">
                                <div className="detail-meal"><span>早餐</span>{meals.breakfast}</div>
                                <div className="detail-meal"><span>午餐</span>{meals.lunch}</div>
                                <div className="detail-meal"><span>晚餐</span>{meals.dinner}</div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 食谱参数 */}
                  <div className="detail-params">
                    <div className="detail-section-label">食谱参数</div>
                    <div className="detail-params-card">
                      <div className="detail-params-row">
                        <div className="detail-params-cell">
                          <span>周期</span>
                          <strong>{plan.cycle}</strong>
                        </div>
                        <div className="detail-params-cell">
                          <span>估算单餐</span>
                          <strong className="detail-params-price">{energyOption.unit}</strong>
                        </div>
                      </div>
                      <div className="detail-params-cell detail-params-cell--full">
                        <span>适宜人群</span>
                        <strong>{plan.suit}</strong>
                      </div>
                      <div className="detail-params-cell detail-params-cell--full">
                        <span>禁忌说明</span>
                        <p>{plan.taboo}</p>
                      </div>
                    </div>
                  </div>

                  {/* 底部下单栏 */}
                  <div className="detail-bottom detail-bottom--sticky">
                    <div className="detail-price">
                      <span className="detail-price-label">合计</span>
                      <span className="detail-price-num">¥{energyOption.priceNum}<span>{energyOption.priceDec}</span></span>
                    </div>
                    <button className="detail-order-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      立即定制
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* 聊天记录 — 逐条动画冒出 */}
                <div className="chat-messages" ref={chatScrollRef} onClick={(e) => { if (e.target.closest('.chat-meal-card')) setPhase('detail'); }}>
                  {chatSequence.slice(0, visibleCount).map((msg, i) => {
                    if (msg.role === 'cards-30') {
                      return (
                        <div key={i} className="chat-msg chat-msg--ai chat-msg--pop">
                          <div className="chat-meal-cards">
                            <button
                              className="chat-meal-card-standalone"
                              onClick={() => { setDetailPlan('30'); setPhase('detail'); }}
                              aria-label="查看月计划详情"
                            >
                              <img src="/zheergan-healthy-meals/images/food-9.png" alt="月计划" />
                              <div className="chat-meal-card-standalone-body">
                                <strong>月计划</strong>
                                <span>1 对 1 营养师 · 长期管理</span>
                                <div className="chat-meal-card-standalone-tags">
                                  <span className="chat-meal-price-tag">¥1792</span>
                                  <span className="chat-meal-day-tag">28 天</span>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      );
                    }
                    if (msg.role === 'cards') {
                      return (
                        <div key={i} className="chat-msg chat-msg--ai chat-msg--pop">
                          <div className="chat-meal-cards">
                            <button
                              className="chat-meal-card-standalone"
                              onClick={() => { setDetailPlan('1'); setPhase('detail'); }}
                              aria-label="查看体验装详情"
                            >
                              <img src="/zheergan-healthy-meals/images/food-7.png" alt="体验装" />
                              <div className="chat-meal-card-standalone-body">
                                <strong>体验装</strong>
                                <span>新用户 · 低成本体验</span>
                                <div className="chat-meal-card-standalone-tags">
                                  <span className="chat-meal-price-tag">¥228</span>
                                  <span className="chat-meal-day-tag">3 天</span>
                                </div>
                              </div>
                            </button>
                            <button
                              className="chat-meal-card-standalone"
                              onClick={() => { setDetailPlan('7'); setPhase('detail'); }}
                              aria-label="查看七日营养餐食谱详情"
                            >
                              <img src="/zheergan-healthy-meals/images/food-8.png" alt="周计划" />
                              <div className="chat-meal-card-standalone-body">
                                <strong>周计划</strong>
                                <span>最划算 · 每周口味调优</span>
                                <div className="chat-meal-card-standalone-tags">
                                  <span className="chat-meal-price-tag">¥476</span>
                                  <span className="chat-meal-day-tag">7 天</span>
                                </div>
                              </div>
                            </button>
                            <button
                              className="chat-meal-card-standalone"
                              onClick={() => { setDetailPlan('30'); setPhase('detail'); }}
                              aria-label="查看月计划详情"
                            >
                              <img src="/zheergan-healthy-meals/images/food-9.png" alt="月计划" />
                              <div className="chat-meal-card-standalone-body">
                                <strong>月计划</strong>
                                <span>1 对 1 营养师 · 长期管理</span>
                                <div className="chat-meal-card-standalone-tags">
                                  <span className="chat-meal-price-tag">¥1792</span>
                                  <span className="chat-meal-day-tag">28 天</span>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div
                        key={i}
                        className={`chat-msg ${msg.role === 'user' ? 'chat-msg--user' : 'chat-msg--ai'} chat-msg--pop`}
                      >
                        <div className="chat-msg-main">
                          {msg.label && (
                            <span className={`chat-msg-label ${msg.label === '分析' ? 'chat-msg-label--ai' : 'chat-msg-label--rec'}`}>
                              {msg.label}
                            </span>
                          )}
                          <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble--user' : 'chat-bubble--ai'}`}>
                            {msg.text}
                          </div>
                          {msg.role === 'user' && (() => { const d = new Date(); const hh = String(d.getHours()).padStart(2, '0'); const mm = String(d.getMinutes()).padStart(2, '0'); return <span className="chat-msg-time">{`${hh}:${mm}`}</span>; })()}
                        </div>
                      </div>
                    );
                  })}

                  {/* 正在输入指示器 */}
                  {typing && visibleCount < chatSequence.length && chatSequence[visibleCount].role === 'agent' && (
                    <div className="chat-msg chat-msg--ai chat-msg--pop">
                      <div className="chat-typing">
                        <span className="chat-typing-text">AI正在思考中...</span>
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
          </RevealOnScroll>
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
        <RevealOnScroll variant="fadeUp" amount={0.1} className="hero-copy">
          <h1>
            <ShinyText text="美味健康餐，真不贵" color="#2b1f14" shineColor="#c2611f" speed={3} spread={110} direction="left" reveal />
          </h1>
          <p className="hero-lede"><SplitText stagger={0.012}>
            算法按你的身体数据定制餐单，合作餐厅每日现炒热送。<br />
            不是水煮鸡胸，不是草沙拉——<br />
            是锅气十足、荤素搭配的家常好味道。
          </SplitText></p>
        </RevealOnScroll>

        <FoodBanner />

        <RevealOnScroll variant="fadeUp" delay={0.1} className="hero-actions">
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
        </RevealOnScroll>

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
    <RevealOnScroll
      variant="fadeUp"
      amount={0.1}
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
    </RevealOnScroll>
  );
}

const painPoints = [
  { keyword: '外卖难以下咽', tag: '饮食困境', desc: '高油高盐、营养失衡，吃完罪恶感爆棚', image: '/zheergan-healthy-meals/images/pain-chicken.png' },
  { keyword: '做饭手忙脚乱', tag: '时间成本', desc: '买菜、洗切、炒菜、刷锅……没时间也没精力', image: '/zheergan-healthy-meals/images/pain-headache.png' },
  { keyword: '健康恶性循环', tag: '恶性循环', desc: '每次下定决心，最后还是炸鸡奶茶兜底，体重反复横跳', image: '/zheergan-healthy-meals/images/pain-friedchicken.png' },
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
<RevealOnScroll variant="fadeUp" amount={0.1} className="story-inner story-pain-inner">
        <h2 className="story-pain-title">
          <SplitText>想吃健康，<span>太难？</span>交给折耳根</SplitText>
        </h2>
        <p className="story-pain-sub"><SplitText stagger={0.012}>你不是一个人——每个想好好吃饭的人，都卡在这一关</SplitText></p>
        <PainSplit />
      </RevealOnScroll>
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
            <ShinyText text="饮食健康，放心交给我们" color="#2b1f14" shineColor="#c2611f" speed={3} spread={120} direction="left" reveal />
          </h2>
        </RevealOnScroll>
        <RevealOnScroll variant="fadeIn" delay={0.1} amount={0.1}>
          <p className="answer-lede"><SplitText stagger={0.012}>
            食材新鲜直采，源头可查；餐厅接单现做，锅气到家。每一口都放心
          </SplitText></p>
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
                  <h3><SplitText>{card.tag}</SplitText></h3>
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

/* ================================================================
   AgentSection — 折耳根 AI 健康管家能力模块
   首页新增:展示 Agent 能为用户做的 6 件事
   ================================================================ */
const agentCaps = [
  {
    icon: MessageSquareText,
    title: '智能对话咨询',
    desc: '用大白话告诉折耳根 AI 你的目标——"我想减脂但不爱运动"，它立刻拆解成可执行方案，而不是丢给你一堆术语。',
  },
  {
    icon: CalendarDays,
    title: '一键生成周餐单',
    desc: '结合你的身体数据、口味与忌口，秒级生成一周餐单，热量与蛋白质逐克配平，省去每天"吃什么"的纠结。',
  },
  {
    icon: ShieldAlert,
    title: '过敏原 & 忌口规避',
    desc: '标记海鲜、香菜、坚果等 28 项忌口后，配餐时自动绕开，营养师还会为你的餐单二次复核。',
  },
  {
    icon: Activity,
    title: '体重体脂追踪',
    desc: '每天记录体重，趋势异常时折耳根 AI 主动提醒，并据此微调下一阶段的餐单，让进度一直在线。',
  },
  {
    icon: RefreshCw,
    title: '智能复购补给',
    desc: '常吃的套餐快见底，折耳根 AI 主动问你要不要续上——出差、休假也能一键暂停，零操心。',
  },
  {
    icon: ClipboardList,
    title: '每周营养报告',
    desc: '周报拆解你的三大营养素占比与达标率，看得见每一口换来的进步，坚持更有动力。',
  },
];

function AgentSection() {
  return (
    <section
      className="story-section story-agent section-panel panel-cream"
      id="agent"
      aria-label="折耳根 AI 智能体"
    >
      <div className="agent-bg-blobs" aria-hidden="true">
        <span className="agent-blob agent-blob--1" />
        <span className="agent-blob agent-blob--2" />
        <span className="agent-blob agent-blob--3" />
      </div>
      <div className="story-inner agent-inner">
        <RevealOnScroll variant="fadeUp" amount={0.1}>
          <h2 className="agent-title">
            <SplitText>把"吃得健康"，</SplitText><ShinyText text="交给折耳根 AI" color="#2b1f14" shineColor="#c2611f" speed={3} spread={120} direction="left" reveal />
          </h2>
          <p className="agent-lede"><SplitText stagger={0.012}>
            折耳根 AI 不只是聊天机器人。从听懂你的口味，到记住你的忌口，再到主动帮你复购补给，它把这件麻烦事全程接管——你只管吃，剩下的交给它。
          </SplitText></p>
        </RevealOnScroll>

        <div className="agent-grid">
          {agentCaps.map((cap, i) => {
            const I = cap.icon;
            return (
              <RevealOnScroll key={cap.title} delay={i * 0.08} amount={0.08} variant="popUp" className="agent-card-cell">
                <article className="agent-card">
                  <span className="agent-card-icon">
                    <I size={24} />
                  </span>
                  <h3><SplitText>{cap.title}</SplitText></h3>
                  <p>{cap.desc}</p>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { no: '01', title: '设定身体档案', desc: '输入身高、体重、目标（减脂/增肌/维持）和活动强度，AI 算出你的每日消耗——这就是你专属餐单的起点。', image: '/zheergan-healthy-meals/images/step-body2.png', imageAlt: '在 App 中设置营养目标的界面示意' },
  { no: '02', title: 'AI 智能配餐', desc: '引擎按「热量匹配 → 蛋白质达标 → 口味合胃 → 食材多样」四维排序，平均匹配度 94%，拒绝“健康但难吃”。', image: '/zheergan-healthy-meals/images/step-tdee2.png', imageAlt: '智能配餐引擎生成每周餐单' },
  { no: '03', title: '商家现做 + 热链配送', desc: '严选本地健康餐厅接单现做，3 轮品控，保温箱+骑手配送，到手中心温度 ≥60℃，开盖即食，不用微波复热，口口有锅气。', image: '/zheergan-healthy-meals/images/step-delivery2.png', imageAlt: '骑手配送保温热链健康餐' },
];

function StepsSection() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <section className="story-section story-steps section-panel panel-cream" id="steps" aria-label="使用流程">
<RevealOnScroll variant="fadeUp" amount={0.1} className="story-inner story-steps-inner">
        <div className="steps-head">
          <h2><SplitText>开启你的健康饮食</SplitText></h2>
          <p className="steps-sub"><SplitText stagger={0.012}>输入你的身体数据，吃到让你回味无穷的健康餐</SplitText></p>
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
                  <h3><SplitText>{step.title}</SplitText></h3>
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
      </RevealOnScroll>
    </section>
  );
}

const trustStats = [
  { value: 12, suffix: '万+', label: '正在使用我们的app', desc: '来自全国各地的真实用户，每天都在用折耳根吃上热乎的健康餐' },
  { value: 300, suffix: '万+', label: '份健康餐已送达', desc: '从第一份到三百万份，每一份都是现炒现送、到手还是烫的' },
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
  { name: '体验装', price: 228, per: '¥38/餐', spec: '3天·6餐', feats: ['AI 定制 3 日餐单', '午晚双餐热链配送', '忌口与过敏原标记', '随时暂停·无违约金'], cta: '试3天' },
  { name: '周计划', price: 476, per: '¥34/餐', spec: '7天·14餐', feats: ['含体验装全部', '每周口味学习调优', '营养师周报', '免配送费'], cta: '最划算', hot: true },
  { name: '月计划', price: 1792, per: '¥32/餐', spec: '28天·56餐', feats: ['含周计划全部', '1对1营养师咨询', '体重体脂追踪', '优先配送时段'], cta: '深度定制' },
];

function PricingInline() {
  return (
    <section className="story-section section-panel panel-cream" id="pricing" aria-label="价格方案">
      <div className="story-inner" style={{ paddingBottom: '80px', width: 'min(1320px, calc(100% - 40px))' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', fontWeight: 680, textAlign: 'center', marginBottom: '12px' }}><SplitText>
          美味健康餐，真不贵
        </SplitText></h2>
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
                <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: 'var(--ink-cream)' }}><SplitText>{plan.name}</SplitText></h3>
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
<RevealOnScroll variant="fadeUp" amount={0.1} className="story-inner story-trust-inner">
        <div className="trust-head">
          <h2>
            <SplitText>真实口碑，<span>官方认证</span></SplitText>
          </h2>
          <p className="trust-sub"><SplitText stagger={0.012}>每一个数字背后，都是用户对我们的认可</SplitText></p>
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

      </RevealOnScroll>
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
    a: '单餐价格在 32–45 元之间，体验装 ¥228 起，周计划更划算（约 ¥34/餐）。你可以先订 3 天试吃，觉得合适再续，不用一次性押上整月。',
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
          <h2 className="faq-title"><SplitText>关于我们，你大概想知道这些</SplitText></h2>
          <p className="faq-sub"><SplitText stagger={0.012}>关于配送、价格、食材、餐单与营养成分，这里回答了你能想到的</SplitText></p>
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
          <h2 className="download-baidu-title"><SplitText>下载折耳根健康餐</SplitText></h2>
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
      <RevealOnScroll variant="fadeUp" amount={0.1} className="footer-new">
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
      </RevealOnScroll>
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
