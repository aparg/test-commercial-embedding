"use client";
import { commercial } from "@/api/routes";
import CompareButton from "@/components/CompareButton";
import Gallery from "@/components/reso/Gallery";
import { generateImageURLs } from "@/helpers/generateImageURLs";
import { set } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

const fetchData = async (listingID) => {
  const options = {
    method: "GET",
    mode: "no-cors",
  };
  const urlToFetchMLSDetail = commercial.properties.replace(
    "$query",
    `?$select=MLS='${listingID}'`
  );

  const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
  const data = await resMLSDetail.json();
  return data.results[0];
};

const page = () => {
  // const MLSArray = params.mlslist.split("-");
  const [MLSArray, setMLSArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  //useffect that fetches from localstorage with key comparingProperties and assigns it to MLSArray
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const storedProperties = localStorage.getItem("comparingProperties");
    if (storedProperties) {
      setMLSArray(JSON.parse(storedProperties));
    }
  };

  useEffect(() => {
    const main_data = MLSArray.map(async (mls) => {
      return fetchData(mls);
    });
    //assign to getData variable after all promises are resolved
    Promise.all(main_data).then((data) => {
      setDataArray(data);
    });
  }, [MLSArray]);

  const getMax = (property) =>
    Math.max(...dataArray.map((data) => parseFloat(data[property])));
  const getMin = (property) =>
    Math.min(...dataArray.map((data) => parseFloat(data[property])));

  const minListPrice = getMin("ListPrice");
  const maxArea = getMax("TotalArea");

  const images = dataArray.map(async (data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        <div className="h-42 w-64">
          <Image
            src={generateImageURLs(data.MLS)[0]}
            className="object-cover block rounded-md"
            alt="propertyImage"
          ></Image>
        </div>
      </td>
    );
  });

  const listPrice = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        ${data.ListPrice}{" "}
        {parseFloat(data.ListPrice) === minListPrice && (
          <Image src="/green-tick.svg" className="w-4 inline" />
        )}
      </td>
    );
  });
  const totalArea = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data.TotalArea} Sqft.{" "}
        {parseFloat(data.TotalArea) === maxArea && (
          <Image src="/green-tick.svg" className="w-4 inline" />
        )}
      </td>
    );
  });
  const city = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data.Municipality}
      </td>
    );
  });
  const street = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data?.Street} {data?.StreetName} {data?.StreetAbbreviation}
      </td>
    );
  });
  return (
    <div className="container-fluid">
      <h3 className="main-title fs-2">Your Comparisions</h3>
      <table className="table-auto w-full">
        <thead>
          <th className="p-2 border-b"></th>
          {dataArray.map((data) => (
            <th className="p-2 border-b">
              <div className="flex items-center">
                <Link
                  href={`/commercial/ontario/${data.Municipality}/${data.MLS}`}
                  className="mr-2"
                >
                  {data.MLS}
                </Link>
                <CompareButton
                  main_data={data}
                  width={5}
                  callback={() => {
                    getData();
                  }}
                />
              </div>
            </th>
          ))}
        </thead>
        <tbody>
          <tr>
            <th className="p-2 border-b"></th>
            {images}
          </tr>
          <tr className="">
            <th className="p-2 border-b">City</th>
            {city}
          </tr>
          <tr className="">
            <th className="p-2 border-b">Street</th>
            {street}
          </tr>
          <tr className="">
            <th className="p-2 border-b">List Price</th>
            {listPrice}
          </tr>
          <tr className="">
            <th className="p-2 border-b">Total Area</th>
            {totalArea}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default page;
