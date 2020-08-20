class RocketModel {
  constructor(rockets) {
    this.rockets = rockets;
  }

  getRocket(name) {
    const rocket = this.rockets.find(rocket => rocket.name === name);
    if (!rocket) return null;
    return rocket;
  }
}

module.exports = RocketModel;
