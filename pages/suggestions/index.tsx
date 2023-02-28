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
    const [filteredSuggestions, setFilteredSuggestions] = useState<SuggestionsWithAll[]>(suggestions)
    const [chosenCategory, setChosenCategory] = useState('All')
    const [chosenSort, setChosenSort] = useState('Most Upvotes')

    const handleCategory = (category: string) => {
      setChosenCategory(category)
      handleSuggestions(category)
    }

    // A function to filter the suggestions by category
    const filterSuggestionsByCategory = (category: string) => {
      if (category === 'All') {
        return suggestions
      }
      const filteredSuggestions = suggestions.filter(suggestion => suggestion.category.name === category)
      return filteredSuggestions
    }

    const handleSort = (sort: string) => {
      setChosenSort(sort)
      sortSuggestions(sort)
    }

    const sortSuggestions = (sort: string) => {
      if (sort === 'most_upvotes') {
        const sortedSuggestions = filteredSuggestions.sort((a, b) => b.upvotes - a.upvotes)
        setFilteredSuggestions(sortedSuggestions)
      } else if (sort === 'most_comments') {
        const sortedSuggestions = filteredSuggestions.sort((a, b) => b.comments.length - a.comments.length)
        setFilteredSuggestions(sortedSuggestions)
      } else if (sort === 'least_upvotes') {
        const sortedSuggestions = filteredSuggestions.sort((a, b) => a.upvotes - b.upvotes)
        setFilteredSuggestions(sortedSuggestions)
      } else if (sort === 'least_comments') {
        const sortedSuggestions = filteredSuggestions.sort((a, b) => a.comments.length - b.comments.length)
        setFilteredSuggestions(sortedSuggestions)
      }
    }

    const handleSuggestions = (category: string) => {
      const filteredSuggestions = filterSuggestionsByCategory(category)
      setFilteredSuggestions(filteredSuggestions)
    }

    let suggestionCards: ReactElement[] = []

    if (filteredSuggestions.length === 0) {
      suggestionCards.push(
        <div className="px-6 py-16 mb-4 bg-white rounded-xl flex flex-col gap-y-4">
          <div className="mb-9">
          <img src="assets/suggestions/illustration-empty.svg" alt="No suggestions yet" className="w-1/3 md:w-1/5 m-auto"/>
          </div>
          <h3 className="text-black m-auto md:text-2xl">There is no feedback yet.</h3>
          <p className="text-sm text-lightGrey text-center md:text-base md:w-4/6 md:mx-auto">
            Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.
          </p>
        </div>
      )
    } else {
      filteredSuggestions.map(suggestion => {
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
        <NavBar 
          handleOpen={() => setIsOpen(!isOpen)} 
          isOpen={isOpen} 
          handleCategory={handleCategory} 
          suggestions={suggestions} 
          selectedCategory={chosenCategory}
        />
        </div>
        <div className="lg:col-span-9">
            <Sort 
              suggestions={filteredSuggestions}           
              handleSort={handleSort}
              chosenSort={chosenSort}
            />
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

