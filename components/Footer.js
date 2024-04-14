"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import { Image } from "react-bootstrap";

const Footer = ({ cities }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <></>;
  }
  return (
    <>
      <footer className="bg-gray-50 mt-20 w-screen">
        <div className="w-full flex flex-col">
          <div className="relative overflow-hidden bg-primary-green w-full ">
            <div className="relative px-8 py-12 md:p-16 xl:p-24 flex flex-col justify-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl text-center font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Find Commercial Real Estate Today
                </h2>
              </div>
              <Link
                href="tel: 6475274970"
                className="block flex justify-center"
              >
                <button className="bg-white py-2 px-4 rounded-pill self-center mt-3">
                  <Image src="/icons/call.svg" className="w-5 inline" /> 647 527
                  4970
                </button>
              </Link>
            </div>
          </div>
          <div className="container-fluid">
            <div className="grid grid-cols-2 gap-x-4 md:gap-x-10 mt-12 sm:grid-cols-3 lg:grid-cols-4 sm:mt-16 lg:mt-20 gap-y-6 justify-content-center justify-content-md-start">
              <div className="col-span-2 sm:col-span-1 lg:pl-12">
                <p className="text-md font-bold tracking-widest text-black-600 uppercase">
                  Company
                </p>

                <ul className="space-y-5 flex flex-col justify-start align-start">
                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      {" "}
                      About{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      {" "}
                      Features{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      {" "}
                      Works{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      {" "}
                      Career{" "}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="text-md font-bold tracking-widest text-black-600 uppercase">
                  Help
                </p>

                <ul className="space-y-5">
                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      {" "}
                      Customer Support{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      {" "}
                      Delivery{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      {" "}
                      Terms & Conditions{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      {" "}
                      Privacy Policy{" "}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="text-md font-bold tracking-widest text-black-600 uppercase">
                  Company
                </p>

                <ul className=" space-y-5">
                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      {" "}
                      Free eBooks{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      {" "}
                      Development{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      {" "}
                      How to - Blog{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      {" "}
                      YouTube Playlist{" "}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <p className="text-md font-bold tracking-widest text-black-600 uppercase"></p>

                <ul className=" flex flex-col justify-start">
                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex border-t border-gray-200 py-4 text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      {" "}
                      <Image
                        className="w-6 mr-3"
                        src="/icons/mail.svg"
                        alt="contact"
                      />
                      Contact Support{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex border-t border-gray-200 py-4 text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      <Image className="w-6 mr-3" src="/icons/call.svg" />{" "}
                      647-527-4970{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#"
                      title=""
                      className="inline-flex border-t border-b border-gray-200 py-4 text-sm font-normal transition-all duration-200 hover:translate-x-1"
                    >
                      {" "}
                      <Image className="w-6 mr-3" src="/icons/support.svg" />
                      Help Centre{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-12 mt-12  border-t border-gray-200 sm:mt-16 lg:mt-20 mb-20">
            <p className="text-sm font-normal text-gray-900 text-center">
              © Copyright 2023, All Rights Reserved by Dolphy
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
