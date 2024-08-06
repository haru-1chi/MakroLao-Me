import Products from "../../component/Products";
import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";
import { Button } from 'primereact/button';
import Footer from "../../component/Footer";

function ProductPage() {
  const data = [
    {
      imgURL : 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2Fccf8d24de08045b2905f4a12d5522d5e&w=1080&q=75'
    },
    {
      imgURL : 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F9102f2833d2246ea8b22f33fc5dc6944&w=1080&q=75'
    },
    {
      imgURL : 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2Fefa4a4ae912749768560bd44f34b4f3f&w=1080&q=75'
    },
  ]

  
  
  const responsiveOptions = [
    {
      breakpoint: "991px",
      numVisible: 3,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 2,
    },
  ];


  const itemTemplate = (item) => {
    return <img src={item.imgURL} alt='' width={300}  />
}

const thumbnailTemplate = (item) => {
  return <img src={item.imgURL} alt='' width={100} />
}
  


  return (
    <>
    <div className="m-3">
     {/* ----------------------- */}
      <div className="card shadow-2 bg-white mb-3">
        <Galleria
          value={data}
          responsiveOptions={responsiveOptions}
          numVisible={5}
          style={{ maxWidth: "640px" }}
          item={itemTemplate} 
          thumbnail={thumbnailTemplate}
        />
      </div>
      {/* ----------------------- */}

      <div className="p-4 bg-white border-round-lg shadow-2">
        <h1>Name Product</h1>
        <h2>999.00 </h2>
        <Button className="w-full" label="+ เพิ่มสินค้าในตะกร้า"/>
      </div>

      <div>
        <Products />
      </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;