import Layout from "@/components/layout"
import { ReactElement, useEffect, useState } from "react"
import NavBar from "@/components/NavBar/navbar"
import Sort from "@/components/sort"
import Card from "@/components/suggestionCard"
import { GetStaticProps, NextPage } from "next"
import { GetData, ProductRequest } from "@/types"

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch('localhost:3000/api/hello')
//   const { productRequests }: GetData = await res.json()

//   return {
//     props: {
//       suggestions: productRequests,
//     }
//   }

// } 


// const Suggestions: NextPage<{productRequests: ProductRequest[]}> = ({productRequests}) => {
  const Suggestions: NextPage = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [suggestions, setSuggestions] = useState<ProductRequest[]>([])

      useEffect(() => {
        fetch('data.json')
        .then(res => res.json())
        .then(data => {
          setSuggestions(data.productRequests)
        })
      }, [])

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
          id={suggestion.id}
          title={suggestion.title}
          description={suggestion.description}
          category={suggestion.category}
          upvotes={suggestion.upvotes}
          comments={suggestion.comments}
          status={suggestion.status}
        />
        )
        })}

// `${isOpen ? 'bg-[#647196]' : 'bg-[#F7F8FD]'}

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 md:p-10 bg-[#F7F8FD]">
        <div className="lg:row-span-2 lg:col-span-3">
        <NavBar handleOpen={() => setIsOpen(!isOpen)} isOpen={isOpen}/>
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