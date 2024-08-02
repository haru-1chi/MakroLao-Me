import { Button } from "primereact/button";
import { Outlet, Link } from "react-router-dom";
import Filter from "../../component/Filter";
import Footer from "../../component/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paginator } from 'primereact/paginator';

const testData = [
  {
    id: '1',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'B ขนม 1',
    product_price: 300.00,
    subCategory: 'ขนม',
    product_brand: 'B',
    inStock: false,
    onSale: true,
  },
  {
    id: '2',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'B เครื่องใช้ไฟฟ้า 2',
    product_price: 600.00,
    subCategory: "เครื่องใช้ไฟฟ้า",
    product_brand: "B",
    inStock: true,
    onSale: false,
  },
  {
    id: '3',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'A เครื่องครัว 3',
    product_price: 1200.00,
    subCategory: "เครื่องครัว",
    product_brand: "A",
    inStock: false,
    onSale: true,
  },
  {
    id: '4',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'A เครื่องใช้ไฟฟ้า 4',
    product_price: 1700.00,
    subCategory: "เครื่องใช้ไฟฟ้า",
    product_brand: "A",
    inStock: false,
    onSale: false,
  },
  {
    id: '5',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'C เครื่องใช้ไฟฟ้า 5',
    product_price: 1500.00,
    subCategory: "เครื่องใช้ไฟฟ้า",
    product_brand: "C",
    inStock: true,
    onSale: false,
  },
  {
    id: '6',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'D เครื่องครัว 6',
    product_price: 2500.00,
    subCategory: "เครื่องครัว",
    product_brand: "D",
    inStock: true,
    onSale: false,
  },
  {
    id: '7',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'D บะหมี่ 6',
    product_price: 2500.00,
    subCategory: "อาหารกึ่งสำเร็จรูป",
    product_brand: "T",
    inStock: true,
    onSale: false,
  },
];

function ListProductsPage() {

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [visible, setVisible] = useState(false);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const [data, setData] = useState(testData);
  const [filteredData, setFilteredData] = useState(testData);

  const applyFilters = (filters) => {
    let filtered = data;

    if (filters.priceRanges.key !== 'allRange') {
      filtered = filtered.filter(product => product.product_price >= filters.priceRanges.min && product.product_price <= filters.priceRanges.max);
    }

    if (filters.stocks.key !== 'allStock') {
      filtered = filtered.filter(product => product.inStock === filters.stocks.inStock);
    }

    if (filters.selectedSubCategories.length > 0) {
      filtered = filtered.filter(product => filters.selectedSubCategories.includes(product.subCategory));
    }

    if (filters.selectedBrands.length > 0) {
      filtered = filtered.filter(product => filters.selectedBrands.includes(product.product_brand));
    }

    if (filters.promotions.key !== 'allPromotion') {
      filtered = filtered.filter(product => product.onSale === filters.promotions.onSale);
    }

    setFilteredData(filtered);

  };

  const handleFilterChange = (filters) => {
    applyFilters(filters);
  };

  // useEffect(() => {
  //   axios({
  //     method: "post",
  //     url: "https://api.tossaguns.online/tossagun-shop/product/api_product",
  //     headers: {
  //       "auth-token":
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3ciOiJQYXJ0bmVyIiwiaWF0IjoxNzIxODgzMDI0fQ.MbtGRD3wn1ejaYfdtUvxuke4FLSSB-5_uybIuWozvPg",
  //     },
  //   })
  //     .then(function (response) {
  //       setData(response.data.slice(0, 20));
  //       // setData(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <>
      {/* <div className="p-3">
        <div>
          <h1>Product List</h1>
        </div>
        <div className="product-list">
          {data.map((product) => (
            <Link to="Product">
              <div className="border-1 surface-border border-round py-5 px-3 bg-white border-round-mb">
                <div className="mb-3">
                  <img
                    src={product.imgURL}
                    alt={product.name}
                    className="w-12"
                  />
                </div>
                <div>
                  <h4 className="mb-1">{product.name}</h4>
                  <hr />
                  <div className="flex align-items-center justify-content-between p-2 mt-2 bg-product">
                    <div className="font-bold">{product.price} ฿</div>
                    <Button
                      className="btn-plus-product"
                      icon="pi pi-plus"
                      rounded
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer /> */}

      <div className="p-3">
        <div className="flex justify-content-between">
          <h1>Product List</h1>
          <Button
            className="lg:hidden"
            onClick={() => setVisible(true)}
            aria-label="Clear Filters"
            label="กรอง" icon="pi pi-sliders-h"
            text
          />
        </div>
        <div className="panel w-full flex">
          <div className="hidden lg:block">
            <Filter
              onFilterChange={handleFilterChange}
              products={data}
              visible={visible}
              setVisible={setVisible}
            />
          </div>
          {filteredData ? (
            <div className="product-list">
              {filteredData.map((product, index) => (
                <div key={index} className="flex">
                  <div className="border-1 surface-border border-round py-5 px-3 bg-white border-round-mb flex flex-column justify-content-between">
                    <div className="mb-3">
                      <img
                        src={product.product_image}
                        alt={product.product_name}
                        className="w-12"
                      />
                    </div>
                    <h4 className="mb-1">{product.product_name}</h4>
                    <hr />
                    <div className="flex align-items-center justify-content-between p-2 mt-2 bg-product">
                      <div className="font-bold">{product.product_price} ฿</div>
                      <Button
                        className="btn-plus-product"
                        icon="pi pi-plus"
                        rounded
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="card">
        <Paginator first={first} rows={rows} totalRecords={100} onPageChange={onPageChange} />
      </div>
      <Footer />
    </>
  );
}

export default ListProductsPage;