import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import ListingProperties from "@/components/listing/ListingProperties";
import ImageShowcase from "@/components/listing/ImageShowcase";

export default function DocsPage() {

  const properties = ["Used", "New", "Good condition"];
  const images = ["https://plus.unsplash.com/premium_photo-1680700221535-a7aa2aa40a7c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1751895924527-65f56f8d3542?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1680700221535-a7aa2aa40a7c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Blog</h1>
          {properties && (<ListingProperties properties = {properties}/>)}
        </div>
        <div>
          {images && <ImageShowcase images={images}/>}
        </div>
      </section>
    </DefaultLayout>
  );
}
