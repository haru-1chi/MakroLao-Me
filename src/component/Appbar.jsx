import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Outlet, Link } from "react-router-dom";
//
import { useTranslation } from "react-i18next";
//

function Appbar() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
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
                    <div>ภาษา</div>
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
                  <div className="cart gap-1 wt">
                    <img
                      src="https://www.makro.pro/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fempty-basket.76c5ec1f.png&w=1200&q=75"
                      alt=""
                    />
                    <h2>ไม่มีสินค้าในตะกร้า</h2>
                    <span>เริ่มเลือกสินค้าเลย!</span>
                    <a href="/"><Button label="หาจากหมวดหมู่สินค้า" /></a>
                    
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
              <Button
                icon="pi pi-shopping-cart"
                onClick={() => setVisible2(true)}
              />
            </div>
          </div>

          <div className="flex justify-content-between align-items-center border-solid">
            <div>
              <div className="flex align-items-center text-center gap-2 bg-post">
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
        </div>
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
      </div>
      <Outlet />
    </>
  );
}

export default Appbar;
