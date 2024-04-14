import React from "react";

const ImageText = ({ title, imageSrc }) => {
  return (
    // <div className="md:px-2 lg:px-4 border-1">
    //   <img className="-rotate-1" src={imageSrc} alt="new thumbnail" />
    //   <h3 className="mt-5 text-xl font-semibold leading-tight text-black">
    //     {title}
    //   </h3>

    // </div>
    <div className="bg-gray-50 shadow-md rounded-md">
      <div className="overflow-hidden rounded-lg cursor-pointer group aspect-w-3 aspect-h-4 md:aspect-w-3 md:aspect-h-2">
        <img
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
          src={imageSrc}
          alt="news thumbnail"
        />
      </div>
      <p className="mt-2 mb-2 text-xl font-bold text-gray-900 px-2">{title}</p>
    </div>
  );
};

export default ImageText;

{
  /* <div className="py-12 bg-white sm:py-16 lg:py-20">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div>
            <h2 className="text-lg font-bold text-gray-900">Your media files</h2>
            <p className="mt-1 text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet, consectetur adipis.</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-8 lg:mt-10 sm:grid-cols-3 lg:grid-cols-4">
            <div>
                <div className="overflow-hidden rounded-lg cursor-pointer group aspect-w-3 aspect-h-4 md:aspect-w-3 md:aspect-h-2">
                    <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-grid/2/media-01.png" alt="" />
                </div>
                <p className="mt-4 text-sm font-bold text-gray-900">Interior_904.png</p>
                <p className="mt-1 text-sm font-medium text-gray-500">1.04 MB</p>
            </div>

            <div>
                <div className="overflow-hidden rounded-lg cursor-pointer group aspect-w-3 aspect-h-4 md:aspect-w-3 md:aspect-h-2">
                    <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-grid/2/media-02.png" alt="" />
                </div>
                <p className="mt-4 text-sm font-bold text-gray-900">Interior_482.jpg</p>
                <p className="mt-1 text-sm font-medium text-gray-500">2 MB</p>
            </div>

            <div>
                <div className="overflow-hidden rounded-lg cursor-pointer group aspect-w-3 aspect-h-4 md:aspect-w-3 md:aspect-h-2">
                    <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-grid/2/media-03.png" alt="" />
                </div>
                <p className="mt-4 text-sm font-bold text-gray-900">Interior_1849.jpg</p>
                <p className="mt-1 text-sm font-medium text-gray-500">4.1 MB</p>
            </div>

            <div>
                <div className="overflow-hidden rounded-lg cursor-pointer group aspect-w-3 aspect-h-4 md:aspect-w-3 md:aspect-h-2">
                    <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-grid/2/media-04.png" alt="" />
                </div>
                <p className="mt-4 text-sm font-bold text-gray-900">Interior_3009.png</p>
                <p className="mt-1 text-sm font-medium text-gray-500">1.84 MB</p>
            </div>

            <div>
                <div className="overflow-hidden rounded-lg cursor-pointer group aspect-w-3 aspect-h-4 md:aspect-w-3 md:aspect-h-2">
                    <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-grid/2/media-05.png" alt="" />
                </div>
                <p className="mt-4 text-sm font-bold text-gray-900">Interior_1565.png</p>
                <p className="mt-1 text-sm font-medium text-gray-500">587 KB</p>
            </div>

            <div>
                <div className="overflow-hidden rounded-lg cursor-pointer group aspect-w-3 aspect-h-4 md:aspect-w-3 md:aspect-h-2">
                    <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-grid/2/media-06.png" alt="" />
                </div>
                <p className="mt-4 text-sm font-bold text-gray-900">Interior_345.png</p>
                <p className="mt-1 text-sm font-medium text-gray-500">2.91 MB</p>
            </div>

            <div>
                <div className="overflow-hidden rounded-lg cursor-pointer group aspect-w-3 aspect-h-4 md:aspect-w-3 md:aspect-h-2">
                    <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-grid/2/media-07.png" alt="" />
                </div>
                <p className="mt-4 text-sm font-bold text-gray-900">Working_Woman.jpg</p>
                <p className="mt-1 text-sm font-medium text-gray-500">1.24 MB</p>
            </div>

            <div>
                <div className="overflow-hidden rounded-lg cursor-pointer group aspect-w-3 aspect-h-4 md:aspect-w-3 md:aspect-h-2">
                    <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-grid/2/media-08.png" alt="" />
                </div>
                <p className="mt-4 text-sm font-bold text-gray-900">Coffee_shop_img.png</p>
                <p className="mt-1 text-sm font-medium text-gray-500">3 MB</p>
            </div>
        </div>
    </div>
</div> */
}
