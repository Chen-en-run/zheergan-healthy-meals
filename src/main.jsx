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
import CompanyPage from './pages/Company';
import './styles.css';

/* ================================================================
   轻量 hash 路由
   #/features → 功能介绍子页
   #/pricing  → 价格方案子页
   #/company  → 公司简介子页
   其余所有 hash(包括空/锚点) → 首页(原 App)
   ================================================================ */
function useRoute() {
  const resolve = () => {
    const h = window.location.hash;
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
    image: '/zheergan-healthy-meals/images/salmon.webp',
  },
  {
    title: '柑香鸡肉谷物碗',
    kcal: '532 kcal',
    protein: '42g 蛋白质',
    image: '/zheergan-healthy-meals/images/chicken.webp',
  },
  {
    title: '牛油果绿蔬蛋碗',
    kcal: '418 kcal',
    protein: '28g 蛋白质',
    image: '/zheergan-healthy-meals/images/avocado.webp',
  },
  {
    title: '藜麦能量碗',
    kcal: '462 kcal',
    protein: '24g 蛋白质',
    image: '/zheergan-healthy-meals/images/quinoa.webp',
  },
  {
    title: '金枪鱼波奇碗',
    kcal: '508 kcal',
    protein: '38g 蛋白质',
    image: '/zheergan-healthy-meals/images/tuna.webp',
  },
  {
    title: '黑椒牛肉能量盘',
    kcal: '568 kcal',
    protein: '44g 蛋白质',
    image: '/zheergan-healthy-meals/images/dish-14.webp',
  },
  {
    title: '田园时蔬沙拉',
    kcal: '320 kcal',
    protein: '18g 蛋白质',
    image: '/zheergan-healthy-meals/images/salad.webp',
  },
  {
    title: '香煎鸡胸藜麦饭',
    kcal: '448 kcal',
    protein: '40g 蛋白质',
    image: '/zheergan-healthy-meals/images/dish-07.webp',
  },
  {
    title: '泰式青咖喱虾仁',
    kcal: '392 kcal',
    protein: '32g 蛋白质',
    image: '/zheergan-healthy-meals/images/dish-08.webp',
  },
  {
    title: '日式照烧三文鱼',
    kcal: '475 kcal',
    protein: '35g 蛋白质',
    image: '/zheergan-healthy-meals/images/dish-09.webp',
  },
  {
    title: '番茄牛腩糙米饭',
    kcal: '542 kcal',
    protein: '38g 蛋白质',
    image: '/zheergan-healthy-meals/images/dish-10.webp',
  },
  {
    title: '柠檬蒜香鸡腿肉',
    kcal: '498 kcal',
    protein: '42g 蛋白质',
    image: '/zheergan-healthy-meals/images/dish-11.webp',
  },
  {
    title: '麻辣香锅素菜碗',
    kcal: '365 kcal',
    protein: '22g 蛋白质',
    image: '/zheergan-healthy-meals/images/dish-12.webp',
  },
];

