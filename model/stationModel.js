class StationModel {
  constructor(stations) {
    this.stations = stations;
  }

  getStation(name) {
    const station = this.stations.find(station => station.name === name);
    if (!station) return null;
    return station;
  }
}

module.exports = StationModel;
