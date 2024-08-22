import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useCart } from '../../router/CartContext';
import Filter from "../../component/Filter";
import FilterSort from '../../component/FilterSort';
import Footer from "../../component/Footer";
import { Paginator } from 'primereact/paginator';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';

function ListProductsPage() {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_PRODUCT;
  const product_token = import.meta.env.VITE_REACT_APP_PRODUCT_TOKEN;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || ""; //search

  const { addToCart } = useCart();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);  //filter
  const [paginatedData, setPaginatedData] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(20);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const defaultFilters = {
    priceRanges: { key: 'allRange', value: 'All' },
    selectedSubCategories: [],
    selectedBrands: []
  };
  const [filters, setFilters] = useState(defaultFilters);
  const [sortOption, setSortOption] = useState('default'); //sort

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

  const filterProducts = (products, searchTerm) => {
    if (!searchTerm) return products;
    return products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())   //search
    );
  };

  const sortProducts = (products, sortOption) => {   //sort
    if (sortOption === 'lowToHigh') {
      return [...products].sort((a, b) => a.product_price - b.product_price);
    } else if (sortOption === 'highToLow') {
      return [...products].sort((a, b) => b.product_price - a.product_price);
    }
    return products;
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

    filtered = sortProducts(filtered, sortOption);

    setFilteredData(filtered);
    setPaginatedData(filtered.slice(first, first + rows));

  };

  const handleFilterChange = (filters) => {
    applyFilters(filters);
  };

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
    applyFilters({ ...filters, sortOption });
  };

  const fetchData = () => {
    setLoading(true); 
    axios({
      method: "post",
      url: `${apiUrl}/api_product`,
      headers: {
        "auth-token":
          `${product_token}`,
      },
    })
      .then((response) => {
        const filtered = filterProducts(response.data, searchTerm);
        setData(filtered);
        setFilteredData(filtered);
        setPaginatedData(filtered.slice(first, first + rows));
        // setFilteredData(response.data);
        // setPaginatedData(response.data.slice(first, first + rows));
      })
      .catch((error) => {
        console.log(error);
        console.log(apiUrl);
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

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
          <div className="w-full flex justify-content-between align-items-center">
            <h1 className="font-semibold">รายการสินค้า</h1>
            <FilterSort onSortChange={handleSortChange} />
          </div>
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
                products={data} //ส่ง data ทั้งหมดไป gen, อาจเป็น data จาก search
                visible={visible}
                setVisible={setVisible}
              />
            )}
          </div>
          {loading ? (
            <div className="w-full flex justify-content-center align-items-center">
              <h2 className="mt-0 font-semibold">Loading...</h2>
            </div>
          ) : (
            <>
              {filteredData.length ? (
                <div className="w-full">
                  {searchTerm && <h2 className="mt-0 font-semibold">ผลการค้นหา "{searchTerm}"</h2>}
                  <div className="product-list">
                    {paginatedData.map((product, index) => (
                      <div key={index} className="relative flex h-24rem md:h-28rem">
                        <div className="w-full border-1 surface-border border-round py-5 px-3 bg-white border-round-mb flex flex-column justify-content-between">
                          <Link to={`product/${product.product_id}`} state={{ product }}>
                            <img
                              src={product.product_image}
                              alt={product.product_name}
                              className="w-12"
                            />
                          </Link>
                          <div>
                            <h4 className="m-0 pb-1 border-bottom-1 surface-border">{product.product_name}</h4>
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
                </div>
              ) : (
                <div className="w-full">
                  {searchTerm && <h2 className="mt-0 font-semibold">ผลการค้นหา "{searchTerm}"</h2>}
                  <div className="w-full flex justify-content-center">
                    <div className="flex flex-column justify-content-center align-items-center">
                      <h2 className="font-semibold mt-0 mb-2">ขออภัย</h2>
                      <p className="mt-0">ไม่พบข้อมูลจากการค้นหา</p>
                      <Link to="/"><Button
                        className="w-12rem mb-3"
                        label="ค้นหาตามหมวดหมู่"
                        rounded
                        onClick="" /></Link>
                      <Link to="/">
                        <Button
                          className="w-12rem"
                          label="ลองค้นหาด้วยคำอื่นๆ"
                          rounded
                          outlined
                          onClick="" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
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