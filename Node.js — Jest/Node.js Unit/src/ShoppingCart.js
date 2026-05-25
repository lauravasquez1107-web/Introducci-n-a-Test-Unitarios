class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.items.push({ ...product });
    }
  }

  removeItem(productId) {
    this.items = this.items.filter(i => i.id !== productId);
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

module.exports = ShoppingCart;