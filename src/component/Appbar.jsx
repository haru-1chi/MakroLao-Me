import React, { useState, useRef } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Badge } from 'primereact/badge';
import { Outlet, Link } from "react-router-dom";
//
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useCart } from '../router/CartContext';
//

function Appbar() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);

  const { cart, removeFromCart, updateQuantity } = useCart();
  const toast = useRef(null);
  const showToast = () => {
    toast.current.show({
      severity: 'info', summary: 'สินค้าถูกนำออกจากตะกร้า', life: 2000
    });
  };

  const calculateTotalBeforeDiscount = () => {
    return cart.reduce((total, product) => total + product.product_price * product.quantity, 0);
  };

  const calculateShippingCost = (total) => {
    return total * 0.03;
  };

  const totalBeforeDiscount = calculateTotalBeforeDiscount();
  const shippingCost = calculateShippingCost(totalBeforeDiscount);
  const totalPayable = totalBeforeDiscount + shippingCost;


  const customIcons = (
    <React.Fragment>
      <button className="p-sidebar-icon p-link mr-2">
        {/* <span className="pi pi-search" /> */}
      </button>
    </React.Fragment>
  );

  const customHeader = (
    <div className="flex align-items-center gap-2">
      <a href="/" className="font-bold">Logo</a>
    </div>
  );

  const customHeader2 = (
    <div className="flex align-items-center gap-2 ">
      <span className="font-bold">ตะกร้า</span>
    </div>
  );

  const customHeader3 = (
    <div className="flex align-items-center gap-2">
      <a href="/" className="font-bold">Logo</a>
    </div>
  );

  const customHeader4 = (
    <div className="flex align-items-center gap-2">
      <a href="/" className="font-bold">Logo</a>
    </div>
  );

  const { t } = useTranslation()
  const { zipcode, category, makroProPoint, makromail } = t("Appbar")

  return (
    <>
      <div className="section-appbar">
        <div className="pt-3 pr-3 pl-3">
          <div className="card flex justify-content-between mb-3 border-solid">
            <div className="flex gap-4">
              <div className="block">
                <Sidebar
                  header={customHeader}
                  visible={visible1}
                  onHide={() => setVisible1(false)}
                  icons={customIcons}
                >
                  <div>
                    <div className="flex justify-content-between pt-2 pb-4">
                      <a href="LoginPage">
                        <Button label="เข้าสู่ระบบ" />
                      </a>
                      <a href="RegisterPage">
                        <Button label="ลงทะเบียน" />
                      </a>
                    </div>
                    <div>
                      <Button className="w-full flex justify-content-between">
                        <span>ทั้งหมด</span>
                        <i className="pi pi-angle-right"></i>
                      </Button>
                    </div>
                    <hr />
                    <div className="flex flex-column p-2">
                      แม็คโครโปรพอยท์<span>เรียนรู้เพิ่มเติม</span>
                    </div>
                    <hr />
                    <div>ภาษา <LanguageSelector /></div>
                    <br />
                    <div className="">
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
                </Sidebar>
                <Button icon="pi pi-bars" onClick={() => setVisible1(true)} />

                <Sidebar
                  header={customHeader2}
                  visible={visible2}
                  position="right"
                  onHide={() => setVisible2(false)}
                  icons={customIcons}
                >
                  {cart.length > 0 && (
                    <div className="border-1 p-2 border-gray-300 border-round-xl">
                      <i className="pi pi-map-marker">จัดส่งที่</i>
                    </div>
                  )}
                  <Toast ref={toast} position="top-center" />
                  <div className={cart.length > 0 ? "cart-items w-full" : "cart flex gap-1"}>
                    {cart.length > 0 ? (
                      <>
                        {cart.map((product, index) => (
                          <div key={index} className="cart-items justify-content-between mb-2 border-bottom-1">
                            <div className="flex align-items-center">
                              <img
                                src={product.product_image}
                                alt={product.product_name}
                                className="w-4 m-2"
                              />
                              <div className="flex flex-column">
                                <span className="mb-3 font-bold">{product.product_name}</span>
                                <span >{product.product_price} ฿</span>
                              </div>
                            </div>
                            <div className="flex align-items-center justify-content-between">
                              <Button
                                icon="pi pi-trash"
                                onClick={() => {
                                  showToast();
                                  removeFromCart(product.product_id);
                                }
                                }
                                className="text-red-600"
                                text
                              />
                              <div className="flex align-items-center">
                                <Button
                                  size="small"
                                  label="-"
                                  className="text-gray-600"
                                  onClick={() => updateQuantity(product.product_id, product.quantity - 1)}
                                  rounded
                                  text
                                />
                                <p className="mx-2">{product.quantity}</p>
                                <Button
                                  size="small"
                                  label="+"
                                  className="text-gray-600"
                                  onClick={() => updateQuantity(product.product_id, product.quantity + 1)}
                                  rounded
                                  text
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <div>
                          <div className="flex align-items-center justify-content-between border-bottom-1">
                            <p className='m-0'>ยอดสั่งซื้อก่อนหักส่วนลด</p>
                            <p className='m-0'>{totalBeforeDiscount.toFixed(2)} ฿</p>
                          </div>
                          <div className="flex align-items-center justify-content-between border-bottom-1">
                            <p className='m-0'>จัดส่ง</p>
                            <p className='m-0'>{shippingCost.toFixed(2)} ฿</p>
                          </div>
                          <div className="flex align-items-center justify-content-between border-bottom-1">
                            <p className='m-0'>ยอดชำระ</p>
                            <p className='m-0'>{totalPayable.toFixed(2)} ฿</p>
                          </div>
                          <div className="flex justify-content-end">
                            <Link to="/CheckoutPage"><Button label="เช็คเอาท์" size="small" onClick={() => setVisible2(false)} rounded /></Link>
                          </div>
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
                        <a href="/"><Button label="หาจากหมวดหมู่สินค้า" rounded /></a>
                      </>
                    )}
                  </div>
                </Sidebar>

              </div>
              <div className="flex justify-content-between align-items-center">
                <h1 className="m-0">
                  <Link to="/">Logo</Link>
                </h1>
              </div>
            </div>
            <div className="flex gap-4">
              <Button icon="pi pi-heart" />
              {/* <i className="pi pi-shopping-cart p-overlay-badge" style={{ fontSize: '2rem' }}>
                <Badge value={cart.length} severity="danger"></Badge>
              </i> */}
              <Button
                icon={
                  <span style={{ position: 'relative', display: 'inline-block' }}>
                    <i className="pi pi-shopping-cart" style={{ fontSize: '1.3rem' }}></i>
                    <Badge value={cart.length} severity="danger" 
                           style={{ position: 'absolute', top: '-0.5rem', right: '-0.5rem' }} />
                  </span>
                }
                onClick={() => setVisible2(true)}
              />
              <Link to="/AccountPage"><Button icon="pi pi-user" /></Link>

            </div>
          </div>

          <div className="flex justify-content-between align-items-center border-solid">
            <div>
              <div className="bg-post flex align-items-center text-center gap-2">
                {/* <Button className="p-1" label="รหัสไปรษณีย์" icon="pi pi-truck"/> */}
                <i className="pi pi-truck"></i>
                <p>{zipcode}</p>
                <i className="pi pi-angle-down"></i>
              </div>
            </div>
            <div>
              <IconField iconPosition="left">
                <InputIcon className="pi pi-search wt"> </InputIcon>
                <InputText v-model="value1" placeholder="Search" />
              </IconField>
            </div>
          </div>
        </div >
        <div className="navmenu w-full border-solid mb-1">
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
                    <span><b>ย้อนกลับ</b></span>
                  </a>
                </div>



                <div className="box-menu mt-5">
                  <Link to="List-Product" className="flex justify-content-between" onClick={() => setVisible4(false)}><span><i className="pi pi-hashtag mr-2" />สินค้าทุกหมวดหมู่</span> <i className="pi pi-angle-right mr-2"></i></Link>
                </div>
                <div className="box-menu mt-5">
                  <a href="#" className="flex justify-content-between"><span><i className="pi pi-hashtag mr-2" />เนื้อสัตว์</span> <i className="pi pi-angle-right mr-2"></i></a>
                </div>
                <div className="box-menu mt-5">
                  <a href="#" className="flex justify-content-between"><span><i className="pi pi-hashtag mr-2" />อาหารทะเล</span> <i className="pi pi-angle-right mr-2"></i></a>
                </div>
                <div className="box-menu mt-5">
                  <a href="#" className="flex justify-content-between"><span><i className="pi pi-hashtag mr-2" />ผักและผลไม้</span> <i className="pi pi-angle-right mr-2"></i></a>
                </div>
                <div className="box-menu mt-5">
                  <a href="#" className="flex justify-content-between"><span><i className="pi pi-hashtag mr-2" />เครื่องดื่มและนม</span> <i className="pi pi-angle-right mr-2"></i></a>
                </div>
                <div className="box-menu mt-5">
                  <a href="#" className="flex justify-content-between"><span><i className="pi pi-hashtag mr-2" />อาหารและเครื่องปรุง</span> <i className="pi pi-angle-right mr-2"></i></a>
                </div>
              </div>
            </Sidebar>
            <Button
              label={category}
              icon="pi pi-chevron-down"
              iconPos="right"
              onClick={() => setVisible4(true)}
            />
          </div>
          <div>
            <Link to="/Pagepoint">{makroProPoint}</Link>
            {/* <a href="/Pagepoint">จัดเต็มความคุ้ม แม็คโครโปรพอยท์</a> */}
          </div>
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
            <Button label={makromail} onClick={() => setVisible3(true)} />
          </div>
        </div>
      </div >
      <Outlet />
    </>
  );
}

export default Appbar;
