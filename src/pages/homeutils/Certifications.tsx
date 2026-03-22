import { useEffect, useRef } from "react";
import {
  Award, CheckCircle, BookOpen, GraduationCap, Sparkles, ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    id: 1,
    title: "AI-Powered NLP",
    issuer: "Algo Tutor Academy",
    description: "Advanced Natural Language Processing including transformers, BERT and GPT models for real-world text tasks.",
    link: "https://drive.google.com/file/d/1zGQ7SLqLv1TLawymoHz_d0KWP5r27xwi/view",
    skills: ["NLP", "Transformers", "BERT", "GPT"],
    gradient: "from-cyan-500 to-blue-600",
    glow: "rgba(0,200,255,0.22)",
    icon: Sparkles,
    year: "Aug 2025",
  },
  {
    id: 2,
    title: "Advanced Data Science & Generative AI",
    issuer: "Algo Tutor Academy",
    description: "Comprehensive training in data science methodologies and generative AI including LLMs and diffusion models.",
    link: "https://drive.google.com/file/d/1DCmITMfX3nyG_MLRvMfX58U_JAhOnci_/view",
    skills: ["Data Science", "GenAI", "LLMs", "ML"],
    gradient: "from-purple-500 to-pink-600",
    glow: "rgba(168,85,247,0.22)",
    icon: GraduationCap,
    year: "Aug 2025",
  },
  {
    id: 3,
    title: "Responsive Web Design",
    issuer: "NxtWave",
    description: "Modern responsive web design using HTML, CSS, Flexbox and Grid for building adaptive, mobile-first layouts.",
    link: "https://drive.google.com/file/d/1_YusSlJ_hMWzK-dlTBJS5p2TzVul5jP2/view",
    skills: ["HTML5", "CSS3", "Flexbox", "Responsive"],
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(52,211,153,0.22)",
    icon: Award,
    year: "Nov 2024",
  },
  {
    id: 4,
    title: "Static Web Design",
    issuer: "NxtWave",
    description: "Fundamentals of static web design including semantic HTML, CSS styling and building clean web pages.",
    link: "https://drive.google.com/file/d/1irFah-VEwqxFk-w9uL8UXPa_4flBNOam/view",
    skills: ["HTML", "CSS", "Web Design", "UI"],
    gradient: "from-orange-500 to-red-600",
    glow: "rgba(249,115,22,0.22)",
    icon: BookOpen,
    year: "Apr 2024",
  },
];

function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        ".certs-heading",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".certs-heading", start: "top 85%", toggleActions: "play none none reverse" },
        }
      );

      // Cards: cascade with alternating slide directions
      gsap.fromTo(
        ".cert-card",
        { y: 80, opacity: 0, scale: 0.88 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.75, stagger: { each: 0.13, from: "start" }, ease: "power3.out",
          scrollTrigger: { trigger: ".certifications-grid", start: "top 80%", toggleActions: "play none none reverse" },
        }
      );

      // Skill tags pop in after cards
      gsap.fromTo(
        ".skill-tag",
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.4, stagger: 0.03, ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".certifications-grid", start: "top 55%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="certifications" className="py-24 px-6 max-w-7xl mx-auto">

      <div className="certs-heading text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Award className="w-9 h-9 text-cyan-400" />
          <h2 className="text-4xl lg:text-5xl font-bold">
            Professional <span className="text-cyan-400">Certifications</span>
          </h2>
        </div>
        <p className="text-foreground/60">
          Verified credentials demonstrating expertise in AI and web development
        </p>
      </div>

      <div className="certifications-grid grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="cert-card group rounded-2xl border border-white/10 p-6 bg-black/40
                       backdrop-blur-sm transition-all duration-500 flex flex-col"
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.boxShadow = `0 12px 40px ${cert.glow}`;
              el.style.transform = 'scale(1.03) translateY(-5px)';
              el.style.borderColor = cert.glow.replace('0.22)', '0.45)');
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.boxShadow = '';
              el.style.transform = '';
              el.style.borderColor = '';
            }}
          >
            <div className="flex justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${cert.gradient}`}>
                <cert.icon className="text-white" size={22} />
              </div>
              <span className="text-xs text-foreground/50 font-mono">{cert.year}</span>
            </div>

            <h3 className="text-lg font-bold mb-1">{cert.title}</h3>

            <p className={`text-sm font-semibold bg-gradient-to-r ${cert.gradient} bg-clip-text text-transparent`}>
              {cert.issuer}
            </p>

            <p className="text-sm text-foreground/60 mt-2 flex-1">{cert.description}</p>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-tag px-2 py-0.5 text-xs rounded-full bg-white/8 border border-white/10 text-foreground/70"
                >
                  {skill}
                </span>
              ))}
            </div>

            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between mt-5 border border-white/15 py-2 px-3 rounded-lg
                         hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-sm"
            >
              <span className="flex items-center gap-2">
                <CheckCircle size={15} className="text-green-400" />
                View Certificate
              </span>
              <ChevronRight size={15} />
            </a>
          </div>
        ))}
      </div>

    </section>
  );
}

export default CertificationsSection;