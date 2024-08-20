import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
// import { ProductService } from './service/ProductService';

function BannerSlider() {
  // const [products, setProducts] = useState([]);
  const data = [
    {
      imgURL: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_16_Crazy_Jumbo_Web_Banner_TH_b00302_01526f1368.png&w=1920&q=90'
    },
    {
      imgURL: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FUpdated17_Jul_Makro_FB_Challenge_1290x480_TH_0cb0869b3d.png&w=3840&q=90'
    }
  ]


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

  //   useEffect(() => {
  //     ProductService.getProductsSmall().then((data) =>
  //       setProducts(data.slice(0, 9))
  //     );
  //   }, []);

  const productTemplate = (product) => {
    return (
      <div className="border-none surface-border text-center">
        <div className="h-7rem sm:h-13rem md:h-16rem lg:h-20rem bg-red-500">
          <img
            src={product.imgURL}
            className="h-full"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="card">
        <Carousel
          value={data}
          numVisible={1}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          className="custom-carousel"
          circular
          autoplayInterval={3000}
          itemTemplate={productTemplate}
        />
      </div>
    </>
  );
}

export default BannerSlider;

// import React, { useState, useEffect } from "react";
// import { Button } from "primereact/button";
// import { Carousel } from "primereact/carousel";
// import { Tag } from "primereact/tag";
// // import { ProductService } from './service/ProductService';

// function BannerSlider() {
//   // const [products, setProducts] = useState([]);
//   const data = [
//     {
//         imgURL : 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_16_Crazy_Jumbo_Web_Banner_TH_b00302_01526f1368.png&w=1920&q=90'
//     },
//     {
//         imgURL : 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FUpdated17_Jul_Makro_FB_Challenge_1290x480_TH_0cb0869b3d.png&w=3840&q=90'
//     }
// ]


//   const responsiveOptions = [
//     {
//       breakpoint: "1400px",
//       numVisible: 2,
//       numScroll: 1,
//     },
//     {
//       breakpoint: "1199px",
//       numVisible: 3,
//       numScroll: 1,
//     },
//     {
//       breakpoint: "767px",
//       numVisible: 2,
//       numScroll: 1,
//     },
//     {
//       breakpoint: "575px",
//       numVisible: 1,
//       numScroll: 1,
//     },
//   ];

// //   useEffect(() => {
// //     ProductService.getProductsSmall().then((data) =>
// //       setProducts(data.slice(0, 9))
// //     );
// //   }, []);

//   const productTemplate = (product) => {
//     return (
//       <div className="border-none surface-border border-round m-2 text-center">
//         <div className="mb-3 bg-purple-500">
//           <img
//             src={product.imgURL}
//             className="w-full border-round-lg"
//           />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="card">
//       <Carousel
//       showNavigators={false}
//       showIndicators={false}
//         value={data}
//         numVisible={1}
//         numScroll={1}
//         responsiveOptions={responsiveOptions}
//         className="custom-carousel"
//         circular
//         autoplayInterval={3000}
//         itemTemplate={productTemplate}
//       />
//     </div>
//   );
// }

// export default BannerSlider;
