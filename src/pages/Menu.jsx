import React, { useState } from 'react';
import {
  Apple,
  ArrowUp,
  Flame,
  Sparkles,
  Utensils,
} from 'lucide-react';
import ShinyText from '../components/ShinyText';
import './features.css';
import './menu.css';

/* ================================================================
   今日餐单页 — 本周在售餐品全览 + 标签筛选
   路由:#/menu(hash 路由,见 main.jsx)
   菜品数据口径:kcal / 蛋白质与 App 内餐单一致
   ================================================================ */

const dishes = [
  {
    no: '01',
    title: '烟熏三文鱼平衡碗',
    desc: '挪威三文鱼低温烟熏,配三色藜麦、牛油果与溏心蛋,Omega-3 与优质蛋白一碗配齐。',
    kcal: 486,
    protein: 36,
    tag: '高蛋白',
    featured: false,
    image: '/zheergan-healthy-meals/images/salmon.jpg',
  },
  {
    no: '02',
    title: '柑香鸡肉谷物碗',
    desc: '橙皮腌制鸡腿肉炙烤出焦边,配三色糙米与烤时蔬,是本周复购率最高的一道。',
    kcal: 532,
    protein: 42,
    tag: '本周主推',
    featured: true,
    image: '/zheergan-healthy-meals/images/chicken.jpg',
  },
  {
    no: '03',
    title: '牛油果绿蔬蛋碗',
    desc: '牛油果、羽衣甘蓝与水波蛋,南瓜籽点缀,轻负担但饱腹感在线。',
    kcal: 418,
    protein: 28,
    tag: '低卡',
    featured: false,
    image: '/zheergan-healthy-meals/images/avocado.jpg',
  },
  {
    no: '04',
    title: '藜麦能量碗',
    desc: '三色藜麦打底,烤鹰嘴豆与当季根茎蔬菜,膳食纤维一餐达标 60%。',
    kcal: 462,
    protein: 24,
    tag: '高纤维',
    featured: false,
    image: '/zheergan-healthy-meals/images/quinoa.jpg',
  },
  {
    no: '05',
    title: '田园时蔬沙拉',
    desc: '十二种时蔬每日直采,油醋汁另附,想清淡的那天就选它。',
    kcal: 320,
    protein: 18,
    tag: '轻食',
    featured: false,
    image: '/zheergan-healthy-meals/images/salad.jpg',
  },
  {
    no: '06',
    title: '金枪鱼波奇碗',
    desc: '生食级金枪鱼配寿司米与海苔脆,冷链锁鲜直达(全站唯一冷食,标注清楚)。',
    kcal: 508,
    protein: 38,
    tag: '高蛋白',
    featured: false,
    image: '/zheergan-healthy-meals/images/tuna.jpg',
  },
];

const filters = ['全部', '本周主推', '高蛋白', '低卡', '高纤维', '轻食'];

