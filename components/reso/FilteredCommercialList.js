"use client";
import React, { useState, useMemo, useEffect } from "react";

import SalesList from "@/components/reso/SalesList";
import Filters from "@/components/reso/Filters";

//HELPERS
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";

//CONSTANT
import { saleLease, listingType } from "@/constant";
import { getFilteredRetsData } from "@/actions/fetchCommercialActions";

import useDeviceView from "@/helpers/useDeviceView";
import ResoCard from "./ResoCard";
import { ImSpinner } from "react-icons/im";
import { useInView } from "react-intersection-observer";
import CityResoCard from "./CityResoCard";
import HotListings from "../HotListings";
import { prependToLocalStorageArray } from "@/helpers/handleLocalStorageArray";
import { plural } from "@/constant/plural";
import is from "date-fns/esm/locale/is/index.js";

const FilteredCommercialList = ({
  INITIAL_LIMIT,
  city = undefined,
  type = undefined,
  saleLeaseValue = undefined,
  embedded = false,
}) => {
  const [filterState, setFilterState] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [offset, setOffset] = useState(0);
  const { isMobileView } = useDeviceView();

  const fetchFilteredData = async (payload) => {
    const queryParams = {
      city: city ? capitalizeFirstLetter(city) : undefined,
      limit: INITIAL_LIMIT,
      houseType: Object.values(listingType).find(
        (type) => type.name === payload?.type
      )?.value,
      offset: 0,

      maxListPrice: payload?.maxListPrice ?? payload?.priceRange.max,
      minListPrice: payload?.minListPrice ?? payload?.priceRange.min,
      saleLease:
        Object.values(saleLease).filter(
          (state) => state.name === payload.saleLease
        )[0].value || undefined,
      minTimestampSql: payload.minTimestampSql,
    };
    const filteredSalesData = await getFilteredRetsData(queryParams);
    setSalesData([...filteredSalesData]);
    setOffset(INITIAL_LIMIT);
  };

  const { hotSales, remainingSales } = useMemo(() => {
    // Get the current date and time
    const currentDate = new Date();

    // Calculate the date and time 24 hours ago
    const twentyFourHoursAgo = new Date(
      currentDate.getTime() - 24 * 60 * 60 * 1000
    );

    // Function to check if the data is from 24 hours ago
    const is24HoursAgo = (timestampSql) => {
      const timestampDate = new Date(timestampSql);
      return timestampDate > twentyFourHoursAgo && timestampDate <= currentDate;
    };

    // Separate sales data for 24 hours ago and remaining days
    const hotSales = [];
    const remainingSales = [];

    salesData.forEach((data) => {
      if (is24HoursAgo(data.TimestampSql) && hotSales.length < 5) {
        hotSales.push(data);
      } else {
        remainingSales.push(data);
      }
    });
    return { hotSales, remainingSales };
  }, [salesData]);

  useEffect(() => {
    // store data in session storage whenever it changes
    if (isLocalStorageAvailable() && filterState) {
      localStorage.setItem(
        "filterStateCommercial",
        JSON.stringify(filterState)
      );
      localStorage.setItem(
        "selectedCityCommercial",
        capitalizeFirstLetter(city)
      );
    }
  }, [filterState]);

  useEffect(() => {
    const storedState = localStorage.getItem("filterStateCommercial");
    //we dont want to display stored data id the URL defines the filter state else previous filterstate is used
    if (storedState && !(saleLeaseValue || type)) {
      const newFilterState = JSON.parse(storedState);
      setFilterState(newFilterState);
      fetchFilteredData(newFilterState);
    } else {
      const newFilterState = {
        saleLease: saleLeaseValue ? saleLease[saleLeaseValue].name : "For Sale",
        priceRange: {
          min: 0,
          max: 0,
        },
        type: type ? capitalizeFirstLetter(type) : type,
        minTimestampSql: undefined,
      };
      setFilterState(newFilterState);
      fetchFilteredData(newFilterState);
    }
  }, []);

  return (
    <>
      {filterState && (
        <div className="container-fluid">
          <h3 className={`main-title fs-2 ${isMobileView ? "pt-3" : "pt-4"}`}>
            Find{" "}
            {filterState.type ? filterState.type : "Commercial Real Estate"}
            {plural[filterState.type]} {filterState.saleLease || "For Sale"} in{" "}
            {(city && decodeURIComponent(capitalizeFirstLetter(city))) ||
              "Ontario"}{" "}
            {filterState.priceRange.max
              ? `under $${filterState.priceRange.max}`
              : ``}
          </h3>
          <p
            className="fw-light mb-2"
            style={isMobileView ? { fontSize: "0.9rem" } : {}}
          >
            Explore top{" "}
            {filterState.type
              ? `${filterState.type}${plural[filterState.type]}`
              : "Commercial Real Estate"}{" "}
            in{" "}
            {(city && decodeURIComponent(capitalizeFirstLetter(city))) ||
              "Ontario"}{" "}
            and select the best ones.
          </p>
          <div className="filter-container flex">
            <Filters
              {...{ filterState, setFilterState, fetchFilteredData, embedded }}
            />
          </div>

          <HotListings salesData={hotSales} />
          <div
            className={`${
              isMobileView ? "pt-3" : "pt-5"
            } row row-cols-1 row-cols-md-3 row-cols-xs-1 row-cols-sm-1 row-cols-lg-4 row-cols-xl-5 g-4 g-md-3`}
          >
            <SalesList
              {...{
                salesData: remainingSales,
                city,
                INITIAL_LIMIT,
                setSalesData,
                offset,
                setOffset,
                filterState,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FilteredCommercialList;
