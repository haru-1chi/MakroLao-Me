import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Outlet, Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import LogoMakro from "../assets/macro-laos1.png"

function Navbar() {
  const [visible, setVisible] = useState(false);

  const customHeader = (
    <div className="flex align-items-center gap-2">
      <a href="/" className="font-bold">
        <img
          src={LogoMakro}
          alt="Logo"
          height={35}
        />
      </a>
    </div>
  );

  return (
    <>
      <div className="section-appbar card flex justify-content-start p-4 w-full bg-white ">
        <Sidebar
          header={customHeader}
          visible={visible}
          onHide={() => setVisible(false)}
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
        </Sidebar>
        <Button icon="pi pi-bars" onClick={() => setVisible(true)} rounded text />
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
