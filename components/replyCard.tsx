import { Comment, ProductRequest, Reply } from "@/types";
import Link from "next/link";

const ReplyCard = ({content, user, replyingTo}: Reply)  => {
    
    return (
        //ID is hardcoded for now
        <div className="flex flex-col pt-4 ">
            <div className="flex pb-4">
            <div className="w-10 h-10 mr-4">
                <img src={user.image.slice(1, user.image.length)} className="object-fit rounded-full"/>
            </div>
            <div className="text-xs flex flex-col md:text-base font-bold pb-2 text-blue">
                <div>
                    {user.name}    
                </div>
                <div className="font-light">
                    {'@' + user.username}
                </div>
            </div>
            <div>
                Reply
            </div>
            </div>
            <div className="text-xs md:text-sm font-normal md:font-base pb-2 text-lightGrey">
                {('@' + replyingTo + " ") + content}
            </div>
        </div>
    )
}

export default ReplyCard