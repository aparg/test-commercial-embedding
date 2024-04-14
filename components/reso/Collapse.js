"use client";
import { useState } from "react";

const Collapse = () => {

    const [collapse, setCollapse] = useState(false)
  return (
    <>
    {collapse && (<a  data-bs-toggle="collapse" onClick={(e)=>setCollapse(!collapse)} href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" className="fw-bold">See Less</a>
      )}
      {!collapse &&  (<a  data-bs-toggle="collapse" onClick={(e)=>setCollapse(!collapse)} href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" className="fw-bold">See More</a>)
   }   
    </>
  );
};

export default Collapse
