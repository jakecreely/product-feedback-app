import Link from "next/link";

export default function Sort() {
    return (
        <div className="px-6 py-2 bg-blue flex justify-between md:rounded-xl">
            <div className="hidden md:block py-2">
            <h2>
                <span className="text-white font-jost font-bold align-baseline">2 Suggestions</span>
            </h2>
            </div>
            <div className="align-baseline py-2">
            <label htmlFor="sort-by" className="text-white font-jost font-regular text-xs">Sort by: </label>
            <select id="sort-by" className="bg-blue text-white font-bold text-xs p-0 ">
                <option value="most_upvotes">Most Upvotes</option>
                <option value="least_upvotes">Least Upvotes</option>
                <option value="most_comments">Most Comments</option>
                <option value="least_comments">Least Comments</option>
            </select>
            </div>
            <div className="self-end">
            <Link href="/feedback/new" passHref>
            <button className="py-3 px-4 bg-[#AD1FEA] text-xs flex-1">
                + Add Feedback
            </button>
            </Link>
            </div>
        </div>
    )
}