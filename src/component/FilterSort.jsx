import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

function FilterSort({ onSortChange }) {
    const [selectedSort, setSelectedSort] = useState('default');

    const sortOptions = [
        { label: 'เรียงตามความใกล้เคียง', value: 'default' },
        { label: 'ราคาต่ำไปสูง', value: 'lowToHigh' },
        { label: 'ราคาสูงไปต่ำ', value: 'highToLow' }
    ];

    const handleSortChange = (e) => {
        setSelectedSort(e.value);
        onSortChange(e.value);
    };

    return (
        <Dropdown
            value={selectedSort}
            options={sortOptions}
            onChange={handleSortChange}
            placeholder="Sort by Price"
            className='flex align-items-center h-fit'
        />
    );
}

export default FilterSort;