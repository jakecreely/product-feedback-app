import Header from "@/components/header"
import Layout from "@/components/layout"
import { ReactElement } from "react"

function Suggestions() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="lg:row-span-2">
        <Header />
        </div>
        <div>
            <h2>Sort</h2>
        </div>
        <div>
        <h1>Suggestions</h1>
        </div>
    </div>

  )
}

export default Suggestions