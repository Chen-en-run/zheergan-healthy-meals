import React from 'react';
import RevealOnScroll from '../components/RevealOnScroll';
import './features.css';

const IMG = '/zheergan-healthy-meals/images';

function CompanyPage() {
  return (
    <main className="site-shell company-page" style={{ background: '#fdfdfd', backgroundImage: 'none' }}>
      <div className="grain" aria-hidden="true" />
      {/* 返回首页按钮：左上角 */}
      <a
        href="#/"
        className="company-back-btn"
        aria-label="返回首页"
        style={{ backgroundColor: '#ffffff', color: '#000000', border: 'none' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        <span>返回首页</span>
      </a>

      {/* Hero + 内容：单一连续区域 */}
      <section className="company-page-body section-panel panel-cream" aria-label="公司简介">
        <RevealOnScroll variant="fadeUp" amount={0.1} className="company-page-inner">
          <div className="company-hero-head">
            <h1>公司简介</h1>
            <p className="company-hero-sub">
              折耳根（深圳）健康管理有限公司
            </p>
          </div>

          <div className="company-section">
            <h3>公司概况</h3>
            <p>
              折耳根（深圳）健康管理有限公司，成立于 2023 年 10 月 12 日，法定代表人为罗俊帆，
              注册资本 100 万元人民币，公司类型为有限责任公司（自然人独资），经营状态为存续。
            </p>
          </div>

          <div className="company-section">
            <h3>注册信息</h3>
            <p>
              注册地址：深圳市南山区南山街道荔湾社区荔湾沿山路 8 号荔山工业区 6 栋 252。
              统一社会信用代码：91440300MAD02XD55H。
              登记机关：深圳市市场监督管理局南山监管局。
            </p>
          </div>

          <div className="company-section">
            <h3>经营范围</h3>
            <p>
              公司主要从事网络技术服务、网络与信息安全软件开发、体育健康服务、
              健身休闲活动、养生保健服务（非医疗）、健康咨询服务（不含诊疗服务）、
              远程健康管理服务。
            </p>
          </div>

          <div className="company-section">
            <h3>品牌背景</h3>
            <p>
              "折耳根"是该公司旗下品牌，专注于健康饮食与健康管理服务。公司依托深圳南山区的产业环境，
              致力于通过算法定制与热链配送，让每一位用户都能吃到专属的健康餐。
              公司规模 0–20 人，目前在招 Flutter 开发工程师、产品经理等岗位。
            </p>
            <p className="company-brand-idea">
              我们的理念：<strong>美味第一、健康第二</strong>——做中国人都用得起的健康餐饮。
              不是水煮鸡胸，也不是草沙拉，而是锅气十足、荤素搭配的家常好味道；一顿外卖的钱，
              就能吃到算法定制、餐厅现炒、热链到家的专属健康餐。
            </p>
          </div>
        </RevealOnScroll>
      </section>
    </main>
  );
}

export default CompanyPage;
