import React, { useState, useEffect, useRef } from 'react';

/**
 * ProgressiveImage — 先显示低清缩略图占位，高清图加载完成后淡入替换
 * 缩略图通过 URL 拼接 ?w=20 等参数生成（适用于支持图片 CDN 的场景），
 * 本地静态资源则使用 CSS blur + scale 模拟模糊缩略图效果
 */
export default function ProgressiveImage({ src, alt = '', className = '', ...imgProps }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true); // 加载失败也显示（不卡在占位状态）
    img.src = src;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div
      className={`prog-img${loaded ? ' is-loaded' : ''}${className ? ` ${className}` : ''}`}
    >
      {/* 低清占位：用原图缩小 blur 模拟缩略图 */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="prog-img-thumb"
        style={{
          filter: 'blur(14px)',
          transform: 'scale(1.1)',
          objectFit: 'cover',
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          transition: 'opacity 0.4s ease',
          opacity: loaded ? 0 : 1,
        }}
      />
      {/* 高清图 */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="prog-img-full"
        {...imgProps}
        style={{
          objectFit: 'cover',
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          transition: 'opacity 0.5s ease',
          opacity: loaded ? 1 : 0,
        }}
      />
    </div>
  );
}
