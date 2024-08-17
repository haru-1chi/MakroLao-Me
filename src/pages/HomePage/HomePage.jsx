import { useState, useEffect } from "react";
import BannerSlider from "../../component/BannerSlider";
import Category from "../../component/Category";
import topBanner from "../../assets/banner.png";
import Footer from "../../component/Footer";
import Brand from "../../component/Brand";
import AllBrand from "../../component/AllBrand";
import Products from "../../component/Products";
import axios from "axios";

function HomePage() {

  const categories = [
    {
      id: "1",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMakro_35th_Anniversary_Cate_Icon_Fresh_bd262901a8.png&w=750&q=90",
      title: "ของสด",
    },
    {
      id: "2",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMakro_35th_Anniversary_Cate_Icon_Fresh_bd262901a8.png&w=750&q=90",
      title: "เครื่องดื่ม",
    },
    {
      id: "3",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMakro_35th_Anniversary_Cate_Icon_Fresh_bd262901a8.png&w=750&q=90",
      title: "อาหารและเครื่องดื่ม",
    },
    {
      id: "4",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMakro_35th_Anniversary_Cate_Icon_Fresh_bd262901a8.png&w=750&q=90",
      title: "ห้องครัวและห้องอาหาร",
    },
    {
      id: "5",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMakro_35th_Anniversary_Cate_Icon_Fresh_bd262901a8.png&w=750&q=90",
      title: "เครื่องใช้ไฟฟ้า",
    },
    {
      id: "6",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMakro_35th_Anniversary_Cate_Icon_Fresh_bd262901a8.png&w=750&q=90",
      title: "บ้านและไลฟ์สไตล์",
    },
    {
      id: "7",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMakro_35th_Anniversary_Cate_Icon_Fresh_bd262901a8.png&w=750&q=90",
      title: "สุขภาพและความงาม",
    },
    {
      id: "8",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMakro_35th_Anniversary_Cate_Icon_Fresh_bd262901a8.png&w=750&q=90",
      title: "อุปกรณ์สำนักงาน",
    },
    {
      id: "9",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMakro_35th_Anniversary_Cate_Icon_Fresh_bd262901a8.png&w=750&q=90",
      title: "ผลิตภัณฑ์สำหรับสัตว์เลี้ยง",
    },
    {
      id: "10",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMakro_35th_Anniversary_Cate_Icon_Fresh_bd262901a8.png&w=750&q=90",
      title: "แม่และเด็ก",
    },

  ];

  const newBrabd = [
    {
      id: "1",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2F3_P_Grid_Banner_3_P_Landing_Page_Mid_Year_Sale_Existing_exciting_offer_TH_cfca948e1e.png&w=1200&q=90",
    },
    {
      id: "2",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2F3_P_Grid_Banner_Ba_NANA_Online_Official_Store_TH_ebc408c204.png&w=1200&q=90",
    },
    {
      id: "3",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FKenvue_TH_e35d2bb018.jpg&w=1200&q=90",
    },
    {
      id: "4",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2F3_P_Grid_Banner_Samsung_Official_Store_TH_2258e689c1.png&w=1200&q=90",
    },
    {
      id: "5",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2F3_P_Grid_Banner_3_P_Landing_Page_Mid_Year_Sale_Existing_exciting_offer_TH_cfca948e1e.png&w=1200&q=90",
    },
    {
      id: "6",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2F3_P_Grid_Banner_Ba_NANA_Online_Official_Store_TH_ebc408c204.png&w=1200&q=90",
    },
    {
      id: "7",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FKenvue_TH_e35d2bb018.jpg&w=1200&q=90",
    },
    {
      id: "8",
      imgURL:
        "https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2F3_P_Grid_Banner_Samsung_Official_Store_TH_2258e689c1.png&w=1200&q=90",
    },
  ];

  const [data, setData] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_PRODUCT;
  const fetchData = () => {
    axios({
      method: "post",
      url: `${apiUrl}/api_product`,
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3ciOiJQYXJ0bmVyIiwiaWF0IjoxNzIxODgzMDI0fQ.MbtGRD3wn1ejaYfdtUvxuke4FLSSB-5_uybIuWozvPg",
      },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(apiUrl);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {/* <div className="banner">
        <img className="w-30rem" src={topBanner} alt="" />
      </div>
      <div class="category-scrllo flex w-full border-solid p-3">
        <div className="flex text-center sm:col-12 gap-2">
          {categories.map((item) => (
            <Category data={item} />
          ))}
        </div>
      </div> */}
      <div>
        <BannerSlider />
        <div className="bg-section-product text-center mx-2">
          <img
            className="w-7 align-self-center"
            src="https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FFlash_Sale_Middle_Banner_TH_Electro_0e168c_d08d74be82.png&w=1200&q=90"
            alt=""
          />
          <Products data={data}/>
        </div>

        <div className="mt-5">
          <div className="flex align-items-center justify-content-between pl-3 pr-3">
            <span>
              <b>ไอเท็มฮิตแจกพอยท์พิเศษ</b>
            </span>
            <p className="m-0 p-0">
              ดูเพิ่มเติม <i className="pi pi-angle-right"></i>
            </p>
          </div>
          <Products data={data}/>
        </div>

        <div className="bg-section-new-product text-center m-2">
          <img
            className="w-7"
            src="https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FFlash_Sale_Fresh_Middle_TH_016100_8a83bd308a.png&w=1200&q=90"
            alt=""
          />
          <Products data={data}/>
        </div>
        <div className="mt-4 pl-3 pr-3">
          <span>
            <b>เปิดตัวแบรนด์ใหม่</b>
          </span>
          <div class="flex category-scrllo w-full mt-4 justify-items-center">
            <div className="flex justify-content-between sm:col-12 gap-3">
              {newBrabd.map((item) => (
                <Brand data={item} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex align-items-center justify-content-between pl-3 pr-3">
            <span>
              <b>ไอเท็มฮิตแจกพอยท์พิเศษ</b>
            </span>
            <p>
              ดูเพิ่มเติม <i className="pi pi-angle-right"></i>
            </p>
          </div>
          <Products data={data}/>
        </div>
        <div className="pl-3 pr-3">
          <span>
            <b>รวมแบรนด์เด็ด</b>
          </span>
          <div className="mt-4 section-all-brand">
            <AllBrand />
          </div>
        </div>
        <div>
          <div className="flex align-items-center justify-content-between pl-3 pr-3">
            <span>
              <b>ไอเท็มฮิตแจกพอยท์พิเศษ</b>
            </span>
            <p>
              ดูเพิ่มเติม <i className="pi pi-angle-right"></i>
            </p>
          </div>
          <Products data={data}/>
        </div>
        <BannerSlider />
      </div>
      <Footer />
    </>
  )
}

export default HomePage