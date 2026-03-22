import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroAnimations() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* ── Orbital rings ─────────────────────────────────────────────── */
      gsap.to(".hero-ring-1", {
        rotation: 360, duration: 18, repeat: -1, ease: "none", transformOrigin: "50% 50%",
      });
      gsap.to(".hero-ring-2", {
        rotation: -360, duration: 28, repeat: -1, ease: "none", transformOrigin: "50% 50%",
      });
      gsap.to(".hero-ring-3", {
        rotation: 360, duration: 40, repeat: -1, ease: "none", transformOrigin: "50% 50%",
      });

      /* ── Floating orbs ─────────────────────────────────────────────── */
      gsap.to(".hero-orb-1", { y: -22, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hero-orb-2", { y: 18, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.8 });
      gsap.to(".hero-orb-3", { y: -14, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });

      /* ── Data-stream dots ──────────────────────────────────────────── */
      gsap.fromTo(".data-dot",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power2.out", delay: 0.5 }
      );
      gsap.to(".data-dot", {
        opacity: 0.2, duration: 1.4, repeat: -1, yoyo: true, stagger: 0.2, delay: 1.5,
      });

      /* ── Corner brackets ───────────────────────────────────────────── */
      gsap.fromTo(".hero-bracket",
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.3 }
      );

      /* ── Scanline ──────────────────────────────────────────────────── */
      gsap.fromTo(".hero-scanline",
        { y: "-100%" },
        { y: "200%", duration: 3.5, ease: "none", repeat: -1, delay: 1 }
      );

      /* ── Tech labels ───────────────────────────────────────────────── */
      gsap.fromTo(".tech-label",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power2.out", delay: 0.8 }
      );

      /* ── Stat counter rows (scoped inline tween) ───────────────────── */
      root.querySelectorAll<HTMLElement>(".hero-counter").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") ?? "0", 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          delay: 1,
          onUpdate() {
            el.textContent = Math.round(obj.val) + "+";
          },
        });
      });

    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden pointer-events-none select-none">

      {/* ── Orbital rings ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="hero-ring-1 absolute w-[380px] h-[380px] lg:w-[620px] lg:h-[620px]"
          viewBox="0 0 620 620"
        >
          <ellipse cx="310" cy="310" rx="290" ry="116"
            stroke="rgba(0,229,255,0.18)" strokeWidth="1.2" fill="none" strokeDasharray="6 12" />
          <circle cx="600" cy="310" r="5" fill="#00e5ff" opacity="0.9" />
        </svg>

        <svg
          className="hero-ring-2 absolute w-[300px] h-[300px] lg:w-[500px] lg:h-[500px]"
          viewBox="0 0 500 500"
          style={{ transform: "rotate(60deg)" }}
        >
          <ellipse cx="250" cy="250" rx="235" ry="84"
            stroke="rgba(168,85,247,0.15)" strokeWidth="1" fill="none" strokeDasharray="4 10" />
          <circle cx="485" cy="250" r="4" fill="#a855f7" opacity="0.85" />
        </svg>

        <svg
          className="hero-ring-3 absolute w-[230px] h-[230px] lg:w-[400px] lg:h-[400px]"
          viewBox="0 0 400 400"
          style={{ transform: "rotate(-30deg)" }}
        >
          <ellipse cx="200" cy="200" rx="186" ry="65"
            stroke="rgba(0,229,160,0.12)" strokeWidth="0.8" fill="none" strokeDasharray="3 8" />
          <circle cx="386" cy="200" r="3.5" fill="#00e5a0" opacity="0.8" />
        </svg>
      </div>

      {/* ── Floating orbs ──────────────────────────────────────────────── */}
      <div
        className="hero-orb-1 absolute top-[18%] left-[8%] lg:left-[12%] w-3 h-3 rounded-full"
        style={{ background: "#00e5ff", boxShadow: "0 0 22px 6px rgba(0,229,255,0.45)" }}
      />
      <div
        className="hero-orb-2 absolute top-[30%] right-[9%] lg:right-[14%] w-2.5 h-2.5 rounded-full"
        style={{ background: "#a855f7", boxShadow: "0 0 18px 5px rgba(168,85,247,0.4)" }}
      />
      <div
        className="hero-orb-3 absolute bottom-[32%] left-[15%] lg:left-[20%] w-2 h-2 rounded-full"
        style={{ background: "#00e5a0", boxShadow: "0 0 14px 4px rgba(0,229,160,0.4)" }}
      />

      {/* ── Data-stream dots (left edge, desktop only) ─────────────────── */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 lg:flex flex-col gap-3 pl-4 hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="data-dot w-1.5 h-1.5 rounded-full bg-cyan-400" />
        ))}
      </div>

      {/* ── Scanline ───────────────────────────────────────────────────── */}
      <div
        className="hero-scanline absolute inset-x-0 h-[2px]"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0,229,255,0.07), transparent)",
        }}
      />

      {/* ── Corner HUD brackets ────────────────────────────────────────── */}
      <svg className="hero-bracket absolute top-6 left-6 w-10 h-10" viewBox="0 0 40 40">
        <path d="M0 14 L0 0 L14 0" stroke="rgba(0,229,255,0.55)" strokeWidth="1.5" fill="none" />
      </svg>
      <svg className="hero-bracket absolute top-6 right-6 w-10 h-10" viewBox="0 0 40 40">
        <path d="M40 14 L40 0 L26 0" stroke="rgba(0,229,255,0.55)" strokeWidth="1.5" fill="none" />
      </svg>
      <svg className="hero-bracket absolute bottom-6 left-6 w-10 h-10" viewBox="0 0 40 40">
        <path d="M0 26 L0 40 L14 40" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5" fill="none" />
      </svg>
      <svg className="hero-bracket absolute bottom-6 right-6 w-10 h-10" viewBox="0 0 40 40">
        <path d="M40 26 L40 40 L26 40" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5" fill="none" />
      </svg>

      {/* ── Stat counters (right edge, desktop only) ───────────────────── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 lg:flex flex-col gap-6 hidden">
        {[
          { label: "Projects", target: 2 },
          { label: "Badges", target: 2 },
          { label: "Certs", target: 4 },
        ].map(({ label, target }) => (
          <div key={label} className="text-right">
            <div
              className="hero-counter text-2xl font-bold text-cyan-400"
              data-target={target}
            >
              0+
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest">{label}</div>
          </div>
        ))}
      </div>

      {/* ── Tech labels (bottom-left, desktop only) ────────────────────── */}
      <div className="absolute bottom-16 left-6 lg:flex flex-col gap-2 hidden">
        {["Python", "TensorFlow", "React", "NLP"].map((t) => (
          <span
            key={t}
            className="tech-label text-[10px] text-white/35 font-mono border border-white/10 rounded px-2 py-0.5 w-fit"
          >
            {t}
          </span>
        ))}
      </div>

      {/* ── Subtle horizontal divider at bottom ────────────────────────── */}
      <div className="absolute bottom-[14%] inset-x-0 lg:flex items-center justify-center gap-3 px-8 hidden">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

    </div>
  );
}
