import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/projectDetail";
import Animate from "./utils/animations/Animate";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import AppSpinner from "./utils/AppSpinner";
import { useEffect, useState } from "react";
import useImageLoader from "./hooks/appHooks";
import FuturisticBackground from "./utils/FuturisticBackground";
import NavBar from "./utils/NavBar";

function App() {
  const selectedProject = localStorage.getItem("selectedProject");
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);

  function handleEmailClick() {
    const mailtoUrl =
      "mailto:varshithchaluvadi@gmail.com?subject=AI/ML Collaboration";
    window.open(mailtoUrl);
  }

  function handleOpenSocialLink(type: string) {
    switch (type) {
      case "GITHUB":
        window.open("https://github.com/Varshith-chaluvadi");
        break;
      case "LINKEDIN":
        window.open("https://www.linkedin.com/in/varshithchaluvadi/");
        break;
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useImageLoader();

  return (
    <div className="relative min-h-screen cursor-default text-foreground scroll-smooth">
      {/* Futuristic Background */}
      <FuturisticBackground />



      {/* Loading Spinner */}
      {loading && <AppSpinner />}

      {/* ── Global Navigation Bar (all pages) ── */}
      <div
        className={`fixed top-0 inset-x-0 z-[30] transition-opacity duration-300 ${
          location.pathname === "/" ? "opacity-100" : "opacity-50 grayscale-[30%]"
        }`}
      >
        <NavBar />
      </div>

      {/* Overlay Elements */}
      {(!selectedProject ||
        selectedProject === "null" ||
        location.pathname === "/") && (
        <>
          {/* Dark overlay */}
          <div className="fixed inset-0 bg-black/70 z-[1]"></div>

          {/* Animated circle */}
          <div className="circle h-[50px] w-[50px] rounded-full z-[2] absolute top-[22.5vh] left-[56vw] animate-move-left-right"></div>

          {/* Social Links */}
          <div className="fixed z-[20] bottom-10 flex-row justify-between w-full px-[2vw] hidden lg:flex pointer-events-none">
            
            <div className="pointer-events-auto">
              <Animate delay={700}>
                <div className="flex flex-row gap-6 rotate-90 items-center ml-[-12vw] justify-center">

                  <div className="text-center flex items-center justify-center gap-4">

                    <h3
                      onClick={() => handleOpenSocialLink("GITHUB")}
                      className="-rotate-90 flex items-center bg-foreground/10 rounded-md px-3 py-2 cursor-pointer lg:hover:bg-foreground/20 lg:hover:scale-105"
                    >
                      <FaGithub className="h-6 w-5" />
                    </h3>

                    <h3
                      onClick={() => handleOpenSocialLink("LINKEDIN")}
                      className="-rotate-90 flex items-center bg-foreground/10 rounded-md px-3 py-2 cursor-pointer lg:hover:bg-foreground/20 lg:hover:scale-105"
                    >
                      <CiLinkedin className="h-6 w-5" />
                    </h3>

                  </div>

                  <div className="w-[17vw] h-[1px] bg-[#02ffff]"></div>

                </div>
              </Animate>
            </div>

            <div className="pointer-events-auto">
              <Animate delay={700}>
                <div className="flex flex-row gap-6 rotate-90 items-center -mr-[11vw]">

                  <div
                    onClick={handleEmailClick}
                    className="text-xs cursor-pointer lg:hover:scale-105 lg:hover:text-primary"
                  >
                    varshithchaluvadi@gmail.com
                  </div>

                  <div className="w-[10vw] h-[1px] bg-[#02ffff]"></div>

                </div>
              </Animate>
            </div>

          </div>
        </>
      )}

      {/* Pages */}
      <div className="relative z-[10]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projectdetail" element={<ProjectDetail />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;