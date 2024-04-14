import React from "react";
import TextOverImageCard from "./TextOverImageCard";
const cardsData = [
  {
    id: 1,
    imageSrc: "/cities/toronto1.jpg",
    title: "Toronto",
    link: "/ontario/toronto",
  },
  {
    id: 2,
    imageSrc: "/cities/brampton.jpg",
    title: "Brampton",
    link: "/ontario/brampton",
  },
  {
    id: 3,
    imageSrc: "/cities/cambridge.jpg",
    title: "Cambridge",
    link: "/ontario/cambridge",
  },
  {
    id: 4,
    imageSrc: "/cities/edmonton.jpeg",
    title: "Edmonton",
    link: "/ontario/edmonton",
  },
  {
    id: 5,
    imageSrc: "/cities/winnipeg.jpeg",
    title: "Winnipeg",
    link: "/ontario/winnipeg",
  },
  {
    id: 6,
    imageSrc: "/cities/halifax.jpeg",
    title: "Halifax",
    link: "/ontario/halifax",
  },
  {
    id: 7,
    imageSrc: "/cities/calgary.jpeg",
    title: "Calgary",
    link: "/ontario/",
  },
  {
    id: 8,
    imageSrc: "/cities/grimsby.jpg",
    title: "Grimsby",
    link: "/ontario/",
  },
  // Add more cards as needed
];
const PopularCities = () => {
  return (
    <div className="">
      <h3 className="main-title fs-2">Popular Cities in Canada</h3>
      <div className="flex flex-row items-center w-full justify-center md:justify-start items-center flex-wrap lg:mt-2">
        {cardsData.map((card) => (
          <TextOverImageCard {...card} />
        ))}
      </div>
    </div>
  );
};

export default PopularCities;
