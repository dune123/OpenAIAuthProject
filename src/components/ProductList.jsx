import React, { useState } from "react";
import ProductCardSkeleton from "./ProductSkeleton";

function ImageWithFallback({ item }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = item.original || item.source;

  return imageUrl && !imgError ? (
    <img
      src={imageUrl}
      alt={item.title}
      className="h-20 w-20 rounded-md"
      onError={() => setImgError(true)}
    />
  ) : (
    <div className="h-20 w-20 bg-gray-300 rounded-md flex items-center justify-center">
      <span className="text-gray-500 text-sm">No Image</span>
    </div>
  );
}

function ImageWithFallback2({ item }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = item.thumbnail || item.link;

  return imageUrl && !imgError ? (
    <img
      src={imageUrl}
      alt={item.title}
      className="h-20 w-20 rounded-md"
      onError={() => setImgError(true)}
    />
  ) : (
    <div className="h-20 w-20 bg-gray-300 rounded-md flex items-center justify-center">
      <span className="text-gray-500 text-sm">No Image</span>
    </div>
  );
}

const ProductList = ({ imageResponse, textResponse }) => {
 
  console.log(imageResponse, textResponse);
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="border-2 rounded-md p-4 flex flex-col gap-2">
        {textResponse&&textResponse.length > 0 ? (
          textResponse.map((item, index) => (
            <div className="border-2 rounded-md p-2 flex gap-6">
              <ImageWithFallback item={item} />
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-semibold">{item.source_name}</p>
                <p>{item.title}</p>
                <a
                  href={item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:underline"
                >
                  View Product
                </a>
              </div>
            </div>
          ))
        ) : (
          <div>Can not get any product</div>
        )}
        {imageResponse&&imageResponse.length > 0 ? (
          imageResponse.map((item, index) => (
            <div className="border-2 rounded-md p-2 flex gap-6">
              <ImageWithFallback2 item={item} />
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-semibold">{item.source_name}</p>
                <p>{item.title}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:underline"
                >
                  View Product
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="text-red-500">
            Can not able to fetch details thoright image please try again with a
            different image
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductList);
