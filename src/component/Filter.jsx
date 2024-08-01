import React, { useState, useEffect } from 'react';
import { RadioButton } from 'primereact/radiobutton';

function Filter({ onFilterChange, products, selectedSubCategories, setSelectedSubCategories, selectedBrands, setSelectedBrands }) {
    const generatePriceRanges = (products) => {
        const prices = products.map(product => product.product_price);
        const maxPrice = Math.max(...prices);
        const step = 500;
        const ranges = [{ key: 'all', value: 'ดูเพิ่มเติม' }];

        for (let i = 0; i <= maxPrice; i += step) {
            ranges.push({
                key: `${i}-${i + step}`,
                value: `${i} ฿ - ${i + step} ฿`,
                min: i,
                max: i + step
            });
        }

        if (maxPrice % step !== 0) {
            const lastStep = Math.floor(maxPrice / step) * step + step;
            ranges.push({
                key: `${lastStep}`,
                value: `${lastStep}฿+ `,
                min: lastStep,
                max: Infinity
            });
        }

        return ranges;
    };
    const getUniqueValues = (products, key) => {
        return [...new Set(products.map(item => item[key]))];
    };

    const generateFiltersFromData = (products) => {
        const uniqueSubCategories = getUniqueValues(products, 'subCategory');
        const uniqueBrands = getUniqueValues(products, 'product_brand');

        return {
            subCategoryOptions: [
                ...uniqueSubCategories.map(subCategory => ({ key: subCategory, value: subCategory }))
            ],
            brandOptions: [
                ...uniqueBrands.map(brand => ({ key: brand, value: brand }))
            ]
        };
    };

    const getInitialFilters = () => ({
        priceRate: { key: 'all', value: 'ดูเพิ่มเติม' },
        stock: { key: 'all', value: 'ดูเพิ่มเติม', inStock: null },
        selectedSubCategories: [],
        selectedBrands: [],
        promotion: { key: 'all', value: 'ดูเพิ่มเติม', onSale: null }
    });

    const priceRanges = generatePriceRanges(products);
    const stocks = [
        { key: 'all', value: 'ดูเพิ่มเติม', inStock: null },
        { key: 'inStock', value: 'มีสินค้า', inStock: true }
    ];
    const { subCategoryOptions, brandOptions } = generateFiltersFromData(products);
    const promotions = [
        { key: 'all', value: 'ดูเพิ่มเติม', onSale: null },
        { key: 'onSale', value: 'ลดราคา', onSale: true }
    ];

    const [filters, setFilters] = useState(getInitialFilters());

    const handlePriceRangeChange = (priceRate) => {
        setFilters(prevFilters => ({ ...prevFilters, priceRate }));
    };

    const handleStockChange = (stock) => {
        setFilters(prevFilters => ({ ...prevFilters, stock }));
    };

    const handlePromotionChange = (promotion) => {
        setFilters(prevFilters => ({ ...prevFilters, promotion }));
    };

    const handleSubCategoryChange = (event) => {
        const { value, checked } = event.target;
        let updatedSubCategories = [...selectedSubCategories];
        if (checked) {
            updatedSubCategories.push(value);
        } else {
            updatedSubCategories = updatedSubCategories.filter(subCategory => subCategory !== value);
        }
        setSelectedSubCategories(updatedSubCategories);
    };

    const handleBrandChange = (event) => {
        const { value, checked } = event.target;
        let updatedBrands = [...selectedBrands];
        if (checked) {
            updatedBrands.push(value);
        } else {
            updatedBrands = updatedBrands.filter(brand => brand !== value);
        }
        setSelectedBrands(updatedBrands);
    };
    

    useEffect(() => {
        onFilterChange(filters);
    }, [filters, selectedSubCategories, selectedBrands]);

    const clearFilters = () => {
        setFilters(getInitialFilters());
        setSelectedSubCategories([])
        setSelectedBrands([])
    };


    const [expandedSections, setExpandedSections] = useState({
        priceRate: true,
        stock: true,
        subCategory: true,
        brand: true,
        promotion: true,
    });

    const toggleSection = (section) => {
        setExpandedSections(prevState => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };


    return (
        <div className='filter-card border-1 surface-border border-round py-5 px-3 bg-white border-round-mb flex flex-column justify-content-between'>
            <div className='flex justify-content-between'>
                <div className='flex align-items-center'>
                    <i className="pi pi-sliders-h"></i>
                    <p>กรอง</p>
                </div>
                <button onClick={clearFilters} aria-label="Clear Filters">
                    <i className="pi pi-refresh"></i> ล้างตัวกรอง
                </button>
            </div>
            <div>
                <div className='flex justify-content-between' onClick={() => toggleSection('priceRate')}>
                    <p>ช่วงราคา</p>
                    <p><i className={`pi ${expandedSections.priceRate ? 'pi-minus' : 'pi-plus'}`}></i></p>
                </div>
                {expandedSections.priceRate && priceRanges.map((range) => (
                    <div className='mb-2' key={range.key}>
                        <RadioButton
                            value={range}
                            checked={filters.priceRate.key === range.key}
                            onChange={(e) => handlePriceRangeChange(e.value)}
                        />
                        <label className='ml-2'>{range.value}</label>
                    </div>
                ))}
            </div>
            <div>
                <div className='flex justify-content-between' onClick={() => toggleSection('stock')}>
                    <p>สต๊อก</p>
                    <p><i className={`pi ${expandedSections.priceRate ? 'pi-minus' : 'pi-plus'}`}></i></p>
                </div>
                {expandedSections.stock && stocks.map((range) => (
                    <div className='mb-2' key={range.key}>
                        <RadioButton
                            value={range}
                            checked={filters.stock.key === range.key}
                            onChange={(e) => handleStockChange(e.value)}
                        />
                        <label className='ml-2'>{range.value}</label>
                    </div>
                ))}
            </div>
            <div>
                <div className='flex justify-content-between' onClick={() => toggleSection('subCategory')}>
                    <p>หมวดหมู่ย่อย</p>
                    <p><i className={`pi ${expandedSections.priceRate ? 'pi-minus' : 'pi-plus'}`}></i></p>
                </div>

                {expandedSections.subCategory && subCategoryOptions.map((option) => (
                    <div className='mb-2' key={option.key}>
                        <input
                            type="checkbox"
                            value={option.key}
                            checked={selectedSubCategories.includes(option.key)}
                            onChange={handleSubCategoryChange}
                        />
                        <label className='ml-2'>{option.value}</label>
                    </div>
                ))}
            </div>
            <div>
                <div className='flex justify-content-between' onClick={() => toggleSection('brand')}>
                    <p>แบรนด์</p>
                    <p><i className={`pi ${expandedSections.priceRate ? 'pi-minus' : 'pi-plus'}`}></i></p>
                </div>

                {expandedSections.brand && brandOptions.map((option) => (
                    <div className='mb-2' key={option.key}>
                        <input
                            type="checkbox"
                            value={option.key}
                            checked={selectedBrands.includes(option.key)}
                            onChange={handleBrandChange}
                        />
                        <label className='ml-2'>{option.value}</label>
                    </div>
                ))}
            </div>
            <div>
                <div className='flex justify-content-between' onClick={() => toggleSection('promotion')}>
                    <p>โปรโมชั่น</p>
                    <p><i className={`pi ${expandedSections.priceRate ? 'pi-minus' : 'pi-plus'}`}></i></p>
                </div>

                {expandedSections.promotion && promotions.map((range) => (
                    <div className='mb-2' key={range.key}>
                        <RadioButton
                            value={range}
                            checked={filters.promotion.key === range.key}
                            onChange={(e) => handlePromotionChange(e.value)}
                        />
                        <label className='ml-2'>{range.value}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Filter;
