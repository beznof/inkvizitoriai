import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import ListingCard from "@/components/ListingCard";

export default function DocsPage() {

  const ImageURL = "https://fastly.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4";
  const name = "Sample Listing";
  const price = 100;
  const city = "Vilnius";

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Blog</h1>
          {ImageURL && name && price && city && <ListingCard
            imageURL={ImageURL} name={name} price={price} city={city} />}
        </div>
      </section>
    </DefaultLayout>
  );
}
