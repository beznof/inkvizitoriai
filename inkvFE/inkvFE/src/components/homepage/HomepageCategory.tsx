import React from "react";
import { Category } from "@/types/Category";
import { Subcategory } from "@/types/Subcategory";

type HomepageCategoryProps = {
    category: Category;
    subcategories: Subcategory[];
}

const HomepageCategory: React.FC<HomepageCategoryProps> = ({category, subcategories}) => {
    return(
        <div className="w-full max-w-[250px]">
            <div className="w-full max-w-[250px] flex items-left font-bold text-rose-500">{category.name}</div>
            <div className="w-full max-w-[250px] border-2 border-rose-500"></div>
            {subcategories.map((subcategory,index) =>(
                <div className="w-full max-w-[250px] flex items-left mt-1 text-stone-600" key= {index}>{subcategory.name}</div>
            ))}
        </div>
    )
}

export default HomepageCategory;