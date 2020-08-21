const { users, stations, rockets } = require('../data');
const { addNewUser, fundWallet, makeTrip } = require('../workflow');
const UserModel = require('../model/userModel');
const StationModel = require('../model/stationModel');
const RocketModel = require('../model/rocketModel');

describe('SpaceX Odyssey User', () => {
  const userName = 'Elon';
  const INITIAL_USER_WALLET_AMOUNT = 3000;
  const userModel = new UserModel(users);
  const stationModel = new StationModel(stations);
  const rocketModel = new RocketModel(rockets);

  addNewUser(userName, userModel);
  fundWallet(userName, userModel, INITIAL_USER_WALLET_AMOUNT);
  makeTrip(userName, 'Falcon 9', 'Abuja', 'Moon', userModel, stationModel, rocketModel);
  makeTrip(userName, 'Falcon 9', 'Moon', 'Spock', userModel, stationModel, rocketModel);
  makeTrip(userName, 'Falcon 9', 'Spock', 'International Space Station', userModel, stationModel, rocketModel);
  
  it('should wallet balance of 1700BTC after use case', () => {
    const res = userModel.getUser(userName);
    expect(res.wallet.balance).toEqual(1700);
  });
});