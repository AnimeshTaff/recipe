module.exports = {
    async beforeCreate(event) {
      const { data } = event.params;
  
      if (data.price !== undefined) {
        const price = data.price;
        const discountedPrice = price - price * 0.1; // 10% discount
        data.discountedPrice = discountedPrice;
      }
    },
  
    async beforeUpdate(event) {
      const { data } = event.params;
  
      if (data.price !== undefined) {
        const price = data.price;
        const discountedPrice = price - price * 0.1; // 10% discount
        data.discountedPrice = discountedPrice;
      }
    },
  };
  