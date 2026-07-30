import React, { useRef, useEffect, useState } from 'react';

/**
 * RevealOnScroll — 元素进入视口时触发入场动画
 * variant: 'fadeIn' | 'fadeUp' | 'popUp' | 'scaleIn'
 */
export default function RevealOnScroll({ children, variant = 'fadeUp', delay = 0, amount = 0.1, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: amount }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [amount]);

  // 用 opacity + margin-top 做“从下往上冒出来”的入场动画。
  // 不使用 transform，以避免：
  //  1) 内联 transform 创建包含块，导致内部 absolute 元素定位错位（偏左）；
  //  2) 覆盖元素自身用于居中的 transform（如 translateX(-50%)）。
  // margin-top 不影响水平居中，也不破坏 flex 布局，因此整页不会偏移。
  const shift =
    variant === 'fadeUp' ? 40 :
    variant === 'popUp' ? 60 :
    variant === 'scaleIn' ? 40 :
    24;

  const style = visible
    ? {
        opacity: 1,
        marginTop: 0,
        transition: `opacity 0.6s var(--ease-out) ${delay}s, margin-top 0.6s var(--ease-out) ${delay}s`,
      }
    : {
        opacity: 0,
        marginTop: `${shift}px`,
        transition: `opacity 0.6s var(--ease-out) ${delay}s, margin-top 0.6s var(--ease-out) ${delay}s`,
      };

  return (
    <div ref={ref} style={style} {...rest}>
      {children}
    </div>
  );
}
