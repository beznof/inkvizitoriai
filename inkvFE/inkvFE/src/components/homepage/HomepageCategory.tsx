import React from "react";
import { Category } from "@/types/Category";
import { Subcategory } from "@/types/Subcategory";
import ROUTES from "@/enums/routes";

type HomepageCategoryProps = {
    category: Category;
    subcategories: Subcategory[];
    svg?:React.ReactNode;
}

const HomepageCategory: React.FC<HomepageCategoryProps> = ({category, subcategories, svg}) => {
    return(
        <div className="w-full max-w-[250px]">
            <div className="flex flex-row items-end justify-between w-full pr-2 mb-1">
                <p className="grid justify-items-start font-bold text-rose-500">{category.name}</p>
                <svg className="size-9 fill-rose-500">{svg}</svg>
            </div>
            <div className="w-full max-w-[250px] border-2 border-rose-500"></div>
            {subcategories.map((subcategory,index) =>(
                <a href={ROUTES.HOME} className="w-full max-w-[250px] flex items-left mt-1 text-stone-600 hover:underline decoration-rose-500"
                    key= {index}>{subcategory.name}
                </a>
            ))}
        </div>
    )
}

export default HomepageCategory;