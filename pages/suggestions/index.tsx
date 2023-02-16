import Layout from "@/components/layout"
import { ReactElement, useState } from "react"
import NavBar from "@/components/NavBar/navbar"
import Sort from "@/components/sort"
import Card from "@/components/suggestionCard"

function Suggestions() {

    const [isOpen, setIsOpen] = useState(false)

    let suggestions: {
      title: string, 
      description: string,
      tags: string[],
      upvotes: number,
      comments: number,
    }[] = [{
      title: "Add dark mode",
      description: "It would be great if you could add a dark mode to the website",
      tags: ["Feature"],
      upvotes: 10,
      comments: 2,
    }]
    
    // let suggestions: {
    //   title: string,
    //   description: string,
    //   tags: string[],
    //   upvotes: number,
    //   comments: number,
    // }[] = []

    let suggestionCards: ReactElement[] = []

    if (suggestions.length === 0) {
      suggestionCards.push(
        <div className="text-center">
          <h2 className="text-2xl font-bold">No suggestions yet</h2>
          <p className="text-sm">Be the first to share your feedback</p>
        </div>
      )
    } else {
      suggestions.map(suggestion => (
        suggestionCards.push(
        <Card 
          title={suggestion.title} 
          description={suggestion.description}
          tags={suggestion.tags}
          upvotes={suggestion.upvotes}
          comments={suggestion.comments}
        />
        )
        ))}

// `${isOpen ? 'bg-[#647196]' : 'bg-[#F7F8FD]'}

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 md:p-10 bg-[#F7F8FD]">
        <div className="lg:row-span-2 lg:col-span-3">
        <NavBar handleOpen={() => setIsOpen(!isOpen)} isOpen={isOpen}/>
        </div>
        <div className="lg:col-span-9">
            <Sort />
        <div className="px-6 py-8 md:px-0">
        {suggestionCards}
          </div>
        </div>
    </div>

  )
}

export default Suggestions