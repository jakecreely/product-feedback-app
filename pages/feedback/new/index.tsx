import { useRouter } from "next/router"

export default function New() {
    const router = useRouter()

    return (
        <div className='grid grid-cols-1 gap-y-6 p-6 md:px-10 md:py-14 lg:px-80 lg:py-20'>
            <div className='flex justify-between'>
                <button className='bg-transparent px-2 py-2 text-black' onClick={() => router.back()}>Go Back</button>
            </div>
            <div className="bg-white rounded-xl px-6 pt-11">
                <div className="text-2xl pb-6">
                    Create New Feedback
                </div>
                <form>
                    <div className='flex flex-col gap-y-6'>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='title'>Title</label>
                            <input type='text' name='title' id='title' className='border border-gray-300 rounded-md p-2' />
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='description'>Description</label>
                            <textarea name='description' id='description' className='border border-gray-300 rounded-md p-2' />
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='category'>Category</label>
                            <select name='category' id='category' className='border border-gray-300 rounded-md p-2'>
                                <option value='feature'>Feature</option>
                                <option value='ui'>UI</option>
                                <option value='ux'>UX</option>
                                <option value='enhancement'>Enhancement</option>
                                <option value='bug'>Bug</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='status'>Status</label>
                            <select name='status' id='status' className='border border-gray-300 rounded-md p-2'>
                                <option value='suggestion'>Suggestion</option>
                                <option value='planned'>Planned</option>
                                <option value='in-progress'>In-Progress</option>
                                <option value='live'>Live</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <div>
                                <label htmlFor='detail'>Feedback Detail</label>
                                <textarea name='detail' id='detail' className='border border-gray-300 rounded-md p-2' />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}