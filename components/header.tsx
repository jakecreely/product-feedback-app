import Image from "next/image"
import { useState } from "react"

export default function Header() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1">
            <div>Header
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>Toggle</button>
            </div>
            <div className={`${isOpen ? 'visible' : 'hidden'} md:block`}>Tag Sort</div>
            <div className={`${isOpen ? "visible" : 'hidden'} md:block`}>Road Map</div>
        </div>
        </>
    )
}