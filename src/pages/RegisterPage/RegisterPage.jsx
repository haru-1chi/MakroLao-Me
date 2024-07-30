import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Password } from 'primereact/password';
import Navbar from "../../component/Navbar";

function RegisterPage() {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [value4, setValue4] = useState("");
  return (
    <>
    <div className="px-4">
      <h1>สมัครสมาชิก</h1>
      <p>สร้างบัญชีง่ายๆ ใน 1 นาที แล้วเลือกซื้อสินค้าที่คุณต้องการได้เลย</p>
      <div className="card flex flex-column justify-content-center">

        <FloatLabel className="w-full mb-3">
          <label htmlFor="username">
            เบอร์มือถือ
          </label>
          <InputText
            id="username"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            className="w-full"
          />
        </FloatLabel>

        <FloatLabel className="w-full mb-3">
          <label htmlFor="username">
            อีเมล ไม่บังคับ
          </label>
          <InputText
            id="username"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            className="w-full"
          />
        </FloatLabel>

        <FloatLabel className="w-full mb-3">
          <label htmlFor="username">
            รหัสผ่าน
          </label>
          <InputText
            id="username"
            value={value3}
            onChange={(e) => setValue3(e.target.value)}
            className="w-full"
            type="Password"
          />
        </FloatLabel>

        <FloatLabel className="w-full mb-3">
          <label htmlFor="username">
            ยืนยันรหัสผ่าน
          </label>
          <InputText
            id="username"
            value={value4}
            onChange={(e) => setValue4(e.target.value)}
            className="w-full"
            type="Password"
          />
        </FloatLabel>

        


        <Button className="my-5" label="ลงทะเบียน" />
        <span className="text-center">OR</span>
        <Button className="my-5" label="สร้างบัญชีธุรกิจ" />
        <a href="#" className="text-center">บัญชีธุรกิจคืออะไร</a>
        <p className="text-center">มีบัญชีของอยู่แล้วใช่ไหม <a href="#">เข้าสู่ระบบที่นี่</a></p>
      </div>
    </div>
  </>
  )
}

export default RegisterPage