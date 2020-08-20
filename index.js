const { users, stations, rockets } = require('./data');
const UserModel = require('./model/userModel');
const StationModel = require('./model/stationModel');
const RocketModel = require('./model/rocketModel');

const INITIAL_USER_WALLET_AMOUNT = 3000;
const userModel = new UserModel(users);
const stationModel = new StationModel(stations);
const rocketModel = new RocketModel(rockets);

const addNewUser = (username, userModel) => {
  const user = userModel.addUser(username);

  // Check if user already exist
  if (!user) return 'Bad request, user already exist!'

  const res = `${username} was added successfully`
  console.log(res);
  return res;
}

const fundWallet = (username, userModel, amount) => {
  const res = userModel.fundUserWallet(username, amount);
  console.log(res);
  return res;
}

const getPrice = (rocketName, fromOrbit, toOrbit, toType) => {
  const fixedPrice = {
    orbitToOrbit: 250,
    sameOrbit: 50,
    royalty: 200
  }
  let price;
  switch (rocketName) {
    case 'Falcon 1':
      price = 0;
      if (fromOrbit !== toOrbit) price = fixedPrice.orbitToOrbit;
      if (fromOrbit === toOrbit) price = fixedPrice.sameOrbit;
      if (toType === 'Manmade') price += fixedPrice.royalty;
      return price;
    
    case 'Falcon 9':
      price = 0;
      if (fromOrbit !== toOrbit) price = fixedPrice.orbitToOrbit * 2;
      if (fromOrbit === toOrbit) price = fixedPrice.sameOrbit * 2;
      if (toType === 'Manmade') price += fixedPrice.royalty;
      return price;
  
    default:
      break;
  }
}

const makeTrip = (username, rocketName, stationFrom, stationTo, userModel, stationModel, rocketModel) => {

  // check if user exist
  const user = userModel.getUser(username);
  if (!user) return 'Bad request, user not found!';

  // check if rocket exist
  const rocket = rocketModel.getRocket(rocketName);
  if (!rocket) return 'Bad request, rocket not found!';

  // check if stations exist
  const from = stationModel.getStation(stationFrom);
  const to = stationModel.getStation(stationTo);
  if (!from || !to) return 'Bad request, one or both of the stations not found!';

  const tripFare = getPrice(rocket.name, from.orbit, to.orbit, to.type);

  if (tripFare > user.wallet.balance) return 'Bad request, user has insufficient funds!';

  // Create trip
  const trip = {
    from: from.name,
    to: to.name,
    fare: tripFare
  };

  const balance = userModel.createTrip(username, trip)

  const res = `${username} trip from ${from.name} to ${to.name} was created successfully. Wallet balance is ${balance}BTC`
  
  console.log(res);
  return res;
}

const userName = 'Elon';

// Add new user
addNewUser(userName, userModel);

// Load initial user wallet amount
fundWallet(userName, userModel, INITIAL_USER_WALLET_AMOUNT);

// Taking trip with Falcon 9 rocket from Abuja station to the Moon
makeTrip(userName, 'Falcon 9', 'Abuja', 'Moon', userModel, stationModel, rocketModel);

// Taking trip with Falcon 1 rocket from the Moon to Spock station	on Mars
makeTrip(userName, 'Falcon 9', 'Moon', 'Spock', userModel, stationModel, rocketModel);

// Taking trip with Falcon 9 from Mars to the International Space Station (ISS)	in Lower Earth
makeTrip(userName, 'Falcon 9', 'Spock', 'International Space Station', userModel, stationModel, rocketModel);