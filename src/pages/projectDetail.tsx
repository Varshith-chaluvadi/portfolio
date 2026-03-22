import { projectType, useAppContext } from "../utils/AppContext";

import { MdChevronRight } from "react-icons/md";
import BottomNav from "./homeutils/BottomNav";
import Animate from "../utils/animations/Animate";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectData } from "../utils/projectData";

function ProjectDetail() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const selectedProject: projectType =
    projectData[localStorage.getItem("selectedProject") as never];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-transparent pt-20 pl-2">

        <div className="mt-[5vh] px-[5vw]">

          {/* Project Title */}
          <Animate delay={150} type="slideLeft">
            <h1 className="text-[40px] font-semibold">
              {selectedProject?.projectTitle}
            </h1>
          </Animate>

          <div className="mt-[5vh] mb-[5vh]">

            {/* Breadcrumb */}
            <Animate delay={300} type="slideLeft">
              <div className="flex text-foreground/60 items-center">

                <span
                  onClick={() => {
                    localStorage.setItem("selectedProject", null as never);

                    dispatch({
                      type: "setScrollView",
                      payload: "WORK",
                    });

                    navigate("/");
                  }}
                  className="cursor-pointer lg:hover:scale-105 lg:hover:border-b border-primary lg:hover:text-primary"
                >
                  Home
                </span>

                <MdChevronRight className="w-6 h-6" />

                {selectedProject?.projectTitle}

              </div>
            </Animate>

            <div className="flex flex-col lg:flex-row lg:justify-between">

              {/* Description */}
              <Animate delay={500} type="slideLeft">
                <div className="mt-[5vh]">

                  <p className="text-foreground/90 lg:w-[50vw]">
                    {selectedProject?.projectDesc}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-6">

                    {selectedProject?.viewCode && (
                      <a
                        href={selectedProject?.viewCodeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-black px-5 py-2 rounded-md hover:scale-105"
                      >
                        GitHub
                      </a>
                    )}

                    {selectedProject?.openProject && (
                      <a
                        href={selectedProject?.openProjectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-primary px-5 py-2 rounded-md hover:bg-primary hover:text-black"
                      >
                        Live Demo
                      </a>
                    )}

                  </div>

                </div>
              </Animate>

              {/* Project Info */}
              <div className="flex flex-col gap-4">

                <div className="mt-[5vh] flex justify-between gap-10">

                  <Animate delay={300} type="slideUp">
                    <div className="border-t border-foreground/40 pt-5 w-[40vw] lg:w-[10vw]">

                      <h1>Strategy</h1>

                      <div className="flex flex-col mt-1">
                        {selectedProject?.strategy?.map((item, index) => (
                          <h2 className="text-foreground/70" key={index}>
                            {item}
                          </h2>
                        ))}
                      </div>

                    </div>
                  </Animate>

                  <Animate delay={600} type="slideUp">
                    <div className="border-t border-foreground/40 w-[40vw] lg:w-[10vw] pt-5">

                      <h1>Type</h1>

                      <div className="flex flex-col mt-1">
                        <h2 className="text-foreground/70">
                          {selectedProject?.client}
                        </h2>
                      </div>

                    </div>
                  </Animate>

                </div>

                <div className="mt-[5vh] flex justify-between gap-10">

                  <Animate delay={500} type="slideUp">
                    <div className="border-t border-foreground/40 pt-5 w-[40vw] lg:w-[10vw]">

                      <h1>Technology</h1>

                      <div className="flex flex-col mt-1">
                        <h2 className="text-foreground/70">
                          {selectedProject?.technology}
                        </h2>
                      </div>

                    </div>
                  </Animate>

                </div>

              </div>
            </div>

            {/* Images */}
            <div
              className={`mt-[5vh] justify-center items-center ${
                selectedProject?.mobileView
                  ? "flex flex-col lg:flex-row gap-4"
                  : "flex flex-col gap-3 w-full"
              }`}
            >

              {selectedProject?.images?.map((item, index) => (

                <Animate type="slideLeft" delay={index * 200} key={index}>

                  <img
                    className={`rounded-sm ${
                      selectedProject?.mobileView
                        ? "h-[60vh] w-[60vw] lg:h-[50vh] lg:w-[14vw]"
                        : "lg:w-[60vw] lg:h-[50vh]"
                    }`}
                    src={item}
                  />

                </Animate>

              ))}

            </div>

          </div>
        </div>

        <div className="pb-[3vh] mt-[10vh]">
          <BottomNav />
        </div>

      </div>
    </div>
  );
}

export default ProjectDetail;