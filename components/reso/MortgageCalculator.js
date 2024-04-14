"use client";
import { parse } from "date-fns";
import React, { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel } from "victory";
const MortgageCalculator = (props) => {
  const [amount, setAmount] = useState(800000);
  const [interest, setInterest] = useState(1.85);
  const [years, setYears] = useState(25);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   // Perform calculation logic here (you can use a library like 'mortgage-calculator' or implement your own logic)
  //   // For simplicity, I'll just set a timeout to simulate calculation
  //   setTimeout(() => {
  //     const calculatedPayment = amount / (years * 12);
  //     setMonthlyPayment(calculatedPayment.toFixed(2));
  //     setLoading(false);
  //   }, 2000);
  // };

  // const [intrest, setIntrest] = useState(0);
  const [calculatordata, setCalculatordata] = useState({
    gmrincome: "",
    totalPropExp: "",
    nmrincome: "10",
    caprate: "",
    estPropValue: "",
  });
  const [calculated, setcalculated] = useState(null);

  useEffect(() => {
    console.log(
      parseFloat(calculatordata.gmrincome),
      parseFloat(calculatordata.totalPropExp),
      parseFloat(calculatordata.caprate) / 100
    );
    const val = (
      (parseFloat(calculatordata.gmrincome) * 12 -
        parseFloat(calculatordata.totalPropExp) * 12) /
      (parseFloat(calculatordata.caprate) / 100)
    ).toFixed(2);
    const nmrincome =
      parseFloat(calculatordata.gmrincome) -
      parseFloat(calculatordata.totalPropExp);
    setCalculatordata({
      ...calculatordata,
      estPropValue: String(val),
      nmrincome: String(nmrincome),
    });
  }, [
    calculatordata.gmrincome,
    calculatordata.totalPropExp,
    calculatordata.caprate,
  ]);

  // useEffect(() => {
  //   let dpayment =
  //     (parseInt(calculatordata.dper) / 100) * parseInt(calculatordata.hvalue);
  //   Setcalculatordata((prevState) => ({
  //     ...prevState,
  //     ["dpay"]: dpayment.toFixed(2),
  //   }));
  //   /* console.log(calculatordata.dpay); */
  // }, [calculatordata.hvalue, calculatordata.dper]);

  // useEffect(() => {
  //   let mortamt =
  //     parseFloat(calculatordata.hvalue) - parseFloat(calculatordata.dpay);
  //   Setcalculatordata((prevState) => ({
  //     ...prevState,
  //     ["loanamt"]: mortamt.toFixed(2),
  //   }));
  //   /* console.log(calculatordata.dpay); */
  // }, [calculatordata.hvalue, calculatordata.dper, calculatordata.dpay]);

  // function CalcMonth() {
  //   let i = parseFloat(calculatordata.intrate) / 100;
  //   let g = i / 12;
  //   let h = 1 + g;
  //   let tenn = parseInt(calculatordata.loanterm) * 12;
  //   let powerr = Math.pow(h, tenn);
  //   let aa = g * powerr;
  //   let numm = parseFloat(calculatordata.loanamt) * aa;
  //   let deno = powerr - 1;
  //   let monthh = numm / deno;
  //   return monthh;
  // }

  // useEffect(() => {
  //   setcalculated(CalcMonth().toFixed(2));
  // });
  const handleChange = (e) => {
    const { id, value } = e.target;

    setCalculatordata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    /* console.log(calculatordata); */
  };

  let style = { fontSize: "15" };

  return (
    <div className="py-3 py-md-5 my-5">
      <h2 className="fs-2 fw-bold">
        <span className="aff2">Property Value Calculator</span>
      </h2>
      <p>Quickly See What Your Mortgage Payments Might Look Like</p>
      <div className="bg-white shadow-2xl rounded-md">
        <div className="row row-cols-1 row-cols-md-2 rounded-mine px-2 py-5 shadow-lgg mx-0">
          <div className="my-3 d-block d-sm-none">
            <h3 className="fs-2">
              ${calculated} <span className="fs-5 text-secondary">/mo</span>
            </h3>
          </div>
          <div className="col-md-9 col-lg-9 my-2 my-sm-5">
            <div className="row row-cols-1 row-cols-sm-2">
              <div className="col-sm-4 d-flex align-items-center">
                <label className="mortlabel" htmlFor="hvalue">
                  Gross Monthly Rental Income
                </label>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <span className="input-group-text bg-light" id="basic-addon1">
                    $
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon1"
                    id="gmrincome"
                    value={calculatordata.gmrincome}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 my-3">
              <div className="col-sm-4 d-flex align-items-center">
                <label htmlFor="dpay" className="mortlabel">
                  Total Monthly Property Expenses*
                </label>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <span className="input-group-text  bg-light">$</span>
                  <input
                    type="text"
                    className="form-control"
                    id="totalPropExp"
                    value={calculatordata.totalPropExp}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-2  my-3">
              <div className="col-sm-4 d-flex align-items-center">
                <label htmlFor="intrate" className="mortlabel">
                  Net Monthly Rental Income :
                </label>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    aria-describedby="basic-addon3"
                    id="nmrincome"
                    value={calculatordata.nmrincome}
                    onChange={handleChange}
                    disabled={true}
                  />
                  <span className="input-group-text bg-light" id="basic-addon3">
                    $
                  </span>
                </div>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2  my-3">
              <div className="col-sm-4 d-flex align-items-center">
                <label htmlFor="intrate" className="mortlabel">
                  Cap Rate (%) :
                </label>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <span className="input-group-text bg-light" id="basic-addon3">
                    %
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    aria-describedby="basic-addon3"
                    id="caprate"
                    value={calculatordata.caprate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-2  my-3">
              <div className="col-sm-4 d-flex align-items-center">
                <label htmlFor="loanamt" className="mortlabel">
                  Estimate Property Value Base on Income :
                </label>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <span className="input-group-text bg-light" id="basic-addon2">
                    $
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon2"
                    id="estPropValue"
                    value={calculatordata.estPropValue}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-md-12 my-0 mb-5 col-lg-12">
            <div className="rounded-mine bg-light d-flex align-items-center flex-column flex-md-row">
              <div className="p-3 rounded-mine">
                <h3 className="fs-2 fw-bold text-mine">
                  ${calculated} <span className="fs-5 text-secondary">/mo</span>
                </h3>
                <p className="text-secondary">
                  Your Estimated Monthly Mortgage Payment.
                </p>
              </div>
              <svg viewBox="0 0 400 400">
                <VictoryPie
                  standalone={false}
                  width={400}
                  height={400}
                  data={[
                    {
                      x: `Mortgage \n$ ${parseInt(
                        calculatordata.loanamt
                      ).toLocaleString()}`,
                      y: parseInt(calculatordata.loanamt),
                    },
                    {
                      x: `Interest \n $ ${parseInt(intrest).toLocaleString()}`,
                      y: parseInt(intrest),
                    },
                  ]}
                  innerRadius={68}
                  labelRadius={100}
                  padding={{ left: 120, right: 120 }}
                  colorScale={["rgb(82 170 146)", "rgb(82 130 146)"]}
                />
                <VictoryLabel
                  textAnchor="middle"
                  style={style}
                  x={200}
                  y={200}
                  text={"$" + calculated + "/mo"}
                />
              </svg>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
