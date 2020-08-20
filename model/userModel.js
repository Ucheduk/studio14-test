class UserModel {
  constructor(users) {
    this.users = users;
  }

  getUser(name) {
    const user = this.users.find(user => user.name === name);
    if (!user) return null;
    return user;
  }

  getAllUsers(name) {
    return this.users;
  }

  addUser(name) {

    // Check if user exist
    const checkUser = this.getUser(name);
    if (checkUser) return null;

    const user = {
      name,
      trips: [],
      wallet: {
        balance: 0,
        currency: 'BTC'
      }
    };

    // Add user to users array
    this.users.push(user);

    return user;
  }

  createTrip(name, trip) {

    // Check if user exist
    const user = this.getUser(name);
    if (!user) return 'Bad request, user not found!';

    const { fare } = trip
    const date = new Date()
    user.trips.push({...trip, date});
    user.wallet.balance -= fare;

    // Add user to users array
    this.users.push(user);

    return user.wallet.balance;
  }

  fundUserWallet(name, amount) {
    const user = this.getUser(name);
    if (!user) return 'Bad request, user not found!';
    user.wallet.balance += amount;
    const { balance } = user.wallet;
    return `${name} was funded with ${amount}BTC. Wallet balance is ${balance}BTC`;
  }
}

module.exports = UserModel;
