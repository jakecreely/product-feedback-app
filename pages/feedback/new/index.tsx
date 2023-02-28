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
        <div className='grid grid-cols-1 gap-y-14 p-6 text-black md:px-10 md:py-14 lg:px-80 lg:py-20'>
            <div className='flex justify-between'>
                <button className='bg-transparent px-2 py-2 text-black' onClick={() => router.back()}>Go Back</button>
            </div>
            <div className="bg-white rounded-xl px-6">
                <div className="relative bottom-6 w-10 h-10">
                    <img src="/assets/shared/icon-new-feedback.svg"/>
                </div>
                <div className="pb-6 text-lg font-bold md:text-2xl">
                    Create New Feedback
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-y-6'>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='title'>
                            <div className="flex flex-col">
                                <h3 className="text-sm">Feedback Title</h3>
                                <p className="text-sm text-lightGrey">Add a short, descriptive headline</p>
                            </div>
                            </label>
                            <input type='text' name='title' id='title' className="text-sm md:text-base"/>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='category'>
                                <div className="flex flex-col">
                                    <h3 className="text-sm">Category</h3>
                                    <p className="text-sm text-lightGrey">Choose a category for your feedback</p>
                                </div>
                            </label>
                            <select name='category' id='category' className='text-sm md:text-base'>
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
                                        <h3 className="text-sm">Feedback Detail</h3>
                                        <p className="text-sm text-lightGrey">Include any specific comments on what should be improved, added, etc.</p>
                                    </div>
                                </label>
                                <textarea name='detail' id='detail' className='text-sm md:text-base' />
                        </div>
                        <div className='flex flex-col gap-y-2 md:gap-x-4 md:flex-row md:justify-end'>
                            <button className='bg-primary text-white rounded-md p-2 md:order-2 md:px-6 md:py-3' type='submit'>Add Feedback</button>
                            <button className='bg-blue text-blue-500 rounded-md p-2 md:order-1 md:px-6 md:py-3' type='button' onClick={() => router.push('/suggestions')}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}