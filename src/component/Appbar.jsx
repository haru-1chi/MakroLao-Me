import React, { useState, useRef, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { Badge } from "primereact/badge";
import { Menu } from "primereact/menu";
import { Outlet, Link, useNavigate } from "react-router-dom";
//
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useCart } from "../router/CartContext";
import axios from "axios";
import ContactUs from "./ContactUs";
import CategoriesIcon from "./CategoriesIcon";
import LogoMakro from "../assets/macro-laos1.png";
//
function Appbar() {
  const op = useRef(null);
  const [isContactUsVisible, setContactUsVisible] = useState(false);
  const itemsMenu = [
    {
      label: "บัญชีของฉัน",
      command: () => {
        setVisible1(false);
        op.current.hide();
        navigate("/AccountPage", { state: { activeTab: "account" } });
      },
    },
    {
      label: "ประวัติการสั่งซื้อ",
      command: () => {
        setVisible1(false);
        op.current.hide();
        navigate("/AccountPage", { state: { activeTab: "orderHistory" } });
      },
    },
    // {
    //   label: 'จัดการข้อมูลส่วนบุคคล',
    //   command: () => {
    //     setVisible1(false);

    //     navigate("/AccountPage", { state: { activeTab: 'privacySettings' } });
    //   }
    // },
    {
      label: "ติดต่อเรา",
      command: () => {
        setContactUsVisible(true);
      },
    },
    {
      label: "ออกจากระบบ",
      command: () => {
        handleLogout();
      },
    },
  ];

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);

  const { cart, removeFromCart, updateQuantity, resetCart } = useCart();
  const toast = useRef(null);
  const showToast = () => {
    toast.current.show({
      severity: "info",
      summary: "สินค้าถูกนำออกจากตะกร้า",
      life: 2000,
    });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      window.location.href = `/List-Product?search=${searchTerm}`;
    }
  };
  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      window.location.href = `/List-Product?search=${searchTerm}`;
    }
  };

  const calculateTotalBeforeDiscount = () => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce(
      (total, product) => total + product.product_price * product.quantity,
      0
    );
  };

  const calculateCODCost = (total) => {
    const codCost = total * 0.03;
    return Math.max(codCost, 30);
  };

  const totalBeforeDiscount = calculateTotalBeforeDiscount();
  const CODCost = calculateCODCost(totalBeforeDiscount);
  const totalPayable = totalBeforeDiscount + CODCost;

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");
        const res = await axios.get(`${apiUrl}/users/${user_id}`, {
          headers: { token: token },
        });
        setUser(res.data.data);
      } catch (err) {
        console.error(
          "Error fetching user data",
          err.response?.data || err.message
        );
      }
    };
    getUserProfile();
  }, [apiUrl]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(`${apiUrl}/categories`);
        const dataWithImages = response.data.map((category) => ({
          ...category,
          imgURL: CategoriesIcon[category.name] || "default-image-url.png",
        }));

        setCategories(dataWithImages);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = (categoryName) => {
    navigate("/List-Product", { state: { categoryName } });
  };
  const customIcons = (
    <React.Fragment>
      <button className="p-sidebar-icon p-link mr-2">
        {/* <span className="pi pi-search" /> */}
      </button>
    </React.Fragment>
  );

  const customHeader = (
    <div className="flex align-items-center gap-2">
      <a href="/">
        <img src={LogoMakro} alt="Logo" className="w-7 p-0 m-0" />
      </a>
    </div>
  );

  const customHeader2 = (
    <div className="flex align-items-center gap-2 ">
      <span className="font-bold">ตะกร้า</span>
    </div>
  );

  const customHeader3 = (
    <div className="flex align-items-center gap-2">
      <a href="/">
        <img src={LogoMakro} alt="Logo" className="w-7 p-0 m-0" />
      </a>
    </div>
  );

  const customHeader4 = (
    <div className="flex align-items-center gap-2">
      <a href="/">
        <img src={LogoMakro} alt="Logo" className="w-7 p-0 m-0" />
      </a>
    </div>
  );

  const { t } = useTranslation();
  const { zipcode, category, makroProPoint, makromail } = t("Appbar");

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/LoginPage");
  };

  return (
    <>
      <Toast ref={toast} position="top-center" />
      <div className="hidden lg:block section-appbar">
        <div className="pt-3 pr-3 pl-3">
          <div className="flex justify-content-end">
            <LanguageSelector />
          </div>
          <div className="card flex justify-content-between mb-2 border-solid align-items-center">
            <div className="flex justify-content-between align-items-center">
              <div className="block">
                <Button
                  icon="pi pi-bars"
                  onClick={() => setVisible1(true)}
                  rounded
                  text
                />
              </div>
              <Link to="/">
                <img src={LogoMakro} alt="Logo" height={40} />
              </Link>
            </div>
            <div className="w-5 mx-4">
              <IconField iconPosition="left">
                <InputIcon className="pi pi-search text-900"> </InputIcon>
                <InputText
                  className="w-full border-round-3xl py-2 surface-100 border-none"
                  type="text"
                  placeholder="ค้นหาสินค้า"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                />
              </IconField>
            </div>
            <div className="flex gap-4 align-items-center">
              {/* <Button icon="pi pi-heart" rounded text /> */}
              <Button
                icon={
                  <span
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <i
                      className="pi pi-shopping-cart"
                      style={{ fontSize: "1.4rem" }}
                    ></i>
                    <Badge
                      value={cart.length}
                      severity="danger"
                      style={{
                        position: "absolute",
                        top: "-0.4rem",
                        right: "-0.4rem",
                        fontSize: "0.7rem",
                      }}
                    />
                  </span>
                }
                text
                onClick={() => setVisible2(true)}
              />
              {user ? (
                <>
                  <div>
                    <Button
                      className="py-2 px-3 surface-border"
                      icon="pi pi-user"
                      rounded
                      outlined
                      label={
                        <div className="flex align-items-center gap-2 white-space-nowrap text-overflow-ellipsis">
                          {user.name}
                          <i className="pi pi-angle-down"></i>
                        </div>
                      }
                      onClick={(e) => op.current.toggle(e)}
                    />
                  </div>
                  <OverlayPanel ref={op} closeOnEscape>
                    <div className="w-16rem">
                      <div className="flex p-0 pb-2 border-bottom-1 surface-border align-items-center">
                        <div class="flex flex-wrap justify-content-center">
                          <div class="border-circle w-4rem h-4rem m-2 bg-primary font-bold flex align-items-center justify-content-center">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <h4 className="ml-3">{user.name}</h4>
                      </div>
                      <div className="flex flex-column">
                        <Menu model={itemsMenu} className="p-menu" />
                        <ContactUs
                          visible={isContactUsVisible}
                          setVisible={setContactUsVisible}
                        />
                      </div>
                    </div>
                  </OverlayPanel>
                </>
              ) : (
                <Link to="/LoginPage">
                  <Button icon="pi pi-user" rounded text />
                </Link>
              )}
            </div>
          </div>
          <div className="navmenu w-full border-solid pb-1 text-l">
            <div>
              <Button
                className="text-l"
                label={category}
                icon="pi pi-chevron-down"
                iconPos="right"
                onClick={() => setVisible4(true)}
              />
            </div>
            <div className="flex align-items-center">
              <img
                src="https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMakro_PRO_Points_GIF_fe64aa9600.gif&w=32&q=75"
                width={20}
                height={20}
              />
              <Link to="/Pagepoint" className="ml-2">
                {makroProPoint}
              </Link>
            </div>
            <div className="flex align-items-center">
              <Button
                className="text-l ml-2 hidden"
                label={
                  <span>
                    <img
                      src="https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2Fmakromail_9348ebf95a.png&w=16&q=75"
                      width={20}
                      height={20}
                      alt="Makromail"
                      style={{ marginRight: "8px", verticalAlign: "middle" }}
                    />
                    makromail
                  </span>
                }
                onClick={() => setVisible3(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* responsive */}
      <div className="block lg:hidden section-appbar">
        {/* <Toast ref={toast} position="top-center" /> */}
        <div className="pt-2 pr-3 pl-3">
          <div className="card flex justify-content-between mb-2 border-solid align-items-center">
            <div className="block flex">
              <Sidebar
                header={customHeader}
                visible={visible1}
                onHide={() => setVisible1(false)}
              >
                <div>
                  <div>
                    {user ? (
                      <>
                        <div className="flex pt-0 pb-2 align-items-center">
                          <div class="flex flex-wrap justify-content-center">
                            <div class="border-circle w-4rem h-4rem m-2 bg-primary font-bold flex align-items-center justify-content-center">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <h4 className="ml-3">{user.name}</h4>
                        </div>
                        <div>
                          <Button
                            className="w-full flex justify-content-between"
                            onClick={() => setVisible4(true)}
                            text
                          >
                            <span>ทั้งหมด</span>
                            <i className="pi pi-angle-right"></i>
                          </Button>
                        </div>
                        <hr />
                        <div className="flex flex-column">
                          <Menu model={itemsMenu} className="p-menu" />
                          <ContactUs
                            visible={isContactUsVisible}
                            setVisible={setContactUsVisible}
                          />
                        </div>
                        <hr />
                        <div className="flex justify-content-between">
                          <p className="p-0 m-0">ภาษา</p>
                          <LanguageSelector />
                        </div>
                        <br />
                        <div className="mt-3 hidden">
                          <div>
                            <i className="pi pi-mobile mr-2"></i>
                            <span>ติดตั้งแอปพลิเคชั่น</span>
                          </div>
                          <br />
                          <div>
                            <i className="pi pi-mobile mr-2"></i>
                            <span>เพิ่มเพื่อนทางไลน์ @abcdef</span>
                          </div>
                          <hr />
                          <div>
                            <i className="pi pi-phone mr-2"></i>
                            <span>โทรคุยกับเรา 1234 กด 5</span>
                          </div>
                          <hr />
                        </div>
                      </>
                    ) : (
                      <div>
                        <div className="flex justify-content-between pt-2 pb-4">
                          <Link to="/LoginPage">
                            <Button label="เข้าสู่ระบบ" outlined rounded />
                          </Link>
                          <Link to="/RegisterPage">
                            <Button label="ลงทะเบียน" rounded />
                          </Link>
                        </div>
                        <div>
                          <Button
                            className="w-full flex justify-content-between"
                            onClick={() => setVisible4(true)}
                          >
                            <span>ทั้งหมด</span>
                            <i className="pi pi-angle-right"></i>
                          </Button>
                        </div>
                        {/* <hr /> */}
                        <div className="hidden">
                          <div className="flex align-items-start p-2">
                            <img
                              src="https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMakro_PRO_Points_GIF_fe64aa9600.gif&w=32&q=75"
                              width={20}
                              height={20}
                            />
                            <div className="flex flex-column ml-2">
                              <span className="font-semibold">
                                แม็คโครลาว
                              </span>
                              <span>เรียนรู้เพิ่มเติม</span>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="flex justify-content-between">
                          <p className="p-0 m-0">ภาษา</p>
                          <LanguageSelector />
                        </div>
                        <br />
                        <div className="mt-3 hidden">
                          <div>
                            <i className="pi pi-mobile mr-2"></i>
                            <span>ติดตั้งแอปพลิเคชั่น</span>
                          </div>
                          <br />
                          <div>
                            <i className="pi pi-mobile mr-2"></i>
                            <span>เพิ่มเพื่อนทางไลน์ @abcdef</span>
                          </div>
                          <hr />
                          <div>
                            <i className="pi pi-phone mr-2"></i>
                            <span>โทรคุยกับเรา 1234 กด 5</span>
                          </div>
                          <hr />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Sidebar>

              <Sidebar
                header={customHeader2}
                visible={visible2}
                position="right"
                onHide={() => setVisible2(false)}
              >
                <div
                  className={
                    cart.length > 0 ? "cart-items w-full" : "cart flex gap-1"
                  }
                >
                  {Array.isArray(cart) && cart.length > 0 ? (
                    <>
                      {cart.map((product, index) => (
                        <div
                          key={product.product_id || index}
                          className="cart-items justify-content-between mb-2 border-bottom-1 surface-border"
                        >
                          <div className="flex align-items-center">
                            <img
                              src={product.product_image}
                              alt={product.product_name}
                              width={70}
                              height={70}
                            />
                            <div className="ml-3 flex flex-column">
                              <span className="mb-3 font-bold">
                                {product.product_name}
                              </span>
                              <span>
                                {Number(product.product_price).toLocaleString(
                                  "en-US"
                                )}{" "}
                                ฿
                              </span>
                            </div>
                          </div>
                          <div className="flex align-items-center justify-content-between mb-2">
                            <Button
                              icon="pi pi-trash"
                              onClick={() => {
                                showToast();
                                removeFromCart(product.product_id);
                              }}
                              className="text-primary"
                              rounded
                              text
                            />
                            <div className="flex justify-content-between align-items-center border-primary border-1 border-round-3xl">
                              <Button
                                size="small"
                                icon="pi pi-minus"
                                className="btn-plus-product text-primary"
                                onClick={() =>
                                  updateQuantity(
                                    product.product_id,
                                    product.quantity - 1
                                  )
                                }
                                rounded
                                text
                              />
                              <p className="text-primary m-0 mx-3">
                                {product.quantity}
                              </p>
                              <Button
                                size="small"
                                icon="pi pi-plus"
                                className="btn-plus-product text-primary"
                                onClick={() =>
                                  updateQuantity(
                                    product.product_id,
                                    product.quantity + 1
                                  )
                                }
                                rounded
                                text
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div>
                        <div className="flex align-items-center justify-content-between border-bottom-1 surface-border py-2">
                          <p className="m-0">ยอดสั่งซื้อ</p>
                          <p className="m-0">
                            {totalBeforeDiscount.toFixed(2)} ฿
                          </p>
                        </div>
                        <div className="flex align-items-center justify-content-between border-bottom-1 surface-border py-2">
                          <p className="m-0">ค่า COD 3%</p>
                          <p className="m-0">{CODCost.toFixed(2)} ฿</p>
                        </div>
                        <div className="flex align-items-center justify-content-between border-bottom-1 surface-border py-2">
                          <p className="m-0">ยอดชำระ</p>
                          <p className="m-0">{totalPayable.toFixed(2)} ฿</p>
                        </div>
                      </div>
                      <div className="filter-card-group bg-white flex justify-content-between align-items-center border-top-1 surface-border py-2 z-1 sticky">
                        <p className="m-0 text-primary font-bold">
                          {totalPayable.toFixed(2)} ฿
                        </p>
                        <Link to="/CheckoutPage">
                          <Button
                            label="เช็คเอาท์"
                            size="small"
                            className="w-full"
                            onClick={() => setVisible2(false)}
                            rounded
                          />
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src="https://www.makro.pro/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fempty-basket.76c5ec1f.png&w=1200&q=75"
                        alt=""
                      />
                      <h2 className="m-1">ไม่มีสินค้าในตะกร้า</h2>
                      <span className="mb-3">เริ่มเลือกสินค้าเลย!</span>
                      <a href="/">
                        <Button label="หาจากหมวดหมู่สินค้า" rounded />
                      </a>
                    </>
                  )}
                </div>
              </Sidebar>
              <Button
                icon="pi pi-bars"
                onClick={() => setVisible1(true)}
                rounded
                text
              />
              <div className="flex justify-content-start">
                <Link to="/">
                  <img src={LogoMakro} alt="Logo" height={40} />
                </Link>
              </div>
            </div>

            <div className="flex justify-content-between align-items-center">
              <div className="flex justify-content-end">
                {/* <Button icon="pi pi-heart" rounded text /> */}
                <Button
                  icon={
                    <span
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <i
                        className="pi pi-shopping-cart"
                        style={{ fontSize: "1.3rem" }}
                      ></i>
                      <Badge
                        value={cart.length}
                        severity="danger"
                        style={{
                          position: "absolute",
                          top: "-0.5rem",
                          right: "-0.5rem",
                        }}
                      />
                    </span>
                  }
                  text
                  onClick={() => setVisible2(true)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-content-between align-items-center gap-2">
            <div className="w-full flex justify-content-between align-items-center">
              <IconField className="w-10" iconPosition="left">
                <InputIcon className="pi pi-search text-900"></InputIcon>
                <InputText
                  className="w-full border-round-3xl py-2 surface-100 border-none"
                  type="text"
                  placeholder="ค้นหาสินค้า"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </IconField>
              <Button
                className="p-0 m-0"
                icon="pi pi-search"
                onClick={handleSearchClick}
                rounded
              />
            </div>
          </div>

          <div className="navmenu w-full overflow-scroll border-solid py-1">
            <div>
              <Sidebar
                header={customHeader4}
                visible={visible4}
                onHide={() => setVisible4(false)}
                icons={customIcons}
              >
                <div>
                  <div className="box-menu mt-5">
                    <a href="#" onClick={() => setVisible4(false)}>
                      <i className="pi pi-angle-left mr-2"></i>
                      <span>
                        <b>ย้อนกลับ</b>
                      </span>
                    </a>
                  </div>
                  <div className="box-menu mt-2 py-3 hover:surface-hover">
                    <Link
                      to="List-Product"
                      className="flex justify-content-between"
                      onClick={() => setVisible4(false)}
                    >
                      <div className="flex align-items-center">
                        <img
                          src="https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FL1_Makro_House_Brand_4a70c6e25a.png&w=32&q=75"
                          alt="สินค้าทุกหมวดหมู่"
                          width={30}
                          height={30}
                        />
                        <span className="ml-3">สินค้าทุกหมวดหมู่</span>
                      </div>
                      <i className="pi pi-angle-right mr-2"></i>
                    </Link>
                  </div>
                  {categories.map((Item) => (
                    <div
                      className="box-menu py-3 hover:surface-hover"
                      onClick={() => handleCategorySelect([Item.name])}
                    >
                      <Link
                        className="flex justify-content-between align-items-center"
                        onClick={() => setVisible4(false)}
                      >
                        <div className="flex align-items-center">
                          <img
                            src={Item.imgURL}
                            alt="Item.name"
                            width={30}
                            height={30}
                          />
                          <span className="ml-3">{Item.name}</span>
                        </div>
                        <i className="pi pi-angle-right mr-2"></i>
                      </Link>
                    </div>
                  ))}
                </div>
              </Sidebar>
              <Button
                className="p-2 hidden"
                label={category}
                icon="pi pi-chevron-down"
                iconPos="right"
                onClick={() => setVisible4(true)}
              />
            </div>
            {/* <div className="flex align-items-center">
              <img src="https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2FMakro_PRO_Points_GIF_fe64aa9600.gif&w=32&q=75" width={20} height={20} />
              <Link to="/Pagepoint" className="ml-2">{makroProPoint}</Link>
            </div> */}
            <div>
              <Sidebar
                header={customHeader3}
                visible={visible3}
                onHide={() => setVisible3(false)}
                icons={customIcons}
              >
                <div>
                  <div className="box-menu mt-5">
                    <a href="#" onClick={() => setVisible3(false)}>
                      <i className="pi pi-angle-left mr-2"></i>
                      <span>ย้อนกลับ</span>
                    </a>
                  </div>
                  <div className="box-menu mt-5">
                    <a href="#">ลดแรง จัดหนัก</a>
                  </div>
                  <div className="box-menu mt-5">
                    <a href="#">โฮเรก้า</a>
                  </div>
                  <div className="box-menu mt-5">
                    <a href="#">มิตรแท้โชห่วย</a>
                  </div>
                </div>
              </Sidebar>
              <Button className="text-l ml-2 hidden" label={
                <span>
                  <img
                    src="https://www.makro.pro/_next/image?url=https%3A%2F%2Fstrapi-cdn.mango-prod.siammakro.cloud%2Fuploads%2Fmakromail_9348ebf95a.png&w=16&q=75"
                    width={20}
                    height={20}
                    alt="Makromail"
                    style={{ marginRight: '8px', verticalAlign: 'middle' }}
                  />
                  makromail
                </span>}
                onClick={() => setVisible3(true)} />
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Appbar;
