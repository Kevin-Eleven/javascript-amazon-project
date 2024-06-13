export function formatCurrency(priceCents){
   return (Math.round(priceCents)/100).toFixed(2);
}

// each file can have 1 default export

export default formatCurrency;