import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import ListingProperties from "@/components/listing/ListingProperties";
import HomepageCategory from "@/components/homepage/HomepageCategory";
import { Category } from "@/types/Category";
import { Subcategory } from "@/types/Subcategory";
import CloseIcon from "@/static/CloseIcon";

export default function DocsPage() {

  const properties = ["Used", "New", "Good condition"];
  const category:Category = {id: 1, name:"Darbas, paslaugos"};
  const subcategories:Subcategory[] =
  [ {id: 1, name: "Siūlo darbą", category:category}, {id: 2, name: "Ieško darbo", category:category},
    {id: 3, name: "Biuro paslaugos", category:category}, {id: 4, name: "Grožio, sveikatos paslaugos", category:category},
    {id: 5, name: "Kursai, mokymai", category:category}, {id: 6, name: "Renginių paslaugos", category:category},
    {id: 7, name: "Verslo paslaugos", category:category}, {id: 8, name: "Web sprendimai, svetainės", category:category},
    {id: 9, name: "Kita", category:category}
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Blog</h1>
          {properties && (<ListingProperties properties = {properties}/>)}
          {category && subcategories && <HomepageCategory category={category} subcategories={subcategories}
            svg={<CloseIcon width={20} height={20} fill="red"></CloseIcon>}/>}
        </div>
      </section>
    </DefaultLayout>
  );
}