function HomePage() {
  const [activeSection, setActiveSection] = useState('');
  const clickLockRef = useRef(0);

  useEffect(() => {
    const ids = ['pain', 'answer', 'agent', 'steps', 'pricing', 'trust', 'faq'];
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < clickLockRef.current) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-8% 0px -8% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const onScroll = () => {
      if (Date.now() < clickLockRef.current) return;
      if (window.scrollY < 120) setActiveSection('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <main className="site-shell">
      <div className="grain" aria-hidden="true" />
      <div className="global-blobs" aria-hidden="true">
        <span className="s-blob s-blob-1" />
        <span className="s-blob s-blob-2" />
        <span className="s-blob s-blob-3" />
      </div>
      <nav className="sub-nav is-visible" aria-label="页面模块导航">
        <div className="sub-nav-inner">
          <a
            href="#top"
            className={activeSection === '' ? 'is-active' : ''}
            onClick={(e) => {
              e.preventDefault();
              clickLockRef.current = Date.now() + 1500;
              setActiveSection('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            首页
          </a>
          {[
            { id: 'pain', label: '饮食痛点' },
            { id: 'answer', label: '食材溯源' },
            { id: 'agent', label: 'AI能力' },
            { id: 'steps', label: '怎么吃' },
            { id: 'pricing', label: '价格' },
            { id: 'trust', label: '口碑' },
            { id: 'faq', label: '常见问题' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'is-active' : ''}
              onClick={(e) => {
                e.preventDefault();
                clickLockRef.current = Date.now() + 1500;
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
const userBMI = (USER_PROFILE.weight / Math.pow(USER_PROFILE.height / 100, 2)).toFixed(1);
const allKcals = [1500, 1900, 2300];
const recommendedKcal = allKcals.reduce((b, k) => Math.abs(k - userTEE) < Math.abs(b - userTEE) ? k : b);
const weightDelta = ((recommendedKcal - userTEE) * 30) / 7700;
const weightLabel = weightDelta >= 0 ? `增重 ${Math.abs(weightDelta).toFixed(2)}` : `减重 ${Math.abs(weightDelta).toFixed(2)}`;

/* 聊天对话序列：身体数据 → 小折结论 → 食谱推荐 */
const chatSequence = [
  {
    role: 'user',
    text: `性别：${USER_PROFILE.gender}\n出生年月：${USER_PROFILE.birth}\n身高：${USER_PROFILE.height}cm\n体重：${USER_PROFILE.weight}kg\n身体活动水平：轻体力活动`,
  },
  {
    role: 'agent',
    text: `根据你的数据（BMI ${userBMI}，日耗 ${userTEE} kcal），\n推荐 ${recommendedKcal} kcal 规格，预计 ${weightLabel} kg。\n\n生成专属健康方案 →`,
  },
  {
    role: 'cards-30',
  },
];


// 三档套餐详情数据（模块级，供 HotChainHero 与 AgentSection 共用）
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

// 三个套餐的详情数据
const PLANS = {
  '1': {
    title: '体验装',
    sub: '¥228 起 · AI 定制 3 日餐单',
    hero: '/zheergan-healthy-meals/images/food-7.webp',
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
    hero: '/zheergan-healthy-meals/images/food-8.webp',
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
    hero: '/zheergan-healthy-meals/images/food-9.webp',
    days: 28,
    price: '¥1792', priceNum: '1792', priceDec: '',
    unit: '¥32.0',
    cycle: '28 天',
    suit: '追求长期体重管理者',
    taboo: '忌口/过敏可标记；如对特定坚果或海鲜过敏请咨询营养师。',
    desc: '¥1792，约 ¥32/餐，28 天 56 餐。含周计划全部，1 对 1 营养师咨询，体重体脂追踪，优先配送时段。',
  },
};
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
      <div className="hotchain-grid hotchain-grid--center max-frame">
        {/* ========== 品牌宣传区 ========== */}
        <RevealOnScroll variant="fadeUp" amount={0.1} className="hotchain-left hotchain-left--center">
          {/* 标题+描述 */}
          <div className="hotchain-hero-text">
            <h1
              className="hotchain-title hotchain-title--plain"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--fs-h1)',
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: '-0.01em',
              }}
            >
              你的身体数据，决定你每一餐
            </h1>
            <p className="hotchain-desc hotchain-desc--wide">
              告诉小折你的身体数据，它配好餐送到你手上
            </p>
          </div>

          {/* 按钮：照搬原 Hero 的下载按钮 */}
          <div className="hero-actions">
            <div className="download-btn-group">
              <a className="hero-dl-btn" href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk" target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5a1.5 1.5 0 0 0 3 0V19h2v3.5a1.5 1.5 0 0 0 3 0V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.96 5.96 0 0 0 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
                Android 下载
              </a>
              <div className="download-qr-pop">
                <img src="/zheergan-healthy-meals/images/qrcode.webp" alt="扫码下载" />
                <span>手机扫码下载</span>
              </div>
            </div>
            <div className="download-btn-group">
              <a className="hero-dl-btn" href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk" target="_blank" rel="noreferrer">
                <img src="/zheergan-healthy-meals/images/icon-apple.svg" alt="" style={{width:20,height:20,filter:'brightness(0) invert(1)'}} />
                iOS 下载
              </a>
              <div className="download-qr-pop">
                <img src="/zheergan-healthy-meals/images/qrcode.webp" alt="扫码下载" />
                <span>手机扫码下载</span>
              </div>
            </div>
          </div>

        </RevealOnScroll>

        {/* ========== 右栏：三张对话截图扇形排列 ========== */}
        <div className="hotchain-right">
          <div className="dialogue-fan">
            <img className="dialogue-img dialogue-img--left" src="/zheergan-healthy-meals/images/dialog-1.webp" alt="对话" />
            <img className="dialogue-img dialogue-img--mid" src="/zheergan-healthy-meals/images/dialog-2.webp" alt="对话" />
            <img className="dialogue-img dialogue-img--right" src="/zheergan-healthy-meals/images/dialog-3.webp" alt="对话" />
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
  { src: '/zheergan-healthy-meals/images/food/1.webp', tag: '低卡轻食 · 营养均衡' },
  { src: '/zheergan-healthy-meals/images/food/2.webp', tag: '鲜蔬蛋白 · 元气满满' },
  { src: '/zheergan-healthy-meals/images/food/3.webp', tag: '高蛋白餐 · 增肌优选' },
  { src: '/zheergan-healthy-meals/images/food/4.webp', tag: '抗氧化碗 · 活力一天' },
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
    </RevealOnScroll>
  );
}

const painPoints = [
  { keyword: '外卖重油重盐', tag: '饮食困境', desc: '吃完心里难受，罪恶感爆棚', image: '/zheergan-healthy-meals/images/pain-takeout.webp' },
  { keyword: '自己做费时费力', tag: '时间成本', desc: '买菜洗切炒刷碗，没时间也没精力', image: '/zheergan-healthy-meals/images/pain-headache.webp' },
  { keyword: '减脂餐难吃', tag: '恶性循环', desc: '坚持不过第三天，最后还是炸鸡奶茶兜底', image: '/zheergan-healthy-meals/images/pain-friedchicken.webp' },
];

function PainSplit() {
  const [activeImg, setActiveImg] = useState(0);
  const [direction, setDirection] = useState(1); /* 1=向下转入, -1=向上转出 */
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const wrapRef = useRef(null);

  const switchTo = (i) => {
    setDirection(i > activeImg ? 1 : -1);
    setActiveImg(i);
  };

  /* 只有区块进入视口时才轮播，省性能 */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* 自动轮播：3.5s 切一张，鼠标悬停/减动偏好时暂停 */
  useEffect(() => {
    if (paused || !inView) return;
    if (typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveImg((prev) => (prev + 1) % painPoints.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [paused, inView]);

  return (
    <div
      className="pain-split"
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pain-split-left">
        <div className="pain-split-stage">
          {painPoints.map((point, i) => (
            <div
              key={point.keyword}
              className={`pain-split-slide${i === activeImg ? ' is-active' : ''}${direction > 0 ? ' slide-down' : ' slide-up'}`}
            >
              <img src={point.image} alt={point.desc} loading="eager" />
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
          每天三顿饭，三件烦心事
        </h2>
        <PainSplit />
      </RevealOnScroll>
    </section>
  );
}


const answerVisuals_old = [
  {
    src: '/zheergan-healthy-meals/images/answer-nutrition.webp',
    alt: '营养均衡的健康碗 — 蛋白质、碳水、脂肪已配平',
    caption: '算法替你算好热量',
  },
  {
    src: '/zheergan-healthy-meals/images/answer-chef.webp',
    alt: '商家主厨调味的健康餐 — 好吃才能坚持',
    caption: '主厨替你管好味道',
  },
  {
    src: '/zheergan-healthy-meals/images/answer-delivery.webp',
    alt: '保温箱送到门口的健康餐 — 开盖热气扑脸',
    caption: '骑手替你保温送到',
  },
];

function AnswerSection() {
  return (
    <section
      className="story-section story-answer section-panel panel-cream"
      id="answer"
    >
      <div className="story-inner story-answer-inner" aria-label="食材溯源">
        <div className="ingredient-head">
          <RevealOnScroll variant="fadeIn" amount={0.1}>
            <h2 style={{ color: '#000000' }}>
              你吃的每一口
              <br />
              都有来处
            </h2>
            <p>每一份食材标明产地、供应商，来源透明。</p>
          </RevealOnScroll>
        </div>
        <div className="ingredient-grid">
          {[
            {
              img: '/zheergan-healthy-meals/images/salad.webp',
              name: '新鲜蔬果',
              desc: '当日直采·不囤货',
              source: '餐厅当天采购、当天使用',
            },
            {
              img: '/zheergan-healthy-meals/images/quinoa.webp',
              name: '优质杂粮',
              desc: '产地直供·可溯源',
              source: '源头可查，品质稳定',
            },
            {
              img: '/zheergan-healthy-meals/images/tuna.webp',
              name: '海鲜蛋奶',
              desc: '冷链直达·每日到货',
              source: '当天到货、当天使用',
            },
            {
              img: '/zheergan-healthy-meals/images/chicken.webp',
              name: '新鲜肉类',
              desc: '资质定期复查',
              source: '正规屠场宰杀，可追溯',
            },
          ].map((item, i) => (
            <RevealOnScroll key={item.name} delay={i * 0.08} amount={0.1} variant="popUp">
              <article className="ingredient-card split">
                <div className="ingredient-img">
                  <img src={item.img} alt={item.name} loading="lazy" />
                </div>
                <div className="ingredient-body">
                  <h4 className="ingredient-name">{item.name}</h4>
                  <span className="ingredient-desc">{item.desc}</span>
                  <div className="ingredient-nutri">
                    <span className="ingredient-nutri-label">来源说明</span>
                    <p>{item.source}</p>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
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
    title: '听懂身体',
    desc: '你告诉它性别、年龄、身高、体重、活动量——它算出你每天该吃多少热量。不是猜，是算。',
  },
  {
    icon: Activity,
    title: '看懂BMI',
    desc: '用 BMI 判定增重还是减重，方案数据说了算。',
  },
  {
    icon: RefreshCw,
    title: '动态调整',
    desc: '瘦了5斤？在档案页更新体重，小折推荐自动同步。',
  },
  {
    icon: MessageSquareText,
    title: '直接回答',
    desc: '像真人助理，问什么答什么，不绕弯。',
  },
];

function AgentSection() {
  const [chatTimes] = useState(() => {
    const fmt = (d) =>
      d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
    const base = new Date();
    return [6, 4].map((m) => {
      const d = new Date(base.getTime() - m * 60 * 1000);
      return fmt(d);
    });
  });

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
        <div className="agent-split">
          <div className="agent-left">
            <h2 className="agent-title"><SplitText>能对话，就能吃对</SplitText></h2>
            <p className="agent-lede"><SplitText stagger={0.012}>
              折耳根 AI 不只是聊天。从听懂身体到直接回答，它把"吃什么"全程接管。
            </SplitText></p>
          </div>
          <div className="agent-body">
          <aside className="agent-aside">
            <RevealOnScroll variant="fadeIn" amount={0.1} className="chat-card-shell">
              <div className="chat-card">
                <div className="chat-topbar">
                  <div className="chat-topbar-info chat-topbar-info--center">
                    <span className="chat-name">折耳根小助手</span>
                    <span className="chat-status"></span>
                  </div>
                </div>

                <div className="chat-messages">
                  <div className="chat-msg chat-msg--user chat-msg--pop">
                    <div className="chat-msg-main">
                      <div className="chat-bubble chat-bubble--user">
                        女，26岁，身高165，体重60，平时坐办公室。
                      </div>
                      <span className="chat-msg-time">{chatTimes[0]}</span>
                    </div>
                  </div>

                  <div className="chat-msg chat-msg--ai chat-msg--pop">
                    <div className="chat-msg-main">
                      <div className="chat-bubble chat-bubble--ai">
                        收到。BMI 22.0，正常范围；每天建议摄入约 1650 kcal。
                      </div>
                    </div>
                  </div>

                  <div className="chat-msg chat-msg--user chat-msg--pop">
                    <div className="chat-msg-main">
                      <div className="chat-bubble chat-bubble--user">
                        有什么推荐的健康餐吗？
                      </div>
                      <span className="chat-msg-time">{chatTimes[1]}</span>
                    </div>
                  </div>

                  <div className="chat-msg chat-msg--ai chat-msg--pop">
                    <div className="chat-msg-main">
                      <div className="chat-bubble chat-bubble--ai">
                        推荐 7 天周计划，1500 kcal 规格。想看看详细餐单吗？
                      </div>
                    </div>
                  </div>
                  <div className="chat-msg chat-msg--ai chat-msg--pop">
                    <div className="chat-meal-cards">
                      <button className="chat-meal-card-standalone" aria-label="查看七日营养餐食谱详情">
                        <img src="/zheergan-healthy-meals/images/food-8.webp" alt="周计划" />
                        <div className="chat-meal-card-standalone-body">
                          <strong>周计划</strong>
                          <span>最划算 · 每周口味调优</span>
                          <div className="chat-meal-card-standalone-tags">
                            <span className="chat-meal-price-tag">¥476</span>
                            <span className="chat-meal-day-tag">7 天</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                </div>

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
              </div>
            </RevealOnScroll>
          </aside>
          <div className="agent-mini-grid">
            {agentCaps.map((cap, i) => {
              const I = cap.icon;
              return (
                <article key={cap.title} className="agent-mini-card">
                  <span className="agent-mini-icon"><I /></span>
                  <h4>{cap.title}</h4>
                  <p>{cap.desc}</p>
                </article>
              );
            })}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { no: '01', title: '填数据', desc: '性别、年龄、身高、体重、活动量——填一次，有变化才改。', image: '/zheergan-healthy-meals/images/dialog-1.webp' },
  { no: '02', title: '小折配餐', desc: '匹配偏好，确认执行，不用算，不用选，不用纠结。', image: '/zheergan-healthy-meals/images/dialog-2.webp' },
  { no: '03', title: '热链送达', desc: '每日现做，准时送达，入口新鲜。', image: '/zheergan-healthy-meals/images/dialog-3.webp' },
];

function StepsSection() {
  const [activeStep, setActiveStep] = useState(0);
  const blockRefs = useRef([]);
  const sectionRef = useRef(null);
  const activeRef = useRef(0);

  /* 滚动驱动（方案A，支持双向滚动）：哪一步的文字块离屏幕正中央最近，
     就显示对应的图。上滚、下滚都会实时重算，不会卡在某一张。 */
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const section = sectionRef.current;
      const blocks = blockRefs.current;
      if (!section || !blocks.length) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const center = vh / 2;

      // 选「中心离屏幕正中央最近」的那一步作为当前步（上滚下滚都适用）
      let best = 0;
      let bestDist = Infinity;
      blocks.forEach((b, i) => {
        if (!b) return;
        const r = b.getBoundingClientRect();
        const blockCenter = r.top + r.height / 2;
        const dist = Math.abs(blockCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveStep(best);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* 同步当前步到 ref，供滚轮劫持读取最新值 */
  useEffect(() => {
    activeRef.current = activeStep;
  }, [activeStep]);

  /* 滚动劫持：切到 02 时锁住页面不滚动，向下滚动累积到阈值才切到 03，
     切到 03 后释放，页面恢复正常向下滑动。仅桌面端生效。 */
  useEffect(() => {
    let accum = 0;
    const isMobile = () => window.matchMedia('(max-width: 900px)').matches;
    const onWheel = (e) => {
      if (isMobile()) return;
      // 仅在显示 02 且继续向下滚时劫持
      if (activeRef.current === 1 && e.deltaY > 0) {
        e.preventDefault();
        accum += e.deltaY;
        if (accum >= 160) {
          accum = 0;
          setActiveStep(2);
        }
      } else {
        accum = 0;
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="story-section story-steps section-panel panel-cream"
      id="steps"
      aria-label="使用流程"
    >
      <div className="story-inner steps-sticky-layout">
        {/* 标题 */}
        <div className="steps-new-head">
          <h2>三步，每天准时开饭</h2>
          <p className="steps-new-sub">填一次数据、确认偏好、准时就餐——把吃饭这件麻烦事，交给小折全程托管。</p>
        </div>

        {/* 左栏滚动步骤 + 右栏钉住手机图 */}
        <div className="steps-scroll-wrap">
          <div className="steps-scroll-left">
            {steps.map((step, i) => (
              <div
                key={step.no}
                ref={(el) => (blockRefs.current[i] = el)}
                data-idx={i}
                className={`steps-scroll-block${i === activeStep ? ' is-active' : ''}`}
              >
                <div className="steps-new-text">
                  <div className="steps-title-row">
                    <span className="steps-new-no">{step.no}</span>
                    <h3>{step.title}</h3>
                  </div>
                  <p>{step.desc}</p>
                </div>
                {/* 移动端：每步下方直接带一张图（成对展示） */}
                <div className="steps-mobile-phone">
                  <img src={step.image} alt={`${step.title}示意`} width="240" height="496" loading="lazy" decoding="async" />
                </div>
              </div>
            ))}
          </div>

          {/* 右栏：sticky 钉住的图片，随滚动切换 */}
          <div className="steps-sticky-right">
            <div className="steps-sticky-phone">
              {steps.map((step, i) => (
                <div
                  key={step.no}
                  className={`steps-slide${i === activeStep ? ' is-active' : ''}`}
                  aria-hidden={i !== activeStep}
                >
                  <img src={step.image} alt={`${step.title}示意`} width="300" height="620" loading="lazy" decoding="async" />
                </div>
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
  { name: '3天尝鲜', price: 228, per: '≈¥38/餐', spec: '3天·6餐', cta: '试3天' },
  { name: '7天周计划', price: 476, per: '≈¥34/餐', spec: '7天·14餐', cta: '最划算', hot: true },
  { name: '28天月计划', price: 1792, per: '≈¥32/餐', spec: '28天·56餐', cta: '深度定制' },
];

function PricingInline() {
  return (
    <section className="story-section section-panel panel-cream" id="pricing" aria-label="价格">
      <div className="story-inner" style={{ paddingBottom: '80px', width: 'min(1320px, calc(100% - 40px))' }}>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-h2)', fontWeight: 680, textAlign: 'center', marginBottom: '20px' }}>
          一顿外卖的价，吃定制健康餐
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--ink-body)', fontSize: '18px', margin: '0 0 44px' }}>
          订得越长，单餐越省。
        </p>
        <div className="price-grid-inline" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px', margin: '0 auto', alignItems: 'stretch' }}>
          {pricingPlans.map((plan, i) => (
            <RevealOnScroll key={plan.name} delay={i * 0.12} amount={0.1} variant="scaleIn" style={{ height: '100%' }}>
              <article
              style={{
                display: 'flex', flexDirection: 'column', padding: 'clamp(24px, 3vw, 40px) clamp(24px, 3.5vw, 60px) 38px', height: '100%',
                border: '1px solid rgba(43,31,20,0.06)',
                borderRadius: 'var(--r-2xl)',
                background: '#ffffff',
                boxShadow: plan.hot
                  ? '0 26px 68px rgba(5,150,105,0.16)'
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
                  <span style={{ display: 'block', marginTop: '10px', color: '#000', fontSize: '15px' }}>{plan.spec}</span>
                </div>
              </div>
              <div style={{ marginTop: '20px', padding: '16px 0', borderTop: '1px solid var(--line-cream)', color: 'var(--ink-body)', fontSize: '15px', lineHeight: 1.6 }}>
                  <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'var(--ink-cream)' }}>每份餐均含：</p>
                  <p style={{ margin: '0 0 4px' }}>✓ AI 定制餐单</p>
                  <p style={{ margin: '0' }}>✓ 热链配送到手</p>
                </div>
              <div className="download-btn-group" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
                <a
                  href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk" target="_blank" rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: '54px', padding: '14px 26px', borderRadius: '999px',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.55)',
                    background: 'linear-gradient(135deg, rgba(110,231,183,0.85), rgba(5,150,105,0.9))',
                    fontWeight: 700, fontSize: '16px', textDecoration: 'none',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 16px 38px rgba(5,150,105,0.3)',
                  }}
                >
                  {plan.cta}
                </a>
                <div className="download-qr-pop">
                  <img src="/zheergan-healthy-meals/images/qrcode.webp" alt="扫码下载" />
                  <span>手机扫码下载</span>
                </div>
              </div>
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
    <section className="story-section story-trust trust-dark" id="trust" aria-label="口碑">
<RevealOnScroll variant="fadeUp" amount={0.1} className="story-inner story-trust-inner">
        <div className="trust-head">
          <h2>
            <SplitText>12万+人，<span>已经换了种方式吃饭</span></SplitText>
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
    q: 'AI怎么算出我该吃多少？',
    a: '你告诉它性别、年龄、身高、体重和活动量，小折帮你算出每天该吃多少热量——这不是猜的，是基于你的真实数据算出来的。然后根据你的口味偏好和饮食目标，匹配最适合你的餐。你确认，餐送到手。',
  },
  {
    q: '配送范围覆盖哪些城市？',
    a: '目前已覆盖上海、北京、深圳、杭州、成都的主城区，并在持续拓展。下单前App会根据你的收货地址自动校验能否送达。',
  },
  {
    q: '能看到每餐的热量和营养成分吗？',
    a: '当然能。每份餐都标注了热量、蛋白质、碳水和脂肪含量，App里还能按天查看三大营养素占比，比你自己做笔记还清楚。',
  },
  {
    q: '配送怎么保证到手还是热的？',
    a: '合作餐厅现做后直接装入保温箱，由骑手专送，到手中心温度≥60℃，开盖即食，不用微波炉加热。冷天配送有保温袋，确保你拿到的每一餐都是烫的。',
  },
  {
    q: '吃这个真的能瘦/增重吗？',
    a: '取决于你实际摄入与消耗的热量差。小折推荐的热量是基于你的TEE和BMI算出来的——选低于TEE的规格会减重，选高于TEE的规格会增重。但长期效果也取决于你每餐是否按时吃、中间有没有额外加餐或漏餐。小折会按你选的方案持续推进，你吃满一个周期，效果自然看得到。',
  },
];

function FaqSection() {
  const [openSet, setOpenSet] = useState([]);
  return (
    <section className="faq section-panel panel-cream" id="faq" aria-label="常见问题">
      <div className="story-inner faq-inner">
        <div className="faq-split">
          <div className="faq-head">
            <h2 className="faq-title"><SplitText>常见问题</SplitText></h2>
            <p className="faq-sub"><SplitText stagger={0.012}>关于配送、热量、效果，这里回答了你能想到的</SplitText></p>
          </div>
          <ul className="faq-list">
            {faqs.map((item, i) => {
              const open = openSet.includes(i);
              return (
                <RevealOnScroll key={item.q} delay={i * 0.06} amount={0.08} variant="fadeIn">
                  <li className={`faq-item${open ? ' is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-q-row"
                      aria-expanded={open}
                      onClick={() =>
                        setOpenSet((prev) =>
                          open ? prev.filter((x) => x !== i) : [...prev, i]
                        )
                      }
                    >
                      <span className="faq-q">{item.q}</span>
                      <ChevronDown className="faq-chevron" size={20} />
                    </button>
                    <div className="faq-a-wrap">
                      <span className="faq-a">{item.a}</span>
                    </div>
                  </li>
                </RevealOnScroll>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

const downloadPlatforms = [
  { img: '/zheergan-healthy-meals/images/icon-win.svg', label: 'Windows', dl: '点击下载 Windows 版' },
  { img: '/zheergan-healthy-meals/images/icon-apple.svg', label: 'Mac OS', dl: '点击下载 Mac 版' },
  { img: '/zheergan-healthy-meals/images/icon-phone.svg', label: '手机', qr: '/zheergan-healthy-meals/images/qrcode-dl.webp' },
  { img: '/zheergan-healthy-meals/images/icon-tablet.svg', label: '平板', qr: '/zheergan-healthy-meals/images/qrcode-dl.webp' },
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
          <a href="#/company">公司简介</a>
          <span className="footer-new-sep">|</span>
          <a href="/zheergan-healthy-meals/隐私政策.html" target="_blank" rel="noopener">隐私政策</a>
          <span className="footer-new-sep">|</span>
          <a href="/zheergan-healthy-meals/用户协议.html" target="_blank" rel="noopener">用户协议</a>
        </div>
        {/* 下层:版权区 */}
        <div className="footer-new-copy">
          <span>京公网安备 11000002002061号</span>
          <span>京ICP备2020042663号</span>
          <span>京网文[2026]2102-100号</span>
          <span>©2026 Ergen 折耳根健康餐</span>
        </div>
      </RevealOnScroll>
    </footer>
  );
}

function App() {
  const route = useRoute();
  if (route === 'company') return <CompanyPage />;
  return <HomePage />;
}

createRoot(document.getElementById('root')).render(<App />);
