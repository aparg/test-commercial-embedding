"use client";
import Link from "next/link";
import React, { useState } from "react";

const TextOverImageCard = ({ imageSrc, title, link }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="h-56 w-80 mr-4 rounded-md overflow-hidden relative group/card mb-5">
      <Link href={link} className="w-full h-full inline ">
        <div
          className="rounded w-full h-full shadow-lg bg-gradient-to-t from-black to-transparent absolute"
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        ></div>
        <img
          className="object-fill w-full h-full rounded-md z-0"
          src={imageSrc}
          alt="Card"
        />
        <div
          className={`px-6 py-4 absolute bottom-0 z-10 text-white group-hover/card:transition group-hover/card:delay:300 group-hover/card:translate-y-[-0.300rem]`}
        >
          <b className="font-bold text-xl mb-2">{title}</b>
          <p className="text-base font-semibold">
            Commercial Properties For Sale
          </p>
        </div>
      </Link>
    </div>
  );
};

export default TextOverImageCard;
