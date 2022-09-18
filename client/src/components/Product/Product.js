import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function Product({ product }) {
  const options = {
    edit: false,
    color: "rgba(255, 202, 5, 0.1)",
    activeColor: "gold",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 2.5,
    isHalf: true,
  };

  return (
    <Link
      class="rounded-lg shadow-md container lg:w-1/4 md:w-1/2 w-full my-4 "
      to={product._id}
    >
      <a href="#">
        <img
          class="p-8 rounded-t-lg object-cover object-center w-full  block"
          src={product.images[0]}
          alt="product image"
        />
      </a>
      <div class="px-5 pb-5 text-[#c7cfdc] max-w-3xl">
        <a href="#">
          <h5 class="text-xl font-semibold tracking-tight ">{product.name}</h5>
        </a>
        <div class="flex items-center mt-2.5 mb-5">
          <ReactStars {...options} />
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded  ml-3">
            256 reviews
          </span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-3xl font-bold text-[#ffca05]">{product.price}</span>
          <a
            href="#"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add to cart
          </a>
        </div>
      </div>
    </Link>
  );
}

export default Product;
