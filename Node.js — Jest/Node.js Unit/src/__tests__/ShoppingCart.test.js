const ShoppingCart = require('../ShoppingCart');

describe('ShoppingCart', () => {
  let cart;

  // beforeEach() se ejecuta ANTES de cada test → cart siempre está vacío
  beforeEach(() => {
    cart = new ShoppingCart();
  });

  it('inicia vacío', () => {
    expect(cart.isEmpty()).toBe(true);
    expect(cart.getTotal()).toBe(0);
  });

  it('agrega un producto nuevo', () => {
    cart.addItem({ id: 1, name: 'Teclado', price: 50, quantity: 1 });
    expect(cart.items).toHaveLength(1);
  });

  it('acumula cantidad si el producto ya existe', () => {
    cart.addItem({ id: 1, name: 'Mouse', price: 25, quantity: 1 });
    cart.addItem({ id: 1, name: 'Mouse', price: 25, quantity: 2 });
    expect(cart.items[0].quantity).toBe(3);
  });

  it('calcula el total correctamente', () => {
    cart.addItem({ id: 1, name: 'Teclado', price: 50, quantity: 2 });
    cart.addItem({ id: 2, name: 'Mouse',   price: 25, quantity: 1 });
    expect(cart.getTotal()).toBe(125); // 50*2 + 25*1
  });

  it('elimina un producto por id', () => {
    cart.addItem({ id: 1, name: 'Auricular', price: 80, quantity: 1 });
    cart.addItem({ id: 2, name: 'Webcam',    price: 60, quantity: 1 });
    cart.removeItem(1);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].id).toBe(2);
  });
});