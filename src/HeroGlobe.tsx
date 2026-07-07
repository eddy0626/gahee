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

    // 구 위 점의 기준 좌표(회전 전) — 플랫 타입배열로 보관해 프레임마다 객체를 새로 만들지 않는다.
    const BX = new Float64Array(COUNT);
    const BY = new Float64Array(COUNT);
    const BZ = new Float64Array(COUNT);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      BX[i] = Math.cos(theta) * r;
      BY[i] = y;
      BZ[i] = Math.sin(theta) * r;
    }

    // 프레임 간 재사용 버퍼 — 회전 결과(x,z)와 화면 x좌표(sx). 화면 y(sy)는 회전과 무관해 resize 에서 계산.
    const X = new Float64Array(COUNT);
    const Z = new Float64Array(COUNT);
    const SX = new Float64Array(COUNT);
    const SY = new Float64Array(COUNT);
    const CONNECT = 0.42; // 연결 임계 거리
    const CONNECT2 = CONNECT * CONNECT; // 그 제곱 — 대부분의 쌍은 sqrt 없이 여기서 걸러낸다
    const TAU = Math.PI * 2;

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
      // 화면 y좌표는 회전과 무관(점의 기준 y 고정) → 리사이즈 때만 다시 계산
      for (let i = 0; i < COUNT; i++) SY[i] = cy + BY[i] * radius;
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

      // 회전 + 투영을 재사용 버퍼에 제자리로 기록(할당 없음). sy 는 회전 무관이라 이미 resize 에서 계산됨.
      for (let i = 0; i < COUNT; i++) {
        const bx = BX[i];
        const bz = BZ[i];
        const x = bx * cos - bz * sin;
        const z = bx * sin + bz * cos;
        X[i] = x;
        Z[i] = z;
        SX[i] = cx + x * radius;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < COUNT; i++) {
        const az = Z[i];
        if (az < -0.15) continue;
        const ax = X[i];
        const ay = BY[i];
        const asx = SX[i];
        const asy = SY[i];
        for (let j = i + 1; j < COUNT; j++) {
          const bz = Z[j];
          if (bz < -0.15) continue;
          const dx = ax - X[j];
          const dy = ay - BY[j];
          const dz = az - bz;
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < CONNECT2) {
            const d = Math.sqrt(d2); // 통과한 쌍에서만 sqrt
            const depth = (az + bz) * 0.25 + 0.5;
            const alpha = (1 - d / CONNECT) * 0.3 * depth; // 라이트 배경 대비 위해 상향
            ctx.strokeStyle = `rgba(203,41,87,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(asx, asy);
            ctx.lineTo(SX[j], SY[j]);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < COUNT; i++) {
        const depth = Z[i] * 0.5 + 0.5;
        const core = 0.6 + depth * 1.9;
        const sx = SX[i];
        const sy = SY[i];
        ctx.beginPath();
        ctx.fillStyle = `rgba(203,41,87,${(0.03 + depth * 0.07).toFixed(3)})`; /* 은은한 레드 헤일로 */
        ctx.arc(sx, sy, core * 3.2, 0, TAU);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(203,41,87,${(0.32 + depth * 0.5).toFixed(3)})`; /* 라이트 배경 위 진한 레드 점 */
        ctx.arc(sx, sy, core, 0, TAU);
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
