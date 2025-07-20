import React from "react";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import ListingProperties from "@/components/listing/ListingProperties";

export default function DocsPage() {

  const [properties, setProperties] = React.useState<string[]>(["Used", "New", "Good condition"]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Blog</h1>
          {properties && (<ListingProperties properties = {properties}/>)}
        </div>
      </section>
    </DefaultLayout>
  );
}
