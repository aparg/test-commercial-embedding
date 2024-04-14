"use client";

import { useState } from "react";
import ContactFormSubmit from "./ContactFormSubmit";
import { Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import BookingDate from "./BookingDate";

export default function BookShowingForm(props) {
  const [submitbtn, setSubmitbtn] = useState("Book a showing");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    message: props.defaultmessage,
    proj_name: props.proj_name,
    city: props.city,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    ContactFormSubmit(credentials, setSubmitbtn, setCredentials);
  };
  return (
    <div className="fixed-title pe-0 top-30 sticky mt-24 sm:mt-0" id="contact">
      <div className="p-6 pb-0 shadow-2xl rounded-mine bordt bg-white border-[#e8e9ea]">
        <h5 className="fw-bold text-center linem fs-4  mb-0">Book a showing</h5>
        <p className="text-center pt-2 cardd-subtitle_bg-black">
          with a {credentials.city}{" "}
          <span className="fw-bold pr-1">Buyer's</span>
          agent
        </p>

        <div className="my-4"></div>
        <form
          method="POST"
          className="mb-3"
          onSubmit={(e) => handleFormSubmit(e)}
          id="contactForm"
        >
          <div className="row me-0 row-cols-2 g-1 me-0">
            <div className="col mb-3">
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                value={credentials.name}
                onChange={(e) => handleChange(e)}
                className="fields fff"
              />
            </div>
            <div className="col">
              <div className="mb-3">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  value={credentials.phone}
                  onChange={(e) => handleChange(e)}
                  required={true}
                  className="fields fff"
                />
              </div>
            </div>
          </div>
          <BookingDate handleChange={handleChange} />
          <div className="row me-0 row-cols-1 g-0">
            <div className="col">
              <div className="mb-3">
                <input
                  type="email"
                  aria-describedby="emailHelp"
                  placeholder="Your email"
                  name="email"
                  id="email"
                  value={credentials.email}
                  onChange={(e) => handleChange(e)}
                  className="fields fff"
                />
              </div>
            </div>
          </div>
          <div className="row me-0 g-0">
            <div className="mb-3">
              <textarea
                id="message"
                name="message"
                className="fields fff"
                rows="2"
                cols="50"
                value={credentials.message}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
          </div>
          <div className="row me-0">
            <div className="mb-2">
              <p className="showing-info">
                We'll call you within the next business hour to match you with
                an agent from the Houseful™ agent network. By submitting this
                information, I acknowledge I have read and agree to the{" "}
                <a href="#">Terms of use,</a> including its Privacy section.
              </p>
            </div>
          </div>

          <div></div>

          {/* <div className="row me-0">
            <div className="mb-3">
              <Checkbox
                defaultSelected
                color="default"
                size="md"
                radius="sm"
                className="d-flex align-items-baseline"
              >
                <p className="showing-info showing-info__cb">
                  I would like to receive marketing and promotional messages by
                  telephone, text message, and email from Houseful, including
                  information and updates about properties of interest and the
                  services and features of Houseful and our selected partners. I
                  may withdraw my consent at any time. Message and data rates
                  may apply. Consent is not required to receive real estate
                  services.
                </p>
              </Checkbox>
            </div>
          </div> */}
          <input
            type="submit"
            value={submitbtn}
            className="btn bg-dark text-white btn-md w-100 mb-3"
            id="subbtn"
          />
        </form>
      </div>
    </div>
  );
}
