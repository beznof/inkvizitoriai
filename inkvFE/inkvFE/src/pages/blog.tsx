import { title } from "@/components/primitives";
import ListingCard from "@/components/ListingCard";
import MainLayout from "@/layouts/MainLayout";
import ListingProperties from "@/components/listing/ListingProperties";
import HomepageCategory from "@/components/homepage/HomepageCategory";
import { Category } from "@/types/Category";
import { Subcategory } from "@/types/Subcategory";
import CloseIcon from "@/static/CloseIcon";
import ImageShowcase from "@/components/listing/ImageShowcase";
import SearchBar from "@/components/SearchBar";
import { City } from "@/types/City";

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
  const images = ["https://plus.unsplash.com/premium_photo-1680700221535-a7aa2aa40a7c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1751895924527-65f56f8d3542?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1680700221535-a7aa2aa40a7c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  const citys:City[] =
  [ {id: 1, name: "Kaunas"}, {id: 2, name: "Vilnius"},
    {id: 3, name: "Kplaipeda"}, {id: 4, name: "Šiauliai"},
    {id: 5, name: "Kaunas"}, {id: 6, name: "Vilnius"},
    {id: 7, name: "Kplaipeda"}, {id: 8, name: "Šiauliai"},
    {id: 9, name: "Kaunas"}, {id: 10, name: "Vilnius"},
    {id: 11, name: "Kplaipeda"}, {id: 12, name: "Šiauliai"},
    {id: 13, name: "Kaunas"}, {id: 14, name: "Vilnius"},
    {id: 15, name: "Kplaipeda"}, {id: 16, name: "Šiauliai"},
    {id: 17, name: "Kaunas"}, {id: 18, name: "Vilnius"},
    {id: 19, name: "Kplaipeda"}, {id: 20, name: "Šiauliai"},
  ];

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center w-[100%] text-center mx-auto">
        <h1 className={title()}>Blog</h1>
        {ImageURL && name && price && city && <ListingCard
          imageURL={ImageURL} name={name} price={price} city={city} />}
        {properties && (<ListingProperties properties = {properties}/>)}
        {category && subcategories && <HomepageCategory category={category} subcategories={subcategories}
            svg={<CloseIcon></CloseIcon>}/>}
        {images && <ImageShowcase images={images}/>}
        {citys && category && <SearchBar citys={citys} categorys={[category]}/>}
      </div>
    </MainLayout>
  );
}
