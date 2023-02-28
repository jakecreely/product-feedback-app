import Layout from "@/components/layout"
import { ReactElement, useEffect, useState } from "react"
import NavBar from "@/components/NavBar/navbar"
import Sort from "@/components/sort"
import Card from "@/components/suggestionCard"
import { GetStaticProps, NextPage } from "next"
import { GetData, ProductRequest } from "@/types"
import { Feedback, Prisma, PrismaClient } from "@prisma/client"

type SuggestionsWithAll = Prisma.FeedbackGetPayload<{
  include: { comments: true, user: true, category: true, status: true }
}>

type SuggestionsProps = {
  suggestions: SuggestionsWithAll[]
}

  const Suggestions: NextPage<SuggestionsProps> = ({suggestions}) => {

    const [isOpen, setIsOpen] = useState(false)

    let suggestionCards: ReactElement[] = []

    if (suggestions.length === 0) {
      suggestionCards.push(
        <div className="text-center">
          <h2 className="text-2xl font-bold">No suggestions yet</h2>
          <p className="text-sm">Be the first to share your feedback</p>
        </div>
      )
    } else {
      suggestions.map(suggestion => {
        console.log(suggestion)
        suggestionCards.push(
        <Card 
          {...suggestion}
        />
        )
        })
    }
    

// `${isOpen ? 'bg-[#647196]' : 'bg-[#F7F8FD]'}

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 md:p-10 lg:px-40 lg:py-24 bg-[#F7F8FD]">
        <div className="lg:row-span-2 lg:col-span-3">
        <NavBar handleOpen={() => setIsOpen(!isOpen)} isOpen={isOpen} suggestions={suggestions}/>
        </div>
        <div className="lg:col-span-9">
            <Sort />
        <div className="px-6 py-8 md:px-0 lg:pt-4">
        {suggestionCards}
          </div>
        </div>
    </div>

  )
}

export default Suggestions

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()
  const suggestions = await prisma.feedback.findMany({
    include: {
      comments: true,
      user: true,
      category: true,
      status: true
    }
  })

  return {
    props: {
      suggestions
    }
  }

} 

