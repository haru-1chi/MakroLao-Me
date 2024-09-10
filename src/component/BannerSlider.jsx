import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import office from "../assets/office_supplies.png";
import electrical from "../assets/electrical_machines.png";
function BannerSlider() {
  const data = [
    {
      imgURL: electrical,
      onClick: () => navigate("/List-Product", { state: { categoryName: ['เครื่องใช้ไฟฟ้า (electrical appliance)'] } }),
      bgColor: '#275ce9',
    },
    {
      imgURL: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FFlash_Sale_Fresh_Middle_TH_016100_8a83bd308a.png&w=1200&q=90',
      onClick: () => navigate("/List-Product", { state: { categoryName: ['เครื่องดื่ม (Drinks & Beverages)', 'เครื่องปรุงรส-น้ำมัน (Seasoning-Oil)', 'ขนม (Appetizer)', 'อาหารกระป๋อง-อาหารแห้ง (Canned Food,Dry Food)', 'นม', 'กาแฟ เครื่องชง ครีมเทียม', 'เครื่องดื่มแอลกอล์ฮอล์', 'อาหารแช่แข็ง'] } }),
      bgColor: 'rgb(1, 97, 0)',
    },
    {
      imgURL: office,
      onClick: () => navigate("/List-Product", { state: { categoryName: ['เครื่องเขียนและอุปกรณ์สำนักงาน','อุปกรณ์อ๊อฟฟิต (OFFICE)'] } }),
      bgColor: '#ad5014',
    }
  ]

  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const onCarouselChange = (e) => {
    setCurrentIndex(e.page);
  };

  const productTemplateFull = (product) => {
    return (
      <div className="border-none surface-border text-center" style={{ backgroundColor: `${product.bgColor}`}}>
        <div className="lg:h-20rem">
          <img
            src={product.imgURL}
            className="cursor-pointer w-full lg:w-fit lg:h-full"
            onClick={product.onClick}
          />
        </div>
      </div>
    );
  };

  const productTemplateFit = (product) => {
    return (
      <div className="border-none surface-border text-center">
        <div className="lg:h-20rem">
          <img
            src={product.imgURL}
            className="cursor-pointer w-full lg:w-fit lg:h-full"
            onClick={product.onClick}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="relative hidden lg:block card">
        <div className="h-fit absolute top-0 right-0 mt-2 mr-7 bg-white-alpha-60 px-3 py-1 text-md border-round-2xl z-1">
          <p className="m-0 p-0 text-900">{currentIndex + 1}/{data.length}</p>
        </div>
        <Carousel
          value={data}
          numVisible={1}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          className="custom-carousel"
          circular
          autoplayInterval={3000}
          itemTemplate={productTemplateFull}
        />
      </div>

      <div className="relative block lg:hidden card mb-2">
        <div className="h-fit absolute top-0 right-0 mt-2 mr-2 bg-white-alpha-60 text-xs px-1 border-round-xl z-1">
          <p className="m-0 p-0 text-900">{currentIndex + 1}/{data.length}</p>
        </div>
        <Carousel
          value={data}
          numVisible={1}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          className="custom-carousel"
          showIndicators={false}
          showNavigators={false}
          circular
          autoplayInterval={3000}
          itemTemplate={productTemplateFit}
          onPageChange={onCarouselChange}
        />
      </div>
    </>
  );
}

export default BannerSlider;