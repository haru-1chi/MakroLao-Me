import React, { useState, useEffect } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';

function Filter({ onFilterChange, products }) {
    const generatePriceRanges = (products) => {
        const prices = products.map(product => product.product_price);
        const maxPrice = Math.max(...prices);
        const step = 500;
        const ranges = [{ key: 'allRange', value: 'ดูเพิ่มเติม' }];

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
        priceRate: { key: 'allRange', value: 'ดูเพิ่มเติม' },
        stock: { key: 'allStock', value: 'ดูเพิ่มเติม', inStock: null },
        selectedSubCategories: [],
        selectedBrands: [],
        promotion: { key: 'allPromotion', value: 'ดูเพิ่มเติม', onSale: null }
    });

    const priceRanges = generatePriceRanges(products);
    const stocks = [
        { key: 'allStock', value: 'ดูเพิ่มเติม', inStock: null },
        { key: 'inStock', value: 'มีสินค้า', inStock: true }
    ];
    const { subCategoryOptions, brandOptions } = generateFiltersFromData(products);
    const promotions = [
        { key: 'allPromotion', value: 'ดูเพิ่มเติม', onSale: null },
        { key: 'onSale', value: 'ลดราคา', onSale: true }
    ];

    const [filters, setFilters] = useState(getInitialFilters());

    const clearFilters = () => {
        setFilters(getInitialFilters());
    };

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
    };

    const handleCheckboxChange = (key, value, checked) => {
        setFilters(prevFilters => {
            const updatedList = checked
                ? [...prevFilters[key], value]
                : prevFilters[key].filter(item => item !== value);
            return { ...prevFilters, [key]: updatedList };
        });
    };

    useEffect(() => {
        onFilterChange(filters);
    }, [filters]);

    const sectionLabels = {
        priceRate: 'ช่วงราคา',
        stock: 'สต๊อก',
        selectedSubCategories: 'หมวดหมู่ย่อย',
        selectedBrands: 'แบรนด์',
        promotion: 'โปรโมชั่น'
    };

    const [expandedSections, setExpandedSections] = useState({
        priceRate: true,
        stock: true,
        selectedSubCategories: true,
        selectedBrands: true,
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
            {Object.entries(expandedSections).map(([section, expanded]) => (
                <div key={section}>
                    <div className='flex justify-content-between' onClick={() => toggleSection(section)}>
                        <p>{sectionLabels[section] || section}</p>
                        <p><i className={`pi ${expanded ? 'pi-minus' : 'pi-plus'}`}></i></p>
                    </div>
                    {expanded && (section === 'priceRate' ? priceRanges : section === 'stock' ? stocks : section === 'promotion' ? promotions : section === 'selectedSubCategories' ? subCategoryOptions : brandOptions).map((option) => (
                        <div className='mb-2' key={option.key}>
                            {section === 'priceRate' || section === 'stock' || section === 'promotion' ? (
                                <RadioButton
                                    inputId={option.key}
                                    value={option}
                                    checked={filters[section].key === option.key}
                                    onChange={(e) => handleFilterChange(section, e.value)}
                                />
                            ) : (
                                <Checkbox
                                    inputId={option.key}
                                    value={option.key}
                                    onChange={(e) => handleCheckboxChange(section, option.key, e.target.checked)}
                                    checked={filters[section].includes(option.key)} />
                            )}
                            <label htmlFor={option.key} className='ml-2'>{option.value}</label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Filter;
