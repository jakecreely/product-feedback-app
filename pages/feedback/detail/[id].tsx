import { useRouter } from 'next/router'

export default function Details() {
    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            <h1>Details {id}</h1>
        </div>
    )
}