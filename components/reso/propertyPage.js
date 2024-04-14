"use client";
import React, { useState, useEffect } from "react";

import TimeAgo from "@/components/TimeAgo";

//CUSTOM HOOKS
import useDeviceView from "@/helpers/useDeviceView";

import Collapse from "@/components/reso/Collapse";
import { saleLease } from "@/constant";
import { Button, Image } from "react-bootstrap";
import { Tooltip } from "@nextui-org/react";
import prependToLocalStorageArray from "@/helpers/handleLocalStorageArray";
import { generateImageURLs } from "@/helpers/generateImageURLs";
// import { useComparisionFlag } from "../context/ComparisonFlagContext";
import CompareButton from "../CompareButton";
import BookShowingForm from "../BookShowingForm";

const PropertyPage = ({ main_data }) => {
  const [navbar, setNavbar] = useState(false);
  const { isMobileView } = useDeviceView();
  const getCommunityFeatures = () => {
    const {
      PropertyFeatures1,
      PropertyFeatures2,
      PropertyFeatures3,
      PropertyFeatures4,
      PropertyFeatures5,
      PropertyFeatures6,
    } = main_data;

    return [
      PropertyFeatures1,
      PropertyFeatures2,
      PropertyFeatures3,
      PropertyFeatures4,
      PropertyFeatures5,
      PropertyFeatures6,
    ].join(", ");
  };

  const formatNumber = (value) => {
    // Check if the value is not null or undefined
    if (value != null) {
      return Number(value).toLocaleString("en-US");
    } else {
      // Handle the case where the value is null or undefined
      return "N/A"; // or any default value or message you prefer
    }
  };

  function formatCurrency(value) {
    // Check if the value is not null or undefined
    if (value != null) {
      return Number(value).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    } else {
      // Handle the case where the value is null or undefined
      return "N/A"; // or any default value or message you prefer
    }
  }

  const handleScrollToContactAgent = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dashedStreetName = `${main_data.Street}-${main_data.StreetName}-${main_data.StreetAbbreviation}`;

  const price = formatCurrency(main_data?.ListPrice);
  const TaxAnnualAmount = formatCurrency(main_data?.Taxes);
  const AssociationFee = formatCurrency(main_data?.AddlMonthlyFees);
  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", () => {
        if (window.scrollY >= 870) {
          setNavbar(true);
        } else {
          setNavbar(false);
        }
      });
    }
  }, []);

  return (
    <div className="col-12 col row gy-3 g-sm-0">
      <div className="screenshot col-12">
        <div className="row row-cols-1 row-cols-sm-1">
          <div className="col-12 px-0">
            <div className="d-flex w-full justify-content-between align-items-md-center flex-row gap-y-0 gap-md-2 ">
              <h1 className="vmain-title mb-0 mt-4 mt-md-2 text-2xl sm:text-4xl">
                <div className="uppercase bannerSection">
                  <div className="listingStatus"></div>
                  FOR {main_data.SaleLease} -{' '}
                  {/* tailwind style classname for bottom dashed border gray*/}
                  <span className="border-gray-500 border-dotted border-b">
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="me-2">
                    {main_data.Street} {main_data.StreetName}{' '}
                    {main_data.StreetAbbreviation}
                  </span>
                  <CompareButton main_data={main_data} width={8} />
                </div>
                {/* {main_data.Municipality}, {main_data.Province},{" "}
                {main_data.PostalCode} */}
                {/* <p className="shadow-lg d-inline text-sm px-2 rounded-mine p-1 ms-1">
                  <span className="text-dark">For {main_data.SaleLease}</span>
                </p> */}
              </h1>
              <div className="flex flex-col items-center">
                <h3 className="main-title fs-4 pt-4 md:pt-8 fs-md-2 text-xl sm:text-3xl">
                  {price}
                </h3>
                {/* <Image
                  src="/add-btn.svg"
                  onClick={() => prependToLocalStorageArray(main_data.MLS)}
                  className="w-10 self-center"
                  alt="Compare"
                ></Image> */}
              </div>
            </div>
            <div className="d-flex align-items-start md:align-items-center justify-content-start mb-0 flex-col md:flex-row gap-y-2 mt-1 md:gap-x-2">
              {/* <h3 className="fw-bold me-2">
                <img alt="" className="w-6 mr-2" src="/icons/bedrooms.svg" alt="bed" className="w-5" />
              </h3>
              <span>bedrooms</span> */}
              {/* <h3 className="fw-bold mr-2">
                <img src="/bathrooms.svg" alt="washroom" className="w-5" />
              </h3>
              <span>{main_data.Washrooms}</span> */}
              {/* <h3 className="fw-bold mx-2">.</h3> */}
              <div className="flex">
                <span className="d-inline d-md-none me-2">|</span>
                <p className="card-subtitle mb-0 fw-mine text-limit">
                  MLS - #{main_data.MLS}
                </p>
              </div>
              <div className="flex align-center gap-4 md:gap-3">
                <div className="flex">
                  <span className="me-2 font-bold">|</span>
                  <h3 className="fw-bold mr-2">
                    <img src="/ruler.svg" alt="area" className="w-5" />
                  </h3>
                  <span>
                    {parseInt(main_data.TotalArea).toFixed(0)}
                    {main_data.TotalAreaCode}
                  </span>
                </div>
              </div>
              <span className="shadow-none bg-none">
                <span className="me-2">|</span>
                {main_data.TypeOwn1Out}
              </span>
              <span className="shadow-none bg-none">
                <span className="me-2">|</span>
                {main_data.Municipality}, Ontario, {main_data.PostalCode}
              </span>
              {/* <span className="text-limit fw-bold d-none d-md-inline">
                <Link
                  activeSubClassName=" "
                  href={"/resale/" + route.query.city_name}
                >
                  <a> {props.post.house_detail.city.name}</a>
                </Link>
              </span> */}
            </div>
            {/* <span className="text-limit fw-bold d-inline d-md-none">
              <Link
                activeSubClassName=" "
                href={"/resale/" + route.query.city_name}
              >
                <a> {props.post.house_detail.city.name}</a>
              </Link>
            </span>*/}
          </div>
        </div>
        <div className="py-3 py-md-3">
          <div className="border-top"></div>
        </div>
        <div className="pb-3 pb-md-5 mt-5 md:mt-20">
          <h2 className="text-xl sm:text-4xl font-extrabold leading-10 mb-2 md:mb-5">
            <span className="aff2">About this commercial property</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-row text-md md:text-md py-2 md:py-2">
              <Image alt="" className="w-6 mr-2" src="/property.svg" />
              Property Type: {main_data.PropertyType}
            </div>
            <div className="flex flex-row text-md md:text-md py-2 md:py-2">
              <Image alt="" className="w-6 mr-2" src="/property1.svg" />
              Primary Property Type: {main_data.TypeOwn1Out}
            </div>
            <div className="flex flex-row text-md md:text-md py-2 md:py-2">
              <Image alt="" className="w-6 mr-2" src="/property2.svg" />
              Used For: {main_data.Use}
            </div>
            <div className="flex flex-row text-md md:text-md py-2 md:py-2">
              <Image alt="" className="w-6 mr-2" src="/building.svg" />
              Building Size: {main_data.OfficeAptArea}
              {main_data.OfficeAptAreaCode}
            </div>
            <div className="flex flex-row text-md md:text-md py-2 md:py-2">
              <Image alt="" className="w-6 mr-2" src="/community.svg" />
              Community: {main_data.Community}
            </div>
            <div className="flex flex-row text-md md:text-md py-2 md:py-2">
              <Image alt="" className="w-6 mr-2" src="/people.svg" />
              Occupancy: {main_data.Occupancy}
            </div>
            <div className="flex flex-row text-md md:text-md py-2 md:py-2">
              <Image alt="" className="w-6 mr-2" src="/time.svg" />
              Approx. Age: {main_data.ApproxAge}
            </div>
            <div className="flex flex-row text-md md:text-md py-2 md:py-2">
              <Image alt="" className="w-6 mr-2" src="/property2.svg" />
              Zone: {main_data.Zoning}
            </div>
            <div className="flex flex-row text-md md:text-md py-2 md:py-2">
              <Image alt="" className="w-6 mr-2" src="/garage.svg" />
              Garage Type: {main_data.GarageType}
            </div>
            <div className="flex flex-row text-md md:text-md py-2 md:py-2">
              <Image alt="" className="w-6 mr-2" src="/air-condition.svg" />
              Air Conditioning: {main_data.AirConditioning}
            </div>
            <div className="flex flex-row text-md md:text-md py-2 md:py-2">
              <Image alt="" className="w-6 mr-2" src="/icons/tax3.svg" />
              Taxes: ${main_data.Taxes}
            </div>
            <div className="flex flex-row text-md md:text-md py-2 md:py-2">
              <Image alt="" className="w-6 mr-2" src="/icons/tax4.svg" />
              Tax Type: {main_data.TypeTaxes || 'N/A'}
            </div>
            <div className="flex flex-row text-md md:text-md py-2 md:py-2">
              <Image alt="" className="w-6 mr-2" src="/icons/tax1.svg" />
              Tax Year: {main_data.TaxYear}
            </div>
            <div className="flex flex-row text-md md:text-md py-2 md:py-2">
              <Image alt="" className="w-6 mr-2" src="/icons/tax2.svg" />
              Commercial Condo Fees:{' '}
              {(main_data.CommercialCondoFees &&
                `$${main_data.CommercialCondoFees}`) ||
                'N/A'}
            </div>
          </div>

          <div className="flex flex-row text-md py-3 pt-12">
            {main_data.RemarksForClients}
          </div>
          {/* <div className="text-start my-3 text-inside">
            <div
              className="iframe-container"
              dangerouslySetInnerHTML={{
                __html: props.post.house_detail.description,
              }}
            ></div>
          </div> */}
        </div>
      </div>

      {main_data?.Extras && (
        <div className="mt-24 col-12 ">
          <h2 className="fw-bold pb-3 text-lg sm:text-xl">Extras</h2>
          <div className="flex flex-row text-lg py-1">{main_data.Extras}</div>
        </div>
      )}

      {/* <div className="mt-24 col-12 ">
        <h2 className="fw-bold pb-3 text-lg sm:text-2xl">
          <Image
            alt="walking  "
            className="w-8 am:w-10 inline mr-2"
            src="/walking.svg"
          />
          Walk Score for {main_data.Street} {main_data.StreetName}{" "}
          {main_data.StreetAbbreviation}
        </h2>

        <div className="">
          <div className="">
            <div className="walkscore-container mt-2 rounded-mine">
              <script type="text/javascript"></script>
              <div id="ws-walkscore-tile" className="ham2 w-full">
                <iframe
                  height="500px"
                  title="Walk Score"
                  className="ham p-0"
                  width="100%"
                  src={`https://www.walkscore.com/serve-walkscore-tile.php?wsid=&amp&s=${dashedStreetName},${main_data.Municipality}&amp;o=h&amp;c=f&amp;h=500&amp;fh=0&amp;w=737`}
                ></iframe>
              </div>
              <script
                type="text/javascript"
                src="https://www.walkscore.com/tile/show-walkscore-tile.php"
              ></script>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="py-3 py-md-5 my-5">
        <h2 className="fs-2 fw-bold">
          <span className="aff2">Mortgage Calculator</span>
        </h2>
        <p>Quickly See What Your Mortgage Payments Might Look Like</p>
        <div>
          <MortCalc price={props.post.house_detail.price}></MortCalc>
        </div>
      </div>
      <div className="pt-3">
        <div className="d-flex justify-content-end smm">
          <span className="text-danger">*</span> Sponsored & Advertisement
        </div>
        <div className="roundddd p-r">
          <div className="d-flex justify-content-end flex-column align-items-end">
            <h5 className="fw-bold mb-0 fs-mmmmmv">
              Are you looking for a Mortgage Agent?
            </h5>
            <p>Are you pre-approved?</p>
          </div>
          <div className="d-flex align-items-center justify-content-between flex-column flex-md-row gap-2">
            <img
              src="/mortgage-agent.png"
              alt=""
              className="w-5 imagem"
            />
            <span className="mx-2"></span>
            <div>
              <ContactFormMort></ContactFormMort>
            </div>
          </div>
          <div className="d-flex justify-content-end opp mt-3">
            <div className="d-inline fs-5 fw-bold">
              <span>homebaba</span>
              <span>
                <img
                  src="/canadaleaf.svg"
                  alt="canada mapel leaf"
                  className="w-5 leaf-img ms-1"
                />
              </span>
            </div>
          </div>
        </div>
      </div> */}
      {/* <p className="pss">Mortgage Agent - Ashu Ohri</p>
      <div className="py-2">
        <div className="bg-white p-1 rounded-mine">
          <p className="sm-f">
            By submitting this form and providing your contact information, you
            authorize mortgage agents or brokerage advertised above to contact
            you about your inquiry. Homebaba does not provide any mortgage
            services or mortgage related services and is not responsible for any
            services offered by the advertiser on our platform.
          </p>
        </div>
      </div> */}
    </div>
  )
};

export default PropertyPage;
