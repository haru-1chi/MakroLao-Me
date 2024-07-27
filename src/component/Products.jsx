import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';

function Products() {

const data = [
    {
        id : '1',
        imgURL : 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
        name : 'product',
        price : '999.00'
    },
    {
        id : '2',
        imgURL : 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
        name : 'product',
        price : '999.00'
    },
    {
        id : '3',
        imgURL : 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
        name : 'product',
        price : '999.00'
    },
    {
        id : '4',
        imgURL : 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
        name : 'product',
        price : '999.00'
    }
    
];

const responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 2,
        numScroll: 1
    }
];


const productTemplate = (product) => {
    return (
        <div className="border-1 surface-border border-round m-2 py-5 px-3 bg-white border-round-mb">
            <div className="mb-3">
                <img src={product.imgURL} alt={product.name} className="w-12" />
            </div>
            <div>
                <h4 className="mb-1">{product.name}</h4>
                <hr />
                <div className="flex align-items-center justify-content-between p-2 mt-2 bg-product">
                    <div className='font-bold'>{product.price} ฿</div>
                    <Button className='btn-plus-product' icon="pi pi-plus" rounded/>
                </div>
            </div>
        </div>
    );
};

  return (
    <div className="card p-1">
    <Carousel value={data} numVisible={2} numScroll={2} responsiveOptions={responsiveOptions} showIndicators={false} showNavigators={false} itemTemplate={productTemplate} />
</div>
  )
}

export default Products