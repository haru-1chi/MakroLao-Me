import React, { useState, useEffect } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { Sidebar } from 'primereact/sidebar';
import { Button } from "primereact/button";

function Filter({ onFilterChange, products, visible, setVisible }) {
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
        priceRanges: { key: 'allRange', value: 'ดูเพิ่มเติม' },
        stocks: { key: 'allStock', value: 'ดูเพิ่มเติม', inStock: null },
        selectedSubCategories: [],
        selectedBrands: [],
        promotions: { key: 'allPromotion', value: 'ดูเพิ่มเติม', onSale: null }
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
        priceRanges: 'ช่วงราคา',
        stocks: 'สต๊อก',
        selectedSubCategories: 'หมวดหมู่ย่อย',
        selectedBrands: 'แบรนด์',
        promotions: 'โปรโมชั่น'
    };

    const [expandedSections, setExpandedSections] = useState({
        priceRanges: true,
        stocks: true,
        selectedSubCategories: true,
        selectedBrands: true,
        promotions: true,
    });

    const toggleSection = (section) => {
        setExpandedSections(prevState => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    return (
        <div className="lg:flex">
            <Sidebar
                visible={visible}
                position="right"
                onHide={() => setVisible(false)}
            >

                <div className="w-full px-3 bg-white flex flex-column justify-content-between">

                    <div className="flex justify-content-between">
                        <div className="flex align-items-center">
                            <i className="pi pi-sliders-h"></i>
                            <p className='ml-2'>กรอง</p>
                        </div>
                    </div>
                    {Object.entries(expandedSections).map(([section, expanded]) => (
                        <div key={section}>
                            <div className="flex justify-content-between" onClick={() => toggleSection(section)}>
                                <p>{sectionLabels[section] || section}</p>
                                <p><i className={`pi ${expanded ? 'pi-minus' : 'pi-plus'}`}></i></p>
                            </div>
                            {expanded && (section === 'priceRanges' ? priceRanges : section === 'stocks' ? stocks : section === 'promotions' ? promotions : section === 'selectedSubCategories' ? subCategoryOptions : brandOptions).map((option) => (
                                <div className="mb-2" key={option.key}>
                                    {section === 'priceRanges' || section === 'stocks' || section === 'promotions' ? (
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
                                    <label htmlFor={option.key} className="ml-2">{option.value}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="filter-card-group w-full bg-white flex flex-column">
                        <Button
                            className='p-3 mb-2'
                            onClick={clearFilters}
                            aria-label="Clear Filters"
                            label="ล้างตัวคัดกรอง" icon="pi pi-refresh"
                            text />
                        <Button
                            onClick={() => setVisible(false)}
                            label="แสดงผล"
                        />

                    </div>

                </div>
            </Sidebar>

            <div className="filter-card border-1 surface-border border-round py-2 px-3 bg-white flex flex-column justify-content-between">
                <div className="flex justify-content-between">
                    <div className="flex align-items-center">
                        <i className="pi pi-sliders-h"></i>
                        <p className='ml-2'>กรอง</p>
                    </div>
                    <Button
                        className='p-2'
                        onClick={clearFilters}
                        aria-label="Clear Filters"
                        label="ล้างตัวคัดกรอง" icon="pi pi-refresh"
                        text />
                </div>
                {Object.entries(expandedSections).map(([section, expanded]) => (
                    <div key={section}>
                        <div className="flex justify-content-between" onClick={() => toggleSection(section)}>
                            <p>{sectionLabels[section] || section}</p>
                            <p><i className={`pi ${expanded ? 'pi-minus' : 'pi-plus'}`}></i></p>
                        </div>
                        {expanded && (section === 'priceRanges' ? priceRanges : section === 'stocks' ? stocks : section === 'promotions' ? promotions : section === 'selectedSubCategories' ? subCategoryOptions : brandOptions).map((option) => (
                            <div className="mb-2" key={option.key}>
                                {section === 'priceRanges' || section === 'stocks' || section === 'promotions' ? (
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
                                <label htmlFor={option.key} className="ml-2">{option.value}</label>
                            </div>
                        ))}
                    </div>
                ))}

            </div>

        </div>
    );
}

export default Filter;

