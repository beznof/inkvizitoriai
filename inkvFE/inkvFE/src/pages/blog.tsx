import { title } from "@/components/primitives";
import ListingCard from "@/components/ListingCard";
import MainLayout from "@/layouts/MainLayout";

export default function DocsPage() {

  const ImageURL = "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4";
  const name = "Sample ListingSample";
  const price = 100;
  const city = "Vilnius";

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center w-[60%] text-center mx-auto">
        <h1 className={title()}>Blog</h1>
        {ImageURL && name && price && city && <ListingCard
          imageURL={ImageURL} name={name} price={price} city={city} />}
      </div>
    </MainLayout>
  );
}
