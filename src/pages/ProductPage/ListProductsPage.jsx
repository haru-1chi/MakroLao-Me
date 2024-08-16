import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from '../../router/CartContext';
import Filter from "../../component/Filter";
import Footer from "../../component/Footer";
import { Paginator } from 'primereact/paginator';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';

function ListProductsPage() {
  const { addToCart } = useCart();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(20);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const showSuccessToast = () => {
    toast.current.show({
      severity: 'success', summary: 'เพิ่มในตะกร้าแล้ว', life: 2000
    });
  };

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
    setPaginatedData(filtered.slice(first, first + rows));

  };

  const handleFilterChange = (filters) => {
    applyFilters(filters);
  };

  const fetchData = () => {
    axios({
      method: "post",
      url: "http://183.88.209.149:9999/tossagun-shop/api/api_product",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3ciOiJQYXJ0bmVyIiwiaWF0IjoxNzIxODgzMDI0fQ.MbtGRD3wn1ejaYfdtUvxuke4FLSSB-5_uybIuWozvPg",
      },
    })
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
        setPaginatedData(response.data.slice(first, first + rows));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setPaginatedData(filteredData.slice(first, first + rows));
  }, [first, rows, filteredData]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <>
      <Toast ref={toast} position="top-center" />
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
          <div className="hidden lg:block mr-3">
            {data.length > 0 && (
              <Filter
                onFilterChange={handleFilterChange}
                products={data}
                visible={visible}
                setVisible={setVisible}
              />
            )}
          </div>
          {filteredData ? (
            <div className="product-list">
              {paginatedData.map((product, index) => (
                <div key={index} className="relative flex">
                  <div className="border-1 surface-border border-round py-5 px-3 bg-white border-round-mb flex flex-column justify-content-between">
                    <div className="">
                      <Link to={`product/${product.product_id}`} state={{ product }}>
                        <img
                          src={product.product_image}
                          alt={product.product_name}
                          className="w-12"
                        />
                      </Link>
                    </div>
                    <h4 className="mb-1">{product.product_name}</h4>
                    <hr />
                    <div className="flex align-items-center justify-content-between p-2 mt-2 bg-product">
                      <div className="font-bold">{product.product_price} ฿</div>

                      <Button
                        className="btn-plus-product"
                        icon="pi pi-plus"
                        rounded
                        onClick={() => {
                          addToCart(product)
                          showSuccessToast();
                        }}
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
        <Paginator first={first} rows={rows} totalRecords={filteredData.length} onPageChange={onPageChange} />
      </div>
      <Footer />
    </>
  );
}

export default ListProductsPage;