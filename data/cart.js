export let cart = [{
  productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
},{
  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

export function addToCart(productId){
 
  let quant = document.querySelector(`.js-quantity-selector-${productId}`).value;

  let productQuantity = Number(quant);
  let matchingCartItem ;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingCartItem = cartItem;
    }
  });

  if(matchingCartItem){
    matchingCartItem.quantity += productQuantity;
  }else{
    cart.push({
      productId : productId,
      quantity : productQuantity
    });
  }
}

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem)=>{

    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }

  });

  cart = newCart
}