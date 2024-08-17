import Products from "../../component/Products";
import React, { useState, useRef } from "react";
import { useCart } from '../../router/CartContext';
import { Galleria } from "primereact/galleria";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import Footer from "../../component/Footer";
import { useLocation } from 'react-router-dom';

function ProductPage() {
  const location = useLocation();
  const product = location.state?.product;
  const { addToCart } = useCart();

  const toast = useRef(null);
  const show = () => {
    toast.current.show({
      severity: 'success', summary: 'เพิ่มในตะกร้าแล้ว', life: 2000
    });
  };

  const data = [
    {
      imgURL: product.product_image
    },
    {
      imgURL: product.product_image
    },
    {
      imgURL: product.product_image
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
    return <img src={item.imgURL} alt='' width={300} />
  }

  const thumbnailTemplate = (item) => {
    return <img src={item.imgURL} alt='' width={100} />
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Toast ref={toast} position="top-center" />
      <div className="m-3 flex justify-content-center flex-wrap">
        <div className="w-9 flex gap-2">
          <div className="card w-full shadow-2 border-round-lg bg-white p-4 mb-3">
            <Galleria
              value={data}
              responsiveOptions={responsiveOptions}
              numVisible={5}
              style={{ maxWidth: "640px" }}
              item={itemTemplate}
              thumbnail={thumbnailTemplate}
            />
          </div>
          <div className="w-full p-4 bg-white border-round-lg shadow-2">
            <h1>{product.product_name}</h1>
            <h2>{product.product_price} ฿</h2>
            <p>{product.product_detail}</p>
            <Button className="w-fit" label="+ เพิ่มสินค้าในตะกร้า"
              onClick={() => {
                addToCart(product)
                show()
              }} />
          </div>
        </div>


        <div>
          {/* <Products /> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;