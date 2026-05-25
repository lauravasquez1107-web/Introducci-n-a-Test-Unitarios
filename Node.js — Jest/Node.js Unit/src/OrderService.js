class InsufficientStockError extends Error {
  constructor(productId) {
    super(`Stock insuficiente para el producto ${productId}.`);
    this.name = 'InsufficientStockError';
  }
}

class OrderService {
  constructor(inventoryRepository, notificationService) {
    this.repo = inventoryRepository;
    this.notifier = notificationService;
    this.nextOrderId = 1;
  }

  async placeOrder(userId, productId, quantity) {
    if (quantity <= 0) {
      throw new Error('La cantidad debe ser mayor que 0.');
    }

    const stock = await this.repo.getStock(productId);

    if (stock < quantity) {
      throw new InsufficientStockError(productId);
    }

    await this.repo.decreaseStock(productId, quantity);
    await this.notifier.sendConfirmation(userId, this.nextOrderId);

    const order = {
      orderId: this.nextOrderId++,
      userId,
      productId,
      quantity,
      status: 'confirmed',
    };

    return order;
  }
}

module.exports = { OrderService, InsufficientStockError };