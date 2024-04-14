"use server";

import { commercial } from "@/api/routes";

export const getCommercialData = async (offset, limit, city, listingType) => {
  try {
    //all the necessary queries possible
    let selectQuery = `Municipality=${city || ""},SaleLease='Sale'`;
    const skipQuery = `${offset}`;
    const limitQuery = `${limit}`;

    if (listingType) {
      selectQuery += `,TypeOwnSrch=${listingType}`;
    }

    const url = commercial.properties.replace(
      "$query",
      `?$select=${selectQuery}&$skip=${skipQuery}&$limit=${limitQuery}`
    );

    const options = {
      method: "GET",
      cache: "no-store",
    };

    const res = await fetch(url, options);
    const data = await res.json();
    return data?.results;
  } catch (error) {
    throw new Error(`An error happened: ${error}`);
  }
};

export const getFilteredRetsData = async (queryParams) => {
  try {
    //all the necessary queries possible
    let selectQuery = `${
      queryParams.city ? `Municipality=${queryParams.city}` : ""
    }${
      queryParams.saleLease
        ? `${queryParams.city ? "," : ""}SaleLease=${queryParams.saleLease}`
        : ""
    }`;
    const skipQuery = `${queryParams.offset}`;
    const limitQuery = `${queryParams.limit}`;
    const timestampQuery = `${queryParams.minTimestampSql || ""}`;
    let rangeQuery = `minListPrice=${queryParams.minListPrice}`;

    if (queryParams.houseType) {
      selectQuery += `,TypeOwnSrch=${queryParams.houseType}`;
    }

    if (queryParams.maxListPrice > queryParams.minListPrice) {
      rangeQuery += `,maxListPrice=${queryParams.maxListPrice}`;
    }

    const url = commercial.properties.replace(
      "$query",
      `?$select=${selectQuery || ""}${
        timestampQuery && `&$timestampFilter='${timestampQuery}'`
      }&$skip=${skipQuery}&$limit=${limitQuery}&$range=${rangeQuery}`
    );
    const options = {
      method: "GET",
      cache: "no-store",
    };
    const res = await fetch(url, options);
    const data = await res.json();
    return data?.results;
  } catch (error) {
    throw new Error(`An error happened: ${error}`);
  }
};

export const fetchDataFromMLS = async (listingID) => {
  const options = {
    method: "GET",
  };
  const urlToFetchMLSDetail = commercial.properties.replace(
    "$query",
    `?$select=MLS='${listingID}'`
  );
  const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
  const data = await resMLSDetail.json();
  return data.results[0];
};
