import React, { useEffect, useState } from 'react';

function TemplateDemo() {
    const [storageData, setStorageData] = useState({});

    useEffect(() => {
        // Function to get all data from local storage
        const getAllStorageData = () => {
            let data = {};
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                let value = localStorage.getItem(key);

                // Try to parse the value as JSON; if it fails, keep it as a string
                try {
                    data[key] = JSON.parse(value);  // Attempt to parse JSON
                } catch (e) {
                    data[key] = value;  // If it fails, store as string
                }
            }
            return data;
        };

        // Set storage data state
        setStorageData(getAllStorageData());

        // Log storage data to the console
        console.log('LocalStorage Data:', getAllStorageData());
    }, []);

    return (
        <div>
            <h2>Local Storage Data</h2>
            <pre>{JSON.stringify(storageData, null, 2)}</pre> {/* Pretty print JSON */}
        </div>
    );
}

export default TemplateDemo;