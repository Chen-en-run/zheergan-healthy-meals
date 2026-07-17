import React, { useState } from 'react';
import {
  ArrowUp,
  Flame,
  Sparkles,
  Utensils,
} from 'lucide-react';
import ShinyText from '../components/ShinyText';
import './features.css';
import './menu.css';

/* ================================================================
   每月餐单页 — 本周在售餐品全览 + 标签筛选
   路由:#/menu(hash 路由,见 main.jsx)
   菜品数据口径:kcal / 蛋白质与 App 内餐单一致
   ================================================================ */

const IMG = '/zheergan-healthy-meals/images';

const dishes = [
  { no: '01', title: '烟熏三文鱼平衡碗', desc: '挪威三文鱼低温烟熏,配三色藜麦、牛油果与溏心蛋,Omega-3 与优质蛋白一碗配齐。', kcal: 486, protein: 36, tag: '高蛋白', featured: false, image: `${IMG}/salmon.jpg` },
  { no: '02', title: '柑香鸡肉谷物碗', desc: '橙皮腌制鸡腿肉炙烤出焦边,配三色糙米与烤时蔬,是本月复购率最高的一道。', kcal: 532, protein: 42, tag: '本月主推', featured: true, image: `${IMG}/chicken.jpg` },
  { no: '03', title: '牛油果绿蔬蛋碗', desc: '牛油果、羽衣甘蓝与水波蛋,南瓜籽点缀,轻负担但饱腹感在线。', kcal: 418, protein: 28, tag: '低卡', featured: false, image: `${IMG}/avocado.jpg` },
  { no: '04', title: '藜麦能量碗', desc: '三色藜麦打底,烤鹰嘴豆与当季根茎蔬菜,膳食纤维一餐达标 60%。', kcal: 462, protein: 24, tag: '高纤维', featured: false, image: `${IMG}/quinoa.jpg` },
  { no: '05', title: '田园时蔬沙拉', desc: '十二种时蔬每日直采,油醋汁另附,想清淡的那天就选它。', kcal: 320, protein: 18, tag: '轻食', featured: false, image: `${IMG}/salad.jpg` },
  { no: '06', title: '金枪鱼波奇碗', desc: '生食级金枪鱼配寿司米与海苔脆,冷链锁鲜直达(全站唯一冷食,标注清楚)。', kcal: 508, protein: 38, tag: '高蛋白', featured: false, image: `${IMG}/tuna.jpg` },
  { no: '07', title: '素食牛油果藜麦碗', desc: '藜麦、鹰嘴豆与烤南瓜,芝麻酱汁提香,全素也能吃得扎实。', kcal: 432, protein: 16, tag: '高纤维', featured: false, image: `${IMG}/dish-07.jpg` },
  { no: '08', title: '彩虹果蔬沙拉碗', desc: '八种颜色果蔬同碗,石榴籽点睛,维生素密度全场最高。', kcal: 356, protein: 14, tag: '低卡', featured: false, image: `${IMG}/dish-08.jpg` },
  { no: '09', title: '蓝莓燕麦松饼', desc: '燕麦粉替代精面,枫糖减半,早餐的甜口配额留给它。', kcal: 388, protein: 12, tag: '轻食', featured: false, image: `${IMG}/dish-09.jpg` },
  { no: '10', title: '全麦玛格丽特披萨', desc: '全麦饼底手工揉制,水牛芝士与罗勒,想吃披萨不必有负罪感。', kcal: 545, protein: 24, tag: '高纤维', featured: false, image: `${IMG}/dish-10.jpg` },
  { no: '11', title: '香煎三文鱼时蔬盘', desc: '带皮煎出脆边,配芦笋与小土豆,晚餐的体面选择。', kcal: 498, protein: 38, tag: '高蛋白', featured: false, image: `${IMG}/dish-11.jpg` },
  { no: '12', title: '希腊酸奶莓果杯', desc: '无糖希腊酸奶配当季莓果与烤燕麦脆,加餐或早餐都合适。', kcal: 265, protein: 15, tag: '轻食', featured: false, image: `${IMG}/dish-12.jpg` },
  { no: '13', title: '牛油果溏心蛋吐司', desc: '酸面包打底,牛油果泥与溏心蛋,黑芝麻与辣椒碎收尾。', kcal: 372, protein: 18, tag: '轻食', featured: false, image: `${IMG}/dish-13.jpg` },
  { no: '14', title: '黑椒牛肉能量盘', desc: '谷饲牛肉低温慢煮,黑椒汁现调,训练日的蛋白质主力。', kcal: 568, protein: 44, tag: '高蛋白', featured: false, image: `${IMG}/dish-14.jpg` },
  { no: '15', title: '抹茶奇亚籽布丁碗', desc: '奇亚籽椰奶冷萃过夜,抹茶微苦回甘,低卡甜品天花板。', kcal: 298, protein: 11, tag: '低卡', featured: false, image: `${IMG}/dish-15.jpg` },
  { no: '16', title: '冬阴功海鲜米线', desc: '酸辣汤底轻盐版,鲜虾与鱿鱼圈,米线可换魔芋面再减卡。', kcal: 415, protein: 26, tag: '低卡', featured: false, image: `${IMG}/dish-16.jpg` },
  { no: '17', title: '番茄罗勒全麦意面', desc: '全麦意面配慢炖番茄酱,帕玛森现刨,碳水也有好出身。', kcal: 512, protein: 19, tag: '高纤维', featured: false, image: `${IMG}/dish-17.jpg` },
  { no: '18', title: '法式香煎鸭胸', desc: '鸭胸皮脆肉嫩,配焦糖苹果与时蔬,一周犒赏自己的那顿。', kcal: 522, protein: 36, tag: '高蛋白', featured: false, image: `${IMG}/dish-18.jpg` },
  { no: '19', title: '柠檬香草烤三文鱼', desc: '柠檬皮屑与迷迭香腌制,烤箱出品,油脂香气不靠多放油。', kcal: 476, protein: 37, tag: '高蛋白', featured: false, image: `${IMG}/dish-19.jpg` },
  { no: '20', title: '莓果隔夜燕麦', desc: '燕麦牛奶冷藏过夜,树莓蓝莓分层,早上开盖即食。', kcal: 342, protein: 13, tag: '轻食', featured: false, image: `${IMG}/dish-20.jpg` },
  { no: '21', title: '地中海烤蔬拼盘', desc: '西葫芦、彩椒与茄子橄榄油烤制,配鹰嘴豆泥,轻盈但不寡淡。', kcal: 305, protein: 12, tag: '低卡', featured: false, image: `${IMG}/dish-21.jpg` },
  { no: '22', title: '南瓜浓汤配黑麦包', desc: '贝贝南瓜熬足两小时,无奶油版本,配现烤黑麦面包。', kcal: 328, protein: 10, tag: '低卡', featured: false, image: `${IMG}/dish-22.jpg` },
  { no: '23', title: '孜然烤鸡肉串', desc: '鸡腿肉块炭火风味,孜然与辣椒面,高蛋白也可以有烟火气。', kcal: 455, protein: 40, tag: '高蛋白', featured: false, image: `${IMG}/dish-23.jpg` },
  { no: '24', title: '轻盐日式拉面', desc: '汤底减盐 40%,叉烧换鸡胸,拉面爱好者的可持续方案。', kcal: 528, protein: 28, tag: '高蛋白', featured: false, image: `${IMG}/dish-24.jpg` },
  { no: '25', title: '肉桂法式吐司', desc: '布里欧修厚切,蛋奶液浸透,肉桂糖霜只撒一层。', kcal: 418, protein: 14, tag: '轻食', featured: false, image: `${IMG}/dish-25.jpg` },
  { no: '26', title: '青柠鲜虾冷面', desc: '青柠汁与鱼露调味,鲜虾弹牙,夏天最想念的一碗。', kcal: 385, protein: 24, tag: '低卡', featured: false, image: `${IMG}/dish-26.jpg` },
  { no: '27', title: '燕麦香蕉早餐碗', desc: '热燕麦配焦糖香蕉与核桃,顶饱指数五颗星。', kcal: 365, protein: 12, tag: '高纤维', featured: false, image: `${IMG}/dish-27.jpg` },
  { no: '28', title: '全麦贝果轻食盘', desc: '现烤全麦贝果配奶油奶酪与烟熏三文鱼碎,brunch 的正确打开。', kcal: 395, protein: 16, tag: '轻食', featured: false, image: `${IMG}/dish-28.jpg` },
  { no: '29', title: '蒜香黄油煎扇贝', desc: '北海道扇贝大火快煎,蒜香黄油收汁,低卡高蛋白的海味。', kcal: 402, protein: 32, tag: '高蛋白', featured: false, image: `${IMG}/dish-29.jpg` },
  { no: '30', title: '牛油果鸡胸沙拉', desc: '低温鸡胸手撕成丝,牛油果酱代替沙拉酱,减脂餐的口感上限。', kcal: 368, protein: 30, tag: '低卡', featured: false, image: `${IMG}/dish-30.jpg` },
];

