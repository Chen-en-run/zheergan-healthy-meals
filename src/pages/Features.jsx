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
    body: '输入你的基础代谢、体重目标(减脂/增肌/维持)、口味偏好和过敏原。算法会在 20 秒内生成一份专属营养画像——你的每日热量区间、三大宏量比例、以及应优先摄入与避开的食材清单。',
    highlights: [
      { label: '热量目标', value: '按身高·体重·活动量计算 BMR + TDEE' },
      { label: '口味偏好', value: '12 类菜系 × 5 档辣度,越吃越准' },
      { label: '过敏与忌口', value: '海鲜·坚果·乳糖·香菜等 28 项可标记' },
    ],
    image: '/zheergan-healthy-meals/images/answer-nutrition.jpg',
    imageAlt: '在 App 中设置营养目标的界面示意',
  },
  {
    id: 'engine',
    no: '02',
    icon: BarChart3,
    title: '智能配餐引擎',
    subtitle: '营养师 × 算法,每餐有据可依',
    body: '引擎根据你的营养画像,从 200+ 道由营养师与主厨联合设计的健康餐中,按「热量匹配度 → 蛋白质达标率 → 口味吻合度 → 本周食材多样性」四层优先级排序,为你自动排好一周餐单。',
    highlights: [
      { label: '热量匹配度', value: '平均 94%,算法逐餐逐克配平' },
      { label: '蛋白质达标', value: '按体重与目标自动计算,不靠感觉' },
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
    title: '主厨调味,好吃才能坚持',
    subtitle: '健康餐不需要"吃草"',
    body: '20 位主厨团队来自中餐、日料、轻西餐背景,每道菜经过至少 3 轮盲测——热量达标但不好吃,照样打回。调味用天然香料替代工业酱料,低卡不等于寡淡。',
    highlights: [
      { label: '20 位', value: '全职主厨,非外包中央工厂' },
      { label: '3 轮盲测', value: '每道新菜上架前必须通过团队品控' },
      { label: '天然调味', value: '香料·发酵·低温慢煮,拒绝工业酱料包' },
    ],
    image: '/zheergan-healthy-meals/images/answer-chef.jpg',
    imageAlt: '主厨在调味健康餐',
  },
  {
    id: 'delivery',
    no: '04',
    icon: Thermometer,
    title: '热链配送,到手上桌',
    subtitle: '不是冷冰冰的餐包,是热乎饭',
    body: '每日凌晨 5:00 中央厨房开始现做,装入保温热链箱,7:00–11:00 分批出车。从出锅到送达控制在 90 分钟内,到手中心温度 ≥60°C——开盖即食,无需微波复热。',
    highlights: [
      { label: '90 分钟', value: '出锅 → 装车 → 到手,极限时效' },
      { label: '≥60°C', value: '到手中心温度,开盖热气不骗人' },
      { label: '保温热链箱', value: '专业保温箱体,不是泡沫饭盒' },
    ],
    image: '/zheergan-healthy-meals/images/answer-delivery.jpg',
    imageAlt: '保温热链配送箱与新鲜送达的健康餐',
    reverse: true,
  },
];

const capabilities = [
  { icon: Target, label: '身体档案', desc: '算法认识你' },
  { icon: BarChart3, label: '智能引擎', desc: '自动排一周' },
  { icon: ChefHat, label: '主厨团队', desc: '好吃是底线' },
  { icon: Thermometer, label: '热链配送', desc: '到手上桌' },
];

const compareRows = [
  ['出餐方式', '当日凌晨现做', '提前 1–3 天预制'],
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
              折耳根健康餐不只是"送健康餐",而是把营养科学、主厨手艺和物流效率拼成一条完整的链路——从你打开 App 设置目标,到一口热饭入口,每一步都为「省心」而设计。
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
          <span className="features-footer-copy">好好吃饭,也可以很轻松。© 2026 折耳根健康餐</span>
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
