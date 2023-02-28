import { Prisma, PrismaClient } from "@prisma/client"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import React from "react"

type EditFeedback = Prisma.FeedbackGetPayload<{
    include: {
        category: true,
        status: true,
    }
}>

export default function Edit(props: EditFeedback) {
    const router = useRouter()
    const [feedback, setFeedback] = React.useState({
        id: props.id,
        title: props.title,
        description: props.description,
        category: props.category.name,
        status: props.status.name
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())
        console.log(JSON.stringify(data))
        const dataWithId = {
            ...data,
            id: feedback.id
        }
        const res = await fetch('/api/feedback/update', {
            method: 'POST',
            body: JSON.stringify(dataWithId),
        })
        const result = await res.json()
        router.push('/feedback/detail/' + result.id)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFeedback({
            ...feedback,
            [e.target.name]: e.target.value
        })
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFeedback({
            ...feedback,
            category: e.currentTarget.value
        })
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFeedback({
            ...feedback,
            status: e.currentTarget.value
        })
    }

    return (
        <div className='grid grid-cols-1 gap-y-14 p-6 text-black md:px-10 md:py-14 lg:px-80 lg:py-20'>
            <div className='flex justify-between'>
                <button className='bg-transparent px-2 py-2 text-black' onClick={() => router.back()}>Go Back</button>
            </div>
            <div className="bg-white rounded-xl px-6">
                <div className="relative bottom-6 w-10 h-10">
                    <img src="/assets/shared/icon-edit-feedback.svg" />
                </div>
                <div className="text-lg font-bold pb-6 md:text-2xl">
                    Editing {`'` + props.title + `'`}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-y-6'>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='title'>
                                <div className="flex flex-col">
                                    <h3 className="text-sm">Feedback Title</h3>
                                    <p className="text-sm font-normal text-[#647196]">Add a short, descriptive headline</p>
                                </div>
                            </label>
                            <input type='text' name='title' id='title' value={feedback.title} onChange={handleChange} className='text-sm md:text-base'/>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='category'>
                                <div className="flex flex-col">
                                    <h3 className="text-sm">Category</h3>
                                    <p className="text-sm text-[#647196]">Choose a category for your feedback</p>
                                </div>
                            </label>
                            <select name='category' id='category' onChange={handleCategoryChange} value={feedback.category} className='text-sm font-normal md:text-base'>
                                <option value='Feature'>Feature</option>
                                <option value='UI'>UI</option>
                                <option value='UX'>UX</option>
                                <option value='Enhancement'>Enhancement</option>
                                <option value='Bug'>Bug</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='status'>
                                <div className="flex flex-col">
                                    <h3 className="text-sm">Update Status</h3>
                                    <p className="text-sm text-[#647196]">Change feature state</p>
                                </div>
                            </label>
                            <select name='status' id='status' onChange={handleStatusChange} value={feedback.status} className='text-sm md:text-base'>
                                <option value='Suggestion'>Suggestion</option>
                                <option value='Planned'>Planned</option>
                                <option value='In-Progress'>In-Progress</option>
                                <option value='Live'>Live</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='detail'>
                                <div className="flex flex-col">
                                    <h3 className="text-sm font-bold">Feedback Detail</h3>
                                    <p className="text-sm text-[#647196]">Include any specific comments on what should be improved, added, etc.</p>
                                </div>
                            </label>
                            <textarea name='description' id='description' className='text-sm md:text-base' value={feedback.description} onChange={handleChange} />
                        </div>
                        <div className='flex flex-col gap-y-4 md:gap-y-0 md:flex-row md:justify-evenly'>
                            <button className='bg-primary text-white rounded-md p-2 text-sm md:order-3 md:px-6 md:py-3' type='submit'>Save Changes</button>
                            <button
                                className='bg-blue text-blue-500 rounded-md p-2 text-sm md:order-2 md:px-6 md:py-3'
                                onClick={() => router.push('/feedback/detail/' + feedback.id)}
                            >
                                Cancel
                            </button>
                            <button className='text-white rounded-md p-2 bg-red-500 text-sm md:order-1 md:px-6 md:py-3'>Delete</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params!
    if (id && (typeof id == 'string')) {
        const prisma = new PrismaClient()
        const feedback = await prisma.feedback.findUnique({
            where: {
                id: id
            },
            include: {
                category: true,
                status: true,
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