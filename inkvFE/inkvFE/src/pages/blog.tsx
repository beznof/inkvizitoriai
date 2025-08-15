import { title } from "@/components/primitives";
import ListingCard from "@/components/ListingCard";
import MainLayout from "@/layouts/MainLayout";
import ListingProperties from "@/components/listing/ListingProperties";
import HomepageCategory from "@/components/homepage/HomepageCategory";
import { Category } from "@/types/Category";
import { Subcategory } from "@/types/Subcategory";
import CloseIcon from "@/static/CloseIcon";

export default function DocsPage() {

  const ImageURL = "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4";
  const name = "Sample ListingSample";
  const price = 100;
  const city = "Vilnius";
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
    <MainLayout>
      <div className="flex flex-col items-center justify-center w-[60%] text-center mx-auto">
        <h1 className={title()}>Blog</h1>
        {ImageURL && name && price && city && <ListingCard
          imageURL={ImageURL} name={name} price={price} city={city} />}
        {properties && (<ListingProperties properties = {properties}/>)}
          {category && subcategories && <HomepageCategory category={category} subcategories={subcategories}
            svg={<CloseIcon></CloseIcon>}/>}
      </div>
    </MainLayout>
  );
}
