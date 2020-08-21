const RocketModel = require('../model/rocketModel');

const mockRockets = [
  {
    name: 'Falcon 1',
    class: 'Business'
  },
  {
    name: 'Falcon 9',
    class: 'Luxury'
  }
];

describe('RocketModel', () => {
  const rocketModel = new RocketModel(mockRockets);
  const rocketName = 'Test';

  describe('getRocket', () => {
    it('should return null if Test rocket does not exist', () => {
      const res = rocketModel.getRocket(rocketName);
      expect(res).toBeNull;
    });

    it('should return Falcon 1 rocket object since Falcon 1 rocket exist in mockRockets', () => {
      const res = rocketModel.getRocket('Falcon 1');
      expect(res.name).toBe('Falcon 1');
      expect(res.class).toBe('Business');
    });
  });

});