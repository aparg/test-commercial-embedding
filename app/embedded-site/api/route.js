// app/my-page/route.js
import { NextResponse } from "next/server";

// List of authorized domains
const authorizedDomains = [];

export async function GET(request) {
  // Retrieve the referrer URL or origin domain
  console.log(request.headers);
  const referrerUrl = request.headers.get("referer");
  const originDomain = request.headers.get("origin");

  // Check if the referrer URL or origin domain is authorized
  let isAuthorized = false;
  console.log(referrerUrl);
  console.log(originDomain);
  for (const domain of authorizedDomains) {
    if (referrerUrl?.includes(domain) || originDomain?.includes(domain)) {
      isAuthorized = true;
      break;
    }
  }

  // If the referrer or origin is not authorized, reject the request
  if (!isAuthorized) {
    return NextResponse.json(
      { error: "Unauthorized accesshuhuhu" },
      { status: 403 }
    );
  }

  // If the referrer or origin is authorized, return the page content
  return NextResponse.json({ message: "This is the authorized page content." });
}
