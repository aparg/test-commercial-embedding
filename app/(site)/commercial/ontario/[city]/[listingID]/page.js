import React from "react";
import dynamic from "next/dynamic";
import Gallery from "@/components/reso/Gallery";
import Link from "next/link";
import { commercial } from "@/api/routes";
import { generateImageURLs } from "@/helpers/generateImageURLs";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import BookShowingForm from "@/components/BookShowingForm";
// import MortgageCalculator from "@/components/reso/MortgageCalculator";

const Map = dynamic(() => import("@/components/reso/Map"), { ssr: false });

import AdditionalListing from "@/components/reso/AdditionalListing";
import PropertyPage from "@/components/reso/propertyPage";
import { generateURL } from "@/helpers/generateURL";
// import { Button } from "@nextui-org/react";

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 10;

const fetchData = async (listingID) => {
  const options = {
    method: "GET",
  };
  const urlToFetchMLSDetail = commercial.properties.replace(
    "$query",
    `?$select=MLS='${listingID}'`
  );

  const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
  const data = await resMLSDetail.json();
  return data.results[0];
};

const page = async ({ params }) => {
  const city = params.city;
  const formattedSlug = capitalizeFirstLetter(city);
  const parts = params.listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingID = lastPart;

  const main_data = await fetchData(listingID); //always a single object inside the array

  const newSalesData = await getCommercialData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    formattedSlug,
    main_data?.TypeOwnSrch
  );

  const imageURLs = generateImageURLs(listingID);

  const address = `${main_data?.Street} ${main_data?.StreetName} ${main_data?.StreetAbbreviation}`;

  return (
    <>
      <button className="fixed w-full text-white text-lg sm:text-xl bottom-2 sm:bottom-5 sm:hidden p-6 z-[999]">
        <Link
          href="#contact"
          className="bg-primary-green rounded-md shadow-2xl px-[50px] sm:px-[100px] py-2 sm:py-5 text-white shadow-md"
        >
          Book a showing
        </Link>
      </button>
      <div className="container-fluid pt-md-3 pt-0 ">
        <div className="container-fluid pt-3 pt-md-5">
          <nav
            style={{
              "--bs-breadcrumb-divider":
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E\")",
            }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb  ps-2">
              <li className="breadcrumb-item ">
                <Link href="/">Dolphy</Link>
              </li>
              <li className="breadcrumb-item ">
                <Link href="/ontario">ON</Link>
              </li>
              <li className="breadcrumb-item ">
                <Link href={generateURL({ cityVal: city })}>
                  {main_data.Municipality}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {address}
              </li>
            </ol>
          </nav>
          <Gallery data={imageURLs} />
        </div>

        <section className="padding-top flex items-center w-full text-sm">
          <div className="padding-top flex items-center w-full">
            <div
              className={`mx-auto row justify-between gap-x-2 w-full md:max-w-[80%]`}
            >
              <div className="col-12 col-md-8">
                <PropertyPage {...{ main_data }} />
                <div className="z-20 relative mt-24">
                  <h3 className="main-title fs-2 aff2">Map View</h3>
                  <Map main_data={main_data} />
                </div>
              </div>

              <div className="col col-md-4 ps-md-2 pt-5 pt-md-0" id="contact">
                <BookShowingForm
                  defaultmessage={`Please book a showing for this property "${address}"`}
                  city={main_data.Municipality}
                ></BookShowingForm>
              </div>
            </div>
          </div>
        </section>

        {formattedSlug && (
          <section className="additonal__listing w-full mx-auto mt-24">
            <AdditionalListing
              city={formattedSlug}
              newSalesData={newSalesData}
              listingType={main_data?.TypeOwn1Out}
            />
          </section>
        )}
      </div>
    </>
  );
};

export default page;

export async function generateMetadata({ params }, parent) {
  const parts = params.listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingID = lastPart;
  const main_data = await fetchData(listingID);
  const imageURLs = generateImageURLs(listingID);
  return {
    ...parent,
    alternates: {
      // canonical: `https://dolphy.ca/pre-construction-homes/${params.city}/${params.slug}`,
    },
    openGraph: {
      images: await fetch(imageURLs[0]),
    },
    title: `${main_data?.Street} ${main_data?.StreetName} ${main_data?.StreetAbbreviation}`,
    description: `${parseInt(main_data?.TotalArea).toFixed(0)}.
    ${main_data?.TotalAreaCode}.${main_data?.TypeOwn1Out}.${
      main_data?.Municipality
    }`,
  };
}
