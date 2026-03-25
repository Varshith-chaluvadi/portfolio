// v2 - skills displayed as badges, no percentages
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Languages",
    color: "#00d4ff",
    skills: [
      { name: "Python" },
      { name: "Java" },
      { name: "C" },
      { name: "C++" },
      { name: "SQL" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    color: "#7b68ee",
    skills: [
      { name: "React" },
      { name: "NodeJS" },
      { name: "Bootstrap" },
      { name: "Flask" },
      { name: "Streamlit" },
    ],
  },
  {
    title: "Tools / Platforms",
    color: "#ff6b9d",
    skills: [
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Git/GitHub" },
      { name: "Pandas" },
      { name: "NumPy" },
    ],
  },
  {
    title: "Soft Skills",
    color: "#00ff88",
    skills: [
      { name: "Problem-Solving" },
      { name: "Team Player" },
      { name: "Adaptability" },
      { name: "Communication" },
      { name: "Analytical Thinking" },
    ],
  },
];

function SkillsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-category",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 px-6 max-w-6xl mx-auto"
    >

      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">
          Technical <span className="text-cyan-400">Skills</span>
        </h2>

        <p className="text-gray-400">
          Technologies and tools I use to build intelligent systems
        </p>
      </div>

      {/* Skills Grid */}
      <div className="skills-grid grid md:grid-cols-2 gap-8">

        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="skill-category bg-black/40 border border-gray-700 rounded-2xl p-6 hover:scale-[1.02] transition"
          >
            <h3
              className="text-xl font-bold mb-6 flex items-center gap-3"
              style={{ color: category.color }}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: category.color,
                  boxShadow: `0 0 10px ${category.color}`,
                }}
              />
              {category.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-4 py-1.5 rounded-full text-sm font-medium border"
                  style={{
                    borderColor: `${category.color}60`,
                    color: category.color,
                    backgroundColor: `${category.color}10`,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

export default SkillsSection;