/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Animate from "../../utils/animations/Animate";
import ProjectCard from "./ProjectCard";
import { useUpdateProjectDetails } from "../../hooks/appHooks";

function Projects() {
  const [selectedType, setSelectedType] = useState<
    "ALL" | "NLP" | "DATA"
  >("ALL");

  const { updateProjectDetails } = useUpdateProjectDetails();

  function handleCallBack(project: string) {
    updateProjectDetails(project);
  }

  return (
    <div className="mt-[10vh] px-4">
      <div className="text-xs flex flex-col gap-5 lg:items-center justify-center lg:gap-2 lg:flex-row hover:text-foreground/50">

        {/* ALL */}
        <Animate type="slideDown" delay={200}>
          <div className="cursor-pointer flex items-center">
            <div
              className="relative flex"
              onClick={() => {
                setSelectedType("NONE" as any);
                setTimeout(() => {
                  setSelectedType("ALL");
                }, 100);
              }}
            >
              <div className="absolute -right-3 text-xs -top-3 text-foreground/40">
                2
              </div>
              <h3
                className={`${
                  selectedType === "ALL"
                    ? "scale-105 border-b border-primary text-primary"
                    : "text-foreground/50"
                } hover:border-b border-primary hover:scale-105 hover:text-primary`}
              >
                All Projects
              </h3>
            </div>
            <div className="ml-4 lg:ml-2"> /</div>
          </div>
        </Animate>

        {/* NLP */}
        <Animate type="slideDown" delay={400}>
          <div className="cursor-pointer flex items-center">
            <div
              className="relative flex"
              onClick={() => {
                setSelectedType("NONE" as any);
                setTimeout(() => {
                  setSelectedType("NLP");
                }, 100);
              }}
            >
              <div className="absolute -right-3 text-xs -top-3 text-foreground/40">
                1
              </div>
              <h3
                className={`${
                  selectedType === "NLP"
                    ? "scale-105 border-b border-primary text-primary"
                    : "text-foreground/50"
                } hover:border-b border-primary hover:scale-105 hover:text-primary`}
              >
                NLP
              </h3>
            </div>
            <div className="ml-4 lg:ml-2"> /</div>
          </div>
        </Animate>

        {/* DATA */}
        <Animate type="slideDown" delay={600}>
          <div className="cursor-pointer flex items-center">
            <div
              className="relative flex"
              onClick={() => {
                setSelectedType("NONE" as any);
                setTimeout(() => {
                  setSelectedType("DATA");
                }, 100);
              }}
            >
              <div className="absolute -right-3 text-xs -top-3 text-foreground/40">
                1
              </div>
              <h3
                className={`${
                  selectedType === "DATA"
                    ? "scale-105 border-b border-primary text-primary"
                    : "text-foreground/50"
                } hover:border-b border-primary hover:scale-105 hover:text-primary`}
              >
                Data Science
              </h3>
            </div>
          </div>
        </Animate>

      </div>

      <div className="flex flex-col items-center justify-center mt-[5vh] pb-[5vh]">

        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row gap-10 pt-[5vh]">

          {(selectedType === "DATA" || selectedType === "ALL") && (
            <Animate delay={300} type="slideUp">
              <ProjectCard
                callBack={() => {
                  handleCallBack("FIFA_WORLD_CUP");
                }}
                category="Data Science"
                title="FIFA World Cup Analysis"
                image="/projects/climate1.png"
              />
            </Animate>
          )}

          {(selectedType === "NLP" || selectedType === "ALL") && (
            <Animate delay={300} type="slideUp">
              <ProjectCard
                callBack={() => {
                  handleCallBack("NEWS_SUMMARIZER");
                }}
                category="NLP"
                title="News Article Summarizer"
                image="/projects/news1.png"
              />
            </Animate>
          )}

        </div>

      </div>
    </div>
  );
}

export default Projects;