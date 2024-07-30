import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import Navbar from "../../component/Navbar";

function LoginPage() {
  const [value, setValue] = useState("");
  return (
    <>
      <div className="p-4">
        <h1>เข้าสู่ระบบ</h1>
        <p>กดเบอร์โทรศัพท์หรืออีเมลเพื่อเข้าสู่ระบบ</p>
        <div className="card flex flex-column justify-content-center">
          <FloatLabel className="w-full">
            <label htmlFor="username">
              เบอร์มือถือหรืออีเมล์
            </label>
            <InputText
              id="username"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full"
            />
          </FloatLabel>
          <Button className="my-5" label="เข้าสู่ระบบด้วยรหัสผ่าน" />
          <span className="text-center">OR</span>
          <Button className="my-5" label="เข้าสู่ระบบด้วย OTP" />
          <p className="text-center">ไม่มีบัญชีผู้ใช้ <span>สร้างบัญชี</span></p>
          <p className="text-center">ต้องการความช่วยเหลือใช่ไหม? <a href="#">แตะที่นี้</a></p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
