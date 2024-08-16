import React, { useState, useRef, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Badge } from 'primereact/badge';
import { Menu } from 'primereact/menu';
import { Outlet, Link, useNavigate } from "react-router-dom";
//
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useCart } from '../router/CartContext';
import axios from "axios";
//

function Appbar() {
  const itemsMenu = [
    { label: 'บัญชีของฉัน' },
    {
      label: 'ประวัติการสั่งซื้อ',
      command: () => {
        setVisible1(false)
        navigate("/AccountPage");
      }
    },
    { label: 'จัดการข้อมูลส่วนบุคคล' },
    { label: 'ติดต่อเรา' },
    {
      label: 'ออกจากระบบ',
      command: () => {
        localStorage.removeItem('token');
        setVisible1(false)
        navigate("/LoginPage");
      }
    },
  ];

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

  const calculateCODCost = (total) => {
    return total * 0.03;
  };

  const totalBeforeDiscount = calculateTotalBeforeDiscount();
  const CODCost = calculateCODCost(totalBeforeDiscount);
  const totalPayable = totalBeforeDiscount + CODCost;

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");
        const res = await axios.get(`http://183.88.209.149:12233/makrolao/api/v1/users/${user_id}`, {
          headers: {
            "token": token,
          },
        });
        setUser(res.data.data);
      } catch (err) {
        console.error("Error fetching user data", err.response?.data || err.message);
      }
    };
    getUserProfile();
  }, []);

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
      <div className="hidden lg:block section-appbar">
        <Toast ref={toast} position="top-center" />
        <div className="pt-3 pr-3 pl-3">
          <div className="flex justify-content-end">
            <LanguageSelector />
          </div>
          <div className="card flex justify-content-between mb-2 border-solid align-items-center">
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
                      <Link to="/LoginPage">
                        <Button label="เข้าสู่ระบบ" outlined rounded />
                      </Link>
                      <Link to="/RegisterPage">
                        <Button label="ลงทะเบียน" rounded />
                      </Link>
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
                <Button icon="pi pi-bars" onClick={() => setVisible1(true)} rounded text />
                <Sidebar
                  header={customHeader2}
                  visible={visible2}
                  position="right"
                  onHide={() => setVisible2(false)}
                  icons={customIcons}
                >
                  <Toast ref={toast} position="top-center" />
                  <div className={cart.length > 0 ? "cart-items w-full border-top-1 surface-border" : "cart flex gap-1"}>
                    {cart.length > 0 ? (
                      <>
                        {cart.map((product, index) => (
                          <div key={index} className="cart-items justify-content-between mb-2 border-bottom-1 surface-border">
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
                            <div className="flex align-items-center justify-content-between mb-2">
                              <Button
                                icon="pi pi-trash"
                                onClick={() => {
                                  showToast();
                                  removeFromCart(product.product_id);
                                }
                                }
                                className="text-primary"
                                rounded
                                text
                              />
                              <div className="flex justify-content-between align-items-center border-primary border-1 border-round-3xl">
                                <Button
                                  size="small"
                                  icon="pi pi-minus"
                                  className="btn-plus-product text-primary"
                                  onClick={() => updateQuantity(product.product_id, product.quantity - 1)}
                                  rounded
                                  text
                                />
                                <p className="text-primary m-0 mx-3">{product.quantity}</p>
                                <Button
                                  size="small"
                                  icon="pi pi-plus"
                                  className="btn-plus-product text-primary"
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
                            <p className='m-0'>ยอดสั่งซื้อ</p>
                            <p className='m-0'>{totalBeforeDiscount.toFixed(2)} ฿</p>
                          </div>
                          <div className="flex align-items-center justify-content-between border-bottom-1">
                            <p className='m-0'>ค่า COD 3%</p>
                            <p className='m-0'>{CODCost.toFixed(2)} ฿</p>
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
                <h1 className="m-0 mr-4">
                  <Link to="/">Logo</Link>
                </h1>
                <div className="bg-post flex align-items-center text-center gap-2">
                  {/* <Button className="p-1" label="รหัสไปรษณีย์" icon="pi pi-truck"/> */}
                  <i className="pi pi-truck"></i>
                  <p>{zipcode}</p>
                  <i className="pi pi-angle-down"></i>
                </div>
              </div>

            </div>
            <div className="w-5 mx-4">
              <IconField iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText v-model="value1" placeholder="ค้นหาสินค้า" className="w-full border-round-3xl" />
              </IconField>
            </div>
            <div className="flex gap-4">
              <Button icon="pi pi-heart" rounded text />
              <Button
                icon={
                  <span style={{ position: 'relative', display: 'inline-block' }}>
                    <i className="pi pi-shopping-cart" style={{ fontSize: '1.3rem' }}></i>
                    <Badge value={cart.length} severity="danger"
                      style={{ position: 'absolute', top: '-0.5rem', right: '-0.5rem' }} />
                  </span>
                }
                rounded text
                onClick={() => setVisible2(true)}
              />{user ? (
                <Link to="/AccountPage"><Button icon="pi pi-user" rounded text label={user.name} /></Link>) : (
                <Link to="/AccountPage"><Button icon="pi pi-user" rounded text /></Link>)}
              {/* label={user.data} */}
            </div>
          </div>
          <div className="navmenu w-full border-solid pb-1">
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
      </div >

      {/* responsive */}
      <div className="block lg:hidden section-appbar">
        <Toast ref={toast} position="top-center" />
        <div className="pt-2 pr-3 pl-3">
          <div className="card flex justify-content-between mb-2 border-solid align-items-center">

            <div className="block flex gap-2">
              <Sidebar
                header={customHeader}
                visible={visible1}
                onHide={() => setVisible1(false)}
                icons={customIcons}
              >
                <div>
                  <div>
                    {user ? (
                      <>
                        <div className="flex pt-2 pb-4 align-items-center">
                          <div class="flex flex-wrap justify-content-center">
                            <div class="border-circle w-4rem h-4rem m-2 bg-primary font-bold flex align-items-center justify-content-center">{user.name.charAt(0).toUpperCase()}</div>
                          </div>
                          <h4 className="ml-3">{user.name}</h4>
                        </div>
                        <div>
                          <Button className="w-full flex justify-content-between" onClick={() => setVisible4(true)}>
                            <span>ทั้งหมด</span>
                            <i className="pi pi-angle-right"></i>
                          </Button>
                        </div>
                        <hr />
                        <div className="flex flex-column p-2">
                          <Menu model={itemsMenu} className="p-menu" />
                        </div>
                        <hr />
                        <div className="flex justify-content-between">
                          <p className="p-0 m-0">ภาษา</p>
                          <LanguageSelector />
                        </div>
                        <br />
                        <div className="mt-3">
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
                          <Button className="w-full flex justify-content-between" onClick={() => setVisible4(true)}>
                            <span>ทั้งหมด</span>
                            <i className="pi pi-angle-right"></i>
                          </Button>
                        </div>
                        <hr />
                        <div className="flex flex-column p-2">
                          แม็คโครโปรพอยท์<span>เรียนรู้เพิ่มเติม</span>
                        </div>
                        <hr />
                        <div className="flex justify-content-between">
                          <p className="p-0 m-0">ภาษา</p>
                          <LanguageSelector />
                        </div>
                        <br />
                        <div className="mt-3">
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
                icons={customIcons}
              >

                <div className={cart.length > 0 ? "cart-items w-full" : "cart flex gap-1"}>
                  {cart.length > 0 ? (
                    <>
                      {cart.map((product, index) => (
                        <div key={index} className="cart-items justify-content-between mb-2 border-bottom-1 surface-border">
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
                          <div className="flex align-items-center justify-content-between mb-2">
                            <Button
                              icon="pi pi-trash"
                              onClick={() => {
                                showToast();
                                removeFromCart(product.product_id);
                              }
                              }
                              className="text-primary"
                              rounded
                              text
                            />
                            <div className="flex justify-content-between align-items-center border-primary border-1 border-round-3xl">
                              <Button
                                size="small"
                                icon="pi pi-minus"
                                className="btn-plus-product text-primary"
                                onClick={() => updateQuantity(product.product_id, product.quantity - 1)}
                                rounded
                                text
                              />
                              <p className="text-primary m-0 mx-3">{product.quantity}</p>
                              <Button
                                size="small"
                                icon="pi pi-plus"
                                className="btn-plus-product text-primary"
                                onClick={() => updateQuantity(product.product_id, product.quantity + 1)}
                                rounded
                                text
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div>
                        <div className="flex align-items-center justify-content-between border-bottom-1 surface-border py-2">
                          <p className='m-0'>ยอดสั่งซื้อ</p>
                          <p className='m-0'>{totalBeforeDiscount.toFixed(2)} ฿</p>
                        </div>
                        <div className="flex align-items-center justify-content-between border-bottom-1 surface-border py-2">
                          <p className='m-0'>ค่า COD 3%</p>
                          <p className='m-0'>{CODCost.toFixed(2)} ฿</p>
                        </div>
                        <div className="flex align-items-center justify-content-between border-bottom-1 surface-border py-2">
                          <p className='m-0'>ยอดชำระ</p>
                          <p className='m-0'>{totalPayable.toFixed(2)} ฿</p>
                        </div>
                      </div>
                      <div className="filter-card-group bg-white flex justify-content-between align-items-center border-top-1 surface-border py-2 z-1 sticky">
                        <p className='m-0 text-primary font-bold'>{totalPayable.toFixed(2)} ฿</p>
                        <Link to="/CheckoutPage"><Button label="เช็คเอาท์" size="small" className="w-full" onClick={() => setVisible2(false)} rounded /></Link>
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
              <Button icon="pi pi-bars" onClick={() => setVisible1(true)} rounded text />
              <div className="flex justify-content-start">
                <h1 className="m-0 mr-4">
                  <Link to="/">Logo</Link>
                </h1>
              </div>
            </div>

            <div className="flex justify-content-between align-items-center">
              <div className="flex justify-content-end">
                <Button icon="pi pi-heart" rounded text />
                <Button
                  icon={
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                      <i className="pi pi-shopping-cart" style={{ fontSize: '1.3rem' }}></i>
                      <Badge value={cart.length} severity="danger"
                        style={{ position: 'absolute', top: '-0.5rem', right: '-0.5rem' }} />
                    </span>
                  }
                  rounded text
                  onClick={() => setVisible2(true)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-content-between align-items-center gap-2">
            <div className="bg-post flex align-items-center text-center gap-2">
              {/* <Button className="p-1" label="รหัสไปรษณีย์" icon="pi pi-truck"/> */}
              <i className="pi pi-truck"></i>
              <p className="white-space-nowrap overflow-hidden text-overflow-clip">{zipcode}</p>
              <i className="pi pi-angle-down"></i>
            </div>
            <div className="w-9">
              <IconField iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText v-model="value1" placeholder="ค้นหาสินค้า" className="w-full p-inputtext-sm border-round-3xl" />
              </IconField>
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
                className="p-2"
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
              <Button className="p-2" label={makromail} onClick={() => setVisible3(true)} />
            </div>
          </div>

        </div >
      </div >
      <Outlet />
    </>
  );
}

export default Appbar;
