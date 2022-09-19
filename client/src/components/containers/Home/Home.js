import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getProduct } from "../../../redux/actions/product";

import Product from "./ProductOnHome";
import iphone from "../../../images/iphone.png";
import Metadata from "../../Metadata";

function Home() {
  const product = {
    name: "Apple Watch Series 7 GPS, Aluminum Case, Starlight Sport",
    images: [`${iphone}`],
    price: "$599",
    _id: "adfaasfasf",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div>
      <Metadata title="Fashion Club" />
      <div>Home</div>
      <h2 className="font-bold text-center uppercase text-yellow-500 text-2xl">
        On Demand
      </h2>
      <div>
        <hr className="w-1/6 m-auto my-8" />
      </div>
      <div className="mx-4 p-20 flex flex-wrap justify-center ">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </div>
  );
}

export default Home;
