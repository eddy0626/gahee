import { useEffect, useRef } from "react";

/**
 * 시네마틱 레드 네트워크-글로브 (히어로 배경 캔버스).
 *
 * 피보나치 구 위에 점을 분포시켜 Y축으로 천천히 회전, 정사영 투영.
 * 가까운 점끼리 연결선, 깊이(z)에 따른 크기·밝기, 값싼 글로우(코어+링).
 * `prefers-reduced-motion`이면 정적 1프레임만 렌더하고 멈춘다.
 * DPR/리사이즈 대응, 화면 밖이면 일시정지.
 */
export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const cv = canvas;
    const ctx = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COUNT = 130;

    type P = { x: number; y: number; z: number };
    const base: P[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      base.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    let w = 0;
    let h = 0;
    let radius = 0;
    let cx = 0;
    let cy = 0;
    // reduced-motion 은 회전 없이 보기 좋은 각도(0.7rad)의 정지 화면 1장만 보여준다
    let angle = reduce ? 0.7 : 0;

    function resize() {
      const rect = cv.parentElement?.getBoundingClientRect();
      w = rect ? rect.width : window.innerWidth;
      h = rect ? rect.height : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.width = w + "px";
      cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = Math.min(w, h) * 0.46;
      cx = w * 0.52;
      cy = h * 0.5;
      // 캔버스 크기 변경은 비트맵을 비우므로 즉시 한 프레임 다시 그린다
      // (reduced-motion 모드에선 루프가 없어 이 호출이 유일한 재렌더 경로)
      draw();
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);
      ctx.clearRect(0, 0, w, h);

      const pts = base.map((p) => {
        const x = p.x * cos - p.z * sin;
        const z = p.x * sin + p.z * cos;
        return { x, y: p.y, z, sx: cx + x * radius, sy: cy + p.y * radius };
      });

      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        if (a.z < -0.15) continue;
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          if (b.z < -0.15) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < 0.42) {
            const depth = (a.z + b.z) * 0.25 + 0.5;
            const alpha = (1 - d / 0.42) * 0.2 * depth;
            ctx.strokeStyle = `rgba(203,41,87,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        const depth = p.z * 0.5 + 0.5;
        const core = 0.6 + depth * 1.9;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,61,110,${(0.05 + depth * 0.12).toFixed(3)})`;
        ctx.arc(p.sx, p.sy, core * 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,108,148,${(0.2 + depth * 0.75).toFixed(3)})`;
        ctx.arc(p.sx, p.sy, core, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let raf = 0;
    let visible = true;
    function loop() {
      if (visible) {
        angle += 0.0015;
        draw();
      }
      raf = requestAnimationFrame(loop);
    }

    // 히어로가 화면 밖으로 나가면 그리기를 멈춰 CPU 를 아낀다
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    io.observe(cv);

    // 첫 프레임은 resize() 가 이미 그렸다 — reduced-motion 이 아니면 회전 루프 시작
    if (!reduce) {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="heroGlobe" aria-hidden="true" />;
}
