import React, { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';
import { Calendar } from 'primereact/calendar';
import { Button } from "primereact/button";
import axios from 'axios';

function SlipPayment({ orderId, slipPaymentUrl }) {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [amount, setAmount] = useState(null);
    const [file, setFile] = useState(null);

    const invoiceUploadHandler = ({ files }) => {
        const [selectedFile] = files;
        console.log(selectedFile);

        setFile(selectedFile);
    };

    const handleSubmit = async () => {
        if (!file || !amount || !date || !time) {
            console.log("All fields are required");
            return;
        }

        let formData = new FormData();
        formData.append('slipImage', file);
        formData.append('amount', amount);
        formData.append('date', date);
        formData.append('time', time);
        formData.append('orderId', orderId);

        try {
            const response = await axios.post('http://localhost:12233/makrolao/api/v1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Upload successful:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const renderSuccessfullyPage = (
        <>
            <div className='bg-section-product flex flex-column border-1 surface-border border-round py-3 px-3 bg-white border-round-mb justify-content-center'>
                <h2 className='p-0 m-0 mb-2 text-center'>แจ้งการชำระเงินเรียบร้อยแล้ว</h2>
                <img src={slipPaymentUrl} alt="" />
            </div>
        </>
    )

    const renderWaitingSlip = (
        <>
            <div className='bg-section-product flex flex-column border-1 surface-border border-round py-3 px-3 bg-white border-round-mb justify-content-center'>
                <h2 className='p-0 m-0 mb-2 text-center'>แจ้งการชำระเงิน</h2>
                <div className="flex flex-column gap-3 justify-content-center align-self-center">
                    <div className="flex flex-column">
                        <label htmlFor="currency-la">ระบุจำนวนเงิน(กีบ)</label>
                        <InputNumber inputId="currency-la" value={amount} onValueChange={(e) => setAmount(e.value)} mode="currency" currency="LAK" locale="lo-LA" />
                    </div>
                    <div className="flex flex-column">
                        <label htmlFor="username">วันที่โอนเงิน</label>
                        <Calendar id="date" value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" />
                    </div>
                    <div className="flex flex-column">
                        <label htmlFor="username">เวลาที่โอนเงิน</label>
                        <Calendar id="time" value={time} onChange={(e) => setTime(e.value)} timeOnly />
                    </div>

                    <FileUpload
                        name="slipImage"
                        accept="image/*"
                        maxFileSize={1000000}
                        customUpload
                        auto
                        mode="advanced"
                        chooseLabel="แนบสลิปโอนเงิน"
                        onSelect={(e) => invoiceUploadHandler(e)}
                        onUpload={handleSubmit}
                        emptyTemplate={<p className="m-0">ลากไฟล์รูปภาพวางที่นี่ เพื่ออัปโหลด</p>}
                    />

                    <Button className="w-fit align-self-center" label="ยืนยันชำระเงิน" rounded onClick={handleSubmit} />
                </div>
            </div>
        </>
    )

    return (
        <>
            {slipPaymentUrl ?
                renderSuccessfullyPage
                :
                renderWaitingSlip
            }
        </>

    )

}

export default SlipPayment