import { Comment, ProductRequest, Reply } from "@/types";
import { Prisma, User } from "@prisma/client";
import Link from "next/link";

type ReplyCardProps = Prisma.ReplyGetPayload<{
    include: { user: true, replyingTo: true }
}>

type Props = ReplyCardProps & { isReply: boolean } & { handleReply: (id: string) => void } & { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }

const ReplyCard = ({ id, content, user, replyingTo, isReply, handleReply, handleSubmit }: Props) => {

    return (
        //ID is hardcoded for now
        <div className="flex flex-col pt-4 ">
            <div className="flex pb-4 justify-between gap-0">
                <div className="w-10 h-10 mr-4">
                    <img src={user.image.slice(1, user.image.length)} className="object-fit rounded-full" />
                </div>
                <div className="flex flex-col md:text-base font-bold pb-2 text-blue">
                    <div className="text-sm">
                        {user.name}
                    </div>
                    <div className="font-normal text-lightGrey text-sm">
                        {'@' + user.username}
                    </div>
                </div>
                <div onClick={() => handleReply(id)} className="text-sm text-secondary font-semibold p-0 hover:underline ml-auto">
                    Reply
                </div>
            </div>
            <div className="text-sm md:text-sm font-normal md:font-base pb-2 text-lightGrey">
                <div className="text-primary font-bold">{'@' + replyingTo + " "}</div>
                <div>{content}</div>
            </div>
            {isReply &&
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-row gap-x-6 bg-white rounded-xl'>
                        <textarea name='content' id='content' className='w-9/12 outline-secondary text-sm px-4 py-2' placeholder='Type your comment here'></textarea>
                        <div className='flex justify-between align-middle'>
                            <button className='bg-primary text-white text-xs px-4 py-2 rounded-xl mt-4' type="submit">Post Reply</button>
                        </div>
                    </div>
                </form>
            }
        </div>
    )
}

export default ReplyCard