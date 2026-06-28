import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Apple,
  ArrowDownRight,
  Clock3,
  Leaf,
  QrCode,
  ScanLine,
  Sparkles,
  Star,
  Truck,
  Utensils,
} from 'lucide-react';
import GradualBlur from './components/GradualBlur';
import StarBorder from './components/StarBorder';
import Galaxy from './components/Galaxy';
import './styles.css';

const meals = [
  {
    title: 'Smoked Salmon Balance',
    kcal: '486 kcal',
    protein: '36g protein',
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1400&q=85',
  },
  {
    title: 'Citrus Chicken Grain Bowl',
    kcal: '532 kcal',
    protein: '42g protein',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=85',
  },
  {
    title: 'Avocado Greens & Eggs',
    kcal: '418 kcal',
    protein: '28g protein',
    image:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1400&q=85',
  },
];

const metrics = [
  { value: '15min', label: '最快送达' },
  { value: '38+', label: '本周餐单' },
  { value: '4.9', label: 'App 评分' },
];

function App() {
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
      <Hero />
      <DownloadSection />
      <PageBottomBlur />
    </main>
  );
}

function Hero() {
  return (
    <section className="hero section-panel" aria-label="健康餐 App 首页">
      <div className="texture" />
      <header className="nav max-frame">
        <a className="brand" href="#top" aria-label="折耳根健康餐">
          <span className="brand-mark">
            <Leaf size={18} strokeWidth={2.2} />
          </span>
          <span>折耳根健康餐</span>
        </a>
        <nav className="nav-links" aria-label="主导航">
          <a href="#menu">今日餐单</a>
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
            好好吃饭，
            <span>也可以很轻松。</span>
          </h1>
          <p className="hero-lede">
            折耳根健康餐是一款面向城市日常的健康餐配送 App。把热量、蛋白质、口味偏好和配送节奏整合起来，让每一天的健康饮食更稳定、更省心，也更有食欲。
          </p>

          <div className="hero-actions">
            <StarBorder as="a" className="primary-button" color="#d5ff66" speed="5s" href="#download">
              下载体验
              <ArrowDownRight size={18} />
            </StarBorder>
            <StarBorder as="a" className="secondary-button" color="#8fffc2" speed="7s" href="#menu">
              浏览本周餐单
            </StarBorder>
          </div>

          <div className="metric-row" aria-label="产品指标">
            {metrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" id="menu" aria-label="菜品与应用界面展示">
          <div className="plate-orbit">
            {meals.map((meal, index) => (
              <article className={`meal-card meal-card-${index + 1}`} key={meal.title}>
                <img src={meal.image} alt={meal.title} />
                <div>
                  <h2>{meal.title}</h2>
                  <p>
                    {meal.kcal} / {meal.protein}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="phone-mockup" aria-label="手机端应用界面概览">
            <div className="phone-bar">
              <span>09:41</span>
              <span className="signal-dot" />
            </div>
            <div className="app-top">
              <div>
                <span>Today</span>
                <strong>今日轻食</strong>
              </div>
              <div className="avatar">折</div>
            </div>
            <div className="hero-dish">
              <img src={meals[1].image} alt="Citrus chicken grain bowl" />
              <div className="dish-badge">
                <Star size={13} fill="currentColor" />
                97% 适配
              </div>
            </div>
            <div className="macro-panel">
              <span>蛋白质 42g</span>
              <span>碳水 48g</span>
              <span>脂肪 16g</span>
            </div>
            <div className="route-card">
              <Truck size={18} />
              <div>
                <strong>骑手即将送达</strong>
                <span>11:55 - 12:10 / 保鲜餐盒</span>
              </div>
            </div>
            <div className="menu-strip">
              <img src={meals[0].image} alt="Smoked salmon balance" />
              <img src={meals[2].image} alt="Avocado greens and eggs" />
              <div className="plus-tile">+8</div>
            </div>
          </div>

          <div className="floating-chip chip-one">
            <Clock3 size={16} />
            午餐已锁定
          </div>
          <div className="floating-chip chip-two">
            <Utensils size={16} />
            营养已配平
          </div>
        </div>
      </div>
    </section>
  );
}

function DownloadSection() {
  return (
    <section className="download section-panel" id="download" aria-label="下载健康餐 App">
      <div className="download-bg" />
      <div className="download-grid max-frame">
        <div className="download-copy">
          <span className="section-kicker">
            <ScanLine size={16} />
            开始你的第一周健康餐
          </span>
          <h2>把下一餐，交给折耳根健康餐。</h2>
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

function PageBottomBlur() {
  return (
    <GradualBlur
      target="page"
      position="bottom"
      height="11rem"
      strength={2.4}
      divCount={8}
      curve="bezier"
      exponential
      opacity={1}
      zIndex={80}
      className="page-bottom-gradual-blur"
    />
  );
}

createRoot(document.getElementById('root')).render(<App />);
