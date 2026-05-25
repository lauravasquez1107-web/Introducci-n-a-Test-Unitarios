class UserService {
  constructor(userRepository) {
    this.repo = userRepository;
  }

  async findUser(id) {
    if (!id || typeof id !== 'number') {
      throw new TypeError('El id debe ser un número válido.');
    }
    const user = await this.repo.findById(id);
    if (!user) throw new Error(`Usuario ${id} no encontrado.`);
    return user;
  }

  async listActiveUsers() {
    const users = await this.repo.findAll();
    return users.filter(u => u.active);
  }
}

module.exports = UserService;

