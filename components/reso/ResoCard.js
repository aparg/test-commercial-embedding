"use client";
import Link from "next/link";
import React from "react";
import TimeAgo from "../TimeAgo";
import { commercial } from "@/api/routes";

//ICONS
import { IoBedOutline } from "react-icons/io5";
import { LuBath, LuRuler } from "react-icons/lu";

const ResoCard = ({ curElem, city }) => {
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

  return (
    <>
      <div className="col">
        <Link
          href={`/ontario/${city}/listings/${curElem.MLS}`}
          className="text-decoration-none text-dark"
        >
          <div className="afte-proj">
            <div className="d-flex gap-5">
              <div className="img-text ">
                <p className="m-0 ">
                  {" "}
                  {<TimeAgo modificationTimestamp={curElem.TimestampSql} />}
                </p>
              </div>
              <div className="img-text-propertytype ">
                <p className="m-0 "> {curElem.TypeOwn1Out}</p>
              </div>
            </div>

            <img
              src={imgSrc}
              className="imghei"
              alt={curElem.MLS}
              onError={handleImageError}
            />

            <div className="card-textt card">
              <p className="mb-0 card-price">{price}</p>

              <p className="mb-0 text-s">
                {curElem.Street} {curElem.StreetName}{" "}
                {curElem.StreetAbbreviation} {curElem.Municipality},{" "}
                {curElem.Province}{" "}
              </p>
              <p className="mb-0 text-s"> MLS® #{curElem.MLS}</p>
              <p className="mb-0 text-s truncate text-ellipsis">
                {" "}
                Listed by {curElem.ListBrokerage}
              </p>
              <p className="mb-0 text-s capsule">{curElem.Category}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ResoCard;
