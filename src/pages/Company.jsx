import React from 'react';
import { ChevronDown } from 'lucide-react';
import ShinyText from '../components/ShinyText';
import './features.css';

const IMG = '/zheergan-healthy-meals/images';

function CompanyPage() {
  return (
    <main className="site-shell">
      <div className="grain" aria-hidden="true" />
      {/* 导航：和首页一致 */}
      <header className="home-nav">
        <div className="home-nav-inner max-frame">
          <a className="brand" href="#/" aria-label="折耳根健康餐 · 返回首页">
            <span className="home-nav-brand-text"><i>Ergen</i> 折耳根健康餐</span>
          </a>
          <nav className="nav-links" aria-label="主导航">
            <a href="#/">首页</a>
            <a href="#/company" className="is-active" aria-current="page">公司简介</a>
            <div className="nav-dropdown">
              <span className="nav-dropdown-trigger">
                下载中心 <ChevronDown size={14} />
              </span>
              <div className="nav-dropdown-panel">
                <a className="nav-dropdown-item" href="https://github.com/xiaolinlin360/.github.io/releases/download/%E6%8A%98%E8%80%B3%E6%A0%B9%E5%81%A5%E5%BA%B7%E9%A4%90v0.0.1/app-debug.apk" target="_blank" rel="noreferrer">
                  <span className="ndi-default">
                    <img src={`${IMG}/icon-win.svg`} alt="Windows" style={{width:32,height:32}} />
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
                    <img src={`${IMG}/icon-apple.svg`} alt="Mac OS" style={{width:32,height:32}} />
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
                    <img src={`${IMG}/icon-phone.svg`} alt="手机" style={{width:32,height:32}} />
                    <span>手机</span>
                  </span>
                  <span className="ndi-hover">
                    <img src={`${IMG}/qrcode.png`} alt="扫码下载" className="ndi-qr-img" />
                    <span>扫码下载 手机版</span>
                  </span>
                </span>
                <span className="nav-dropdown-item nav-dropdown-item--qr">
                  <span className="ndi-default">
                    <img src={`${IMG}/icon-tablet.svg`} alt="平板" style={{width:32,height:32}} />
                    <span>平板</span>
                  </span>
                  <span className="ndi-hover">
                    <img src={`${IMG}/qrcode.png`} alt="扫码下载" className="ndi-qr-img" />
                    <span>扫码下载 平板版</span>
                  </span>
                </span>
              </div>
            </div>
            <a href="#/menu">每月餐单</a>
          </nav>
        </div>
      </header>

      {/* Hero + 内容：单一连续区域 */}
      <section className="company-page-body section-panel panel-cream" aria-label="公司简介">
        <div className="features-hero-blobs" aria-hidden="true">
          <span className="f-blob f-blob-1" />
          <span className="f-blob f-blob-2" />
          <span className="f-blob f-blob-3" />
        </div>
        <div className="company-page-inner max-frame">
          <div className="company-hero-head">
            <h1>
              <ShinyText
                text="公司简介"
                color="#2b1f14"
                shineColor="#c2611f"
                speed={3}
                spread={120}
                direction="left"
              />
            </h1>
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
          </div>
        </div>

        <footer className="site-footer panel-cream" aria-label="页脚">
        <div className="footer-new">
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
          <div className="footer-new-copy">
            <span>京公网安备 11000002002061号</span>
            <span>京ICP备2020042663号</span>
            <span>京网文[2026]2102-100号</span>
            <span>©2026 Ergen 折耳根健康餐</span>
            <a href="javascript:void(0)">证照信息 ›</a>
          </div>
        </div>
      </footer>
      </section>
    </main>
  );
}

export default CompanyPage;
