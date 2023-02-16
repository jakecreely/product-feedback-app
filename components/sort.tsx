export default function Sort() {
    return (
        <div className="px-6 py-2 bg-blue flex gap-11">
            <div className="hidden">
            <h2>
                <span className="text-white font-jost font-bold">2 Suggestions</span>
            </h2>
            </div>
            <div className="">
            <label htmlFor="sort-by" className="text-white font-jost font-regular text-xs">Sort by: </label>
            <select id="sort-by" className="bg-blue text-white font-bold text-xs">
                <option value="most_upvotes">Most Upvotes</option>
                <option value="least_upvotes">Least Upvotes</option>
                <option value="most_comments">Most Comments</option>
                <option value="least_comments">Least Comments</option>
            </select>
            </div>
            <button className="py-3 px-0 bg-[#AD1FEA] text-xs flex-1">
                + Add Feedback
            </button>
        </div>
    )
}