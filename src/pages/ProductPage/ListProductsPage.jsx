import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from '../../router/CartContext';
import Filter from "../../component/Filter";
import Footer from "../../component/Footer";
import { Paginator } from 'primereact/paginator';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';

const testData = [
  {
    product_id: '1',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'B ขนม 1',
    product_price: 300.00,
    subCategory: 'ขนม',
    product_brand: 'B',
    inStock: false,
    onSale: true,
  },
  {
    product_id: '2',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'B เครื่องใช้ไฟฟ้า 2',
    product_price: 600.00,
    subCategory: "เครื่องใช้ไฟฟ้า",
    product_brand: "B",
    inStock: true,
    onSale: false,
  },
  {
    product_id: '3',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'A เครื่องครัว 3',
    product_price: 1200.00,
    subCategory: "เครื่องครัว",
    product_brand: "A",
    inStock: false,
    onSale: true,
  },
  {
    product_id: '4',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'A เครื่องใช้ไฟฟ้า 4',
    product_price: 1700.00,
    subCategory: "เครื่องใช้ไฟฟ้า",
    product_brand: "A",
    inStock: false,
    onSale: false,
  },
  {
    product_id: '5',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'C เครื่องใช้ไฟฟ้า 5',
    product_price: 1500.00,
    subCategory: "เครื่องใช้ไฟฟ้า",
    product_brand: "C",
    inStock: true,
    onSale: false,
  },
  {
    product_id: '6',
    product_image: 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
    product_name: 'D เครื่องครัว 6',
    product_price: 2500.00,
    subCategory: "เครื่องครัว",
    product_brand: "D",
    inStock: true,
    onSale: false,
  },
  {
    product_id: '7',
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
  const apiUrl = import.meta.env.VITE_REACT_APP_API_PRODUCT;
  const product_token = import.meta.env.VITE_REACT_APP_PRODUCT_TOKEN;
  const navigate = useNavigate();
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

  const showWarningToast = () => {
    toast.current.show({
      severity: 'error', summary: 'เข้าสู่ระบบเพื่อเพิ่มสินค้าใส่ตะกร้า', life: 2000
    });
  };

  const applyFilters = (filters) => {
    let filtered = data;

    if (filters.priceRanges.key !== 'allRange') {
      filtered = filtered.filter(product => product.product_price >= filters.priceRanges.min && product.product_price <= filters.priceRanges.max);
    }

    // if (filters.stocks.key !== 'allStock') {
    //   filtered = filtered.filter(product => product.inStock === filters.stocks.inStock);
    // }

    if (filters.selectedSubCategories.length > 0) {
      filtered = filtered.filter(product => filters.selectedSubCategories.includes(product.subCategory));
    }

    if (filters.selectedBrands.length > 0) {
      filtered = filtered.filter(product => filters.selectedBrands.includes(product.product_brand));
    }

    // if (filters.promotions.key !== 'allPromotion') {
    //   filtered = filtered.filter(product => product.onSale === filters.promotions.onSale);
    // }

    setFilteredData(filtered);
    setPaginatedData(filtered.slice(first, first + rows));

  };

  const handleFilterChange = (filters) => {
    applyFilters(filters);
  };

  const fetchData = () => {
    axios({
      method: "post",
      url: `${apiUrl}/api_product`,
      headers: {
        "auth-token":
          `${product_token}`,
      },
    })
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
        setPaginatedData(response.data.slice(first, first + rows));
      })
      .catch((error) => {
        console.log(error);
        console.log(apiUrl);
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

  const addCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showWarningToast();
      navigate("/LoginPage");
    } else {
      addToCart(product)
      showSuccessToast();
    }
  };


  return (
    <>
      <Toast ref={toast} position="top-center" />
      <div className="p-3">
        <div className="flex justify-content-between">
          <h1>รายการสินค้า</h1>
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
                <div key={index} className="relative flex h-24rem md:h-28rem lg:h-28rem xl:h-28rem">
                  <div className="w-full border-1 surface-border border-round py-5 px-3 bg-white border-round-mb flex flex-column justify-content-between">
                      <Link to={`product/${product.product_id}`} state={{ product }}>
                        <img
                          src=""
                          alt={product.product_name}
                          className="w-12"
                        />
                      </Link>
                    <div>
                      <h4 className="pb-1 border-bottom-1 surface-border">{product.product_name}</h4>
                      <div className="flex align-items-center justify-content-between p-2 mt-2 bg-product">
                        <div className="font-bold">{product.product_price} ฿</div>
                        <Button
                          className="btn-plus-product"
                          icon="pi pi-plus"
                          rounded
                          onClick={() => addCart(product)}
                        />
                      </div>
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