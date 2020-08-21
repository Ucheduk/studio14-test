const { users, stations, rockets } = require('./data');
const { addNewUser, fundWallet, makeTrip } = require('./workflow');
const UserModel = require('./model/userModel');
const StationModel = require('./model/stationModel');
const RocketModel = require('./model/rocketModel');

const INITIAL_USER_WALLET_AMOUNT = 3000;
const userModel = new UserModel(users);
const stationModel = new StationModel(stations);
const rocketModel = new RocketModel(rockets);


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
