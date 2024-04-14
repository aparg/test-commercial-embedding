"use client";
import { fetchDataFromMLS } from "@/actions/fetchCommercialActions";
// import { commercial } from "@/api/routes";
import CompareButton from "@/components/CompareButton";
import { generateImageURLs } from "@/helpers/generateImageURLs";
// import { removeFromLocalStorageArray } from "@/helpers/handleLocalStorageArray";
import Link from "next/link";
// import Comparison from "@/components/Comparison";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

const page = () => {
  const [MLSArray, setMLSArray] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  useEffect(() => {
    // const MLSArray = params.mlslist.split("-");

    fetchData();
  }, []);

  const fetchData = async () => {
    const MLSArray = JSON.parse(localStorage.getItem("comparingProperties"));
    setMLSArray(MLSArray);
    const dataPromises = MLSArray.map((item) => {
      return fetchDataFromMLS(item);
    });
    let dataArray = await Promise.all(dataPromises);
    setDataArray(dataArray);
  };

  const getMax = (property) =>
    Math.max(...dataArray.map((data) => parseFloat(data[property])));
  const getMin = (property) =>
    Math.min(...dataArray.map((data) => parseFloat(data[property])));
  const minListPrice = getMin("ListPrice");
  const maxArea = getMax("TotalArea");
  const images = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        <Image
          src={generateImageURLs(data.MLS)[0]}
          className="object-cover block rounded-md w-64 h-64"
          alt="propertyImage"
        ></Image>
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
        {data.Municipality || `-`}
      </td>
    );
  });
  const street = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data?.Street
          ? `${data?.Street} ${data?.StreetName} ${data?.StreetAbbreviation}`
          : `-`}
      </td>
    );
  });
  const propertyType = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data.PropertyType || `-`}
      </td>
    );
  });
  const primaryPropertyType = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data.TypeOwn1Out || `-`}
      </td>
    );
  });
  const primaryPropertySubtype = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data.Use || `-`}
      </td>
    );
  });
  const buildingSize = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data.BuildingSize || `-`}
      </td>
    );
  });
  const community = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data.Community || `-`}
      </td>
    );
  });
  const occupancy = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data.Occupancy || `-`}
      </td>
    );
  });
  const approxAge = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data.ApproxAge || `-`}
      </td>
    );
  });
  const garageType = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data.GarageType || `-`}
      </td>
    );
  });
  const airConditioning = dataArray.map((data) => {
    return (
      <td className="mx-2 p-2 border-b" key={data.MLS}>
        {data.AirConditioning || `-`}
      </td>
    );
  });

  // const removeData = async (key) => {
  //   //remove data with given key from dataArray
  //   dataArray = dataArray.filter((data) => {
  //     return data.MLS !== key;
  //   });
  // };
  return (
    <div className="container-fluid w-full">
      <h3 className="main-title fs-2">Your Comparisions</h3>
      <div className="w-full overflow-x-scroll">
        <table className="table-auto w-full">
          <thead>
            <th className="p-2 border-b"></th>
            {dataArray.map((data) => (
              <th className="p-2 border-b" key={data.MLS}>
                <div className="flex items-center">
                  <Link
                    href={`/commercial/ontario/${data.Municipality}/${data.MLS}`}
                    className="mr-2"
                  >
                    {data.MLS}
                  </Link>
                  <span>
                    <CompareButton
                      main_data={data}
                      width={5}
                      callback={() => fetchData()}
                    />
                  </span>
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
            <tr className="">
              <th className="p-2 border-b">Property Type</th>
              {propertyType}
            </tr>
            <tr className="">
              <th className="p-2 border-b">Primary Property Type</th>
              {primaryPropertyType}
            </tr>
            <tr className="">
              <th className="p-2 border-b">Primary Property Sub-type</th>
              {primaryPropertySubtype}
            </tr>
            <tr className="">
              <th className="p-2 border-b">Building Size</th>
              {buildingSize}
            </tr>
            <tr className="">
              <th className="p-2 border-b">Community</th>
              {community}
            </tr>
            <tr className="">
              <th className="p-2 border-b">Occupancy</th>
              {occupancy}
            </tr>
            <tr className="">
              <th className="p-2 border-b">Approx. Age</th>
              {approxAge}
            </tr>
            <tr className="">
              <th className="p-2 border-b">Garage</th>
              {garageType}
            </tr>
            <tr className="">
              <th className="p-2 border-b">Air Conditioning</th>
              {airConditioning}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
