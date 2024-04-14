"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownSection,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Slider,
} from "@nextui-org/react";

//CONSTANT
import { saleLease, listingType, numberOfDays } from "@/constant";
import useDeviceView from "@/helpers/useDeviceView";

const Filters = ({
  filterState,
  setFilterState,
  fetchFilteredData,
  embedded,
}) => {
  const [navbar, setNavbar] = useState(false);

  const { isMobileView } = useDeviceView();

  //options for lease or sale
  const saleLeaseOptions = Object.values(saleLease).map((item) => item.name);
  //options for house type
  const houseTypeOptions = Object.values(listingType).map((item) => item.name);
  //options for house type
  const numberOfDaysOptions = Object.values(numberOfDays).map(
    (item) => item.userFilter && item.name
  );

  //dynamic price range generator based on sale or lease options
  const minMaxPrice = useMemo(() => {
    if (filterState.saleLease.includes(Object.values(saleLease)[1].name)) {
      //i.e for lease, display different min and max value
      return {
        min: 1500,
        max: 8000,
      };
    } else {
      return {
        min: 400000,
        max: 3000000,
      };
    }
  }, [filterState]);

  const handleFilterChange = (name, value) => {
    const newFilterState = { ...filterState };
    newFilterState[name] = value;
    if (name === "saleLease") {
      //reset the price filter
      newFilterState["priceRange"] = {
        min: 0,
        max: 0,
      };
    }
    setFilterState({ ...newFilterState });
    fetchFilteredData(newFilterState);
  };

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", () => {
        if (embedded) {
          setNavbar(false);
        } else if (window.scrollY >= 60) {
          setNavbar(true);
        } else {
          setNavbar(false);
        }
      });
    }

    document.addEventListener("DOMContentLoaded", function () {
      // Code to ensure that the Slider component receives focus when clicked directly
      document
        .querySelector(".price-range__slider")
        .addEventListener("click", function (event) {
          const slider = event.target.closest(".max-w-md.slider");
          if (slider) {
            slider.focus();
          }
        });
    });
  }, []);

  return (
    <>
      <div
        className={`filters d-flex gap-2 gap-md-3 flex 
         ${navbar ? "filter__scrolled mt-4 pb-2 container-fluid" : ""} `}
      >
        <IndividualFilterButton
          options={saleLeaseOptions}
          name="saleLease"
          value={filterState.saleLease}
          handleFilterChange={handleFilterChange}
        />

        {!isMobileView ? (
          <div className="price-range__filter">
            <PriceRangeFilter
              name="priceRange"
              value={filterState.priceRange}
              handleFilterChange={handleFilterChange}
              minMaxPrice={minMaxPrice}
            />
          </div>
        ) : null}

        <IndividualFilterButton
          options={houseTypeOptions}
          name="type"
          value={filterState.type}
          handleFilterChange={handleFilterChange}
        />

        <TimeFilterButton
          name="minTimestampSql"
          value={filterState.numberOfDays}
          handleFilterChange={handleFilterChange}
        />
      </div>
      {isMobileView ? (
        <div className="container-fluid price-filter__bottom">
          <PriceRangeFilterBottom
            name="priceRange"
            value={filterState.priceRange}
            handleFilterChange={handleFilterChange}
            minMaxPrice={minMaxPrice}
          />
        </div>
      ) : null}
    </>
  );
};

