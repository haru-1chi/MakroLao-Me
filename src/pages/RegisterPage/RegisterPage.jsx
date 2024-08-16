import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Password } from 'primereact/password';
import Navbar from "../../component/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const apiUrl = import.meta.env_VITE_REACT_APP_API_URL;
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/users`, {
        phone,
        email,
        username,
        name,
        password,
        comfirmPassword
      });

      if (response.data.status) {
        console.log("Register successful", response.data);
        // localStorage.setItem("token", response.data.token);
        // localStorage.setItem("user_id", response.data.data._id);

        navigate("/LoginPage");
      } else {
        setErrorMessage(response.data.message || "Register failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='w-full flex flex-column gap-2 justify-content-center'>
        <div className='bg-section-product w-fit flex flex-column border-1 surface-border border-round mt-5 py-3 px-3 bg-white border-round-mb justify-content-center align-self-center'>
          <h2 className="p-0 m-0">สมัครสมาชิก</h2>
          <p className="p-0 my-1">สร้างบัญชีง่ายๆ ใน 1 นาที แล้วเลือกซื้อสินค้าที่คุณต้องการได้เลย</p>
          <div className="card my-4 flex flex-column justify-content-center">

            <FloatLabel className="w-full mb-3">
              <label htmlFor="phone">
                เบอร์มือถือ
              </label>
              <InputText
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full"
              />
            </FloatLabel>

            <FloatLabel className="w-full mb-3">
              <label htmlFor="email">
                อีเมล ไม่บังคับ
              </label>
              <InputText
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </FloatLabel>

            <FloatLabel className="w-full mb-3">
              <label htmlFor="username">
                Username
              </label>
              <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </FloatLabel>

            <FloatLabel className="w-full mb-3">
              <label htmlFor="name">
                ชื่อ
              </label>
              <InputText
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            </FloatLabel>

            <FloatLabel className="w-full mb-3">
              <label htmlFor="password">
                รหัสผ่าน
              </label>
              <InputText
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                type="Password"
              />
            </FloatLabel>

            <FloatLabel className="w-full mb-3">
              <label htmlFor="comfirmPassword">
                ยืนยันรหัสผ่าน
              </label>
              <InputText
                id="comfirmPassword"
                value={comfirmPassword}
                onChange={(e) => setComfirmPassword(e.target.value)}
                className="w-full"
                type="Password"
              />
            </FloatLabel>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <Button
              className="my-3"
              label={loading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
              onClick={handleRegister}
              disabled={loading}
              rounded
            />
            <span className="text-center">หรือ</span>
            <Button className="mt-3 mb-5" label="สร้างบัญชีธุรกิจ" outlined rounded/>
            <a href="#" className="text-center">บัญชีธุรกิจคืออะไร</a>
            <p className="text-center">มีบัญชีของอยู่แล้วใช่ไหม <a href="#">เข้าสู่ระบบที่นี่</a></p>
          </div>
        </div>
      </div>

    </>
  )
}

export default RegisterPage