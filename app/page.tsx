import { LinearClient } from "@linear/sdk";

const linear = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY,
});

import Image from "next/image";
import RoadMapDate from "@/components/date";
import MarkdownComponent from "@/components/markdown";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import Card from "@/components/card";
import CardInfo from "@/components/drawer";

export default async function getMyProjects() {
  const projects = await linear.projects();

  // Grouping projects by state
  // Using the reduce method to group projects by their state
  const projectsByState = projects.nodes.reduce((acc, project) => {
    // If the state is not a key in the accumulator object, create an empty array for that state
    if (!acc[project.state]) {
      acc[project.state] = [];
    }
    // Push the project into the array corresponding to its state
    acc[project.state].push(project);
    return acc; // Return the updated accumulator
  }, {}); // Initialize the accumulator as an empty object

  // Sorting the states

  const customStateOrder = ["planned", "started", "completed"];

  const stateDetails = {
    planned: {
      title: "Next planned",
      description: "These are the features that are planned for the next few months. They are ordered by start date."
    },
    started: {
      title: "Started",
      description: "We have started working on these features."
    },
    completed: {
      title: "Completed",
      description: "This is the completed state description."
    }
  };
  
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-3">
        {customStateOrder.map((state) => (
          <div key={state} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 lg:h-20">
              <h2 className="text-xl font-semibold capitalize text-slate-700 dark:text-slate-200">
                {stateDetails[state].title}
              </h2>

              <p className="text-sm text-slate-700 dark:text-slate-400">{stateDetails[state].description}</p>
            </div>

            <div className="flex flex-col gap-2.5">
              {projectsByState[state]
                .sort(
                  (a, b) =>
                    new Date(a.startDate).getTime() -
                    new Date(b.startDate).getTime(),
                )
                .map(async (project) => (
                  <Drawer key={project.id}>
                    <DrawerTrigger className="text-left">
                      <Card
                        state={project.state}
                        startDate={project.startDate}
                        targetDate={project.targetDate}
                        name={project.name}
                        lead={project.lead}
                      />
                    </DrawerTrigger>
                    <DrawerContent className="dark:bg-white">
                      <DrawerHeader className="gap-8 text-left">
                        <DrawerTitle>{project.name}</DrawerTitle>
                        <DrawerDescription>
                          <CardInfo
                            state={project.state}
                            startDate={project.startDate}
                            targetDate={project.targetDate}
                            name={project.name}
                            lead={project.lead}
                            description={project.description}
                          />
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter>
                        <DrawerClose>
                          <Button variant="outline" className="w-full">
                            Close
                          </Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
