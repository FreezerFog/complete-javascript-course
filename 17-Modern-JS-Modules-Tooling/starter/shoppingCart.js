///////////////////////////////////////////////////////////
// VIDEO272: Importing and Exporting in ES6 Modules

// Exporting Module
console.log('Exporting module');
const shippingCost = 10;
export const cart = [];
export function addToCart(product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// Default Export
// Provide the default value
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
