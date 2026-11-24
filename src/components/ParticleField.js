import { useEffect, useRef } from "react";

export function ParticleField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width, height, frame;
    let pointerX = -200, pointerY = -200;
    let strength = 0, target = 0;

    function draw() {
      frame = undefined;
      strength += (target - strength) * 0.16;
      ctx.clearRect(0, 0, width, height);
      for (let y = 12; y < height; y += 22) {
        for (let x = 12; x < width; x += 22) {
          const dx = x - pointerX;
          const dy = y - pointerY;
          const distance = Math.hypot(dx, dy);
          const force = strength * Math.max(0, 1 - distance / 125) ** 2;
          const shift = 27 * force / Math.max(1, distance);
          ctx.fillStyle = force > 0.05 ? "#6175bc" : "#7181a1";
          ctx.globalAlpha = 0.22 + force * 0.65;
          ctx.beginPath();
          ctx.arc(x + dx * shift, y + dy * shift, 1 + force, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (Math.abs(strength - target) > 0.003) schedule();
    }
    function schedule() {
      if (frame === undefined) frame = requestAnimationFrame(draw);
    }
    function move(event) {
      if (motion.matches || event.pointerType === "touch") return;
      const bounds = canvas.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      target = 1;
      schedule();
    }
    function reset() {
      target = 0;
      if (motion.matches) strength = 0;
      schedule();
    }
    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      schedule();
    }
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", reset);
    motion.addEventListener("change", reset);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", reset);
      motion.removeEventListener("change", reset);
    };
  }, []);
  return <canvas className="particle-field" ref={ref} aria-hidden="true" />;
}
