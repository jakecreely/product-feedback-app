import { NextPage } from "next"
import Image from "next/image"
import { ReactElement } from "react"

interface Props {
    handleOpen: () => void,
    isOpen: boolean
}

const Header: NextPage<Props> = (props) => {

    const { handleOpen, isOpen } = props
    
    const actionButton: ReactElement = 
        isOpen ?
        <button className="md:hidden bg-transparent px-2 py-2" onClick={handleOpen}>
            <img src="./assets/shared/mobile/icon-close.svg" alt="Close"/>
        </button> :
        <button className="md:hidden bg-transparent px-2 py-2" onClick={handleOpen}>
            <img src="./assets/shared/mobile/icon-hamburger.svg" alt="Open"/>
        </button>

    return (
        <div className="bg-mobile bg-no-repeat bg-cover grid grid-cols-2 md:grid-cols-1 px-5 py-3 md:px-0 md:py-0 md:bg-tablet md:rounded-lg lg:bg-desktop">
            <div className="grid grid-cols-1 md:p-0 md:pt-24 md:pl-6 md:mr-12 md:pb-6 lg:pt-14">
            <div className="font-jost font-bold text-white text-sm md:text-base">
                Frontend Mentor
            </div>
            <div className="font-jost text-xs text-opacity-75 text-white">
                Feedback Board
            </div>
            </div>
            <div className="justify-self-end">
            {actionButton}
            </div>
        </div>
    )
}

export default Header