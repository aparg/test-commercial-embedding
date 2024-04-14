import "bootstrap/dist/css/bootstrap.min.css";
import "../(site)/globals.css";
import "../(site)/icons.css";
import "react-quill/dist/quill.snow.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import { Figtree } from "next/font/google";
import { Providers } from "../(site)/providers";
import localFont from "next/font/local";

const satoshi = localFont({
  src: [
    {
      path: "../(site)/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../(site)/Satoshi-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../(site)/Satoshi-Medium.otf",
      weight: "500", // Adjust weight to 500 for medium (or as specified in the font file)
      style: "normal",
    },
    {
      path: "../(site)/Satoshi-MediumItalic.otf",
      weight: "500", // Adjust weight to 500 for medium (or as specified in the font file)
      style: "italic",
    },
    {
      path: "../(site)/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../(site)/Satoshi-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../(site)/Satoshi-Black.otf",
      weight: "900", // Adjust weight to 900 for black (or as specified in the font file)
      style: "normal",
    },
    {
      path: "../(site)/Satoshi-BlackItalic.otf",
      weight: "900", // Adjust weight to 900 for black (or as specified in the font file)
      style: "italic",
    },
  ],
});

const figtree = Figtree({ subsets: ["latin"] });

async function getCities() {
  const res = await fetch("https://api.dolphy.ca/api/all-city", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function RootLayout({ children }) {
  let cities = await getCities();
  return (
    <html lang="en">
      <body className={satoshi.className} style={{ overflowX: "hidden" }}>
        <NextTopLoader
          color="#FFFFFF"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #00A1FF,0 0 5px #00A1FF"
        />
        <Providers>
          {/* <ComparisionFlagProvider> */}
          {children}
          {/* </ComparisionFlagProvider> */}
        </Providers>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
