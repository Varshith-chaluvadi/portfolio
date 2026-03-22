import { useEffect, useRef } from "react";
import { ABOUT_ME, NAME } from "../utils/AppConstants";
import { useAppContext } from "../utils/AppContext";

import BottomNav from "./homeutils/BottomNav";
import Experience from "./homeutils/Experience";
import Projects from "./homeutils/Projects";
import CertificationsSection from "./homeutils/Certifications";
import SkillsSection from "./homeutils/Skills";
import AboutSection from "./homeutils/AboutSection";
import HeroAnimations from "../utils/HeroAnimations";
import Animate from "../utils/animations/Animate";
import ExpertiseCard from "../utils/ExpertiseCard";
import DownwArrow from "../utils/DownArraow";

function Home() {

  const expertise = [
    {
      icon: "AI",
      desc: "Build intelligent systems using machine learning and deep learning models for prediction, automation, and decision making.",
      heading: "Artificial",
      headingContemt: "Intelligence",
    },
    {
      icon: "NLP",
      desc: "Experienced in NLP preprocessing, sentiment analysis, NER, summarization, and transformer-based models like BERT.",
      heading: "Natural Language",
      headingContemt: "Processing",
    },
    {
      icon: "ML",
      desc: "Develop ML models including Logistic Regression, SVM, Naive Bayes, Random Forest and optimize them using hyperparameter tuning.",
      heading: "Machine",
      headingContemt: "Learning",
    },
    {
      icon: "DATA",
      desc: "Analyze datasets using Pandas, NumPy and create interactive visualizations with Plotly and Streamlit dashboards.",
      heading: "Data",
      headingContemt: "Science",
    },
    {
      icon: "WEB",
      desc: "Develop AI powered web applications using Flask, Streamlit and modern frontend frameworks.",
      heading: "AI Web",
      headingContemt: "Applications",
    },
    {
      icon: "DEPLOY",
      desc: "Deploy AI and ML applications using GitHub, Vercel and cloud platforms with scalable architecture.",
      heading: "AI Model",
      headingContemt: "Deployment",
    },
  ];

  const { scrollView, dispatch } = useAppContext();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const temp = scrollView;
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: "smooth" });
      dispatch({ type: "setScrollView", payload: undefined });
    }
    localStorage.setItem("selectedProject", "");
    dispatch({ type: "setScrollView", payload: temp });
  }, [scrollView, targetDivRef]);

  function handleHireMeClick() {
    if (resumeRef?.current) {
      (resumeRef as any).current.click();
    }
  }

  return (
    <div className="w-full h-full flex flex-col">

      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════════════ */}
      <div className="min-h-[100vh] flex flex-col relative overflow-hidden pt-16 lg:pt-20">

        {/* Subtle dark overlay so particles stay readable */}
        <div className="absolute inset-0 bg-black/55" />

        {/* All decorative GSAP animations (rings, orbs, brackets, counters…) */}
        <HeroAnimations />

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 gap-6 pt-8 pb-20">

          {/* ── Role badge ─────────────────────────────────────────── */}
          <Animate delay={200} type="slideDown">
            <div className="flex items-center gap-2 border border-cyan-500/30 rounded-full px-4 py-1.5 bg-cyan-500/8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 text-xs lg:text-sm font-mono tracking-wider">
                AI &amp; ML Engineer · Open to Opportunities
              </span>
            </div>
          </Animate>

          {/* ── Name ───────────────────────────────────────────────── */}
          <Animate delay={400}>
            <h1
              className="typewriter font-bold text-center leading-tight"
              style={{ fontSize: "clamp(26px, 5.2vw, 88px)" }}
            >
              {NAME.toUpperCase()}
            </h1>
          </Animate>

          {/* ── Tagline ────────────────────────────────────────────── */}
          <Animate delay={600}>
            <p className="text-center text-foreground/70 max-w-[65vw] lg:max-w-[50vw] text-base lg:text-xl leading-relaxed">
              {ABOUT_ME}
            </p>
          </Animate>

          {/* ── Animated role chips ────────────────────────────────── */}
          <Animate delay={700}>
            <div className="flex flex-wrap gap-2 justify-center mt-1">
              {["NLP", "Deep Learning", "Data Science", "Computer Vision", "React"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] lg:text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-foreground/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Animate>

          {/* ── CTA buttons ────────────────────────────────────────── */}
          <Animate delay={800}>
            <div className="flex gap-4 mt-2">
              <div
                onClick={handleHireMeClick}
                className="cursor-pointer bg-cyan-400 hover:bg-cyan-300 text-black font-semibold
                           px-6 lg:px-10 py-2.5 lg:py-3 rounded-full text-sm lg:text-base
                           transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Download Resume
              </div>
              <div
                onClick={() => {
                  dispatch({ type: "setScrollView", payload: "WORK" });
                  setTimeout(() => dispatch({ type: "setScrollView", payload: undefined }), 400);
                }}
                className="cursor-pointer border border-cyan-400/40 hover:border-cyan-400 text-cyan-400
                           px-6 lg:px-10 py-2.5 lg:py-3 rounded-full text-sm lg:text-base
                           transition-all duration-300 hover:scale-105 hover:bg-cyan-400/5"
              >
                View Work
              </div>
            </div>
          </Animate>

          <a href="/resume.pdf" download="Varshith_Chaluvadi_Resume.pdf" ref={resumeRef} className="hidden">Resume</a>

          {/* ── Scroll indicator ───────────────────────────────────── */}
          <Animate delay={1000}>
            <div
              className="mt-4 cursor-pointer"
              onClick={() => {
                dispatch({ type: "setScrollView", payload: "ABOUT" });
                setTimeout(() => dispatch({ type: "setScrollView", payload: undefined }), 400);
              }}
            >
              <DownwArrow />
            </div>
          </Animate>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          REST OF PAGE
      ══════════════════════════════════════════════════════════════ */}
      <div className="bg-transparent w-full">

        {/* About & Education — immediately after hero */}
        <div ref={scrollView === "ABOUT" ? targetDivRef : null}>
          <AboutSection />
        </div>

        {/* Expertise */}
        <div
          ref={scrollView === "EXPERTISE" ? targetDivRef : null}
          className="mt-[14vh] font-bold w-full flex items-center justify-center text-4xl"
        >
          <Animate delay={250} type="slideLeft">
            <h1>My Expertise</h1>
          </Animate>
        </div>

        <div className="px-4 mt-[6vh]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {expertise?.map((item, index) => (
              <ExpertiseCard
                key={index}
                icon={item.icon as never}
                heading={item.heading as never}
                headingContemt={item.headingContemt as never}
                desc={item.desc as never}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        <div ref={scrollView === "SKILLS" ? targetDivRef : null}>
          <SkillsSection />
        </div>

        <div ref={scrollView === "WORK" ? targetDivRef : null} className="pb-[5vh]">
          <Projects />
        </div>

        <div ref={scrollView === "CERTIFICATIONS" ? targetDivRef : null}>
          <CertificationsSection />
        </div>

        <div ref={scrollView === "EXPERIENCE" ? targetDivRef : null}>
          <Experience />
        </div>

        <div ref={scrollView === "CONTACT" ? targetDivRef : null}>
          <BottomNav />
        </div>

      </div>
    </div>
  );
}

export default Home;