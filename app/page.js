import React from "react";

export default async function Home() {
  return (
    <iframe
      src="http://localhost:3000/embedded-site/ontario"
      style={{ width: "100%", height: "100vh" }}
    ></iframe>
  );
}
