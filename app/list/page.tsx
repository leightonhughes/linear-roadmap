import { LinearClient, Project, ProjectConnection } from "@linear/sdk";

const linear = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY,
});

import Image from "next/image";

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

import RoadMapDate from "@/components/date";
import Card from "@/components/card";
import MarkdownComponent from "@/components/markdown";
import CardInfo from "@/components/drawer";

export default async function getMyIssues() {
  const projects = await linear.projects({
    filter: {
      or: [
        { state: { contains: "started" } },
        { state: { contains: "planned" } },
      ],
    },
  });

  return (
    <div className="flex flex-col gap-2">
      {projects.nodes
        .sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
        )
        .map(async (project) => (
          <Drawer key={project.id}>
            <DrawerTrigger className="text-left">
              <Card
                project={project}
                state={project.state}
                startDate={project.startDate}
                targetDate={project.targetDate}
                name={project.name}
                lead={project.lead}
                description={project.description}
                icon={project.icon}
              />
            </DrawerTrigger>
            <DrawerContent className="dark:bg-white">
              <DrawerHeader className="gap-8 text-left">
                <DrawerDescription>
                  <CardInfo
                    project={project}
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
  );
}
