import React from "react";
import { listingType, saleLease } from "@/constant";
import SalesList from "@/components/reso/SalesList";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FilteredCommercialList from "@/components/reso/FilteredCommercialList";
import HotListings from "@/components/HotListings";

const page = async ({ params }) => {
  const city = params.city;
  const INITIAL_LIMIT = 30;
  // const saleLeaseValue = params.saleLease;
  return (
    <div className="">
      <FilteredCommercialList
        {...{
          city,
          INITIAL_LIMIT,
        }}
      />
    </div>
  );
};

export default page;

export async function generateMetadata({ params }, parent) {
  return {
    ...parent,
    alternates: {
      canonical: `https://dolphy-commercial-two.vercel.app/ontario/${params.city}`,
    },
    openGraph: {
      images: "/logo/logo-black.svg",
    },
    title: `Find Commercial Real Estate For Sale in ${params.city}`,
    description: `Explore top comercial real estates in ${params.city} and select the best ones`,
  };
}
