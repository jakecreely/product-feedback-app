import { Prisma } from "@prisma/client"
import { NextPage } from "next"
import Image from "next/image"
import { useState } from "react"
import Header from "./header"
import Roadmap from "./roadmap"
import Tags from "./tags"

type SuggestionsWithAll = Prisma.FeedbackGetPayload<{
    include: { comments: true, user: true, category: true, status: true }
  }>
  
type NavBarProps = {
    suggestions: SuggestionsWithAll[],
    handleOpen: () => void,
    isOpen: boolean
}

const NavBar: NextPage<NavBarProps> = ({handleOpen, isOpen, suggestions }) => {

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-2.5 lg:grid-cols-1 lg:gap-x-0 md:pb-10 lg:pb-0 lg:gap-y-4 lg:pr-5 md:items-stretch">
            <div>                
                <Header handleOpen={handleOpen} isOpen={isOpen}/>
            </div>
            <div className="hidden md:block">
            <Tags/>
            </div>
            <div className="hidden md:block">
            <Roadmap suggestions={suggestions}/> 
            </div>
            <div>
            <div className={`${isOpen ? 'visible' : 'hidden'} fixed right-0 w-3/4 grid gap-y-6 p-6 bg-[#F7F8FD] md:hidden md:relative md:mt-0`}>
                <Tags/>
                <Roadmap suggestions={suggestions}/>
            </div>
            </div>
        </div>
        </>
    )
}

export default NavBar