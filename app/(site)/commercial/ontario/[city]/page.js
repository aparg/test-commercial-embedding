import React from "react";
import SearchBar from "@/components/reso/SearchBar";

import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { getCommercialData } from "@/actions/fetchCommercialActions";

import FiltersWithCommercialList from "@/components/reso/FiltersWithCommercialList";
import Link from "next/link";

const INITIAL_LIMIT = 30;
const page = async ({ params }) => {
  const city = params.city;
  const formattedSlug = capitalizeFirstLetter(city);

  const commercialListData = await getCommercialData(
    0,
    INITIAL_LIMIT,
    formattedSlug
  );

  return (
    <div className="container-fluid pt-md-3 pt-0">
      <div className="container-fluid pt-md-5 pt-3">
        <nav
          style={{
            // @ts-ignore
            "--bs-breadcrumb-divider":
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E\")",
          }}
          aria-label="breadcrumb"
        >
          <ol className="breadcrumb  ps-2">
            <li className="breadcrumb-item ">
              <Link href="/">Dolphy</Link>
            </li>
            <li className="breadcrumb-item ">
              <Link href="/ontario">ON</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {formattedSlug}
            </li>
          </ol>
        </nav>
        <div className="">
          <FiltersWithCommercialList
            {...{ commercialListData, INITIAL_LIMIT, city }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
