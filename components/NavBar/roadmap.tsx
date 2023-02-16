import Link from "next/link";

export default function Roadmap() {
    return (
        <div className="p-6 flex flex-col gap-y-2 gap-x-2 bg-white flex-wrap rounded-lg h-max">
            <div className="flex">
            <h1>Roadmap</h1>
            <Link href="/roadmap" className="underline text-lightBlue">View</Link>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    Planning 
                </div>
                <div className="flex flex-col">
                    In-Progress
                </div>
                <div className="flex flex-col">
                    Live
                </div>
            </div>
        </div>
    )
}