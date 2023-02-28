import { Feedback, Prisma } from "@prisma/client";
import Link from "next/link";
import { FunctionComponent } from "react";

type SuggestionsWithAll = Prisma.FeedbackGetPayload<{
    include: { comments: true, user: true, category: true, status: true }
}>

interface RoadmapProps {
    suggestions: SuggestionsWithAll[]
}

const Roadmap: FunctionComponent<RoadmapProps> = ({ suggestions }) => {

    let plannedCount = 0
    let inProgressCount = 0
    let liveCount = 0

    if (suggestions) {
        suggestions.map(suggestion => {
            console.log(suggestion.status.name)
            if (suggestion.status.name === "Planned") {
                plannedCount++
            } else if (suggestion.status.name === "In-Progress") {
                inProgressCount++
            } else if (suggestion.status.name === "Live") {
                liveCount++
            }
        })
    }

    return (
        <div className="px-6 pt-5 pb-4 flex flex-col gap-y-2 gap-x-2 bg-white flex-wrap rounded-lg h-max">
            <div className="flex justify-between">
                <h3 className="text-black">Roadmap</h3>
                <Link href="/roadmap" className="underline text-secondary my-auto text-sm font-semibold">View</Link>
            </div>
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-row gap-x-4">
                    <div className="h-2 w-2 rounded-xl bg-[#F49F85] mt-auto mb-auto"></div>
                    <div className="my-auto text-base text-lightGrey">
                        Planned
                    </div>
                    <div className="ml-auto my-auto text-base font-bold text-lightGrey">{plannedCount}</div>
                </div>
                <div className="flex flex-row gap-x-4">
                    <div className="h-2 w-2 rounded-xl bg-primary mt-auto mb-auto"></div>
                    <div className="my-auto text-base text-lightGrey">
                        In-Progress
                    </div>
                    <div className="ml-auto my-auto text-base font-bold text-lightGrey">
                        {inProgressCount}
                    </div>
                </div>
                <div className="flex flex-row gap-x-4">
                    <div className="h-2 w-2 rounded-xl bg-lightBlue mt-auto mb-auto"></div>
                    <div className="my-auto text-base text-lightGrey">
                        Live 
                    </div>
                    <div className="ml-auto my-auto text-base font-bold text-lightGrey">
                        {liveCount}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Roadmap