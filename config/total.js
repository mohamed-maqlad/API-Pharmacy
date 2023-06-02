
// calculat total price and total amount
const calculateCartTotal = (cart) => {
  try {
    let totalprice = 0;
    let totalamount = 0;
    for (i = 0; i < cart.length; i++) {
      var cartitem = cart[i];
      totalprice += parseInt(cartitem.price);
      totalamount += cartitem.amount;
      }
    //   console.log(totalprice);
    return {totalprice, totalamount};
  } catch (error) {}
};

module.exports = {
  calculateCartTotal,
};