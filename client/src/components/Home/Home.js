import React from "react";
import Product from "../Product/Product";
import iphone from '../iphone.png'
function Home() {
  const product = {
    name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
    images: [`${iphone}`],
    price: "$599",
    _id: "adfaasfasf",
  };
  return (
    <div>
      <div>Home</div>
        <h2 className="font-bold text-center uppercase text-yellow-500 text-2xl">
          On Demannd
        </h2>
        <div>
          <hr className="w-1/6 m-auto my-8" />
      </div>
      <div className="flex flex-wrap justify-center space-x-8">
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
