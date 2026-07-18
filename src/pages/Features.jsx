import React from 'react';
import {
  ArrowUp,
  BarChart3,
  ChefHat,
  ShieldCheck,
  Sparkles,
  Target,
  Thermometer,
} from 'lucide-react';
import ShinyText from '../components/ShinyText';
import './features.css';

/* ================================================================
   功能介绍页 — 折耳根健康餐的核心能力展开说明
   路由:#/features(hash 路由,见 main.jsx)
   ================================================================ */

const sections = [
  {
    id: 'profile',
    no: '01',
    icon: Target,
    title: '设定你的身体档案',
    subtitle: '告诉算法你是谁',
    body: '输入身高、体重、目标(减脂/增肌/维持)和日常活动强度。算法用同一个底层公式——TDEE = BMR × PAL——推你的每日总消耗。比如一位 65kg 轻体力活动者,BMR 约 1500 kcal,乘 PAL 1.55,每日大约需要 2325 kcal,折合每公斤约 35.8 kcal。这个数字,就是你所有餐单的起点。',
    highlights: [
      { label: 'BMR 估算', value: '基于身高·体重·年龄,算出你的静息代谢' },
      { label: 'PAL 匹配', value: '轻体力 1.55 / 中等 1.78 / 高强度 2.10,五档可选' },
      { label: '过敏与忌口', value: '海鲜·坚果·乳糖·香菜等 28 项可标记,自动避开' },
    ],
    image: '/zheergan-healthy-meals/images/answer-nutrition.jpg',
    imageAlt: '在 App 中设置营养目标的界面示意',
  },
  {
    id: 'engine',
    no: '02',
    icon: BarChart3,
    title: '智能配餐引擎',
    subtitle: '算出消耗,配平每一餐',
    body: '拿到你的 TDEE 后,引擎从合作商家的健康餐中筛选,按「热量匹配度 → 蛋白质达标率 → 口味吻合度 → 食材多样性」四层优先级排序。比如减脂目标的人,每日热量缺口设在 300–500 kcal,蛋白质按每公斤体重 1.6g 下限锁定——不是拍脑袋,每一步都能倒推回那个公式。',
    highlights: [
      { label: '热量匹配度', value: '平均 94%,逐餐逐克配平到目标区间' },
      { label: '蛋白质底线', value: '按体重 × 系数(1.2–2.0g/kg)自动锁定,不靠感觉' },
      { label: '口味学习', value: '你每一次"换一道",都在训练自己的口味模型' },
    ],
    image: '/zheergan-healthy-meals/images/answer-nutrition.jpg',
    imageAlt: '智能配餐引擎生成每周餐单',
    reverse: true,
  },
  {
    id: 'chef',
    no: '03',
    icon: ChefHat,
    title: '精选商家,好吃才能坚持',
    subtitle: '健康餐不需要"吃草"',
    body: '我们严选本地优质健康餐商家入驻,营养师团队对每道菜进行 3 轮盲测——热量达标但不好吃,照样打回。商家用天然香料替代工业酱料,低卡不等于寡淡。',
    highlights: [
      { label: '严选商家', value: '只合作通过品控考核的健康餐商家' },
      { label: '3 轮盲测', value: '每道新菜上架前必须通过营养师团队品控' },
      { label: '天然调味', value: '商家使用香料·发酵·低温慢煮,拒绝工业酱料包' },
    ],
    image: '/zheergan-healthy-meals/images/answer-chef.jpg',
    imageAlt: '合作商家主厨在调味健康餐',
  },
  {
    id: 'delivery',
    no: '04',
    icon: Thermometer,
    title: '热链配送,到手上桌',
    subtitle: '不是冷冰冰的餐包,是热乎饭',
    body: '合作商家接单后现做出餐,装入保温箱,通过美团骑手网络实时配送。从商家出锅到你的餐桌全程保温,到手中心温度 ≥60°C——开盖即食,无需微波复热。',
    highlights: [
      { label: '商家现做', value: '接单后出餐,不是预制菜复热' },
      { label: '≥60°C', value: '到手中心温度,开盖热气不骗人' },
      { label: '美团骑手', value: '接入美团配送网络,实时追踪' },
    ],
    image: '/zheergan-healthy-meals/images/answer-delivery.jpg',
    imageAlt: '美团骑手配送保温热链健康餐',
    reverse: true,
  },
];

const capabilities = [
  { icon: Target, label: '身体档案', desc: '算法认识你' },
  { icon: BarChart3, label: '智能引擎', desc: '自动排一周' },
  { icon: ChefHat, label: '精选商家', desc: '好吃是底线' },
  { icon: Thermometer, label: '热链配送', desc: '到手上桌' },
];

