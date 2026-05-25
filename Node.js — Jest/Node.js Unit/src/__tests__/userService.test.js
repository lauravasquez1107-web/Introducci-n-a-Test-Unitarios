const UserService = require('../userService');

// Stub manual del repositorio
const mockRepo = {
  findById: jest.fn(),
  findAll:  jest.fn(),
};

describe('UserService', () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks();               // limpiar historial de llamadas entre tests
    service = new UserService(mockRepo);
  });

  describe('findUser()', () => {
    it('devuelve el usuario cuando existe', async () => {
      mockRepo.findById.mockResolvedValue({ id: 1, name: 'María', active: true });

      const user = await service.findUser(1);

      expect(user.name).toBe('María');
      expect(mockRepo.findById).toHaveBeenCalledWith(1);
      expect(mockRepo.findById).toHaveBeenCalledTimes(1);
    });

    it('lanza error si el usuario no existe', async () => {
      mockRepo.findById.mockResolvedValue(null);

      await expect(service.findUser(99)).rejects.toThrow('Usuario 99 no encontrado.');
    });

    it('lanza TypeError si el id es inválido', async () => {
      await expect(service.findUser('abc')).rejects.toThrow(TypeError);
    });
  });

  describe('listActiveUsers()', () => {
    it('filtra solo usuarios activos', async () => {
      mockRepo.findAll.mockResolvedValue([
        { id: 1, name: 'Ana',   active: true  },
        { id: 2, name: 'Luis',  active: false },
        { id: 3, name: 'Elena', active: true  },
      ]);

      const result = await service.listActiveUsers();

      expect(result).toHaveLength(2);
      expect(result.every(u => u.active)).toBe(true);
    });
  });
});