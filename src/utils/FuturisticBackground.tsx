import { useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  r: number; g: number; b: number;
  size: number; baseSize: number;
  alpha: number; life: number; maxLife: number;
}

// ─── Palette: blue, purple, teal, magenta ────────────────────────────────────
const PALETTES: Array<[number, number, number]> = [
  [0, 180, 255],   // electric blue
  [0, 240, 220],   // teal
  [120, 60, 255],  // deep purple
  [180, 50, 255],  // violet
  [255, 50, 200],  // magenta
  [50, 200, 255],  // sky blue
  [0, 255, 180],   // seafoam
  [200, 100, 255], // lavender
];

function pick(): [number, number, number] {
  return PALETTES[Math.floor(Math.random() * PALETTES.length)];
}

function makeParticle(W: number, H: number): Particle {
  const [r, g, b] = pick();
  const maxLife = 120 + Math.random() * 240;
  return {
    x: (Math.random() - 0.5) * W * 1.6,
    y: (Math.random() - 0.5) * H * 1.6,
    z: Math.random() * 800 + 50,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    vz: -(Math.random() * 1.4 + 0.4),
    r, g, b,
    size: 0,
    baseSize: Math.random() * 2.2 + 0.5,
    alpha: 0,
    life: 0,
    maxLife,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true })!;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // ── State ─────────────────────────────────────────────────────────────
    const PARTICLE_COUNT = 900;
    const FOV = 340;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const p = makeParticle(W, H);
      p.life = Math.random() * p.maxLife; // scatter start times
      return p;
    });

    let mouseX = W / 2;
    let mouseY = H / 2;
    let targetMX = W / 2;
    let targetMY = H / 2;
    let animId: number;
    let frame = 0;

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    const onMouse = (e: MouseEvent) => { targetMX = e.clientX; targetMY = e.clientY; };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);

    // ── Project 3D → 2D ───────────────────────────────────────────────────
    function project(p: Particle) {
      const scale = FOV / (FOV + p.z);
      // Parallax: camera offset based on mouse
      const camX = (mouseX - W / 2) * 0.04;
      const camY = (mouseY - H / 2) * 0.04;
      const sx = (p.x - camX) * scale + W / 2;
      const sy = (p.y - camY) * scale + H / 2;
      return { sx, sy, scale };
    }

    // ── Draw nebula glow blobs (pre-render) ───────────────────────────────
    function drawNebulae(t: number) {
      const blobs = [
        { cx: W * 0.2, cy: H * 0.25, r: W * 0.28, color: '0,100,255', a: 0.055 },
        { cx: W * 0.8, cy: H * 0.65, r: W * 0.25, color: '140,0,255', a: 0.05 },
        { cx: W * 0.5, cy: H * 0.85, r: W * 0.22, color: '0,220,200', a: 0.045 },
        { cx: W * 0.15, cy: H * 0.75, r: W * 0.18, color: '255,40,180', a: 0.035 },
      ];
      blobs.forEach(({ cx, cy, r, color, a }, i) => {
        const px = cx + Math.sin(t * 0.12 + i * 1.2) * 40;
        const py = cy + Math.cos(t * 0.09 + i * 0.9) * 30;
        const g = ctx.createRadialGradient(px, py, 0, px, py, r);
        g.addColorStop(0, `rgba(${color},${a})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });
    }

    // ── Grid ──────────────────────────────────────────────────────────────
    function drawGrid(t: number) {
      ctx.save();
      ctx.globalAlpha = 0.028;
      ctx.strokeStyle = '#00d4ff';
      ctx.lineWidth = 0.5;
      const spacing = 52;
      const offX = ((mouseX - W / 2) * 0.015) % spacing;
      const offY = (t * 8) % spacing;
      for (let x = -spacing + offX; x < W + spacing; x += spacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = -spacing + offY; y < H + spacing; y += spacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.restore();
    }

    // ── Aurora waves ─────────────────────────────────────────────────────
    function drawAurora(t: number) {
      [
        { yBase: 0.18, yBot: 0.48, tint: '0,200,255', tintBot: '0,80,200', alpha: 0.10 },
        { yBase: 0.06, yBot: 0.34, tint: '140,0,255', tintBot: '80,0,180', alpha: 0.07 },
      ].forEach(({ yBase, yBot, tint, tintBot, alpha }) => {
        ctx.save();
        ctx.globalAlpha = alpha;
        const g = ctx.createLinearGradient(0, 0, 0, H * 0.6);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(0.3, `rgba(${tint},0.9)`);
        g.addColorStop(0.8, `rgba(${tintBot},0.5)`);
        g.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.moveTo(0, H * yBase + Math.sin(t * 0.28) * 28);
        for (let x = 0; x <= W; x += 35) {
          const y = H * yBase + Math.sin(t * 0.28 + x * 0.004) * 44 + Math.sin(t * 0.52 + x * 0.007) * 20;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H * yBot);
        for (let x = W; x >= 0; x -= 35) {
          const y = H * yBot + Math.sin(t * 0.19 + x * 0.005) * 26;
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = g;
        ctx.fill();
        ctx.restore();
      });
    }

    // ── Main render ───────────────────────────────────────────────────────
    function render() {
      animId = requestAnimationFrame(render);
      frame++;

      // Smooth mouse
      mouseX += (targetMX - mouseX) * 0.05;
      mouseY += (targetMY - mouseY) * 0.05;

      const t = frame / 60;

      // ── Background ────────────────────────────────────────────────────
      const bg = ctx.createRadialGradient(
        W * 0.45 + Math.sin(t * 0.07) * 60, H * 0.3 + Math.cos(t * 0.05) * 40, 0,
        W * 0.5, H * 0.5, Math.max(W, H) * 0.9
      );
      bg.addColorStop(0, '#070d1e');
      bg.addColorStop(0.4, '#030810');
      bg.addColorStop(1, '#000007');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      drawNebulae(t);
      drawGrid(t);
      drawAurora(t);

      // ── Particles ─────────────────────────────────────────────────────
      // Sort back-to-front for correct glow overlap
      particles.sort((a, b) => b.z - a.z);

      for (const p of particles) {
        // Advance life
        p.life++;
        if (p.life >= p.maxLife) {
          Object.assign(p, makeParticle(W, H));
          p.life = 0;
          continue;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Mouse-driven swirl (very subtle)
        const mx = (targetMX - W / 2) / W;
        const my = (targetMY - H / 2) / H;
        p.vx += mx * 0.0018;
        p.vy += my * 0.0018;
        // Dampen
        p.vx *= 0.998;
        p.vy *= 0.998;

        // Respawn when too close
        if (p.z <= 0) {
          Object.assign(p, makeParticle(W, H));
          p.life = 0;
          continue;
        }

        // Life-based alpha envelope (fade in / sustain / fade out)
        const lifeRatio = p.life / p.maxLife;
        const FADE_IN = 0.12;
        const FADE_OUT = 0.82;
        if (lifeRatio < FADE_IN) {
          p.alpha = lifeRatio / FADE_IN;
        } else if (lifeRatio > FADE_OUT) {
          p.alpha = 1 - (lifeRatio - FADE_OUT) / (1 - FADE_OUT);
        } else {
          p.alpha = 1;
        }

        const { sx, sy, scale } = project(p);
        if (sx < -50 || sx > W + 50 || sy < -50 || sy > H + 50) continue;

        p.size = p.baseSize * scale * 2.2;

        // Depth-based brightness
        const bright = 0.5 + scale * 0.5;
        const r = Math.min(255, Math.round(p.r * bright + 40));
        const g = Math.min(255, Math.round(p.g * bright + 20));
        const b = Math.min(255, Math.round(p.b * bright + 60));
        const a = p.alpha * (0.6 + scale * 0.4);

        // Glow (outer soft halo)
        const glowR = p.size * (3.5 - scale * 1.5);
        if (glowR > 0.3) {
          const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
          grd.addColorStop(0, `rgba(${r},${g},${b},${(a * 0.35).toFixed(3)})`);
          grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core dot
        ctx.save();
        ctx.globalAlpha = a;
        ctx.shadowBlur = p.size * 5;
        ctx.shadowColor = `rgb(${r},${g},${b})`;
        ctx.fillStyle = `rgba(${r},${g},${b},1)`;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.4, p.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── Vignette ──────────────────────────────────────────────────────
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, Math.max(W, H) * 0.75);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.62)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // ── HUD corners ───────────────────────────────────────────────────
      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 1.2;
      const L = 36;
      [[20, 20, 1, 1], [W - 20, 20, -1, 1], [20, H - 20, 1, -1], [W - 20, H - 20, -1, -1]].forEach(
        ([cx, cy, dx, dy]) => {
          ctx.beginPath(); ctx.moveTo(cx, cy + dy * L); ctx.lineTo(cx, cy); ctx.lineTo(cx + dx * L, cy); ctx.stroke();
        }
      );
      ctx.restore();
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
}
