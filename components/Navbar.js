"use client";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/reso/SearchBar";
import { Image } from "react-bootstrap";
import Dropdown from "./Dropdown";
import { generateURL } from "@/helpers/generateURL";
// import {
//   useComparingProperties,
//   useComparisionFlag,
// } from "./context/ComparisonFlagContext";

const Navbar = (props) => {
  const [isSticky, setIsSticky] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [comparisionData, setComparisionData] = useState([]);
  const pathname = usePathname();
  // const { comparisonFlag } = useComparisionFlag();

  if (pathname.startsWith("/admin")) {
    return <></>;
  }

  const isHomePage = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  const whiteLogoPath = "/logo/whitelogo.svg";
  const blackLogoPath = "/logo/blacklogo.svg";

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 0);
    };
    // Add event listener to scroll event
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   const comparingProperties = JSON.parse(
  //     localStorage.getItem("comparingProperties")
  //   );
  //   comparingProperties?.length > 0 && setComparisionData(comparingProperties);
  // }, [comparisonFlag]);
  return (
    <header
      className={`container-fluid lg:pb-0 relative z-50 bg-white ${
        isSticky ? "bg-white sticky top-0 shadow-lg" : "md:bg-transparent "
      }`}
    >
      <div className={`${isSticky && "sticky"}`}>
        <nav className={`flex items-center justify-between h-16 lg:h-20`}>
          <div className="flex-shrink-0">
            <Link href="/" className="logo d-flex align-items-center ">
              <Image
                className="w-20 hidden md:block"
                src={isSticky || !isHomePage ? blackLogoPath : whiteLogoPath}
              />
              <Image className="w-20 md:hidden" src={blackLogoPath} />
            </Link>
          </div>

          {!isHomePage || isSticky ? (
            <div className="input-group input-group-search me-2 me-md-0">
              <SearchBar />
              <button
                className="input-group-text btn bg-light2 bg-lh mybtn d-block py-search"
                type="button"
                aria-label="Search Button"
              >
                <svg
                  aria-hidden="true"
                  className="svg"
                  viewBox="0 0 30 30"
                  xmlns="http://www.w3.org/2000/svg"
                  height="22"
                  width="22"
                >
                  <path
                    d="M20.756 18.876l6.155 6.154-1.88 1.881-6.155-6.155A9.269 9.269 0 0 1 13.3 22.61a9.31 9.31 0 1 1 9.31-9.31c0 2.091-.69 4.021-1.854 5.576zM13.3 19.95a6.65 6.65 0 1 0 0-13.3 6.65 6.65 0 0 0 0 13.3z"
                    fill="#000000"
                  ></path>
                </svg>
              </button>
            </div>
          ) : null}

          <button
            type="button"
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            onClick={() => setHidden(!hidden)}
          >
            <svg
              className="block w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 8h16M4 16h16"
              />
            </svg>

            <svg
              className="hidden w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            <Dropdown
              name="Business for sale"
              options={[
                {
                  name: "Office for Sale",
                  link: generateURL({ houseTypeVal: "office" }),
                },
                {
                  name: "Retail for Sale",
                  link: generateURL({ houseTypeVal: "retail" }),
                },
                {
                  name: "Industry for sale",
                  link: generateURL({ houseTypeVal: "industrial" }),
                },
                {
                  name: "Investment for sale",
                  link: generateURL({ houseTypeVal: "investment" }),
                },
                {
                  name: "Land for sale",
                  link: generateURL({ houseTypeVal: "land" }),
                },
              ]}
              text={isSticky || !isHomePage ? "black" : "white"}
            />
            {/* <Dropdown
              name="Compare"
              options={[
                ...comparisionData?.map((data) => {
                  return { name: data };
                }),
                {
                  name: "View Comparision",
                  link: `/compare/${comparisionData.join("-")}`,
                },
              ]}
              text={isSticky || !isHomePage ? "black" : "white"}
            /> */}
            <Link
              href={`/compare`}
              title=""
              className={`text-base font-medium transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-white hover:text-green-200 active:text-primary-green focus:text-primary-green"
              } ${
                (isSticky || !isHomePage) &&
                "text-black hover:text-primary-green"
              }
               ${!isHomePage && "text-black"}`}
            >
              {" "}
              Your comparisons{" "}
            </Link>
            {/* <Link
              href="#"
              title=""
              className={`text-base font-medium transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-white hover:text-green-200 active:text-primary-green focus:text-primary-green"
              } ${
                (isSticky || !isHomePage) &&
                "text-black hover:text-primary-green"
              }
               ${!isHomePage && "text-black"}`}
            >
              {" "}
              Cities{" "}
            </Link> */}

            <Link
              href="#"
              title=""
              className={`text-base font-medium transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-white hover:text-green-200 active:text-primary-green focus:text-primary-green"
              } ${
                (isSticky || !isHomePage) &&
                "text-black hover:text-primary-green"
              }
               ${!isHomePage && "text-black"}`}
            >
              {" "}
              Resources{" "}
            </Link>

            <Link
              href="#"
              title=""
              className={`text-base font-medium transition-all duration-200 ${
                isHomePage &&
                !isSticky &&
                "lg:text-white hover:text-green-200 active:text-primary-green focus:text-primary-green"
              } ${
                (isSticky || !isHomePage) &&
                "text-black hover:text-primary-green"
              }
               ${!isHomePage && "text-black"}`}
            >
              {" "}
              Contact{" "}
            </Link>
          </div>

          <Link
            href="tel:6476745958"
            title=""
            className={`items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold transition-all duration-200 border rounded-md lg:inline-flex hover:bg-primary-green hover:text-white ${
              isSticky
                ? "text-white border-primary-green bg-primary-green"
                : "text-white border-white hover:border-primary-green"
            } ${!isHomePage && "bg-primary-green"}`}
            role="button"
          >
            {" "}
            Call : 647 527 4970{" "}
          </Link>
        </nav>

        {/* Mobile version */}
        <nav
          className={`py-4 bg-white border border-gray-200 rounded-md shadow-md ${
            hidden && "hidden"
          } lg:hidden`}
        >
          <div className="flow-root">
            <div className="flex flex-col px-6 -my-2 space-y-1">
              <Dropdown
                name="Business For Sale"
                options={[
                  {
                    name: "Office for Sale",
                    link: generateURL({ houseTypeVal: "office" }),
                  },
                  {
                    name: "Retail for Sale",
                    link: generateURL({ houseTypeVal: "retail" }),
                  },
                  {
                    name: "Industry for sale",
                    link: generateURL({ houseTypeVal: "industrial" }),
                  },
                  {
                    name: "Investment for sale",
                    link: generateURL({ houseTypeVal: "investment" }),
                  },
                  {
                    name: "Land for sale",
                    link: generateURL({ houseTypeVal: "land" }),
                  },
                ]}
                text={"black"}
              />

              <Link
                href={`/compare`}
                title=""
                className={`text-base font-medium transition-all duration-200 ${
                  isHomePage &&
                  !isSticky &&
                  "lg:text-white hover:text-green-200 active:text-primary-green focus:text-primary-green"
                } ${
                  (isSticky || !isHomePage) &&
                  "text-black hover:text-primary-green"
                }
               ${!isHomePage && "text-black"}`}
              >
                {" "}
                Your Comparisons{" "}
              </Link>
              {/* <Link
                href="#"
                title=""
                className={`inline-flex py-2 text-base font-medium transition-all duration-200 text-black `}
              >
                {" "}
                Cities{" "}
              </Link> */}

              <Link
                href="#"
                title=""
                className={`inline-flex py-2 text-base font-medium transition-all duration-200 text-black `}
              >
                {" "}
                Resources{" "}
              </Link>

              <Link
                href="#"
                title=""
                className={`inline-flex py-2 text-base font-medium transition-all duration-200 text-black `}
              >
                {" "}
                Contact{" "}
              </Link>
            </div>
          </div>

          <div className="px-6 mt-6">
            <Link
              href="tel:6476745958"
              title=""
              className={`inline-flex justify-center px-4 py-3 text-base text-white font-semibold transition-all duration-200 bg-primary-green border border-transparent rounded-md tems-center hover:bg-blue-700 focus:bg-primary-green ${
                isSticky
                  ? "border-primary-green"
                  : "border-white hover:border-primary-green"
              }`}
              role="button"
            >
              Call : 647 527 4970
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
