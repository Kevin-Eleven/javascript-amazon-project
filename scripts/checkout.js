import {cart,removeFromCart} from '../data/cart.js'

import { products } from '../data/products.js';

import { formatCurrency } from './utils/money.js';

import {hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

import { deliveryOption } from '../data/deliveryOptions.js';

let cartSummaryHTML = '';

cart.forEach((cartItem)=>{
  const productId = cartItem.productId;
  let matchingProduct; 

  products.forEach((product)=>{
    if(product.id === productId){
      matchingProduct = product;
    }
  })

  cartSummaryHTML +=
  `
  <div class="cart-item-container  js-cart-item-container-${productId}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)};
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity-link"
          data-product-id = ${productId}>
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link"
          data-product-id = "${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
          </div>
        ${deliveryOptionHTML(matchingProduct)}
        </div>
      </div>
    </div>
  </div>
  `;
})

function deliveryOptionHTML(matchingProduct){
  let html =''
  deliveryOption.forEach((deliveryOption)=>{

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;
    html += 
    `
      <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
  
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
      
    `
  });
  return html
}

function updateCartQuantity(){
  let totalQuantity = 0;
  cart.forEach((product)=>{
    totalQuantity += product.quantity;
  })
  document.querySelector('.js-return-to-home-link').innerHTML = `${totalQuantity} items`;
}

updateCartQuantity();


document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId; 
    removeFromCart(productId);

   const container = document.querySelector(
      `.js-cart-item-container-${productId}`

    )
    container.remove();
    updateCartQuantity();
    
  })
})


document.querySelectorAll('.js-update-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId; 

    console.log(productId);
  
  })
})

// hello();
// const today = dayjs();

// const deliveryDate = today.add(10,'days');

// console.log(deliveryDate.format('MMMM D'));

// const monthBefore = today.subtract(1,'month');
// console.log(monthBefore.format('dddd'));

// console.log(monthBefore.format("'dddd'"));


// function isWeekend(date){
//   let check = date.format("dddd");
//   if(check === 'Saturday' || check === 'Sunday'){
//     return 1;
//   }else{
//     return 0;
//   }
// }
// console.log(isWeekend(deliveryDate));