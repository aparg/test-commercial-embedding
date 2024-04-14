"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

//HELPERS
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { useInView } from "react-intersection-observer";
import { ImSpinner } from "react-icons/im";

//COMPONENT
import ResoCard from "@/components/reso/ResoCard";

//SERVER
import { getFilteredRetsData } from "@/actions/fetchCommercialActions";

//CONSTANT
import { saleLease, listingType, numberOfDays } from "@/constant";
import CityResoCard from "./CityResoCard";

const SalesList = ({
  salesData,
  city,
  INITIAL_LIMIT,
  setSalesData,
  offset,
  setOffset,
  filterState,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView();

  const loadMoreSalesData = async () => {
    const queryParams = {
      offset,
      limit: INITIAL_LIMIT,
      city: city ? capitalizeFirstLetter(city) : undefined,
      saleLease: Object.values(saleLease).filter(
        (state) => state.name === filterState.saleLease
      )[0].value,
      minListPrice: Number(filterState.priceRange?.min ?? 0),
      maxListPrice: Number(filterState.priceRange?.max ?? 0),
      houseType: Object.values(listingType).find(
        (type) => type.name === filterState.type
      )?.value,
      minTimestampSql: Object.values(numberOfDays).find((obj) => {
        return obj.value == filterState.minTimestampSql;
      })?.value,
    };
    setIsLoading(true);
    const moreSalesListData = await getFilteredRetsData(queryParams);
    setSalesData([...salesData, ...moreSalesListData]);
    setOffset((prev) => {
      return prev + INITIAL_LIMIT;
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (inView) {
      loadMoreSalesData();
    }
  }, [inView]);

  return (
    <>
      {salesData.length > 0 ? (
        <>
          {salesData.map((curElem, index) => {
            // if (curElem.PhotoCount > 0) {
            return <CityResoCard city={city} key={index} curElem={curElem} />;
            // }
            // return null
          })}
          <div
            ref={ref}
            className="d-flex justify-content-center align-items-center w-100"
          >
            {isLoading ? <ImSpinner size={24} /> : null}
          </div>
        </>
      ) : (
        <div className="fs-4 text-center d-flex w-100 flex-column align-items-center">
          <Image
            src="/no-record-found.jpg"
            width="500"
            height="500"
            alt="no record found"
          />
          <p>No Records Found</p>
        </div>
      )}
    </>
  );
};

export default SalesList;
