import Image from "next/image";
import RoadMapDate from "./date";
import { ScrollArea } from "./ui/scroll-area";
import MarkdownComponent from "./markdown";

async function CardInfo({ state, startDate, targetDate, name, lead, description, project }) {
  return (
    <>
      <div className="flex flex-col items-start gap-6">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-700">
          {name}
        </h3>

        {lead &&
          ((await lead).avatarUrl ? (
            <div className="flex flex-col gap-0 capitalize">
              <div className="flex items-center gap-2">
                <Image
                  src={(await lead)?.avatarUrl ?? ""}
                  width={32}
                  height={32}
                  className="rounded-full border border-slate-300 shadow-sm"
                  alt="Avatar"
                />

                <span className="text-sm font-medium text-slate-700">
                  {(await lead)?.name ?? ""}
                </span>
              </div>
            </div>
          ) : (
            name
          ))}

        <div className="flex gap-8">
          <div className="flex flex-col gap-0 capitalize">
            <span className="text-xs text-slate-500">Start</span>

            <span className="text-sm font-medium text-slate-700">
              <RoadMapDate startDate={startDate} />
            </span>
          </div>

          {targetDate && (
            <div className="flex flex-col gap-0 capitalize">
              <span className="text-xs text-slate-500">Due</span>

              <span className="text-sm font-medium text-slate-700">
                <RoadMapDate startDate={targetDate} />
              </span>
            </div>
          )}

          <div className="flex flex-col gap-0 capitalize">
            <span className="text-xs text-slate-500">Status</span>

            <span className="text-sm font-medium text-slate-700">
              {state}
            </span>
          </div>
        </div>

        {description && (
          <div>
            <span className="text-xs text-slate-500">
              Project Description
            </span>
            <p className="text-sm font-medium text-slate-700">
              {description}
            </p>
          </div>
        )}

        {await (async () => {
          try {
            const updates = await project.projectUpdates();
            return (
              <>
                {updates.nodes[0] && (
                  <div className="w-full">
                    <span className="text-xs text-slate-500">
                      Latest Update from{" "}
                      {(await updates.nodes[0].user)?.name ?? ""}
                    </span>

                    <ScrollArea className="h-[33vh] rounded-md border p-4">
                      <div className="flex list-inside flex-col gap-2 font-medium text-slate-700 [&>p>a]:text-blue-500 [&>ul>li]:mb-2 [&>ul]:list-disc [&>ul]:pl-6">
                        <MarkdownComponent
                          content={updates.nodes[0].body}
                        />
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </>
            );
          } catch (error) {
            console.error(
              "Error fetching project updates: ",
              error,
            );
            return (
              <p className="text-xs text-slate-500">
                No Updates yet
              </p>
            );
          }
        })()}
      </div>
    </>
  );
}
export default CardInfo;
