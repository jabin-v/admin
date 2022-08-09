import { Rating } from '@mui/material'
import React from 'react'
import './productDetail.css'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductDetail = () => {

   
  return (
    <div className='card-wrapper'>
        <div className='card'>
        <div className='product-imgs'>
            <div className='img-display'>
               <div className='img-showcase'>
               <img src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'/>
                <img src='https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'/>
                <img src='https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'/>
                <img src='https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'/>

               </div>
                 
            </div>
            <div className='img-select'>
                <div className='img-item'>
                    <a href='#' data-id="1">
                        <img src='https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'/>

                    </a>

                </div>
                <div className='img-item'>
                    <a href='#' data-id="1">
                        <img src='https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'/>

                    </a>

                </div>
                <div className='img-item'>
                    
                    <a href='#' data-id="1">
                        <img src='https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'/>

                    </a>

                </div>

                <div className='img-item'>
                    
                    <a href='#' data-id="1">
                        <img src='https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'/>

                    </a>

                </div>

            </div>
            </div>

            {/* right */}
            <div className='product-content' >
                <h2 className='product-title'>nike shoes</h2>
                <a href='#' className='product-link'> visit nike store</a>
                <div className='product-rating'>
                <Rating/>
                <span>4.7 (21)</span>
                </div>
                <div className='product-price'>
                    <p className='last-price'> Old price : <span>$257</span></p>
                    <p className='new-price'> New price : <span>$257</span></p>

                </div>
                <div className='product-detail'>
                    <h2>about this item:</h2>
                    <p>product detail page design html , ecommerce product page design html. ... Description About this product:- Solid color polyester/linen full blackout thick ..</p>

                    <p>Bootstrap example of eCommerce Product Detail using HTML, Javascript, jQuery, and CSS. Snippet by uthmansy.</p>
                    <ul>
                        <li>Color : <span>Black</span></li>
                        <li>Available : <span>in stock</span></li>
                        <li>Category  : <span>Shoes</span></li>
                        <li>Shiiping Area  : <span>All over the world</span></li>
                        <li>Shipping fee : <span>free</span></li>
                    </ul>


                </div>
                <div className='purchase-info'>
                    <button className='button'>Edit 
                    <ModeEditIcon/>
                    </button>
                    <button className='button'>Delete
                    <DeleteIcon/>
                    </button>

                </div>
                <div>
                    
                </div>


            </div>


        </div>

        </div>
        
  
  )
}

export default ProductDetail