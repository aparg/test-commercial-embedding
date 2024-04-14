"use client";
import React, { useEffect, useRef } from "react";

import CityResoCard from "@/components/reso/CityResoCard";

//ICONS
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { plural } from "@/constant/plural";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { saleLease } from "@/constant";
import { generateURL } from "@/helpers/generateURL";

const AdditionalListing = ({
  city,
  newSalesData,
  listingType = null,
  saleLeaseValue = null,
}) => {
  const scrollRef = useRef(null); //used to hold scroll value
  const cardRef = useRef(null); //used to hold card width value
  const formattedCity = city?.toLowerCase()

  //business is returned as Sale of business so we need to modify it to Business
  const modifyType = (type) => {
    if (type == "Sale Of Business") return "business";
    if (type == "Commercial/Retail") return "retail";
    return type;
  };

  const slideLeft = () => {
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = cardWidth * 3; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft -= scrollAmount;
  };

  const slideRight = () => {
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = cardWidth * 3; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft += scrollAmount;
  };

  return (
    <div className="position-relative">
      <div className="d-flex justify-content-between pt-5 explore-container my-0 sm:my-4 align-center">
        <div className="w-full flex flex-row justify-between items-center">
          {!listingType ? (
            <h3 className="main-title fs-3 fs-sm-2">
              Explore New {listingType ? `${listingType}` : ``} Listings in{" "}
              {city}
            </h3>
          ) : (
            <h3 className="main-title fs-3 fs-sm-2 ">
              Continue searching{" "}
              {capitalizeFirstLetter(modifyType(listingType))}
              {`${
                plural[capitalizeFirstLetter(modifyType(listingType))] || ""
              }`}{" "}
              {saleLeaseValue &&
                `${
                  Object.values(saleLease).find((data) => {
                    return data.value == saleLeaseValue;
                  })?.name
                } `}
              in {(city && decodeURIComponent(city)) || "Ontario"}
            </h3>
          )}
          <a
            // href={`/ontario${formattedCity ? `/${formattedCity}` : ""}${
            //   listingType && formattedCity
            //     ? `/${listingType.toLowerCase()}`
            //     : ""
            // }${!formattedCity && listingType ? `/filter/${listingType}` : ""}
            // ${
            //   saleLeaseValue
            //     ? `/${Object.keys(saleLease).find(
            //         (key) => saleLease[key].value == saleLeaseValue
            //       )}`
            //     : ``
            // }`}
            href={generateURL({
              cityVal: city,
              houseTypeVal: modifyType(listingType),
              saleLeaseVal: saleLeaseValue,
            })}
            className="btn btn-outline-primary float-end btn-explore px-2 sm:px-2 py-0 sm:py-2 h-6 sm:h-11"
          >
            <span className="hidden sm:inline">Explore </span>All
          </a>
        </div>
      </div>
      <div className="btns d-flex justify-space-between">
        <button
          className="scroll-left position-absolute start-0"
          title="scroll left"
          onClick={slideLeft}
        >
          <SlArrowLeft size={16} />
        </button>
        <button
          className="scroll-right position-absolute end-0"
          title="scroll right"
          onClick={slideRight}
        >
          <SlArrowRight size={16} />
        </button>
      </div>
      <div
        className="row row-cols-lg-5 row-cols-md-3 row-cols-1 g-4"
        id="slider"
        ref={scrollRef}
      >
        {newSalesData?.map((curElem, index) => {
          // if (curElem.PhotoCount > 0) {
          return (
            <CityResoCard
              city={formattedCity}
              key={index}
              curElem={curElem}
              ref={cardRef}
            />
          );
          // }
          // return null
        })}
      </div>
    </div>
  );
};

export default AdditionalListing;
