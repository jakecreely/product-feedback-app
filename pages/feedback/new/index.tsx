import { useRouter } from "next/router"

export default function New() {
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())
        console.log(JSON.stringify(data))
        const res = await fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(data),
        })
        const result = await res.json()
        router.push('/feedback/detail/' + result.id)
    }

    return (
        <div className='grid grid-cols-1 gap-y-14 p-6 md:px-10 md:py-14 lg:px-80 lg:py-20'>
            <div className='flex justify-between'>
                <button className='bg-transparent px-2 py-2 text-black' onClick={() => router.back()}>Go Back</button>
            </div>
            <div className="bg-white rounded-xl px-6">
                <div className="relative bottom-6 w-10 h-10">
                    <img src="/assets/shared/icon-new-feedback.svg"/>
                </div>
                <div className="text-2xl pb-6">
                    Create New Feedback
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-y-6'>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='title'>
                            <div className="flex flex-col">
                                <h3>Feedback Title</h3>
                                <p>Add a short, descriptive headline</p>
                            </div>
                            </label>
                            <input type='text' name='title' id='title' />
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='category'>
                                <div className="flex flex-col">
                                    <h3>Category</h3>
                                    <p>Choose a category for your feedback</p>
                                </div>
                            </label>
                            <select name='category' id='category' className=''>
                                <option value='Feature'>Feature</option>
                                <option value='UI'>UI</option>
                                <option value='UI'>UX</option>
                                <option value='Enhancement'>Enhancement</option>
                                <option value='Bug'>Bug</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                                <label htmlFor='detail'>
                                    <div className="flex flex-col">
                                        <h3>Feedback Detail</h3>
                                        <p>Include any specific comments on what should be improved, added, etc.</p>
                                    </div>
                                </label>
                                <textarea name='detail' id='detail' className='' />
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <button className='bg-primary text-white rounded-md p-2' type='submit'>Add Feedback</button>
                            <button className='bg-blue text-blue-500 rounded-md p-2'>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}