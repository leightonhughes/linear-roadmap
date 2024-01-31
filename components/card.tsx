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
                <div className="flex flex-col xl:flex-row items-stretch gap-1">
                  {state === "started" ? (
                    <div className="flex justify-start gap-1 rounded-lg bg-green-50 dark:bg-green-950 px-2 py-1   capitalize ring-1 ring-inset ring-green-200 dark:ring-green-800">
                      <span className="text-2xs flex gap-1 items-start font-semibold  text-green-500 leading-tight ">
                        <div className="flex flex-row items-center gap-1">
                          <span className="relative flex">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                          </span>
                          
                          <span className="font-medium text-green-500 dark:text-green-600">
                            Started
                          </span>
                          <RoadMapDate startDate={startDate} />
                        </div>
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-0 rounded-lg bg-slate-100 dark:bg-transparent dark: px-2 py-1 capitalize  ring-1 ring-inset dark:ring-slate-700 ring-slate-200">
                      <span className="text-2xs flex gap-1 font-semibold text-slate-70 leading-tight">
                        <span className="font-medium text-slate-400 dark:text-slate-400">
                          Start
                        </span>
                        <RoadMapDate startDate={startDate} />
                      </span>
                    </div>
                  )}

                  {targetDate && (
                    <div className="flex flex-col gap-0 rounded-lg bg-slate-100 dark:bg-transparent dark: px-2 py-1 capitalize  ring-1 ring-inset dark:ring-slate-700 ring-slate-200">
                      <span className="text-2xs flex gap-1 font-semibold text-slate-70 leading-tight">
                        <span className="font-medium text-slate-400 dark:text-slate-400">Due</span>
                        <span className="text-slate-700 dark:text-white"><RoadMapDate startDate={targetDate} /></span>
                      </span>
                    </div>
                  )}

                  {icon === "NorthAmerica" ? (
                    <div className="flex flex-col gap-0 bg-red-100 rounded-lg dark:bg-transparent dark: px-2 py-1.5 capitalize  ring-1 ring-inset dark:ring-red-800 ring-red-200 leading-tight">
                      <span className="text-2xs flex gap-1 font-semibold text-slate-70 leading-tight">
                        <span className="text-2xs flex gap-1 font-semibold text-[#e42312] dark:text-white">
                          AI
                        </span>
                      </span>
                    </div>
                  ) : icon === "Australia" ? (
                    <div className="flex flex-col gap-0 bg-red-100 rounded-lg  dark:bg-transparent dark: px-2 py-1.5 capitalize  ring-1 ring-inset dark:ring-red-800 ring-red-200 leading-tight">
                      <span className="text-2xs flex gap-1 font-semibold text-slate-70 leading-tight">
                        <span className="text-2xs flex gap-1 font-semibold text-[#e42312] dark:text-white">
                          AU
                        </span>
                      </span>
                    </div>
                  ) : (
                    ""
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
                <>
                {icon === "NorthAmerica" ? (
                  <div className="flex items-center justify-center bg-[#e42312] rounded-full w-6 h-6 shrink-0">
                    <svg
                      viewBox="0 0 232 211"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M61.5605 149.704L61.8216 149.444C47.8247 135.402 25.1305 135.405 11.1292 149.444L11.1292 149.444C-2.868 163.485 -2.86799 186.251 11.1292 200.293L11.1292 200.293C25.1314 214.338 47.8302 214.34 61.828 200.298L61.5669 200.038L61.828 200.298C75.8225 186.258 75.8224 163.49 61.8216 149.444L61.5605 149.704Z"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M74.4927 30.6904L79.0573 26.146C113.959 -8.58787 165.771 -7.25422 202.816 29.6226C235.3 61.955 241.345 110.003 212.698 138.743C204.131 147.337 192.886 153.783 180.837 156.739C169.324 159.691 162.095 159.961 138.264 159.155C111.221 158.35 101.587 159.961 92.7482 167.214L51.2512 125.583C64.6374 111.614 82.8422 106.779 118.186 107.855C142.011 108.124 153.526 105.171 161.291 97.3802C170.931 87.7108 171.467 77.5034 162.362 68.3719C150.849 56.8236 139.871 58.7025 122.736 75.3568L74.4927 30.6904Z"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M74.4927 30.6904L79.0573 26.146C113.959 -8.58787 165.771 -7.25422 202.816 29.6226C235.3 61.955 241.345 110.003 212.698 138.743C204.131 147.337 192.886 153.783 180.837 156.739C169.324 159.691 162.095 159.961 138.264 159.155C111.221 158.35 101.587 159.961 92.7482 167.214L51.2512 125.583C64.6374 111.614 82.8422 106.779 118.186 107.855C142.011 108.124 153.526 105.171 161.291 97.3802C170.931 87.7108 171.467 77.5034 162.362 68.3719C150.849 56.8236 139.871 58.7025 122.736 75.3568L74.4927 30.6904Z"
                      />
                    </svg>
                  </div>
                ) : icon === "Australia" ? (
                  <div className="flex items-center justify-center bg-[#e42312] rounded-full w-6 h-6 shrink-0">
<svg
                      viewBox="0 0 232 211"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M61.5605 149.704L61.8216 149.444C47.8247 135.402 25.1305 135.405 11.1292 149.444L11.1292 149.444C-2.868 163.485 -2.86799 186.251 11.1292 200.293L11.1292 200.293C25.1314 214.338 47.8302 214.34 61.828 200.298L61.5669 200.038L61.828 200.298C75.8225 186.258 75.8224 163.49 61.8216 149.444L61.5605 149.704Z"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M74.4927 30.6904L79.0573 26.146C113.959 -8.58787 165.771 -7.25422 202.816 29.6226C235.3 61.955 241.345 110.003 212.698 138.743C204.131 147.337 192.886 153.783 180.837 156.739C169.324 159.691 162.095 159.961 138.264 159.155C111.221 158.35 101.587 159.961 92.7482 167.214L51.2512 125.583C64.6374 111.614 82.8422 106.779 118.186 107.855C142.011 108.124 153.526 105.171 161.291 97.3802C170.931 87.7108 171.467 77.5034 162.362 68.3719C150.849 56.8236 139.871 58.7025 122.736 75.3568L74.4927 30.6904Z"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M74.4927 30.6904L79.0573 26.146C113.959 -8.58787 165.771 -7.25422 202.816 29.6226C235.3 61.955 241.345 110.003 212.698 138.743C204.131 147.337 192.886 153.783 180.837 156.739C169.324 159.691 162.095 159.961 138.264 159.155C111.221 158.35 101.587 159.961 92.7482 167.214L51.2512 125.583C64.6374 111.614 82.8422 106.779 118.186 107.855C142.011 108.124 153.526 105.171 161.291 97.3802C170.931 87.7108 171.467 77.5034 162.362 68.3719C150.849 56.8236 139.871 58.7025 122.736 75.3568L74.4927 30.6904Z"
                      />
                    </svg>
                  </div>
                ) : (
                  ""
                )}
                </>
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
        </div>
      </div>
    </>
  );
}
export default Card;
