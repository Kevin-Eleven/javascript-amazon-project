export const cart = [];

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