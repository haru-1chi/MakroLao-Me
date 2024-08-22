import React, { useState, useEffect } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { Sidebar } from 'primereact/sidebar';
import { Button } from "primereact/button";
//
import { useTranslation } from "react-i18next";
//

function Filter({ onFilterChange, products, visible, setVisible }) {
    const { t } = useTranslation()
    const { filter, clearFilter, priceRange, all, stock, instock, subCategory, brand, promotion, onSale, show } = t("Filter")

    const generatePriceRanges = (products) => {
        const prices = products.map(product => product.product_price);
        const maxPrice = Math.max(...prices);
        const step = 500;
        const ranges = [{ key: 'allRange', value: 'ดูเพิ่มเติม' }];

        for (let i = 0; i <= maxPrice; i += step) {
            const min = i;
            const max = i + step;
            const hasData = products.some(product => product.product_price >= min && product.product_price < max);

            ranges.push({
                key: `${min}-${max}`,
                value: `${min} ฿ - ${max} ฿`,
                min: min,
                max: max,
                hasData: hasData
            });
        }

        for (let i = ranges.length - 2; i >= 1; i--) {
            if (!ranges[i].hasData) {
                ranges.splice(i, 1);
            } else {
                break;
            }
        }

        let lastRangeMax = 0;
        if (ranges.length > 1 && ranges[ranges.length - 2]) {
            lastRangeMax = ranges[ranges.length - 2].max || ranges[ranges.length - 1].max;
        }

        ranges.pop();
        ranges.push({
            key: `${lastRangeMax}`,
            value: `${lastRangeMax} ฿+`,
            min: lastRangeMax,
            max: Infinity,
            hasData: true
        });

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
        priceRanges: { key: 'allRange', value: `${all}` },
        // stocks: { key: 'allStock', value: `${all}`, inStock: null },
        selectedSubCategories: [],
        selectedBrands: [],
        // promotions: { key: 'allPromotion', value: `${all}`, onSale: null }
    });

    const priceRanges = generatePriceRanges(products);
    // const stocks = [
    //     { key: 'allStock', value: `${all}`, inStock: null },
    //     { key: 'inStock', value: `${instock}`, inStock: true }
    // ];
    const { subCategoryOptions, brandOptions } = generateFiltersFromData(products);
    // const promotions = [
    //     { key: 'allPromotion', value: `${all}`, onSale: null },
    //     { key: 'onSale', value: `${onSale}`, onSale: true }
    // ];

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
    }, [filters, onFilterChange]);

    const sectionLabels = {
        priceRanges: `${priceRange}`,
        // stocks: `${stock}`,
        selectedSubCategories: `${subCategory}`,
        selectedBrands: `${brand}`,
        // promotions: `${promotion}`
    };

    const [expandedSections, setExpandedSections] = useState({
        priceRanges: true,
        // stocks: true,
        selectedSubCategories: true,
        selectedBrands: true,
        // promotions: true,
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
                            <p className='ml-2'>{filter}</p>
                        </div>
                    </div>
                    {Object.entries(expandedSections).map(([section, expanded]) => (
                        <div key={section}>
                            <div className="flex justify-content-between" onClick={() => toggleSection(section)}>
                                <p>{sectionLabels[section]}</p>
                                <p><i className={`pi ${expanded ? 'pi-minus' : 'pi-plus'}`}></i></p>
                            </div>
                            {expanded && (section === 'priceRanges' ? priceRanges : section === 'selectedSubCategories' ? subCategoryOptions : brandOptions).map((option) => (
                                <div className="mb-2" key={option.key}>
                                    {section === 'priceRanges' ? (
                                        <RadioButton
                                            inputId={option.key}
                                            value={option}
                                            name={section}
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
                            label={clearFilter} icon="pi pi-refresh"
                            text />
                        <Button
                            className='mb-2'
                            onClick={() => setVisible(false)}
                            label={show}
                        />

                    </div>

                </div>
            </Sidebar>

            <div className="filter-card border-1 surface-border border-round py-2 px-3 bg-white flex flex-column justify-content-between">
                <div className="flex justify-content-between">
                    <div className="flex align-items-center">
                        <i className="pi pi-sliders-h"></i>
                        <p className='ml-2'>{filter}</p>
                    </div>
                    <Button
                        className='p-2'
                        onClick={clearFilters}
                        aria-label="Clear Filters"
                        label={clearFilter} icon="pi pi-refresh"
                        text />
                </div>
                {Object.entries(expandedSections).map(([section, expanded]) => (
                    <div key={section}>
                        <div className="flex justify-content-between" onClick={() => toggleSection(section)}>
                            <p>{sectionLabels[section] || section}</p>
                            <p><i className={`pi ${expanded ? 'pi-minus' : 'pi-plus'}`}></i></p>
                        </div>
                        {expanded && (section === 'priceRanges' ? priceRanges : section === 'selectedSubCategories' ? subCategoryOptions : brandOptions).map((option) => (
                            <div className="mb-2" key={option.key}>
                                {section === 'priceRanges' ? (
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

