import Image from "next/image";
import RoadMapDate from "./date";

async function Card({ state, startDate, targetDate, name, lead }) {
  return (
    <>
      <div className="flex flex-col gap-4 overflow-hidden rounded-xl bg-white p-3 shadow ring-1 ring-slate-200">
        <div className="flex items-start">
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-start justify-between gap-8">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-1">
                  {state === "started" ? (
                    <div className="flex flex-col gap-0 rounded-lg bg-green-50 px-2 py-0.5   capitalize ring-1 ring-inset ring-green-200 ">
                      <span className="text-2xs flex items-center gap-1 font-semibold  text-green-500 ">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                        </span>
                        <RoadMapDate startDate={startDate} />
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-0 rounded-lg bg-slate-600 px-2 py-0.5 capitalize">
                      <span className="text-2xs flex gap-1 font-semibold text-slate-200">
                        <span className="font-medium text-slate-300">
                          Start
                        </span>
                        <RoadMapDate startDate={startDate} />
                      </span>
                    </div>
                  )}

                  {targetDate && (
                    <div className="flex flex-col gap-0 rounded-lg bg-white px-2 py-0.5 capitalize  ring-1 ring-inset ring-slate-200">
                      <span className="text-2xs flex gap-1 font-semibold text-slate-700">
                        <span className="font-medium text-slate-400">Due</span>
                        <RoadMapDate startDate={targetDate} />
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="max-w-lg text-sm font-semibold tracking-tight text-slate-700">
                  {name}
                </h3>
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
                <div className="flex h-6 w-6 shrink-0 flex-col items-center justify-center rounded-full bg-slate-100">
                  <span className="text-sm font-semibold">A</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Card;
