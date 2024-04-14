import React from "react";
import { listingType, saleLease } from "@/constant";
import SalesList from "@/components/reso/SalesList";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FilteredCommercialList from "@/components/reso/FilteredCommercialList";
import HotListings from "@/components/HotListings";
import { plural } from "@/constant/plural";

const page = async ({ params }) => {
  let saleLeaseValue;
  let type;
  if (Object.keys(saleLease).includes(params.slug1)) {
    saleLeaseValue = params.slug1;
  } else if (Object.keys(saleLease).includes(params.slug2)) {
    saleLeaseValue = params.slug2;
  }
  if (Object.keys(listingType).includes(params.slug1)) {
    type = capitalizeFirstLetter(params.slug1);
  } else if (Object.keys(listingType).includes(params.slug2)) {
    type = capitalizeFirstLetter(params.slug2);
  }
  const isValidSlug = saleLeaseValue || type;
  const city = params.city;
  const INITIAL_LIMIT = 30;
  const formattedSlug = capitalizeFirstLetter(city);
  const commercialListData = await getCommercialData(
    0,
    INITIAL_LIMIT,
    formattedSlug
  );
  if (isValidSlug)
    return (
      <div className="container-fluid">
        <FilteredCommercialList
          {...{
            city,
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
  let saleLeaseValue;
  let type;
  if (Object.keys(saleLease).includes(params.slug1)) {
    saleLeaseValue = params.slug1;
  } else if (Object.keys(saleLease).includes(params.slug2)) {
    saleLeaseValue = params.slug2;
  }
  if (Object.keys(listingType).includes(params.slug1)) {
    type = capitalizeFirstLetter(params.slug1);
  } else if (Object.keys(listingType).includes(params.slug2)) {
    type = capitalizeFirstLetter(params.slug2);
  }
  return {
    ...parent,
    alternates: {
      canonical: `https://dolphy-commercial-two.vercel.app/ontario/${type}/${saleLeaseValue}/${type}`,
    },
    openGraph: {
      images: "/logo/logo-black.svg",
    },
    title: `Find ${type} Real Estate ${saleLease[saleLeaseValue]?.name} in ${params.city}`,
    description: `Explore top ${type}${
      plural[capitalizeFirstLetter(type)]
    } in ${params.city} and select the best ones`,
  };
}
