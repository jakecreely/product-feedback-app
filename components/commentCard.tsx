import {Prisma} from '@prisma/client'
import ReplyCard from "./replyCard";

type CommentCardProps = Prisma.CommentGetPayload<{
    include: { user: true, replies: { include: { user: true } } }
}>

const CommentCard = ({id, content, user, replies}: CommentCardProps)  => {
    
    return (
        <div className="flex flex-col pt-4 md:flex-col md:pt-8">
            <div className="flex pb-4 md:flex">
            <div className="w-10 h-10 mr-4 object-fill">
                <img src={user.image.slice(1, user.image.length)} className="rounded-full"/>
            </div>
            <div className="text-xs flex flex-col md:text-base font-bold pb-2 text-blue">
                <div>
                    {user.name}    
                </div>
                <div className="font-normal">
                    {'@' + user.username}
                </div>
            </div>
            <div>
                Reply
            </div>
            </div>
            <div className="text-xs md:text-sm font-normal md:font-base pb-2 text-lightGrey">
                {content}
            </div>
            {replies?.map((reply) => {
                return (
                    <div className="pl-4 md:pl-10">
                        <ReplyCard
                            content={reply.content}
                            user={reply.user}
                            replyingTo={user.username}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default CommentCard