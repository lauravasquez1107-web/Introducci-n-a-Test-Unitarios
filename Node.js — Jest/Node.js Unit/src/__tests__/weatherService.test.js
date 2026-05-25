// jest.mock() DEBE ir al principio, antes de cualquier require
jest.mock('axios');

const axios = require('axios');
const { getCurrentTemperature } = require('../weatherService');

describe('weatherService', () => {
  it('retorna la temperatura de la ciudad', async () => {
    // Simular respuesta exitosa de axios
    axios.get.mockResolvedValue({ data: { temperature: 22 } });

    const temp = await getCurrentTemperature('Bogotá');

    expect(temp).toBe(22);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('Bogotá'));
  });

  it('propaga el error de red', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await expect(getCurrentTemperature('Lima')).rejects.toThrow('Network Error');
  });
});