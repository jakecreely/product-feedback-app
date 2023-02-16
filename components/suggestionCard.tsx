interface Props {
    title: string,
    description: string,
    tags: string[],
    upvotes: number,
    comments: number,
}

export default function Card({title, description, tags, upvotes, comments}: Props) {
    return (
        <div className="p-6 mb-4 bg-white rounded-xl flex flex-col md:flex-row">
            <div className="block md:flex md:flex-col md:mr-32 md:ml-10">
            <div className="text-xs md:text-base font-bold pb-2 text-blue">
                {title}    
            </div>
            <div className="text-xs md:text-sm font-normal pb-2 text-lightGrey">
                {description}
            </div>
            <div className="flex gap-x-2 pb-4">
            {tags.map((tag) => (
                <div className="py-2 px-4 bg-[#F2F4FF] text-secondary text-xs font-semibold rounded-lg">{tag}</div>
            ))}                
            </div>
            </div>
            <div className="flex justify-between md:order-first">
                <div className="flex gap-2.5 py-2 px-4 bg-[#F2F4FF] text-secondary text-xs font-semibold rounded-lg">
                <img src="assets/shared/icon-arrow-up.svg" className="object-scale-down"/>{upvotes}
                </div>
                <div className="flex gap-1 py-2 px-4  text-secondary text-xs font-semibold rounded-lg md:hidden">
                <img src="assets/shared/icon-comments.svg" className="object-scale-down"/>{comments}
                </div>
            </div>
            <div className="hidden md:visible md:flex py-2 px-4 bg-[#F2F4FF] text-secondary text-xs font-semibold rounded-lg">
                <img src="assets/shared/icon-comments.svg" className="object-scale-down"/>{comments}
                </div>
        </div>
    )
}