export default function MenuPage() {
  const [active, setActive] = useState('全部');
  const shown = active === '全部' ? dishes : dishes.filter((d) => d.tag === active);

  return (
    <main className="features-page menu-page">
      {/* 玻璃导航 */}
      <header className="features-nav">
        <div className="features-nav-inner max-frame">
          <a className="brand" href="#/" aria-label="折耳根健康餐 · 返回首页">
            <span className="brand-mark">
              <img
                src="/zheergan-healthy-meals/brand-icon.jpg"
                alt="折耳根"
                className="brand-icon-img"
              />
            </span>
            <span>折耳根健康餐</span>
          </a>
          <nav className="nav-links" aria-label="主导航">
            <a href="#/">首页</a>
            <a href="#/features">功能介绍</a>
            <a href="#/pricing">价格方案</a>
            <a href="#/menu" className="is-active" aria-current="page">今日餐单</a>
            <a href="#download">下载 App</a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="features-hero menu-hero" aria-label="本周餐单总览">
        <div className="features-hero-blobs" aria-hidden="true">
          <span className="f-blob f-blob-1" />
          <span className="f-blob f-blob-2" />
          <span className="f-blob f-blob-3" />
        </div>

        <div className="menu-hero-inner max-frame">
          <span className="section-kicker">
            <Utensils size={16} />
            本周餐单 · 每周一焕新
          </span>
          <h1>
            <ShinyText
              text="每周焕新,"
              color="#1b1d15"
              shineColor="#c2611f"
              speed={3}
              spread={120}
              direction="left"
            />
            <ShinyText
              text="把食欲交给厨师。"
              color="#1b1d15"
              shineColor="#3f7d4e"
              speed={3}
              spread={120}
              direction="left"
              className="menu-hero-line-2"
            />
          </h1>
          <p className="menu-hero-lede">
            38+ 道由营养师与主厨共同设计的健康餐,按你的热量目标与口味偏好轮换上新。本页为本周在售精选,完整餐单在 App 内按你的目标定制。
          </p>

          {/* 标签筛选 */}
          <div className="menu-filters" role="group" aria-label="按标签筛选餐品">
            {filters.map((f) => (
              <button
                type="button"
                key={f}
                className={`menu-filter-chip${active === f ? ' is-on' : ''}`}
                aria-pressed={active === f}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 餐品网格 ── */}
      <section className="m-dishes" aria-label="本周在售餐品">
        <div className="m-dish-grid max-frame">
          {shown.map((dish) => (
            <article
              className={`m-dish${dish.featured ? ' m-dish--featured' : ''}`}
              key={dish.no}
            >
              <div className="m-dish-media">
                <img src={dish.image} alt={dish.title} loading="lazy" />
                <span className={`m-dish-tag${dish.featured ? ' m-dish-tag--hot' : ''}`}>
                  {dish.tag}
                </span>
                <span className="m-dish-no">{dish.no}</span>
              </div>
              <div className="m-dish-info">
                <h2>{dish.title}</h2>
                <p>{dish.desc}</p>
                <div className="m-dish-meta">
                  <span className="m-dish-kcal">
                    <Flame size={14} aria-hidden="true" />
                    {dish.kcal} kcal
                  </span>
                  <span className="m-dish-protein">{dish.protein}g 蛋白质</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {shown.length === 0 && (
          <p className="m-dish-empty max-frame">这个标签下本周暂无餐品,看看别的分类吧。</p>
        )}

        <p className="m-dish-note max-frame">
          <Sparkles size={14} aria-hidden="true" />
          实际可订餐品以 App 内你的定制餐单为准——算法会按你的热量目标与忌口自动过滤。
        </p>
      </section>

      {/* ── 底部 CTA ── */}
      <section className="f-cta" aria-label="下载引导">
        <div className="f-cta-inner max-frame">
          <h2>
            看饿了?
            <span>让算法帮你排进本周。</span>
          </h2>
          <p>下载 App 设置口味与目标,这些菜会按你的热量区间自动出现在你的餐单里。</p>
          <a className="f-cta-button" href="#download">
            <Apple size={20} />
            下载 App 订餐
          </a>
        </div>
      </section>

      {/* ── 页脚 ── */}
      <footer className="features-footer" aria-label="页脚">
        <div className="max-frame features-footer-inner">
          <a className="brand" href="#/" aria-label="折耳根健康餐">
            <span className="brand-mark">
              <img
                src="/zheergan-healthy-meals/brand-icon.jpg"
                alt="折耳根"
                className="brand-icon-img"
              />
            </span>
            <span>折耳根健康餐</span>
          </a>
          <div className="features-footer-links">
            <a href="#/">首页</a>
            <a href="#/features">功能介绍</a>
            <a href="#/pricing">价格方案</a>
            <a href="#download">下载 App</a>
          </div>
          <span className="features-footer-copy">好好吃饭,也可以很轻松。© 2026 折耳根健康餐</span>
          <a
            className="features-footer-top"
            href="#/menu"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            回到顶部
            <ArrowUp size={15} />
          </a>
        </div>
      </footer>
    </main>
  );
}
