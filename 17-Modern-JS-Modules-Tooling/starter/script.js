///////////////////////////////////////////////////////////
// VIDEO274: The Module Pattern

// The way to create & use modules before ES6
// Useful to know because we will see this pattern in use
// Primarily done using IIFE 'Iffy' functions
// Works because of closures
// Doesn't work well with multiple files due to needing to load HTML scripts in proper order
// Bundling does not work with this approach

const ShoppingCart = (function () {
  const cart = [];
  let shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  function addToCart(product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart. Shipping total ${shippingCost}`
    );
    shippingCost += 5;
  }

  function orderStock(cart) {
    cart.forEach(item => {
      const { product, quantity } = item;
      if (quantity === 1) {
        console.log(`${quantity} ${product} ordered from supplier`);
      } else {
        console.log(`${quantity} ${product}'s ordered from supplier`);
      }
    });
  }

  return {
    addToCart,
    orderStock,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart.addToCart('Apple', 4);
ShoppingCart.addToCart('Pizza', 2);
ShoppingCart.addToCart('Box', 1);
console.log(ShoppingCart);
console.log(ShoppingCart.shippingCost); // Return undefined, shippingCost was not returned
ShoppingCart.orderStock(ShoppingCart.cart);
