exports.calculateOrderTotal = (items) => {
    return items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };
  
  exports.generateOrderNumber = () => {
    return 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
  };
  
  exports.formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  exports.paginateResults = (page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    return {
      startIndex,
      endIndex,
      limit: parseInt(limit)
    };
  };
  
  exports.filterProductsByPrice = (products, minPrice, maxPrice) => {
    return products.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
  };
  
  exports.sortProducts = (products, sortBy) => {
    switch(sortBy) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'newest':
        return products.sort((a, b) => b.createdAt - a.createdAt);
      default:
        return products;
    }
  };