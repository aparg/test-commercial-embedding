import React from "react";
import { Image } from "react-bootstrap";

const PropertyCard = ({
  cost,
  bedrooms,
  bathrooms,
  area,
  familyType,
  location,
  imgSrc,
  highlight,
}) => {
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-2 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-6  mt-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0">
          <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl p-2 hover:shadow-lg hover:-translate-y-1 relative">
            <a
              href="#"
              title=""
              className="flex shrink-0 aspect-w-4 aspect-h-3"
            >
              <img
                className="object-cover w-full h-full transition-all duration-200 transform rounded-xl group-hover:scale-110"
                src={imgSrc}
                alt=""
              />
            </a>
            <div className="flex-1 py-5 sm:p-1 px-2">
              <p className="text-xl font-bold text-gray-900 pt-3">${cost}</p>
              <div className="flex flex-row justify-between">
                <div className="flex">
                  <Image
                    alt="bedrooms.png"
                    className="w-6 aspect-auto"
                    src="/bedrooms.png"
                  ></Image>
                  <p className="font-bold text-gray-900">
                    <span className="pl-1 text-xs">{bedrooms}</span>
                  </p>
                </div>
                <div className="flex">
                  <Image
                    alt="bedrooms.png"
                    className="w-6 aspect-auto"
                    src="/shower.png"
                  ></Image>
                  <p className="font-bold text-gray-900">
                    <span className="pl-1 text-xs">{bathrooms}</span>
                  </p>
                </div>
                <div className="flex">
                  <Image
                    alt="bedrooms.png"
                    className="w-6 aspect-auto"
                    src="/square-ruler.png"
                  ></Image>
                  <p className="font-bold text-gray-900">
                    <span className="pl-1 text-xs">{area}</span>
                  </p>
                </div>
                <div className="flex">
                  <Image
                    alt="bedrooms.png"
                    className="w-6 aspect-auto"
                    src="/family.png"
                  ></Image>
                  <p className="font-bold text-gray-900">
                    <span className="pl-1 text-xs">{familyType} family</span>
                  </p>
                </div>
              </div>
              <div className="font-semibold truncate overflow-hidden overflow-ellipsis pt-2">
                {location}
              </div>
            </div>

            {/* <div className="absolute w-1/6 h-2/6 top-2 left-2">
              {highlight[0]}
            </div>
            <div className="absolute w-1/6 h-2/6 top-2 left-2">
              {highlight[1]} */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyCard;
