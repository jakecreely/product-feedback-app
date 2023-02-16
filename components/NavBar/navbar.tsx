import { NextPage } from "next"
import Image from "next/image"
import { useState } from "react"
import Header from "./header"
import Roadmap from "./roadmap"
import Tags from "./tags"

interface Props {
    handleOpen: () => void,
    isOpen: boolean
}

const NavBar: NextPage<Props> = (props) => {

    const { handleOpen, isOpen } = props

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2.5 md:pb-10 lg:grid-cols-1 md:items-stretch">
            <div>                
                <Header handleOpen={handleOpen} isOpen={isOpen}/>
            </div>
            <div className="hidden md:block">
            <Tags/>
            </div>
            <div className="hidden md:block">
            <Roadmap /> 
            </div>
            <div>
            <div className={`${isOpen ? 'visible' : 'hidden'} fixed right-0 w-3/4 grid gap-y-6 p-6 bg-[#F7F8FD] md:hidden md:relative md:mt-0`}>
                <Tags/>
                <Roadmap />
            </div>
            </div>
        </div>
        </>
    )
}

export default NavBar