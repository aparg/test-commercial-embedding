"use client";

import { Tooltip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useComparisionFlag } from "./context/ComparisonFlagContext";
import {
  prependToLocalStorageArray,
  removeFromLocalStorageArray,
} from "@/helpers/handleLocalStorageArray";

const CompareButton = ({ main_data, width, callback = undefined }) => {
  const [addedToComparisionList, setAddedToComparisionList] = useState(false);
  // const { comparisonFlag, setComparisonFlag } = useComparisionFlag();
  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("comparingProperties"))?.includes(
        main_data.MLS
      )
    )
      setAddedToComparisionList(true);
  }, []);
  return (
    <Tooltip
      placement="bottom"
      showArrow={false}
      size="sm"
      content={
        addedToComparisionList
          ? "Remove from comparision list"
          : "Add to comparision list!"
      }
    >
      {addedToComparisionList ? (
        <Button
          className={`inline w-[1.5rem] h-[1.5rem] sm:w-${width} sm:h-${width}  rounded-full bg-red-500/30 hover:bg-red-500 text-white text-4xl flex justify-center items-center p-0 border-0`}
          onClick={() => {
            removeFromLocalStorageArray("comparingProperties", main_data.MLS);
            // setComparisonFlag(!comparisonFlag);
            setAddedToComparisionList(false);
            callback && callback();
          }}
        >
          <img
            src="/minus.svg"
            alt="added inline"
            className={`w-[1.25rem] h-[1.25rem] sm:w-${width - 2} sm:h-${
              width - 2
            } inline`}
          ></img>
        </Button>
      ) : (
        <Button
          className={`inline w-[1.5rem] h-[1.5rem] sm:w-${width} sm:h-${width} rounded-full bg-primary-green/30 hover:bg-primary-green text-white text-4xl flex justify-center items-center p-0 border-0`}
          onClick={() => {
            prependToLocalStorageArray("comparingProperties", main_data.MLS, 3);
            // setComparisonFlag(!comparisonFlag);
            setAddedToComparisionList(true);
            callback && callback();
          }}
        >
          <img
            src="/plus.svg"
            alt="remove"
            className={`w-[1rem] h-[1rem] sm:w-${width - 3} sm:h-${width - 3}`}
          ></img>
        </Button>
      )}
    </Tooltip>
  );
};

export default CompareButton;
