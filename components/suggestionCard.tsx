import { ProductRequest } from "@/types";
import { Category, Feedback, Prisma, Status, User } from "@prisma/client";
import Link from "next/link";

type FeedbackWithAllRelations = Prisma.FeedbackGetPayload<{
    include: { comments: true, user: true, category: true, status: true }
}>

const Card = (feedback: FeedbackWithAllRelations)  => {

    const { id, title, description, upvotes, comments, user, category, status } = feedback

    return (
        //ID is hardcoded for now
        <Link href={"/feedback/detail/" + id}>
        <div className="p-6 mb-4 bg-white rounded-xl flex flex-col md:flex-row md:pb-0">
            <div className="block md:flex md:flex-col md:mr-32 md:ml-10">
            <div className="text-xs md:text-base font-bold pb-2 text-blue">
                {title}    
            </div>
            <div className="text-xs md:text-sm font-normal md:font-base pb-2 text-lightGrey">
                {description}
            </div>
            <div className="flex gap-x-2 pb-4">
            <div className="py-2 px-4 bg-[#F2F4FF] text-secondary text-xs font-semibold rounded-lg">{category.name}</div>                
            </div>
            </div>
            <div className="flex justify-between md:order-first">
                <div className="flex gap-2.5 py-2 px-4 bg-[#F2F4FF] text-secondary text-xs font-semibold rounded-lg md:gap-0 md:px-3 md:py-3 md:flex-col md:justify-center md:mb-20">
                <img src="/assets/shared/icon-arrow-up.svg" className="object-scale-down"/>
                <div className="font-bold text-sm text-black">
                    {upvotes}
                </div>
                </div>
                <div className="flex gap-2 py-2 px-4  text-secondary text-xs font-semibold rounded-lg md:hidden">
                <img src="/assets/shared/icon-comments.svg" className="object-scale-down"/>
                <div className="text-black font-bold text-sm">
                    {comments === undefined ? 0 : comments.length}
                </div>
                </div>
            </div>
            <div className="hidden md:visible md:flex py-2 px-4 bg-[#F2F4FF] text-black text-xs font-semibold rounded-lg md:bg-transparent md:gap-2 md:px-0 md:py-0 md:flex-row items-center md:mt-auto md:mb-auto md:ml-auto ">
                <img src="/assets/shared/icon-comments.svg" className="object-scale-down"/>{comments === undefined ? 0 : comments.length}
                </div>
        </div>
        </Link>
    )
}

export default Card