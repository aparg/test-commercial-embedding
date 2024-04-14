"use client";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import BookingDateOption from "./BookingDateOption";
import { set } from "date-fns";
const BookingDate = ({ handleChange }) => {
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const [maxScroll, setMaxScroll] = useState(0);
  const cardRef = useRef(null);
  // const containerRef = useRef(null);
  // useEffect(() => {
  //   const containerWidth = containerRef.current.offsetWidth;
  //   const cardsWidth = cardRef.current.scrollWidth;
  //   const maxScrollValue = cardsWidth - containerWidth;
  //   setMaxScroll(maxScrollValue);
  // }, []);

  // const slideLeft = () => {
  //   const newPosition = Math.min(scrollPosition + 100, 0);
  //   console.log(newPosition);
  //   setScrollPosition(newPosition);
  // };

  // const slideRight = () => {
  //   const newPosition = Math.max(scrollPosition - 100, -maxScroll);
  //   console.log(newPosition);
  //   setScrollPosition(newPosition);
  // };

  //give me a slide right and left code for cardref and containerref also set max values
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  // const slideRight = (e) => {
  //   e.preventDefault();
  //   const containerWidth = containerRef.current.offsetWidth;
  //   const cardsWidth = cardRef.current.scrollWidth;
  //   const maxScroll = cardsWidth - containerWidth;
  //   const newPosition = Math.max(scrollPosition - 20, -maxScroll);
  //   setScrollPosition(newPosition);
  // };
  // const slideLeft = (e) => {
  //   e.preventDefault();
  //   const containerWidth = containerRef.current.offsetWidth;
  //   const cardsWidth = cardRef.current.scrollWidth;
  //   const maxScroll = cardsWidth - containerWidth;
  //   // console.log(maxScroll);
  //   // console.log(scrollPosition - 20);
  //   const newPosition = Math.min(scrollPosition + 20, 0);
  //   console.log(newPosition);
  //   setScrollPosition(newPosition);
  // };

  // const slideLeft = (e) => {
  //   e.preventDefault();
  //   const dynamicWidthOfCard = cardRef.current.offsetWidth;
  //   // @ts-ignore
  //   scrollRef.current.scrollLeft = slider.scrollLeft - dynamicWidthOfCard;
  // };
  // const slideRight = (e) => {
  //   e.preventDefault();
  //   const dynamicWidthOfCard = cardRef.current.offsetWidth;
  //   // @ts-ignore
  //   scrollRef.current.scrollLeft = slider.scrollLeft + dynamicWidthOfCard;
  // };

  const slideLeft = (e) => {
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = cardWidth * 3; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft -= scrollAmount;
  };

  const slideRight = (e) => {
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = cardWidth * 3; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft += scrollAmount;
  };
  function getDaysInMonth(year, month) {
    // Get the number of days in a month
    return new Date(year, month + 1, 0).getDate();
  }

  function getDaysArrayInMonth(year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const day = date.getDate();
      const dayName = date
        .toLocaleDateString("en-US", { weekday: "long" })
        .slice(0, 3);
      const monthName = date
        .toLocaleDateString("default", { month: "long" })
        .slice(0, 3);
      daysArray.push({
        day,
        dayName,
        month: monthName,
        monthNumber: month + 1,
        year,
        selected: false,
      }); // Month is 0-indexed, so we add 1 to get the correct month
    }
    daysArray.unshift({ day: "Any", month: "", dayName: "", selected: false });
    return daysArray;
  }
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const [daysArray, setDaysArray] = useState(getDaysArrayInMonth(year, month));
  const selectOption = (e, data) => {
    e.preventDefault();
    const updatedDaysArray = daysArray.map((day) => {
      if (day.day === data.day) {
        return { ...day, selected: true };
      } else {
        return { ...day, selected: false };
      }
    });
    setDaysArray(updatedDaysArray);
    handleChange(e);
  };

  return (
    <>
      <div
        className="relative"
        // className="scroll-container relative my-2 w-full overflow-x-scroll"
        // id="date-scroll"
        // ref={containerRef}
      >
        <div className="z-10 w-full h-full flex justify-between items-center">
          <button
            className="w-6 h-6 absolute top-8 left-0 border-gray-200 border-2 rounded-full flex justify-center items-center bg-white z-10"
            title="scroll left"
            onClick={slideLeft}
          >
            <SlArrowLeft size={8} />
          </button>
          <button
            className="w-6 h-6 absolute top-8 right-0 border-gray-200 border-2 rounded-full flex justify-center items-center bg-white z-10 "
            title="scroll right"
            onClick={slideRight}
          >
            <SlArrowRight size={8} />
          </button>
        </div>
        <div
          className="flex z-0 scroll-container relative my-2 w-full overflow-x-scroll"
          style={{ transform: `translateX(${scrollPosition}px) z-0` }}
          id="slider"
          ref={scrollRef}
        >
          {/* <button
            className="flex flex-col justify-center px-10 py-2 border-gray-500 border-2 items-center mr-1 rounded-md hover:border-cyan-400 cursor-pointer"
            ref={cardRef}
            id="date"
            value="any"
            onClick={handleChange}
          >
            <span className="font-thin"></span>
            <span className="font-bold">Any</span>
            <span className="font-thinner"></span>
          </button> */}
          {daysArray.map((data) => (
            <BookingDateOption
              ref={cardRef}
              data={data}
              key={data.day}
              handleChange={(e) => selectOption(e, data)}
              selected={data.selected}
              year={year}
            />
          ))}
        </div>
      </div>
    </>
  );

  // return (
  //   <div className="position-relative">
  //     <div className="d-flex justify-content-between pt-5 explore-container my-0 sm:my-4">
  //       <div className="btns d-flex justify-space-between">
  //         <button
  //           className="scroll-left position-absolute start-0 w-6 h-6"
  //           title="scroll left"
  //           onClick={slideLeft}
  //         >
  //           <SlArrowLeft size={16} />
  //         </button>
  //         <button
  //           className="scroll-right position-absolute end-0 w-6 h-6"
  //           title="scroll right"
  //           onClick={slideRight}
  //         >
  //           <SlArrowRight size={16} />
  //         </button>
  //       </div>
  //       <div
  //         className="row row-cols-lg-5 row-cols-md-3 row-cols-1 g-4"
  //         id="slider"
  //         ref={scrollRef}
  //       >
  //         {/* <div
  //           className="flex flex-col justify-center px-10 py-2 border-gray-500 border-2 items-center mr-1 rounded-md hover:border-cyan-400 cursor-pointer"
  //           ref={cardRef}
  //         >
  //           <span className="font-thin"></span>
  //           <span className="font-bold">Any</span>
  //           <span className="font-thinner"></span>
  //         </div> */}
  //         {daysArray?.map((data) => {
  //           // if (curElem.PhotoCount > 0) {
  //           return (
  //             <div
  //               className="flex flex-col justify-center px-10 py-2 border-gray-500 border-2 items-center mr-1 rounded-md hover:border-cyan-400 cursor-pointer"
  //               ref={cardRef}
  //             >
  //               <span className="font-thin">{data.dayName}</span>
  //               <span className="font-bold">{data.day}</span>
  //               <span className="font-thinner">{data.month}</span>
  //             </div>
  //           );
  //           // }
  //           // return null
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default BookingDate;
