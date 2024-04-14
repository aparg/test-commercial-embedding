"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "../TimeAgo";

import { commercial } from "@/api/routes";
import { Image } from "react-bootstrap";
import { listingType, saleLease } from "@/constant";
import CompareButton from "../CompareButton";
import { generateURL } from "@/helpers/generateURL";

const CityResoCard = React.forwardRef(
  ({ curElem, small = false, city }, ref) => {
    // const [address, setAddress] = useState("");
    const price = Number(curElem.ListPrice).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    const mapObj = {
      MLS: curElem.MLS,
      index: 1,
    };
    const imgSrc = commercial.photos.replace(/MLS|index/gi, function (matched) {
      return mapObj[matched];
    });

    const handleImageError = (e) => {
      e.target.onerror = null;
      e.target.src = `/noimage.webp`;
    };

    // const listingID = curElem.MLS;

    // const options = {
    //   method: "GET",
    // };
    // const urlToFetchMLSDetail = commercial.properties.replace(
    //   "$query",
    //   `?$select=MLS='${listingID}'`
    // );
    // useEffect(() => {
    //   fetchPropertyData();
    // }, []);

    // const fetchPropertyData = async () => {
    //   const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
    //   const data = await resMLSDetail.json();
    //   const main_data = data.results[0];
    //   const address = `${main_data?.Street} ${main_data.StreetName} ${main_data.StreetAbbreviation}`;
    //   setAddress(address);
    // };
    // return (
    //   <>
    //     <div className="col additional_sales-card" ref={ref}>
    //       <Link
    //         href={`/ontario/${city}/${curElem.MLS}`}
    //         className="text-decoration-none text-dark"
    //       >
    //         <div className="afte-proj">
    //           <div className="img-text ">
    //             <p className="m-0 text-small">
    //               <TimeAgo modificationTimestamp={curElem.TimestampSql} />
    //             </p>
    //           </div>

    //           <img
    //             src={imgSrc}
    //             className="imghei img-responsive imghei-small"
    //             alt={curElem.MLS}
    //             onError={handleImageError}
    //           />

    //           <div className="card-textt card text-small">
    //             <p className="mb-0 card-price card-price-small">{price}</p>

    //             <p className="mb-0 text-s"> MLS® #{curElem.MLS}</p>
    //             <p className="mb-0 text-s">{curElem.UnparsedAddress}</p>

    //             <p className="mb-0 text-s"> Listed by {curElem.ListBrokerage}</p>
    //           </div>
    //         </div>
    //       </Link>
    //     </div>
    //   </>
    // )
    const streetAndMLS = curElem.StreetName
      ? `${curElem.Street}-${curElem.StreetName?.replace(" ", "-")}-${
          curElem.StreetAbbreviation
        }-${curElem.MLS}`
      : curElem.MLS;
    return (
      <section className="" ref={ref}>
        <Link
          href={generateURL({
            cityVal: curElem.Municipality,
            listingIDVal: streetAndMLS,
          })}
          className="text-black"
        >
          <div className="lg:px-0 h-full w-full">
            {/* <div className="grid grid-cols-1 gap-6  mt-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0"> */}
            <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl p-0 hover:shadow-lg hover:-translate-y-1 relative">
              <div
                className={`${
                  small ? "h-44" : "h-72"
                } overflow-hidden relative`}
              >
                <div className="h-72 relative">
                  <img
                    className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                    src={imgSrc}
                    alt="property image"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
                </div>

                <div className="absolute top-3 left-2 flex flex-row">
                  <div
                    className="text-white text-[0.8rem] p-1 px-2 rounded-md mx-1"
                    style={{
                      background: "linear-gradient(90deg, #ff924d 0, #ff6a5b)",
                    }}
                  >
                    {curElem.TypeOwn1Out}{" "}
                  </div>
                </div>
                {/* <div className="absolute top-2 right-2 w-6 h-6">
                <CompareButton main_data={curElem} width={6} />
              </div> */}
                <div className="absolute bottom-3 left-2 z-10">
                  <div className="text-black text-xs p-1 px-2 rounded-md mx-1 bg-white">
                    <TimeAgo modificationTimestamp={curElem.TimestampSql} />
                  </div>
                </div>
              </div>
              <div className="flex-1 sm:px-3 py-2 px-2">
                {/* <div
                  className="absolute duration-1000 rotate-180 transitiona-all opacity-50 -inset-px rounded-sm blur-lg filter group-hover:opacity-70 group-hover:-inset-1 group-hover:duration-200"
                  style={{
                    background:
                      "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                  }}
                ></div>

                <a
                  href="#"
                  title=""
                  className="relative inline-flex items-center justify-center py-1 text-xs font-bold text-black transition-all duration-200 bg-white border border-transparent px-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-opacity-70 rounded-sm"
                  role="button"
                > */}
                {/* </a> */}
                {/* <div className="flex justify-between items-center"></div> */}
                {/* <p className="text-2xl font-extrabold text-red-500">{price}</p> */}
                <h2 className="price fw-bold mb-1 fs-3 fw-bold d-flex align-items-center justify-content-start">
                  {price}
                  {""}

                  {curElem.SaleLease === saleLease.lease.value && (
                    <span> /mo</span>
                  )}

                  <span
                    className={`shadow-lg p-1 ms-1 text-black text-xs card-data ${
                      small && "hidden"
                    }`}
                  >
                    {Math.floor(curElem.TotalArea)} ft<sup>2</sup>
                  </span>
                </h2>
                {/* <div className="d-flex align-items-center">
                <span>{curElem.Category}</span>
                <h3 className="fw-bold mx-2 mb-0 lh-0">.</h3>
              </div> */}
                {/* <div className="text-black text-sm font-bold">
                {curElem.Category}
              </div> */}
                <p className="mb-0 fs-mine text-limit fw-normall pb-0">
                  {" "}
                  MLS® #{curElem.MLS}
                </p>
                <div className="flex flex-row justify-between">
                  {/* <div className="flex">
                  <Image
                    alt="bedrooms"
                    className="w-4 aspect-square"
                    src="/bedrooms.svg"
                  ></Image>
                  <p className="font-bold text-gray-900">
                    <span className="pl-1 text-xs">2</span>
                  </p>
                </div>
                <div className="flex">
                  <Image
                    alt="bathrooms"
                    className="w-4 aspect-square"
                    src="/bathrooms.svg"
                  ></Image>
                  <p className="font-bold text-gray-900">
                    <span className="pl-1 text-xs">2</span>
                  </p>
                </div> */}
                  {/* <div className="flex">
                  <Image
                    alt="square rulers"
                    className="w-4 aspect-square"
                    src="/ruler.svg"
                  ></Image>
                  <p className="font-bold text-gray-900">
                    <span className="pl-1 text-xs">2</span>
                  </p>
                </div>
                <div className="flex">
                  <Image alt="family" className="w-5" src="/family.svg"></Image>
                  <p className="font-bold text-gray-900">
                    <span className="pl-1 text-xs">Single family</span>
                  </p>
                </div>
              </div> */}
                  <div className="text-black truncate text-ellipsis">
                    <div className="text-dark bva">
                      {curElem.StreetName ? (
                        `${curElem.Street} ${curElem.StreetName}${" "}
                    ${curElem.StreetAbbreviation} ${
                          curElem.Municipality
                        }, Ontario`
                      ) : (
                        <span className="p-4"></span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-black font-medium truncate text-ellipsis text-xs">
                  Listed by {curElem.ListBrokerage}
                </div>
                {/* <div className="text-black text-xs px-0 py-1 rounded-md mx-0 font-bold">
                <TimeAgo modificationTimestamp={curElem.TimestampSql} />
              </div> */}
              </div>

              {/* <div className="absolute w-1/6 h-2/6 top-2 left-2">
              {highlight[0]}
            </div>
            <div className="absolute w-1/6 h-2/6 top-2 left-2">
              {highlight[1]} */}
              {/* </div> */}
            </div>
            {/* <h4 className="fs-5 mt-1 text-dark d-flex align-items-center">
            <p className="fw-bold mb-0 lh-0">
              {" "}
              <span className="fs-2 bg-none">.</span>
              {curElem.Municipality}
            </p>
          </h4> */}
            {/* </div> */}
          </div>
        </Link>
      </section>
    );
  }
);

export default CityResoCard;
