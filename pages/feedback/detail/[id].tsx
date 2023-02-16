import { useRouter } from 'next/router'
import Card from '@/components/suggestionCard'

export default function Details() {
    const router = useRouter()
    const { id } = router.query

    let suggestionById: {
        title: string, 
        description: string,
        tags: string[],
        upvotes: number,
        comments: number,
      } = {
        title: "Add dark mode",
        description: "It would be great if you could add a dark mode to the website",
        tags: ["Feature"],
        upvotes: 10,
        comments: 2,
      }

    return (
        <div className='grid grid-cols-1 p-6'>
            <div className='pb-6'>
                <button className='bg-transparent px-2 py-2' onClick={() => router.back()}>Go Back</button>
                <button className='px-2 py-2'>Edit Feedback</button>
            </div>
            <div className=''>
                <Card 
                title={suggestionById.title} 
                description={suggestionById.description}
                tags={suggestionById.tags}
                upvotes={suggestionById.upvotes}
                comments={suggestionById.comments}
                />
            </div>
        </div>
    )
}