import React, { useEffect, useRef, useState } from 'react';

/**
 * SplitText — 把文字拆成字符，进入视口时按从左到右、从下往上的顺序逐字冒出。
 * - 纯文本：逐字符动画
 * - 内嵌元素（如 <ShinyText/>）：整体作为一个动画单元（不破坏内部效果）
 * 位移使用 transform，作用在每个字符的 inline-block <span> 上，
 * 不会像外层容器的 transform 那样破坏页面布局/绝对定位。
 */

function toUnits(children) {
  const units = [];
  const walk = (node) => {
    if (node == null || node === false || node === true) return;
    if (typeof node === 'string' || typeof node === 'number') {
      const str = String(node);
      for (const ch of str) {
        if (ch.trim() === '') units.push({ kind: 'space', value: ch });
        else units.push({ kind: 'char', value: ch });
      }
    } else if (Array.isArray(node)) {
      node.forEach(walk);
    } else if (React.isValidElement(node)) {
      units.push({ kind: 'node', value: node });
    } else {
      units.push({ kind: 'space', value: String(node) });
    }
  };
  walk(children);
  return units;
}

export default function SplitText({
  children,
  as: Tag = 'span',
  className,
  stagger = 0.035,
  baseDelay = 0,
  amount = 0.2,
  charClassName = '',
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: amount }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [amount]);

  const units = toUnits(children);
  let order = 0;

  return (
    <Tag ref={ref} className={className} {...rest}>
      {units.map((u, i) => {
        if (u.kind === 'space') {
          return <React.Fragment key={i}>{u.value}</React.Fragment>;
        }
        const delay = baseDelay + order * stagger;
        order += 1;
        const style = {
          display: 'inline-block',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(0.5em)',
          transition: `opacity 0.5s var(--ease-out) ${delay}s, transform 0.5s var(--ease-out) ${delay}s`,
        };
        return (
          <span key={i} className={charClassName || undefined} style={style}>
            {u.value}
          </span>
        );
      })}
    </Tag>
  );
}
