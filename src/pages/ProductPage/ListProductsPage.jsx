import React from 'react'
import { Button } from 'primereact/button';
import { Outlet, Link } from "react-router-dom";
import Footer from '../../component/Footer';

function ListProductsPage() {

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
        ,
        {
            id : '5',
            imgURL : 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
            name : 'product',
            price : '999.00'
        }
        ,
        {
            id : '6',
            imgURL : 'https://www.makro.pro/_next/image?url=https%3A%2F%2Fimages.mango-prod.siammakro.cloud%2FSOURCE%2F074fc00deace464ba94af3b81fe4ec78&w=384&q=75',
            name : 'product',
            price : '999.00'
        }
        
    ];


  return (
    <>
    <div className='p-3'>
    <div>
        <h1>Product List</h1>
    </div>
    <div className='product-list'>
            {data.map((product) => (
                <Link to="Product">
                <div className="border-1 surface-border border-round py-5 px-3 bg-white border-round-mb">
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
            </Link>
            ))}
            </div>
    </div>
    <Footer />
    </>
  )
}

export default ListProductsPage