const IndividualFilter = ({ options, name, value, handleFilterChange }) => {
  const [selectedKeys, setSelectedKeys] = useState([value]);

  const handleKeyChange = (newKey) => {
    setSelectedKeys(newKey);
    handleFilterChange(name, getSelectedValue(newKey));
  };

  const getSelectedValue = useCallback(
    (key) => Array.from(key).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <div>
      <Dropdown>
        <DropdownTrigger disableAnimation={true}>
          <Button
            variant="faded"
            className="capitalize bg-color dynamic"
            size="md"
          >
            {getSelectedValue(selectedKeys)}
            <i className="bi bi-chevron-down"></i>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label={name}
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={handleKeyChange}
        >
          {options.map((option) => {
            return <DropdownItem key={option}>{option}</DropdownItem>;
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const TimeFilterButton = ({ name, handleFilterChange }) => {
  const [selectedKeys, setSelectedKeys] = useState();
  const handleTime = (optionName, optionValue) => {
    setSelectedKeys(optionName);
    handleFilterChange(name, optionValue);
  };

  return (
    <Dropdown>
      <DropdownTrigger disableAnimation={true}>
        <Button
          variant="faded"
          className="capitalize bg-color roundedPill h-[34px] border-2"
          size="md"
        >
          {selectedKeys || "Number Of Days"}
          <i className="bi bi-chevron-down"></i>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="price filter"
        itemClasses={{
          base: ["data-[hover=true]:bg-default-0"],
        }}
        disallowEmptySelection
        selectionMode="single"
      >
        {Object.values(numberOfDays).map((option) => {
          if (option.userFilter) {
            return (
              <DropdownItem
                key={option.name}
                onClick={() => handleTime(option.name, option.value)}
              >
                {option.name}
              </DropdownItem>
            );
          }
          return;
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

const PriceRangeFilter = ({ name, value, handleFilterChange, minMaxPrice }) => {
  const [price, setPrice] = useState({
    min: 0,
    max: 0,
  });

  const handlePriceChange = (inputName, value) => {
    const newPrice = {
      ...price,
      [inputName]: Number(value),
    };

    setPrice(newPrice);
    handleFilterChange(name, newPrice);
  };

  const valueToDisplay = useMemo(() => {
    if (price.min && !price.max) {
      return `Over $${price.min}`;
    } else if (price.min && price.max) {
      return `$${price.min} - $${price.max}`;
    } else {
      return "Price";
    }
  }, [price]);

  const handleRangeChange = ([min, max]) => {
    const newPrice = { min, max };
    setPrice(newPrice);
    handleFilterChange(name, newPrice);
  };

  useEffect(() => {
    const newPrice = {
      min: value?.min ?? 0,
      max: value?.max ?? 0,
    };
    setPrice(newPrice);
  }, [value]);

  return (
    <Dropdown>
      <DropdownTrigger disableAnimation={true}>
        <Button
          variant="faded"
          className="capitalize bg-color roundedPill h-[34px] border-2"
          size="md"
        >
          {valueToDisplay}
          <i className="bi bi-chevron-down"></i>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="price filter"
        itemClasses={{
          base: ["data-[hover=true]:bg-default-0"],
        }}
      >
        <DropdownSection aria-label="price filter" showDivider>
          <DropdownItem key="price" isReadOnly>
            <p className="fw-bold mb-2">
              Filter price based on min and max price
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Input
                type="number"
                label="Min Price"
                className="w-45"
                size="sm"
                variant="underlined"
                value={value?.min}
                min={0}
                onFocus={(event) => event.target && event.target.select()}
                onValueChange={(value) => handlePriceChange("min", value)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
              />
              <Input
                type="number"
                label="Max Price"
                className="w-45"
                size="sm"
                disabled={price.min <= 0}
                variant="underlined"
                value={value?.max}
                min={value?.min}
                onFocus={(event) => event.target.select()}
                onValueChange={(value) => handlePriceChange("max", value)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
              />
            </div>
            <p className="fw-bold mt-4 mb-4">Select min or max price range </p>
            <div className="price-range__slider">
              <Slider
                label="Price Range"
                step={50}
                minValue={minMaxPrice.min}
                maxValue={minMaxPrice.max}
                onChangeEnd={handleRangeChange}
                defaultValue={[minMaxPrice.min, minMaxPrice.max]}
                formatOptions={{ style: "currency", currency: "USD" }}
                className="max-w-md"
                classNames={{
                  filler: "bg-primary-green",
                }}
                renderThumb={(props) => (
                  <div
                    {...props}
                    className="bg-primary-green group p-1 top-1/2 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                  >
                    <span className="transition-transform shadow-small rounded-full w-3 h-3 block group-data-[dragging=true]:scale-80"></span>
                  </div>
                )}
              />
            </div>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

const PriceRangeFilterBottom = ({
  name,
  value,
  handleFilterChange,
  minMaxPrice,
}) => {
  const [price, setPrice] = useState({
    min: 0,
    max: 0,
  });

  const [defaultPrice, setDefaultPrice] = useState({
    min: minMaxPrice.min,
    max: minMaxPrice.max,
  });

  const [unMount, setUnMount] = useState(false);

  const convertIntoCurrency = useCallback(
    (price) => {
      return Number(price).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    },
    [price]
  );

  const handleRangeChange = ([min, max]) => {
    const newPrice = { min, max };
    setPrice(newPrice);
    handleFilterChange(name, newPrice);
  };

  useEffect(() => {
    const newPrice = {
      min: value?.min > 0 ? value?.min : minMaxPrice.min,
      max: value?.max > 0 ? value?.max : minMaxPrice.max,
    };

    const newDefaultPrice = {
      min: minMaxPrice.min,
      max: minMaxPrice.max,
    };
    setDefaultPrice(newDefaultPrice);
    setPrice(newPrice);

    if (value.min === 0 && value.max === 0) {
      setUnMount(true);
      setTimeout(() => {
        setUnMount(false);
      }, 10);
    }
  }, [value, minMaxPrice]);

  return (
    <>
      <div className="price-range__slider">
        {!unMount && (
          <Slider
            step={50}
            label=""
            color="foreground"
            minValue={defaultPrice.min}
            maxValue={defaultPrice.max}
            showTooltip={true}
            // value={[price.min, price.max]}
            onChangeEnd={handleRangeChange}
            defaultValue={[defaultPrice.min, defaultPrice.max]}
            formatOptions={{ style: "currency", currency: "USD" }}
            classNames={{
              base: "max-w-md slider gap-3",
              track: "bg-light border border-secondary",
              filler: "bg-primary-green bg-gradient-to-r",
              value: "fw-bold fs-6",
            }}
            renderThumb={(props) => (
              <div
                {...props}
                className="p-1 top-50 bg-light border border-secondary rounded-circle shadow cursor-grab"
              >
                <span className="bg-primary-green shadow rounded-circle w-5 h-5 d-block" />
                {!props["data-pressed"] && (
                  <>
                    {props.index === 0 ? (
                      <span
                        style={{
                          position: "absolute",
                          top: -32,
                          left: -10,
                          fontSize: "11px",
                        }}
                        className="custom-range-thumb p-1 border-md"
                      >
                        {convertIntoCurrency(price.min)}
                      </span>
                    ) : null}
                    {props.index === 1 ? (
                      <span
                        style={{
                          position: "absolute",
                          top: -32,
                          left: -30,
                          fontSize: "11px",
                        }}
                        className="custom-range-thumb p-1 border-md"
                      >
                        {convertIntoCurrency(price.max)}
                      </span>
                    ) : null}
                  </>
                )}
              </div>
            )}
            tooltipProps={{
              offset: 10,
              placement: "bottom",
              classNames: {
                base: [
                  // arrow color
                  "custom-range-thumb",
                ],
                content: [
                  "py-2 shadow-xl",
                  "text-white custom-range-thumb rounded-circle",
                ],
              },
            }}
          />
        )}
      </div>
    </>
  );
};

const IndividualFilterButton = ({
  options,
  name,
  value,
  handleFilterChange,
}) => {
  const [activeFilter, setActiveFilter] = useState(value);
  const isActive = (key) => {
    const foundSalesLease = options.find((option) => option === key);
    return foundSalesLease === activeFilter;
  };

  const handleClick = (name, option) => {
    setActiveFilter(option);
    handleFilterChange(name, option);
  };

  return (
    <>
      {options.map((option, index) => {
        return (
          <div
            key={index}
            className={`px-3 py-1 cursor-pointer text-nowrap text-small h-[34px] d-flex justify-content-center align-items-center rounded-pill border-2 ${
              isActive(option)
                ? "bg-primary-green text-white border-primary-green"
                : ""
            }`}
            onClick={() => handleClick(name, option)}
          >
            {option}
          </div>
        );
      })}
    </>
  );
};
export default Filters;
