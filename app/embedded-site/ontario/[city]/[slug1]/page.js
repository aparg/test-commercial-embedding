import React from "react";
import { listingType, saleLease } from "@/constant";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FilteredCommercialList from "@/components/reso/FilteredCommercialList";

const page = async ({ params }) => {
  let saleLeaseValue = undefined;
  let type = undefined;
  if (Object.keys(saleLease).includes(params.slug1)) {
    saleLeaseValue = params.slug1;
  }
  if (Object.keys(listingType).includes(params.slug1)) {
    type = capitalizeFirstLetter(params.slug1);
  }
  const isValidSlug = saleLeaseValue || type;
  const city = params.city;
  const INITIAL_LIMIT = 30;
  if (isValidSlug)
    return (
      <FilteredCommercialList
        {...{
          city,
          INITIAL_LIMIT,
          type,
          saleLeaseValue,
        }}
      />
    );
  return <></>;
};

export default page;
