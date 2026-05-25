const { OrderService, InsufficientStockError } = require('../OrderService');

describe('OrderService', () => {
  let mockRepo;
  let mockNotifier;
  let service;

  beforeEach(() => {
    mockRepo = {
      getStock: jest.fn(),
      decreaseStock: jest.fn(),
    };
    mockNotifier = {
      sendConfirmation: jest.fn(),
    };
    service = new OrderService(mockRepo, mockNotifier);
  });

  it('placeOrder_ValidOrder_DecreasesStockAndSendsNotification', async () => {
    mockRepo.getStock.mockResolvedValue(10);
    mockRepo.decreaseStock.mockResolvedValue();
    mockNotifier.sendConfirmation.mockResolvedValue();

    const order = await service.placeOrder(1, 42, 3);

    expect(order).toMatchObject({
      userId: 1,
      productId: 42,
      quantity: 3,
      status: 'confirmed',
    });
    expect(mockRepo.decreaseStock).toHaveBeenCalledWith(42, 3);
  });

  it('placeOrder_InsufficientStock_ThrowsException', async () => {
    mockRepo.getStock.mockResolvedValue(2);

    await expect(service.placeOrder(1, 42, 5))
      .rejects
      .toThrow(InsufficientStockError);

    expect(mockRepo.decreaseStock).not.toHaveBeenCalled();
  });

  it('placeOrder_InvalidQuantity_ThrowsException', async () => {
    await expect(service.placeOrder(1, 42, 0))
      .rejects
      .toThrow('La cantidad debe ser mayor que 0.');

    await expect(service.placeOrder(1, 42, -3))
      .rejects
      .toThrow('La cantidad debe ser mayor que 0.');
  });

  it('placeOrder_OnSuccess_NotificationServiceCalledOnce', async () => {
    mockRepo.getStock.mockResolvedValue(10);
    mockRepo.decreaseStock.mockResolvedValue();
    mockNotifier.sendConfirmation.mockResolvedValue();

    await service.placeOrder(1, 42, 3);

    expect(mockNotifier.sendConfirmation).toHaveBeenCalledTimes(1);
    expect(mockNotifier.sendConfirmation).toHaveBeenCalledWith(1, 1);
  });
});