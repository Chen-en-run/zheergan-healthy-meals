import React, { useRef, useEffect, useState } from 'react';

/**
 * RevealOnScroll — 元素进入视口时触发入场动画
 * variant: 'fadeIn' | 'fadeUp' | 'popUp' | 'scaleIn'
 */
export default function RevealOnScroll({ children, variant = 'fadeIn', delay = 0, amount = 0.1, ...rest }) {
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

  const style = visible
    ? {
        opacity: 1,
        transform: 'none',
        transition: `opacity 0.6s var(--ease-out) ${delay}s, transform 0.6s var(--ease-out) ${delay}s`,
      }
    : {
        opacity: 0,
        transform:
          variant === 'fadeUp' ? 'translateY(30px)' :
          variant === 'popUp' ? 'translateY(40px)' :
          variant === 'scaleIn' ? 'scale(0.92)' :
          'translateY(0)',
      };

  return (
    <div ref={ref} style={style} {...rest}>
      {children}
    </div>
  );
}
