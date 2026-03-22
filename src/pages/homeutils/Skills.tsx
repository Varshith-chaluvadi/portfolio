import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Languages",
    color: "#00d4ff",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 75 },
      { name: "C", level: 80 },
      { name: "C++", level: 78 },
      { name: "SQL", level: 82 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    color: "#7b68ee",
    skills: [
      { name: "React", level: 85 },
      { name: "NodeJS", level: 80 },
      { name: "Bootstrap", level: 85 },
      { name: "Flask", level: 88 },
      { name: "Streamlit", level: 90 },
    ],
  },
  {
    title: "Tools / Platforms",
    color: "#ff6b9d",
    skills: [
      { name: "MySQL", level: 82 },
      { name: "MongoDB", level: 78 },
      { name: "Git/GitHub", level: 88 },
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 85 },
    ],
  },
  {
    title: "Soft Skills",
    color: "#00ff88",
    skills: [
      { name: "Problem-Solving", level: 90 },
      { name: "Team Player", level: 88 },
      { name: "Adaptability", level: 85 },
      { name: "Communication", level: 80 },
      { name: "Analytical Thinking", level: 88 },
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

      const bars = document.querySelectorAll<HTMLElement>(".skill-bar-fill");

      bars.forEach((bar) => {
        const level = bar.dataset.level;

        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${level}%`,
            duration: 1.5,
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
            },
          }
        );
      });

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

            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name}>

                  <div className="flex justify-between mb-1 text-sm">
                    <span>{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>

                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="skill-bar-fill h-full rounded-full"
                      data-level={skill.level}
                      style={{
                        background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`
                      }}
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

export default SkillsSection;