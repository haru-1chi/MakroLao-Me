import React, { useState, useEffect } from 'react';
import { RadioButton } from 'primereact/radiobutton';

function Filter({ onFilterChange }) {
    const priceRates = [
        { key: 'all', value: 'ดูเพิ่มเติม' },
        { key: '1', value: '0.00 ฿ - 500.00 ฿', min: 0, max: 500 },
        { key: '2', value: '500.00 ฿ - 1,000.00 ฿', min: 500, max: 1000 },
        { key: '3', value: '1,000.00 ฿ - 1,500.00 ฿', min: 1000, max: 1500 },
        { key: '4', value: '1,500.00 ฿+', min: 1500, max: Infinity },
    ];

    const stocks = [
        { key: 'all', value: 'ดูเพิ่มเติม' },
        { key: '1', value: 'มีสินค้า', inStock: true },
    ];

    const promotions = [
        { key: 'all', value: 'ดูเพิ่มเติม' },
        { key: '1', value: 'ลดราคา', onSale: true },
    ];

    const defaultValue = (items) => items.find(item => item.key === 'all');

    const [filters, setFilters] = useState({
        priceRate: defaultValue(priceRates),
        stock: defaultValue(stocks),
        subCategory: null,
        brand: null,
        promotion: defaultValue(promotions),
    });

    useEffect(() => {
        onFilterChange(filters);
    }, [filters, onFilterChange]);

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

    const renderRadioGroup = (items, selectedValue, setSelectedValue) => (
        items.map((item) => (
            <div key={item.key} className="radio-item">
                <RadioButton
                    inputId={item.key}
                    name={item.key}
                    value={item}
                    onChange={(e) => setSelectedValue(e.value)}
                    checked={selectedValue?.key === item.key}
                />
                <label htmlFor={item.key}>{item.value}</label>
            </div>
        ))
    );

    const filterSections = [
        {
            title: 'ช่วงราคา',
            state: filters.priceRate,
            setState: (value) => setFilters(prev => ({ ...prev, priceRate: value })),
            items: priceRates,
            expanded: expandedSections.priceRate,
            toggle: () => toggleSection('priceRate'),
        },
        {
            title: 'สต๊อก',
            state: filters.stock,
            setState: (value) => setFilters(prev => ({ ...prev, stock: value })),
            items: stocks,
            expanded: expandedSections.stock,
            toggle: () => toggleSection('stock'),
        },
        {
            title: 'โปรโมชั่น',
            state: filters.promotion,
            setState: (value) => setFilters(prev => ({ ...prev, promotion: value })),
            items: promotions,
            expanded: expandedSections.promotion,
            toggle: () => toggleSection('promotion'),
        },
    ];

    const clearFilters = () => {
        setFilters({
            priceRate: defaultValue(priceRates),
            stock: defaultValue(stocks),
            subCategory: null,
            brand: null,
            promotion: defaultValue(promotions),
        });
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
            {filterSections.map(({ title, state, setState, items, expanded, toggle }) => (
                <div key={title}>
                    <div className='flex justify-content-between'>
                        <p>{title}</p>
                        <button onClick={toggle} aria-label={`Toggle ${title} section`}>
                            {expanded ? <i className="pi pi-minus"></i> : <i className="pi pi-plus"></i>}
                        </button>
                    </div>
                    {expanded && (
                        <div className="filter-section">
                            {renderRadioGroup(items, state, setState)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Filter;