const filters = ['全部', '本月主推', '高蛋白', '低卡', '高纤维', '轻食'];

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
            <a href="#/menu" className="is-active" aria-current="page">每月餐单</a>
            <a href="#download">下载 App</a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="features-hero menu-hero" aria-label="每月餐单总览">
        <div className="features-hero-blobs" aria-hidden="true">
          <span className="f-blob f-blob-1" />
          <span className="f-blob f-blob-2" />
          <span className="f-blob f-blob-3" />
        </div>

        <div className="menu-hero-inner max-frame">
          <span className="section-kicker">
            <Utensils size={16} />
            每月餐单 · 每月 1 日焕新
          </span>
          <h1>
            <ShinyText
              text="每月焕新,"
              color="#2b1f14"
              shineColor="#c2611f"
              speed={3}
              spread={120}
              direction="left"
            />
            <ShinyText
              text="把食欲交给厨师。"
              color="#2b1f14"
              shineColor="#e88a4a"
              speed={3}
              spread={120}
              direction="left"
              className="menu-hero-line-2"
            />
          </h1>
          <p className="menu-hero-lede">
            本月在售 30 道,由营养师与主厨共同设计,按你的热量目标与口味偏好每月轮换上新。完整定制餐单在 App 内按你的身体数据生成。
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
      <section className="m-dishes" aria-label="本月在售餐品">
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
          <p className="m-dish-empty max-frame">这个标签下本月暂无餐品,看看别的分类吧。</p>
        )}

        <p className="m-dish-note max-frame">
          <Sparkles size={14} aria-hidden="true" />
          实际可订餐品以 App 内你的定制餐单为准——算法会按你的热量目标与忌口自动过滤。
        </p>
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
