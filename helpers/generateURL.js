import { saleLease } from "@/constant";

export const generateURL = ({
  cityVal = null,
  houseTypeVal = null,
  saleLeaseVal = null,
  listingIDVal = null,
} = {}) => {
  const city = cityVal?.toLowerCase() || null;
  const houseType = houseTypeVal?.toLowerCase() || null;
  const saleLeaseType =
    Object.keys(saleLease).find((key) => key == saleLeaseVal) ||
    Object.keys(saleLease)
      .find((key) => saleLease[key].value == saleLeaseVal)
      ?.toLowerCase() ||
    null;
  if (listingIDVal && city) return `/ontario/${city}/listings/${listingIDVal}`;
  if (city) {
    if (houseType) {
      if (saleLeaseType) {
        return `/ontario/${city}/${houseType}/${saleLeaseType}`;
      }
      return `/ontario/${city}/${houseType}`;
    }
    if (saleLeaseType) {
      return `/ontario/${city}/${saleLeaseType}`;
    }
    return `/ontario/${city}`;
  }
  if (houseType) {
    if (saleLeaseType) {
      return `/ontario/filter/${houseType}/${saleLeaseType}`;
    }
    return `/ontario/filter/${houseType}`;
  }
  if (saleLeaseType) {
    return `/ontario/filter/${saleLeaseType}`;
  }

  return `/ontario`;
};
