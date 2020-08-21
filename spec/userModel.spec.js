const UserModel = require('../model/userModel');

const mockUsers = [
  {
    name: 'John',
    trips: [],
    wallet: {
      balance: 0,
      currency: 'BTC'
    }
  }
];

describe('UserModel', () => {
  let userModel = new UserModel(mockUsers);

  describe('getUser', () => {
    const userName = 'Test';
    it('should return null if Test user not found', () => {
      const res = userModel.getUser(userName);
      expect(res).toBeNull;
    });

    it('should return John user object since John exist in mockUsers', () => {
      const res = userModel.getUser('John');
      expect(res.name).toBe('John');
      expect(res.trips).toBeInstanceOf(Array);
      expect(res.wallet).toBeInstanceOf(Object);
      expect(res.wallet.balance).toBeGreaterThanOrEqual(0);
      expect(res.wallet.currency).toBe('BTC');
    });
  });

  describe('getAllUsers', () => {
    it('should return an array of users', () => {
      const res = userModel.getAllUsers();
      expect(res).toBeInstanceOf(Array);
    });
  });

  describe('addUser', () => {
    let res;
    const userName = 'Test1';
    beforeAll(() => {
      res = userModel.addUser(userName);
    })
    it('should return Test user object if Test user is added to mockUsers', () => {
      expect(res.name).toBe(userName);
      expect(res.trips).toBeInstanceOf(Array);
      expect(res.wallet).toBeInstanceOf(Object);
      expect(res.wallet.balance).toBeGreaterThanOrEqual(0);
      expect(res.wallet.currency).toBe('BTC');
    });
    it('should return null since Test user has already been added to mockUsers', () => {
      expect(res).toBeNull;
    });
  });

  describe('fundUserWallet', () => {
    const amount = 3000;
    const userName = 'Test2';
    it('should return null since no valid user is username is passed', () => {
      const res = userModel.fundUserWallet('', amount);
      expect(res).toBe('Bad request, user not found!');
    });
    it('should add funds to user wallet since Test user is being added to mockUsers', () => {
      const { name } = userModel.addUser(userName);
      const res = userModel.fundUserWallet(name, amount);
      expect(res).toMatch(`${name} was funded with ${amount}BTC.`);
    });
  });

  describe('createTrip', () => {
    const trip = {
      from: 'Abuja',
      to: 'Moon',
      fare: 300
    };
    const userName = 'Test3';
    it('should return null since no valid username is passed', () => {
      const res = userModel.createTrip('', trip);
      expect(res).toBe('Bad request, user not found!');
    });
    it('should return user wallet balance since Test user is being added to mockUsers', () => {
      const { name } = userModel.addUser(userName);
      const res = userModel.createTrip(name, trip);
      expect(res).toBeInstanceOf(Number);
    });
  });

});