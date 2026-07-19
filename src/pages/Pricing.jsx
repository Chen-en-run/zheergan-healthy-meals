import React from 'react';
import {
  ArrowUp,
  Check,
  PauseCircle,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react';
import ShinyText from '../components/ShinyText';
import './features.css';
import './pricing.css';

/* ================================================================
   价格方案页 — 三档订购 + 保障说明
   路由:#/pricing(hash 路由,见 main.jsx)
   定价与首页 FAQ「单餐 32–45 元」口径一致
   ================================================================ */

const plans = [
  {
    id: 'trial',
    name: '体验装',
    tag: '先试试口味',
    price: 228,
    per: '¥38 / 餐',
    spec: '3 天 · 6 餐(午 + 晚)',
    feats: [
      '算法定制 3 日餐单',
      '午晚双餐热链配送',
      '忌口与过敏原标记',
      '随时暂停 · 无违约金',
    ],
    cta: '试 3 天',
  },
  {
    id: 'weekly',
    name: '周计划',
    tag: '最多人选',
    hot: true,
    price: 476,
    per: '¥34 / 餐',
    spec: '7 天 · 14 餐(午 + 晚)',
    feats: [
      '含体验装全部内容',
      '每周口味学习调优',
      '营养师周报:热量·蛋白达成',
      '免配送费',
    ],
    cta: '开始你的第一周',
  },
  {
    id: 'monthly',
    name: '月计划',
    tag: '更深定制',
    price: 1792,
    per: '¥32 / 餐',
    spec: '28 天 · 56 餐(午 + 晚)',
    feats: [
      '含周计划全部内容',
      '1 对 1 营养师目标咨询',
      '体重 / 体脂目标追踪',
      '优先配送时段',
    ],
    cta: '按月订购',
  },
];

const assurances = [
  { icon: PauseCircle, title: '随时暂停', desc: '出差休假,App 里一键暂停或跳过某几天' },
  { icon: Wallet, title: '餐费保留', desc: '未配送的餐费全额保留,想吃再约' },
  { icon: ShieldCheck, title: '零违约金', desc: '取消不收任何费用,不玩套路' },
];

export default function PricingPage() {
  return (
    <main className="features-page pricing-page">
      {/* 玻璃导航:与功能页共用样式 */}
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
            <a href="#/pricing" className="is-active" aria-current="page">价格方案</a>
            <a href="#/menu">每月餐单</a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="features-hero pricing-hero" aria-label="价格总览">
        <div className="features-hero-blobs" aria-hidden="true">
          <span className="f-blob f-blob-1" />
          <span className="f-blob f-blob-2" />
          <span className="f-blob f-blob-3" />
        </div>

        <div className="pricing-hero-inner max-frame">
          <span className="section-kicker">
            <Sparkles size={16} />
            价格方案
          </span>
          <h1>
            <ShinyText
              text="好好吃饭,"
              color="#2b1f14"
              shineColor="#c2611f"
              speed={3}
              spread={120}
              direction="left"
            />
            <ShinyText
              text="其实没那么贵。"
              color="#2b1f14"
              shineColor="#e88a4a"
              speed={3}
              spread={120}
              direction="left"
              className="pricing-hero-line-2"
            />
          </h1>
          <p className="pricing-hero-lede">
            单餐 32–45 元,和一顿普通外卖差不多——但算法定制、商家主厨现做、热链到手。按周订更省,随时暂停不扣钱。
          </p>
        </div>
      </section>

      {/* ── 三档方案 ── */}
      <section className="price-section" aria-label="订购方案">
        <div className="price-grid max-frame">
          {plans.map((plan) => (
            <article
              className={`price-card${plan.hot ? ' price-card--hot' : ''}`}
              key={plan.id}
              aria-label={`${plan.name} ${plan.spec}`}
            >
              <span className={`price-tag${plan.hot ? ' price-tag--hot' : ''}`}>{plan.tag}</span>

              <div className="price-head">
                <h2>{plan.name}</h2>
                <div className="price-figure">
                  <span className="price-currency">¥</span>
                  <strong>{plan.price}</strong>
                </div>
                <span className="price-per">{plan.per}</span>
                <span className="price-spec">{plan.spec}</span>
              </div>

              <ul className="price-feats">
                {plan.feats.map((f) => (
                  <li key={f}>
                    <Check size={16} aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                className={plan.hot ? 'price-cta price-cta--hot' : 'price-cta'}
                href="#download"
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>

        <p className="price-note max-frame">
          价格已含包装与配送 · 现覆盖上海 · 北京 · 深圳 · 杭州 · 成都主城区,下单前 App 会自动校验收货地址能否送达。
        </p>
      </section>

      {/* ── 保障条 ── */}
      <section className="assure-section" aria-label="订购保障">
        <div className="assure-strip max-frame">
          {assurances.map((item) => {
            const Icon = item.icon;
            return (
              <div className="assure-chip" key={item.title}>
                <span className="assure-icon">
                  <Icon size={22} />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 页脚(与功能页共用样式) ── */}
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
            <a href="#/menu">每月餐单</a>
            <a href="#faq">常见问题</a>
          </div>
          <span className="features-footer-copy">和一顿外卖差不多的钱,换算法定制 + 热链到手。© 2026 折耳根健康餐</span>
          <a
            className="features-footer-top"
            href="#/pricing"
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
