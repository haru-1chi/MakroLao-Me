import React from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "../../component/Footer";
function Pagepoint() {
  const products = [
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_15_LV_2_MAMA_f83c5584fc.png&w=160&q=75",
      name: "มาม่า",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_16_LV_2_Personal_Care_259e2752ae.png&w=160&q=75",
      name: "ผลิตภัณฑ์ของใช้ส่วนตัว",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_11_LV_2_SCOTCH_3cef6d1381.png&w=160&q=75",
      name: "สก็อต",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_16_LV_2_Milk_Powder_580a7ce4bb.png&w=160&q=75",
      name: "ผลิตภัณต์นมผง",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_12_LV_2_KOPIKO_ee281fa1eb.png&w=160&q=75",
      name: "โทปิโก้",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_10_LV_2_ICHITAN_85591a496c.png&w=160&q=75",
      name: "อิชิตัน",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_16_LV_2_Snacks_e47485be5e.png&w=160&q=75",
      name: "ขนม",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_15_LV_2_MAMA_f83c5584fc.png&w=160&q=75",
      name: "มาม่า",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_16_LV_2_Personal_Care_259e2752ae.png&w=160&q=75",
      name: "ผลิตภัณฑ์ของใช้ส่วนตัว",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_11_LV_2_SCOTCH_3cef6d1381.png&w=160&q=75",
      name: "สก็อต",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_16_LV_2_Milk_Powder_580a7ce4bb.png&w=160&q=75",
      name: "ผลิตภัณต์นมผง",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_12_LV_2_KOPIKO_ee281fa1eb.png&w=160&q=75",
      name: "โทปิโก้",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_10_LV_2_ICHITAN_85591a496c.png&w=160&q=75",
      name: "อิชิตัน",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_16_LV_2_Snacks_e47485be5e.png&w=160&q=75",
      name: "ขนม",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_15_LV_2_MAMA_f83c5584fc.png&w=160&q=75",
      name: "มาม่า",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_16_LV_2_Personal_Care_259e2752ae.png&w=160&q=75",
      name: "ผลิตภัณฑ์ของใช้ส่วนตัว",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_11_LV_2_SCOTCH_3cef6d1381.png&w=160&q=75",
      name: "สก็อต",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_16_LV_2_Milk_Powder_580a7ce4bb.png&w=160&q=75",
      name: "ผลิตภัณต์นมผง",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_12_LV_2_KOPIKO_ee281fa1eb.png&w=160&q=75",
      name: "โทปิโก้",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_10_LV_2_ICHITAN_85591a496c.png&w=160&q=75",
      name: "อิชิตัน",
    },
    {
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMM_16_LV_2_Snacks_e47485be5e.png&w=160&q=75",
      name: "ขนม",
    },
  ];
  return (
    <>
    <div className="p-3 mb-4">
      <h1 className="font-semibold">จัดเต็มความคุ้ม แม็คโครโปรพอยท์</h1>
      <div className="section-point-product w-full text-center gap-2">
        {products.map((Item) => (
          <Link to="/List-Product">
            <div className="flex flex-column bg-white border-round-xl p-2 justify-content-between h-full">
              <div>
                <img
                  src={Item.imgURL}
                  alt=""
                  className=""
                  width={70}
                  height={70}
                />
              </div>
              <div className="h-full align-content-center text-sm mx-1 my-2">
                {Item.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Pagepoint;
