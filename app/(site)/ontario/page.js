import React from "react";
import { listingType, saleLease } from "@/constant";
import SalesList from "@/components/reso/SalesList";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import FilteredCommercialList from "@/components/reso/FilteredCommercialList";
import HotListings from "@/components/HotListings";

const page = async ({ params }) => {
  const INITIAL_LIMIT = 30;

  return (
    <div className="">
      <FilteredCommercialList
        {...{
          INITIAL_LIMIT,
        }}
      />
    </div>
  );
};

export default page;
