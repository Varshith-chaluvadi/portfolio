import { useEffect, useRef } from "react";
import {
  Trophy, Medal, Code, Award, ExternalLink, Flame, Zap, Star,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    id: 1,
    title: "LeetCode 50 Days Coding Badge",
    subtitle: "Consistent Problem Solver",
    description: "Achieved the LeetCode 50 Days coding badge demonstrating consistent problem-solving practice and algorithmic proficiency.",
    icon: Flame,
    platform: "LeetCode",
    link: "https://leetcode.com/u/Naga_Venkata_Sai/",
    gradient: "from-amber-500 to-orange-600",
    glow: "rgba(251,146,60,0.25)",
    stats: { problems: "200+", streak: "50 days", date: "Nov 2025" },
  },
  {
    id: 2,
    title: "HackerRank Gold Badge – Python",
    subtitle: "Expert Level Proficiency",
    description: "Earned the HackerRank Gold Badge on Python Programming, showcasing dedication, coding proficiency and active participation in the coding community.",
    icon: Medal,
    platform: "HackerRank",
    link: "https://www.hackerrank.com/profile/nagavenkatasaip1",
    gradient: "from-yellow-400 to-amber-500",
    glow: "rgba(234,179,8,0.25)",
    stats: { stars: "5/5", level: "Gold", date: "Oct 2025" },
  },
];

const summaryStats = [
  { label: "Total Badges", value: "2+", icon: Award, color: "#facc15" },
  { label: "Problems Solved", value: "200+", icon: Code, color: "#34d399" },
  { label: "Platforms", value: "2+", icon: Zap, color: "#60a5fa" },
  { label: "Ranking", value: "Top 15%", icon: Star, color: "#f472b6" },
];

function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        ".achievements-heading",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".achievements-heading", start: "top 85%", toggleActions: "play none none reverse" },
        }
      );

      // Cards — fly in from bottom with rotation
      gsap.fromTo(
        ".achievement-card",
        { y: 100, opacity: 0, rotateX: 15, scale: 0.9 },
        {
          y: 0, opacity: 1, rotateX: 0, scale: 1,
          duration: 0.85, stagger: 0.18, ease: "power3.out",
          scrollTrigger: { trigger: ".achievements-grid", start: "top 80%", toggleActions: "play none none reverse" },
        }
      );

      // Stat counters — pop in
      gsap.fromTo(
        ".stat-counter",
        { y: 30, opacity: 0, scale: 0.8 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.6, stagger: 0.12, ease: "back.out(1.5)",
          scrollTrigger: { trigger: ".achievements-stats", start: "top 85%", toggleActions: "play none none reverse" },
        }
      );

      // Subtle floating animation on the trophy icon
      gsap.to(".achievements-trophy", {
        y: -8, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="achievements" className="py-24 px-6 max-w-7xl mx-auto">

      {/* Heading */}
      <div className="achievements-heading text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Trophy className="achievements-trophy text-yellow-400 w-10 h-10" />
          <h2 className="text-4xl lg:text-5xl font-bold">
            Awards &amp; <span className="text-yellow-400">Achievements</span>
          </h2>
        </div>
        <p className="text-foreground/60">Recognized excellence in competitive programming</p>
      </div>

      {/* Cards */}
      <div className="achievements-grid grid md:grid-cols-2 gap-6">
        {achievements.map((a) => (
          <div
            key={a.id}
            className="achievement-card group rounded-2xl border border-white/10 p-6 bg-black/40
                       backdrop-blur-sm transition-all duration-500 cursor-default"
            style={{ perspective: 800 }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px ${a.glow}`;
              (e.currentTarget as HTMLDivElement).style.borderColor = a.glow.replace('0.25)', '0.5)');
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.025) translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '';
              (e.currentTarget as HTMLDivElement).style.borderColor = '';
              (e.currentTarget as HTMLDivElement).style.transform = '';
            }}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${a.gradient} flex-shrink-0`}>
                <a.icon className="text-white" size={28} />
              </div>
              <div>
                <span className="text-xs text-foreground/50">{a.platform}</span>
                <h3 className="text-xl font-bold">{a.title}</h3>
                <p className="text-sm text-foreground/60">{a.subtitle}</p>
              </div>
            </div>

            <p className="text-foreground/60 text-sm mt-4">{a.description}</p>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {Object.entries(a.stats).map(([key, value]) => (
                <div key={key} className="text-center p-2 rounded-lg bg-white/5">
                  <div className="text-sm font-bold text-yellow-400">{value}</div>
                  <div className="text-xs text-foreground/50 capitalize">{key}</div>
                </div>
              ))}
            </div>

            <a
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-5 border border-white/15 py-2 rounded-lg
                         hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-sm"
            >
              View Profile <ExternalLink size={15} />
            </a>
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="achievements-stats mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryStats.map((s) => (
          <div
            key={s.label}
            className="stat-counter text-center p-5 rounded-2xl border border-white/10 bg-white/5
                       backdrop-blur-sm hover:scale-105 transition-transform duration-300"
          >
            <s.icon className="mx-auto mb-3 w-6 h-6" style={{ color: s.color }} />
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-foreground/50 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default AchievementsSection;