import { useRouter } from 'next/router'
import Card from '@/components/suggestionCard'
import { useEffect, useState } from 'react'
import { ProductRequest } from '@/types'
import CommentCard from '@/components/commentCard'
import Link from 'next/link'
import { Category, Comment, Feedback, PrismaClient, Status, User } from '@prisma/client'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { Prisma } from '@prisma/client'
import { ParsedUrlQuery } from 'querystring'

type FeedbackWithAll = Prisma.FeedbackGetPayload<{
    include: {
        user: true,
        category: true,
        status: true,
        comments: {
            include: {
                user: true,
                replies: {
                    include: {
                        user: true
                    }
                }
            }
        }
    }
}>

const Details: NextPage<FeedbackWithAll> = (props) => {
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { id } = router.query
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())
        console.log(JSON.stringify(data))
        const res = await fetch('/api/feedback/comment/' + id, {
            method: 'POST',
            body: JSON.stringify(data),
        })
        const result = await res.json()
        router.replace(router.asPath)
    }

    interface ReplyState {
        id: string,
        reply: boolean
    }

    const [reply, setReply] = useState<ReplyState[]>()

    useEffect(() => {
        // Go through all comments and set the reply state as an array of objects with id and reply = false
        const replyState = props.comments?.map(comment => {
            return {
                id: comment.id,
                reply: false
            }
        }
        )
        setReply(replyState)
    }, [])

    const handleReply = (id: string) => {
        // Find the comment with the id and set the reply state to true
        const replyState = reply?.map(comment => {
            if (comment.id === id) {
                return {
                    id: comment.id,
                    reply: !comment.reply
                }
            } else {
                return comment
            }
        })
        setReply(replyState)
    }

    return (
        <div className='grid grid-cols-1 gap-y-6 p-6 text-black md:px-10 md:py-14 lg:px-80 lg:py-20'>
            <div className='flex justify-between'>
                <button className='bg-transparent px-2 py-2 text-black' onClick={() => router.back()}>
                    <div className='flex flex-row gap-x-4'>
                    <img src="/assets/shared/icon-arrow-left.svg" className="object-scale-down"/>
                    <div>
                        Go Back
                    </div>
                    </div>
                </button>
                <Link href={"/feedback/edit/" + props.id}>
                    <button className='px-2 py-2 bg-secondary'>Edit Feedback</button>
                </Link>
            </div>
            <div className=''>
                <Card
                    {...props}
                />
                <div className='p-6 bg-white rounded-xl md:px-8'>
                    <div className='text-lg font-bold'>
                        {(props.comments === undefined ? 0 : props.comments.length)
                            + ' Comments'
                        }
                    </div>
                    {props.comments?.map(comment => {
                        // Get the corresponding reply state for the comment as a defined boolean
                        let replyState = false
                        if (reply !== undefined) {
                          let foundValue = reply.find(commentState => commentState.id === comment.id)?.reply
                          if (foundValue !== undefined) {
                            replyState = foundValue
                          }
                        }
                        return (
                            <div>
                                <CommentCard
                                    {...comment}
                                    isReply={replyState}
                                    handleReply={handleReply}
                                />

                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-y-6 bg-white rounded-xl p-6'>
                    <div className='text-lg font-bold'>Add a comment</div>
                    <div className='flex flex-col'>
                        <textarea name='content' id='content' className='w-full h-20' placeholder='Type your comment here'></textarea>
                        <div className='flex justify-between align-middle'>
                            <div>
                                250 characters left
                            </div>
                            <button className='bg-primary text-white text-xs px-4 py-2 rounded-xl mt-4'>Post Comment</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Details

// Not ideal, but it works for now
export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params!
    if (id && (typeof id == 'string')) {
        const prisma = new PrismaClient()
        const feedback = await prisma.feedback.findUnique({
            where: {
                id: id
            },
            include: {
                user: true,
                category: true,
                status: true,
                comments: {
                    include: {
                        user: true,
                        replies: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        })

        return {
            props: { ...feedback },
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {

    let fetchedIdList: { params: { id: string } }[] = []
    const prisma = new PrismaClient()
    let feedback = await prisma.feedback.findMany({
        select: {
            id: true
        }
    })
    feedback.map((feedback) => {
        fetchedIdList.push({ params: { id: feedback.id } })
    })

    return {
        paths: fetchedIdList,
        fallback: false, // can also be true or 'blocking'
    }
}
