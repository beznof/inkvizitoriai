import { title } from "@/components/primitives";
import ListingCard from "@/components/ListingCard";
import MainLayout from "@/layouts/MainLayout";
import ListingProperties from "@/components/listing/ListingProperties";
import ImageShowcase from "@/components/listing/ImageShowcase";

export default function DocsPage() {

  const ImageURL = "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4";
  const name = "Sample ListingSample";
  const price = 100;
  const city = "Vilnius";
  const properties = ["Used", "New", "Good condition"];
  const images = ["https://plus.unsplash.com/premium_photo-1680700221535-a7aa2aa40a7c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1751895924527-65f56f8d3542?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1680700221535-a7aa2aa40a7c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center w-[60%] text-center mx-auto">
        <h1 className={title()}>Blog</h1>
        {ImageURL && name && price && city && <ListingCard
          imageURL={ImageURL} name={name} price={price} city={city} />}
        {properties && (<ListingProperties properties = {properties}/>)}
        {images && <ImageShowcase images={images}/>}
      </div>
    </MainLayout>
  );
}
