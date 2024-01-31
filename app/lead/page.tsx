export const revalidate = 0

import { LinearClient } from '@linear/sdk'

const linear = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY,
})

import Image from 'next/image'
import RoadMapDate from '@/components/date'
import MarkdownComponent from '@/components/markdown'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import Card from '@/components/card'
import CardInfo from '@/components/drawer'

export default async function getMyProjects() {
  const projects = await linear.projects({
    filter: {
      or: [
        { state: { contains: 'started' } },
        { state: { contains: 'planned' } },
      ],
    },
  })

  const projectsByLead = {}

  await Promise.all(
    projects.nodes.map(async (project) => {
      const lead = (await project.lead)?.name ?? 'Unassigned'
      if (!projectsByLead[lead]) {
        projectsByLead[lead] = []
      }
      projectsByLead[lead].push(project)
    }),
  )

  const sortedLeads = Object.keys(projectsByLead).sort()

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-3">
        {sortedLeads.map(
          (
            lead, // Use the custom lead order for rendering
          ) => (
            <div key={lead} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold capitalize text-slate-700 dark:text-slate-200">
                {lead}
              </h2>

              <div className="flex flex-col gap-2.5">
                {projectsByLead[lead] &&
                  projectsByLead[lead]
                    .sort(
                      (a, b) =>
                        new Date(a.startDate).getTime() -
                        new Date(b.startDate).getTime(),
                    )
                    .map(
                      async (
                        project, // Check if the lead has projects
                      ) => (
                        <Drawer key={project.id}>
                          <DrawerTrigger className="text-left">
                            <Card
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
                              <DrawerTitle>{project.name}</DrawerTitle>
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
                      ),
                  )
                }
              </div>
            </div>
          ),
        )}
      </div>
    </>
  )
}
