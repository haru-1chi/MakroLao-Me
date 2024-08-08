import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Outlet, Link } from "react-router-dom";
function Navbar() {
  const [visible, setVisible] = useState(false);

  const customHeader = (
    <div className="flex align-items-center gap-2">
      <a href="/" className="font-bold">
        Logo
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
        <div className="flex justify-content-between pt-2 pb-4">
          <Link to="/LoginPage">
            <Button label="เข้าสู่ระบบ" />
          </Link>
          <Link to="/RegisterPage">
            <Button label="ลงทะเบียน" />
          </Link>
          {/* <a href="RegisterPage"><Button label="ลงทะเบียน" /></a> */}
        </div>
      </Sidebar>
      <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
    </div>
     <Outlet />
   </>
  );
}

export default Navbar;
