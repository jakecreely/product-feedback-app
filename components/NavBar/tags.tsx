import { FunctionComponent } from "react"

type Props = {
    selectedCategory: string,
    handleCategory: (category: string) => void
}

const Tags: FunctionComponent<Props> = ({selectedCategory, handleCategory}) => {

    const categories = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"]

    return (
        <div className="p-6 flex gap-y-2 gap-x-2 bg-white flex-wrap rounded-lg h-max">
        {categories.map(category => {
            if (category === selectedCategory) {
                return (
                    <div 
                    className="py-2 px-4 bg-secondary text-white text-xs font-semibold rounded-lg"
                    onClick={() => handleCategory(category)}
                >
                    {category}
                </div>
                )
            }
            return (
                <div 
                className="py-2 px-4 bg-[#F2F4FF] text-secondary text-xs font-semibold rounded-lg hover:bg-[#CFD7FF] hover:cursor-pointer"
                onClick={() => handleCategory(category)}
            >
                {category}
            </div>
            )
        })}
        </div>
    )
}

export default Tags