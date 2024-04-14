import React from "react";
import { listingType, saleLease } from "@/constant";
import SalesList from "@/components/reso/SalesList";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FilteredCommercialList from "@/components/reso/FilteredCommercialList";

const page = async ({ params }) => {
  const isValidSlug = Object.keys(listingType).includes(params.filter);
  const type = capitalizeFirstLetter(params.filter);
  const INITIAL_LIMIT = 30;
  const commercialListData = await getCommercialData(0, INITIAL_LIMIT);
  const saleLeaseValue = params.saleLease;
  if (isValidSlug)
    return (
      <div className="">
        <FilteredCommercialList
          {...{
            INITIAL_LIMIT,
            commercialListData,
            type,
            saleLeaseValue,
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
      canonical: `https://dolphy-commercial-two.vercel.app/${params.filter}/ontario`,
    },
    openGraph: {
      images: "/logo/logo-black.svg",
    },
    title: `Looking for ${params.filter} in ontario? `,
    description:
      "Search our selection of commercial real estate for sale or lease in Ontario. Our ever-changing portfolio of pre constructions brings you closer to your ideal " +
      params.filter +
      " in the growing province of Ontario.",
  };
}
