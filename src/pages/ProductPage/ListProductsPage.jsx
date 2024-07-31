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
    product_name: 'Product 1',
    product_price: 300.00,
    inStock: true,
    onSale: true,
  },
  {
    id: '2',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'Product 2',
    product_price: 600.00,
    inStock: true,
    onSale: false,
  },
  {
    id: '3',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'Product 3',
    product_price: 1200.00,
    inStock: false,
    onSale: true,
  },
  {
    id: '4',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'Product 4',
    product_price: 2000.00,
    inStock: true,
    onSale: false,
  },
];

function ListProductsPage() {

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const [data, setData] = useState(testData);
  const [filteredData, setFilteredData] = useState(testData);

  const applyFilters = (filters) => {
    let filtered = data;

    if (filters.priceRate.key !== 'all') {
      filtered = filtered.filter(product => product.product_price >= filters.priceRate.min && product.product_price <= filters.priceRate.max);
    }

    if (filters.stock.key !== 'all') {
      filtered = filtered.filter(product => product.inStock === filters.stock.inStock);
    }

    if (filters.promotion.key !== 'all') {
      filtered = filtered.filter(product => product.onSale === filters.promotion.onSale);
    }

    setFilteredData(filtered);
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
        <div>
          <h1>Product List</h1>
        </div>
        <div className="panel w-full flex">
          <div className="filter-card">
            <Filter onFilterChange={applyFilters} />
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
