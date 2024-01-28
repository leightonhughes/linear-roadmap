import Image from "next/image";
import RoadMapDate from "./date";

async function Card({ state, startDate, targetDate, name, lead, description, icon }) {
  return (
    <>
      <div className="flex flex-col gap-4 overflow-hidden rounded-xl bg-white dark:bg-slate-900 p-3 shadow ring-1 ring-slate-200 dark:ring-slate-800">
        <div className="flex items-start">
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-start justify-between gap-8">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-1">
                  {state === "started" ? (
                    <div className="flex flex-col gap-0 rounded-lg bg-green-50 dark:bg-green-950 px-2 py-0.5   capitalize ring-1 ring-inset ring-green-200 dark:ring-green-800">
                      <span className="text-2xs flex items-center gap-1 font-semibold  text-green-500 ">
                        <span className="relative flex">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                        </span>
                        <RoadMapDate startDate={startDate} />
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-0 rounded-lg bg-slate-600 dark:bg-slate-700 px-2 py-0.5 capitalize">
                      <span className="text-2xs flex gap-1 font-semibold text-slate-200 dark:text-slate-200">
                        <span className="font-medium text-slate-400 dark:text-slate-400">
                          Start
                        </span>
                        <RoadMapDate startDate={startDate} />
                      </span>
                    </div>
                  )}

                  {targetDate && (
                    <div className="flex flex-col gap-0 rounded-lg bg-white dark:bg-transparent dark: px-2 py-0.5 capitalize  ring-1 ring-inset dark:ring-slate-700 ring-slate-200">
                      <span className="text-2xs flex gap-1 font-semibold text-slate-700">
                        <span className="font-medium text-slate-400 dark:text-slate-400">Due</span>
                        <span className="text-slate-700 dark:text-white"><RoadMapDate startDate={targetDate} /></span>
                      </span>
                    </div>
                  )}

                  {icon === "NorthAmerica" ? (
                    <div className="flex flex-col gap-0 rounded-lg bg-red-600 dark:bg-transparent dark: px-2 py-0.5 capitalize  ring-1 ring-inset dark:ring-red-700 ring-red-700">
                      <span className="text-2xs flex gap-1 font-semibold text-white">
                        AI required
                      </span>
                    </div>
                  ) : icon === "Australia" ? (
                    <div className="flex flex-col gap-0 rounded-lg bg-red-600 dark:bg-transparent dark: px-2 py-0.5 capitalize  ring-1 ring-inset dark:ring-red-700 ring-red-700">
                      <span className="text-2xs flex gap-1 font-semibold text-white">
                        AU required
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="max-w-lg text-sm font-semibold tracking-tight text-slate-700 dark:text-slate-300">
                    {name}
                  </h3>

                  {description && (
                    <p className="text-xs text-slate-500 dark:text-slate-500">{description}</p>
                  )}


                </div>
              </div>

              {(await lead)?.avatarUrl ?? "" ? (
                <div className="flex shrink-0 flex-col gap-0 capitalize">
                  <div className="flex items-center gap-2">
                    <Image
                      src={(await lead)?.avatarUrl ?? ""}
                      width={24}
                      height={24}
                      className="rounded-full  shadow-sm"
                      alt="Avatar"
                    />
                  </div>
                </div>
              ) : (
                ""
                // <div className="flex h-6 w-6 shrink-0 flex-col items-center justify-center rounded-full bg-slate-100">
                //   <span className="text-sm font-semibold">A</span>
                // </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Card;
