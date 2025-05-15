import React from 'react'

const ProductCardSkeleton = () => (
    <div className="border-2 rounded-md p-2 flex gap-6 animate-pulse">
      <div className="h-20 w-20 bg-gray-300 rounded-md" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-6 bg-gray-300 rounded w-1/3" />
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
  );
  

export default ProductCardSkeleton