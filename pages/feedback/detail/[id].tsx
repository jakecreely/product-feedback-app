import { useRouter } from 'next/router'
import Card from '@/components/suggestionCard'
import { useEffect, useState } from 'react'
import { ProductRequest } from '@/types'
import CommentCard from '@/components/commentCard'
import Link from 'next/link'

export default function Details() {
    const router = useRouter()
    const { id } = router.query

    const [suggestionById, setSuggestionById] = useState<ProductRequest>({} as ProductRequest)

    useEffect(() => {
        if (id === undefined) {
            return
        } else {
            fetch('http://localhost:3000/api/suggestion/' + id).then(res => res.json()).then(data => {
                setSuggestionById(data[0])
            })
        }
      }, [id])

    return (
        <div className='grid grid-cols-1 gap-y-6 p-6 md:px-10 md:py-14 lg:px-80 lg:py-20'>
            <div className='flex justify-between'>
                <button className='bg-transparent px-2 py-2 text-black' onClick={() => router.back()}>Go Back</button>
                <Link href={"/feedback/edit/" + id}>
                    <button className='px-2 py-2 bg-secondary'>Edit Feedback</button>
                </Link>
            </div>
            <div className=''>
                <Card 
                    id={suggestionById.id}
                    title={suggestionById.title}
                    description={suggestionById.description}
                    category={suggestionById.category}
                    upvotes={suggestionById.upvotes}
                    comments={suggestionById.comments}
                    status={suggestionById.status}
                />
                <div className='p-6 bg-white rounded-xl md:px-8'>
                    <div className='text-lg'>
                        {(suggestionById.comments === undefined ?  0 : suggestionById.comments.length)
                        + ' Comments'
                        }
                    </div>
                {suggestionById.comments?.map(comment => {
                    return (
                        <div>
                        <CommentCard 
                            id={comment.id}
                            content={comment.content}
                            user={comment.user}
                            replies={comment.replies}
                        />
                        
                        </div>
                    )
                })
                }
                </div>
                </div>
                <div>
                    <div className='flex flex-col gap-y-6 bg-white rounded-xl p-6'>
                        <div className='text-lg'>Add a comment</div>
                        <div className='flex flex-col'>
                        <textarea className='w-full h-20 rounded-xl border-2 border-gray-200 p-4' placeholder='Type your comment here'></textarea>
                        <div className='flex justify-between align-middle'>
                            <div>
                                250 characters left
                            </div>
                            <button className='bg-primary text-white text-xs px-4 py-2 rounded-xl mt-4'>Post Comment</button>
                        </div>
                        </div>
                        </div>
                </div>
        </div>
    )
}