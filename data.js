const users = [
  {
    name: 'John',
    trips: [],
    wallet: {
      balance: 0,
      currency: 'BTC'
    }
  }
];

const stations = [
  {
    name: 'Abuja',
    type: 'Natural',
    orbit: 'Earth'
  },
  {
    name: 'Spock',
    type: 'Natural',
    orbit: 'Mars'
  },
  {
    name: 'International Space Station',
    type: 'Manmade',
    orbit: 'Earth'
  },
  {
    name: 'Moon',
    type: 'Natural',
    orbit: 'Earth'
  }
];

const rockets = [
  {
    name: 'Falcon 1',
    class: 'Business'
  },
  {
    name: 'Falcon 9',
    class: 'Luxury'
  }
];

module.exports = { users, stations, rockets };