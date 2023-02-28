import { Prisma } from '@prisma/client'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReplyCard from "./replyCard";

type CommentCardProps = Prisma.CommentGetPayload<{
    include: { user: true, replies: { include: { user: true } } }
}>

type Props = CommentCardProps &
{ isReply: boolean } &
{ handleReply: (id: string) => void }

const CommentCard = ({ id, content, user, replies, isReply, handleReply }: Props) => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())
        console.log(JSON.stringify(data))
        const res = await fetch('/api/feedback/reply/' + id, {
            method: 'POST',
            body: JSON.stringify(data),
        })
        const result = await res.json()
    }

    const handleSubReply = (id: string) => {
        // Find the comment with the id and set the reply state to true
        const replyState = subReply?.map(reply => {
            if (reply.id === id) {
                return {
                    id: reply.id,
                    reply: !reply.reply
                }
            } else {
                return reply
            }
        })
        setSubReply(replyState)
    }

    interface ReplyState {
        id: string,
        reply: boolean
    }

    const [subReply, setSubReply] = useState<ReplyState[]>()

    useEffect(() => {
        // Go through all replies and set the reply state as an array of objects with id and reply = false
        const replyState = replies?.map(reply => {
            return {
                id: reply.id,
                reply: false
            }
        }
        )
        setSubReply(replyState)
    }, [])


    return (
        <div className="flex flex-col pt-4 md:flex-col md:pt-8">
            <div className="flex pb-4 justify-between gap-0 md:flex">
                <div className="w-10 h-10 mr-4 object-fill">
                    <img src={user.image.slice(1, user.image.length)} className="rounded-full" />
                </div>
                <div className="text-xs flex flex-col pb-0 md:text-base font-bold text-blue">
                    <div className='text-sm font-bold '>
                        {user.name}
                    </div>
                    <div className="font-normal text-lightGrey text-sm ">
                        {'@' + user.username}
                    </div>
                </div>
                <div className='ml-auto'>
                    <button className="bg-transparent font-semibold text-secondary p-0 hover:underline" onClick={() => handleReply(id)}>
                        Reply
                    </button>
                </div>
            </div>
            <div className="text-sm md:text-sm font-normal md:font-base pb-2 text-lightGrey">
                {content}
            </div>
            {isReply &&
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-row gap-x-4 bg-white rounded-xl pt-0 justify-around'>
                            <textarea name='content' id='content' className='w-9/12 outline-secondary text-sm px-4 py-2' placeholder='Type your comment here'></textarea>
                            <div className='flex mb-auto'>
                                <button className='bg-primary text-white text-xs px-2 py-2 rounded-xl' type="submit">Post Reply</button>
                            </div>
                    </div>
                </form>
            }
            {replies?.map((reply) => {
                let replyState = false
                if (subReply !== undefined) {
                    let foundValue = subReply.find(replyState => replyState.id === reply.id)?.reply
                    if (foundValue !== undefined) {
                        replyState = foundValue
                    }
                }
                return (
                    <div className="pl-4 md:pl-10">
                        <ReplyCard
                            id={reply.id}
                            content={reply.content}
                            user={reply.user}
                            replyingTo={user.username}
                            isReply={replyState}
                            handleReply={handleSubReply}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default CommentCard