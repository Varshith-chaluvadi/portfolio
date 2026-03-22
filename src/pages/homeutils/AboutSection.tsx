import { useEffect, useRef } from 'react';
import { Brain, Code, Database } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Passionate about NLP, transformers, and building intelligent systems',
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'rgba(0,200,255,0.15)',
  },
  {
    icon: Code,
    title: 'Full Stack Development',
    description: 'Proficient in React, Node.js, Python, and modern web technologies',
    gradient: 'from-purple-500 to-indigo-600',
    glow: 'rgba(140,80,255,0.15)',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'Experience with data pipelines, SQL, and cloud databases',
    gradient: 'from-teal-500 to-emerald-600',
    glow: 'rgba(0,200,160,0.15)',
  },
];

const timeline = [
  {
    year: '2023 – Present',
    institution: 'Lovely Professional University',
    degree: 'B.Tech CSE (DS & ML)',
    score: 'CGPA: 6.42',
    color: '#00e5ff',
  },
  {
    year: '2021 – 2023',
    institution: 'Sarada Educational Institutions',
    degree: 'Intermediate',
    score: '91.5%',
    color: '#a855f7',
  },
  {
    year: '2020 – 2021',
    institution: 'Sri Chaitanya Educational Institutions',
    degree: 'Matriculation',
    score: '100%',
    color: '#00e5ff',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title slide-up
      gsap.fromTo(
        '.about-title',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-title', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );

      // Bio
      gsap.fromTo(
        '.about-bio',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-bio', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );

      // Cards stagger
      gsap.fromTo(
        '.about-card',
        { y: 60, opacity: 0, scale: 0.92 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-cards', start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      );

      // Timeline items
      gsap.fromTo(
        '.timeline-item',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.timeline-container', start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 px-6 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">

        {/* ── Section title ──────────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <h2 className="about-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground/60">About</span>{' '}
            <span className="text-primary">Me</span>
          </h2>
          <p className="about-bio text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            I'm a Data Science & Machine Learning student at Lovely Professional University,
            passionate about Natural Language Processing, Python development, and building
            intelligent systems. Skilled in web technologies and experienced in deploying
            end-to-end ML pipelines with real-world impact.
          </p>
        </div>

        {/* ── Highlight cards ────────────────────────────────────────────────── */}
        <div className="about-cards grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-20 justify-items-center">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="about-card group rounded-2xl border border-white/10 p-6 bg-white/5 backdrop-blur-sm
                         hover:scale-105 transition-all duration-500 cursor-default"
              style={{ boxShadow: `0 0 0 0 ${item.glow}` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${item.glow}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${item.glow}`;
              }}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-r ${item.gradient}`}
              >
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* ── Education timeline ─────────────────────────────────────────────── */}
        <h3 className="text-2xl font-bold text-center mb-10 text-foreground">
          Education Journey
        </h3>

        <div className="timeline-container relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(to bottom, #00e5ff, #a855f7, rgba(0,229,255,0.2))' }}
          />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="timeline-item relative flex flex-col md:flex-row gap-4 md:gap-8">
                  {/* Dot */}
                  <div
                    className="absolute left-5 md:left-1/2 w-4 h-4 rounded-full border-4 border-background -translate-x-1/2"
                    style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }}
                  />

                  {/* Card — alternating sides on desktop */}
                  {isLeft ? (
                    <>
                      <div className="flex-1 md:pr-12 md:text-right">
                        <div className="inline-block rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 ml-10 md:ml-0">
                          <span className="text-sm font-mono" style={{ color: item.color }}>{item.year}</span>
                          <h4 className="font-semibold text-foreground mt-1">{item.institution}</h4>
                          <p className="text-sm text-foreground/60">{item.degree}</p>
                          <p className="text-sm font-semibold mt-1" style={{ color: item.color }}>{item.score}</p>
                        </div>
                      </div>
                      <div className="flex-1 hidden md:block" />
                    </>
                  ) : (
                    <>
                      <div className="flex-1 hidden md:block" />
                      <div className="flex-1 md:pl-12">
                        <div className="inline-block rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 ml-10 md:ml-0">
                          <span className="text-sm font-mono" style={{ color: item.color }}>{item.year}</span>
                          <h4 className="font-semibold text-foreground mt-1">{item.institution}</h4>
                          <p className="text-sm text-foreground/60">{item.degree}</p>
                          <p className="text-sm font-semibold mt-1" style={{ color: item.color }}>{item.score}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
