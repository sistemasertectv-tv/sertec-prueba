import React, { useEffect, useRef, useState } from 'react';

/** Cuenta hacia arriba una sola vez al entrar en pantalla. Valores como "+25.000", "+350 km", "99,9 %". "24/7" se deja fijo. */
export const CountUp: React.FC<{ value: string }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\D*)(\d[\d.,]*)(.*)$/);
    if (!match || /\//.test(value) || !ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const prefix = match[1];
    const numStr = match[2];
    const suffix = match[3];
    const hasDecimal = numStr.includes(',');
    const target = hasDecimal ? parseFloat(numStr.replace(',', '.')) : parseInt(numStr.replace(/\./g, ''), 10);
    if (!isFinite(target)) return;
    const format = (n: number) => hasDecimal
      ? n.toFixed(1).replace('.', ',')
      : String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setShown(`${prefix}${format(0)}${suffix}`);
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1400;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setShown(`${prefix}${format(target * eased)}${suffix}`);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);

  return <span ref={ref}>{shown}</span>;
};
export default CountUp;
