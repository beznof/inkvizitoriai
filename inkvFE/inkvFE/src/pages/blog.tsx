import MainLayout from "@/layouts/MainLayout";
import ListingProperties from "@/components/listing/ListingProperties";

export default function DocsPage() {

  const properties = ["Used", "New", "Good condition"];

  return (
    <MainLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="justify-center inline-block max-w-lg text-center">
          {properties && (<ListingProperties properties = {properties}/>)}
        </div>
      </section>
    </MainLayout>
  );
}
