const StationsModel = require('../model/stationModel');

const mockStations = [
  {
    name: 'Abuja',
    type: 'Natural',
    orbit: 'Earth'
  }
];

describe('StationsModel', () => {
  const stationModel  = new StationsModel(mockStations);
  const stationName = 'Test';

  describe('getStation', () => {
    it('should return null if Test station does not exist', () => {
      const res = stationModel.getStation(stationName);
      expect(res).toBeNull;
    });

    it('should return Abuja station object since Abuja station exist in mockStations', () => {
      const res = stationModel.getStation('Abuja');
      expect(res.name).toBe('Abuja');
      expect(res.type).toBe('Natural');
      expect(res.orbit).toBe('Earth');
    });
  });

});