const compareRows = [
  ['出餐方式', '商家接单现做', '提前 1–3 天预制'],
  ['配送温度', '保温箱 ≥60°C', '冰袋 0–4°C'],
  ['到手状态', '开盖即食,不用加热', '需微波复热 2–3 分钟'],
  ['口感', '现做锅气,肉质鲜嫩', '复热后口感下降明显'],
  ['食材限制', '新鲜蔬菜、嫩肉均可', '很多绿叶菜不适合冷藏'],
];

export default function FeaturesPage() {
  return (
    <main className="features-page">
      {/* 玻璃导航:悬浮胶囊,滚动时持续悬浮 */}
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
            <a href="#/features" className="is-active" aria-current="page">功能介绍</a>
            <a href="#/pricing">价格方案</a>
            <a href="#/menu">每月餐单</a>
            <a href="#download">下载 App</a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="features-hero" aria-label="功能总览">
        <div className="features-hero-blobs" aria-hidden="true">
          <span className="f-blob f-blob-1" />
          <span className="f-blob f-blob-2" />
          <span className="f-blob f-blob-3" />
        </div>

        <div className="features-hero-inner max-frame">
          <div className="features-hero-copy">
            <span className="section-kicker">
              <Sparkles size={16} />
              功能介绍
            </span>
            <h1>
              <ShinyText
                text="算法 × 主厨,"
                color="#2b1f14"
                shineColor="#c2611f"
                speed={3}
                spread={120}
                direction="left"
              />
              <ShinyText
                text="每一餐都是定制的。"
                color="#2b1f14"
                shineColor="#e88a4a"
                speed={3}
                spread={120}
                direction="left"
                className="features-hero-line-2"
              />
            </h1>
            <p className="features-hero-lede">
              输入身体数据 → 算法 20 秒出餐单 → 商家接单现做 → 美团骑手保温箱送到——每一步都不用你操心。
            </p>
          </div>

          <div className="features-hero-visual" aria-label="四大能力概览">
            {capabilities.map((item) => {
              const I = item.icon;
              return (
                <div className="f-cap-card" key={item.label}>
                  <span className="f-cap-icon">
                    <I size={26} />
                  </span>
                  <strong>{item.label}</strong>
                  <span>{item.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 四大章节(图文交替) ── */}
      {sections.map((sec, idx) => {
        const Icon = sec.icon;
        return (
          <section className="f-section" id={sec.id} key={sec.id} aria-label={sec.title}>
            <div className="section-blobs" aria-hidden="true">
              <span className="s-blob s-blob-1" />
              <span className="s-blob s-blob-2" />
              <span className="s-blob s-blob-3" />
            </div>
            <div
              className={`f-section-grid max-frame${sec.reverse ? ' f-section-grid--reverse' : ''}`}
            >
              <div className="f-section-copy">
                <span className="f-section-no">{sec.no}</span>
                <span className="section-kicker">
                  <Icon size={16} />
                  {sec.subtitle}
                </span>
                <h2>{sec.title}</h2>
                <p className="f-section-body">{sec.body}</p>

                <ul className="f-section-specs">
                  {sec.highlights.map((h) => (
                    <li key={h.label}>
                      <span className="f-spec-label">{h.label}</span>
                      <span className="f-spec-value">{h.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="f-section-visual">
                <div className="f-section-img-shell">
                  <img src={sec.image} alt={sec.imageAlt} loading="lazy" />
                </div>
                <div className="f-proof-badge">
                  <ShieldCheck size={16} />
                  <span>折耳根品控标准</span>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── 热链 vs 冷链对比 ── */}
      <section className="f-compare" aria-label="热链与冷链对比">
        <div className="section-blobs" aria-hidden="true">
          <span className="s-blob s-blob-1" />
          <span className="s-blob s-blob-2" />
          <span className="s-blob s-blob-3" />
        </div>
        <div className="f-compare-inner max-frame">
          <span className="section-kicker">
            <Thermometer size={16} />
            为什么是热链
          </span>
          <h2 className="f-compare-title">同样是配送,热链和冷链差在哪?</h2>

          <div className="f-compare-table" role="table" aria-label="热链与传统冷链对比表">
            <div className="f-compare-row f-compare-header" role="row">
              <span role="columnheader" aria-label="对比维度" />
              <strong className="f-compare-win" role="columnheader">折耳根 · 热链</strong>
              <strong role="columnheader">传统冷链</strong>
            </div>
            {compareRows.map(([label, hot, cold]) => (
              <div className="f-compare-row" role="row" key={label}>
                <span className="f-compare-label" role="cell">{label}</span>
                <span className="f-compare-cell f-compare-win" role="cell">{hot}</span>
                <span className="f-compare-cell" role="cell">{cold}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 页脚(精简版) ── */}
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
            <a href="#/pricing">价格方案</a>
            <a href="#/menu">每月餐单</a>
            <a href="#faq">常见问题</a>
            <a href="#download">下载 App</a>
          </div>
          <span className="features-footer-copy">算法认识你,商家做好饭,骑手送到手。© 2026 折耳根健康餐</span>
          <a
            className="features-footer-top"
            href="#/features"
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
